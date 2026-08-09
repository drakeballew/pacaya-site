const MAILERLITE_API_URL = 'https://connect.mailerlite.com/api/subscribers'

export type UpsertSubscriberInput = {
  email: string
  groups: string[]
  fields?: Record<string, string>
}

export async function upsertSubscriber(
  input: UpsertSubscriberInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiToken = process.env.MAILERLITE_API_TOKEN

  if (!apiToken) {
    console.error('MAILERLITE_API_TOKEN is not configured')
    return { ok: false, error: 'Missing MailerLite API token' }
  }

  try {
    const response = await fetch(MAILERLITE_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: input.email,
        groups: input.groups,
        fields: input.fields,
        status: 'active',
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error('MailerLite upsert failed:', response.status, errorBody)
      return { ok: false, error: 'MailerLite request failed' }
    }

    return { ok: true }
  } catch (error) {
    console.error('MailerLite upsert error:', error)
    return { ok: false, error: 'MailerLite request failed' }
  }
}
