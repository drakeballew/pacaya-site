import { NextResponse } from 'next/server'

import { verifyEmail } from '@/lib/emailable'
import { formMessages, type FormApiResponse } from '@/lib/messages'
import { upsertSubscriber } from '@/lib/mailerlite'
import { newsletterSchema } from '@/lib/validation/schemas'

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json<FormApiResponse>(
      { ok: false, message: formMessages.serverError },
      { status: 400 },
    )
  }

  const parsed = newsletterSchema.safeParse(body)

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

  const groupId = process.env.MAILERLITE_NEWSLETTER_GROUP_ID

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
