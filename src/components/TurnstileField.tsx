'use client'

import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

export type TurnstileFieldHandle = {
  reset: () => void
}

type TurnstileFieldProps = {
  onSuccess: (token: string) => void
  onExpire: () => void
  onError: () => void
  size?: 'normal' | 'compact' | 'flexible' | 'invisible'
  className?: string
}

export const TurnstileField = forwardRef<
  TurnstileFieldHandle,
  TurnstileFieldProps
>(function TurnstileField(
  { onSuccess, onExpire, onError, size = 'flexible', className },
  ref,
) {
  const turnstileRef = useRef<TurnstileInstance>(null)
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  useImperativeHandle(ref, () => ({
    reset: () => {
      turnstileRef.current?.reset()
    },
  }))

  useEffect(() => {
    if (!siteKey && process.env.NODE_ENV === 'development') {
      onSuccess('dev-bypass')
    }
  }, [onSuccess, siteKey])

  if (!siteKey) {
    if (process.env.NODE_ENV === 'development') {
      return null
    }

    return (
      <p className={className} role="alert">
        Form verification is unavailable. Please try again later.
      </p>
    )
  }

  return (
    <div className={className}>
      <Turnstile
        ref={turnstileRef}
        siteKey={siteKey}
        onSuccess={onSuccess}
        onExpire={onExpire}
        onError={onError}
        options={{ size }}
      />
    </div>
  )
})
