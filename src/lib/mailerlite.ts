const MAILERLITE_API_URL =
  process.env.MAILERLITE_SUBSCRIBERS_URL ||
  'https://connect.mailerlite.com/api/subscribers'

export type UpsertSubscriberInput = {
  email: string
  groups: string[]
  fields?: Record<string, string>
}

export type UpsertSubscriberResult =
  | { ok: true }
  | { ok: false; error: string; status?: number; detail?: string }

function getApiToken(): string | undefined {
  const token =
    process.env.MAILERLITE_API_TOKEN || process.env.MAILERLITE_API_KEY

  return token?.trim() || undefined
}

export async function upsertSubscriber(
  input: UpsertSubscriberInput,
): Promise<UpsertSubscriberResult> {
  const apiToken = getApiToken()

  if (!apiToken) {
    console.error('MAILERLITE_API_TOKEN or MAILERLITE_API_KEY is not configured')
    return { ok: false, error: 'Missing MailerLite API token' }
  }

  const groups = input.groups.map((group) => group.trim()).filter(Boolean)

  if (groups.length === 0) {
    console.error('MailerLite upsert failed: no group IDs provided')
    return { ok: false, error: 'Missing MailerLite group ID' }
  }

  const payload: Record<string, unknown> = {
    email: input.email.trim(),
    groups,
    status: 'active',
  }

  if (input.fields && Object.keys(input.fields).length > 0) {
    payload.fields = input.fields
  }

  try {
    const response = await fetch(MAILERLITE_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error(
        'MailerLite upsert failed:',
        response.status,
        errorBody.slice(0, 500),
      )

      return {
        ok: false,
        error: 'MailerLite request failed',
        status: response.status,
        detail: errorBody.slice(0, 500),
      }
    }

    return { ok: true }
  } catch (error) {
    console.error('MailerLite upsert error:', error)
    return { ok: false, error: 'MailerLite request failed' }
  }
}
