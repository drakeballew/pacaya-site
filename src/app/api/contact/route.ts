import { NextResponse } from 'next/server'

type ContactPayload = {
  name?: string
  email?: string
  company?: string
  phone?: string
  message?: string
  budget?: string
}

function validateEmail(email?: string) {
  if (!email) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePayload(payload: ContactPayload) {
  const errors: Record<string, string> = {}
  if (!payload.name || payload.name.trim().length === 0) {
    errors.name = 'Name is required'
  } else if (payload.name.length > 100) {
    errors.name = 'Name too long'
  }

  if (!validateEmail(payload.email)) {
    errors.email = 'Valid email is required'
  }

  if (payload.company && payload.company.length > 100) {
    errors.company = 'Company too long'
  }

  if (payload.phone && payload.phone.length > 50) {
    errors.phone = 'Phone too long'
  }

  if (!payload.message || payload.message.trim().length === 0) {
    errors.message = 'Message is required'
  } else if (payload.message.length > 2000) {
    errors.message = 'Message too long'
  }

  return errors
}

function interpretEmailableResponse(body: any) {
  if (!body) return false

  if (typeof body.state === 'string') {
    const s = body.state.toLowerCase()
    if (s === 'deliverable' || s === 'valid' || s === 'safe') return true
    if (s === 'undeliverable' || s === 'invalid' || s === 'risky') return false
  }

  if (typeof body.reason === 'string') {
    if (/accepted_email|mailbox_exists|smtp_check_pass|accepted/i.test(body.reason)) return true
  }

  if (typeof body.score === 'number') {
    // use score as a fallback: treat >=75 as acceptable
    return body.score >= 75
  }

  if (typeof body.is_valid === 'boolean') return body.is_valid
  if (typeof body.isDeliverable === 'boolean') return body.isDeliverable
  if (typeof body.result === 'string') return /valid/i.test(body.result)
  if (typeof body.status === 'string') return /valid|deliverable/i.test(body.status)
  return false
}

export async function POST(request: Request) {
  const payload: ContactPayload = await request.json().catch(() => ({}))

  const errors = validatePayload(payload)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 })
  }

  const EMAILABLE_API_URL = process.env.EMAILABLE_API_URL
  const EMAILABLE_API_KEY = process.env.EMAILABLE_API_KEY

  if (!EMAILABLE_API_URL || !EMAILABLE_API_KEY) {
    return NextResponse.json({ ok: false, error: 'Emailable credentials not configured' }, { status: 500 })
  }

  // Verify email through Emailable
  try {
    const emUrl = `${EMAILABLE_API_URL}?email=${encodeURIComponent(
      payload.email || ''
    )}&api_key=${encodeURIComponent(EMAILABLE_API_KEY)}`

    const emRes = await fetch(emUrl)

    const emBody = await emRes.json().catch(() => null)
    const isValid = interpretEmailableResponse(emBody)

    if (!isValid) {
      return NextResponse.json({ ok: false, error: 'Email address failed verification' }, { status: 400 })
    }
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Emailable verification failed' }, { status: 502 })
  }

  // Send notification to MailerLite / configured webhook
  const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
  const MAILERLITE_SUBSCRIBERS_URL = process.env.MAILERLITE_SUBSCRIBERS_URL || 'https://connect.mailerlite.com/api/subscribers'
  const ADD_CONTACT_TO_MAILERLITE = String(process.env.ADD_CONTACT_TO_MAILERLITE || '').toLowerCase() === 'true'
  const MAILERLITE_CONTACT_FORM_GROUP_ID = process.env.MAILERLITE_CONTACT_FORM_GROUP_ID

  // Optionally add contact email as subscriber
  if (ADD_CONTACT_TO_MAILERLITE && MAILERLITE_API_KEY) {
    try {
      const groups = MAILERLITE_CONTACT_FORM_GROUP_ID ? [MAILERLITE_CONTACT_FORM_GROUP_ID] : undefined
      const body: any = {
        email: payload.email,
        fields: {
          name: payload.name,
          company: payload.company,
          budget: payload.budget,
          phone: payload.phone,
        },
      }
      if (groups) body.groups = groups

      await fetch(MAILERLITE_SUBSCRIBERS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify(body),
      })
    } catch (err) {
      // non-fatal: continue to send notification
      console.error('Failed to add contact as subscriber:', err)
    }
  }

  // Done: email verified and optional subscriber added
  return NextResponse.json({ ok: true })
}
