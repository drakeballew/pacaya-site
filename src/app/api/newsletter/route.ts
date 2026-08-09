import { NextResponse } from 'next/server'

type NewsletterPayload = {
  email?: string
}

function validateEmail(email?: string) {
  if (!email) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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
    return body.score >= 75
  }

  if (typeof body.is_valid === 'boolean') return body.is_valid
  if (typeof body.isDeliverable === 'boolean') return body.isDeliverable
  if (typeof body.result === 'string') return /valid/i.test(body.result)
  if (typeof body.status === 'string') return /valid|deliverable/i.test(body.status)
  return false
}

export async function POST(request: Request) {
  const payload: NewsletterPayload = await request.json().catch(() => ({}))

  if (!validateEmail(payload.email)) {
    return NextResponse.json({ ok: false, error: 'Valid email required' }, { status: 400 })
  }

  const EMAILABLE_API_URL = process.env.EMAILABLE_API_URL
  const EMAILABLE_API_KEY = process.env.EMAILABLE_API_KEY

  if (!EMAILABLE_API_URL || !EMAILABLE_API_KEY) {
    return NextResponse.json({ ok: false, error: 'Emailable credentials not configured' }, { status: 500 })
  }

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

  const MAILERLITE_API_URL = process.env.MAILERLITE_API_URL
  const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
  const MAILERLITE_SUBSCRIBERS_URL = process.env.MAILERLITE_SUBSCRIBERS_URL || 'https://connect.mailerlite.com/api/subscribers'

  // Add subscriber via MailerLite
  if (MAILERLITE_API_KEY) {
    try {
      const subRes = await fetch(MAILERLITE_SUBSCRIBERS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify({ email: payload.email, status: 'active', groups: ['78972911530018580'] }),
      })

      if (![200, 201].includes(subRes.status)) {
        // continue but report partial failure
        console.error('MailerLite add subscriber returned', subRes.status)
      }
    } catch (err) {
      console.error('Failed to add subscriber to MailerLite:', err)
    }
  }

  return NextResponse.json({ ok: true })
}
