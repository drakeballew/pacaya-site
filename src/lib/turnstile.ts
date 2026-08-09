const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify'

type TurnstileVerifyResponse = {
  success?: boolean
  'error-codes'?: string[]
}

export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!secret) {
    if (
      process.env.NODE_ENV === 'development' &&
      token === 'dev-bypass'
    ) {
      return true
    }

    console.error('TURNSTILE_SECRET_KEY is not configured')
    return false
  }

  if (!token) {
    return false
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
    })

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    if (!response.ok) {
      console.error('Turnstile verification failed:', response.status)
      return false
    }

    const data = (await response.json()) as TurnstileVerifyResponse

    if (data.success !== true) {
      console.error(
        'Turnstile token rejected:',
        data['error-codes']?.join(', ') ?? 'unknown error',
      )
    }

    return data.success === true
  } catch (error) {
    console.error('Turnstile verification error:', error)
    return false
  }
}
