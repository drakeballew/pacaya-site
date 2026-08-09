import { NextResponse } from 'next/server'

import { verifyEmail } from '@/lib/emailable'
import { formMessages, type FormApiResponse } from '@/lib/messages'
import { upsertSubscriber } from '@/lib/mailerlite'
import { verifyTurnstileToken } from '@/lib/turnstile'
import { newsletterSchema } from '@/lib/validation/schemas'

export async function POST(request: Request) {
  let body: Record<string, unknown>

  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json<FormApiResponse>(
      { ok: false, message: formMessages.serverError },
      { status: 400 },
    )
  }

  const turnstileToken =
    typeof body.turnstileToken === 'string' ? body.turnstileToken : ''

  const turnstileValid = await verifyTurnstileToken(turnstileToken)

  if (!turnstileValid) {
    return NextResponse.json<FormApiResponse>(
      { ok: false, message: formMessages.turnstileError },
      { status: 403 },
    )
  }

  const { turnstileToken: _, ...formBody } = body
  const parsed = newsletterSchema.safeParse(formBody)

  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ?? formMessages.serverError

    return NextResponse.json<FormApiResponse>(
      { ok: false, message },
      { status: 400 },
    )
  }

  const { email } = parsed.data
  const verification = await verifyEmail(email)

  if (!verification.deliverable) {
    return NextResponse.json<FormApiResponse>(
      { ok: false, message: formMessages.undeliverableEmail },
      { status: 422 },
    )
  }

  const groupId = process.env.MAILERLITE_NEWSLETTER_GROUP_ID?.trim()

  if (!groupId) {
    console.error('MAILERLITE_NEWSLETTER_GROUP_ID is not configured')
    return NextResponse.json<FormApiResponse>(
      { ok: false, message: formMessages.serverError },
      { status: 500 },
    )
  }

  const mailerLiteResult = await upsertSubscriber({
    email,
    groups: [groupId],
  })

  if (!mailerLiteResult.ok) {
    console.error('Newsletter MailerLite failure:', {
      status: mailerLiteResult.status,
      detail: mailerLiteResult.detail,
    })
    return NextResponse.json<FormApiResponse>(
      { ok: false, message: formMessages.serverError },
      { status: 502 },
    )
  }

  return NextResponse.json<FormApiResponse>({
    ok: true,
    message: formMessages.newsletterSuccess,
  })
}
