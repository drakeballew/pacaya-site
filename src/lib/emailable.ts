const DEFAULT_EMAILABLE_VERIFY_URL = 'https://api.emailable.com/v1/verify'

export type EmailableState =
  | 'deliverable'
  | 'undeliverable'
  | 'risky'
  | 'unknown'
  | 'duplicate'

export type EmailableResult = {
  state: EmailableState | null
  deliverable: boolean
}

type EmailableApiResponse = {
  state?: EmailableState
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function requestVerification(
  email: string,
  apiKey: string,
): Promise<Response> {
  const url = new URL(
    process.env.EMAILABLE_API_URL || DEFAULT_EMAILABLE_VERIFY_URL,
  )
  url.searchParams.set('email', email)
  url.searchParams.set('api_key', apiKey)

  return fetch(url.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
}

export async function verifyEmail(email: string): Promise<EmailableResult> {
  const apiKey = process.env.EMAILABLE_API_KEY

  if (!apiKey) {
    console.error('EMAILABLE_API_KEY is not configured')
    return { state: null, deliverable: false }
  }

  try {
    let response = await requestVerification(email, apiKey)

    if (response.status === 249) {
      await sleep(1000)
      response = await requestVerification(email, apiKey)
    }

    if (!response.ok) {
      console.error('Emailable verification failed:', response.status)
      return { state: null, deliverable: false }
    }

    const data = (await response.json()) as EmailableApiResponse
    const state = data.state ?? null

    return {
      state,
      deliverable: state === 'deliverable',
    }
  } catch (error) {
    console.error('Emailable verification error:', error)
    return { state: null, deliverable: false }
  }
}
