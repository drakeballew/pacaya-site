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
  enabled?: boolean
}

export const TurnstileField = forwardRef<
  TurnstileFieldHandle,
  TurnstileFieldProps
>(function TurnstileField(
  {
    onSuccess,
    onExpire,
    onError,
    size = 'flexible',
    className,
    enabled = true,
  },
  ref,
) {
  const turnstileRef = useRef<TurnstileInstance>(null)
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const onSuccessRef = useRef(onSuccess)
  const onExpireRef = useRef(onExpire)
  const onErrorRef = useRef(onError)

  onSuccessRef.current = onSuccess
  onExpireRef.current = onExpire
  onErrorRef.current = onError

  useImperativeHandle(ref, () => ({
    reset: () => {
      turnstileRef.current?.reset()
    },
  }))

  useEffect(() => {
    if (!siteKey && process.env.NODE_ENV === 'development') {
      onSuccessRef.current('dev-bypass')
    }
  }, [siteKey])

  if (!enabled) {
    return null
  }

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
        onSuccess={(token) => onSuccessRef.current(token)}
        onExpire={() => onExpireRef.current()}
        onError={() => onErrorRef.current()}
        options={{
          size,
          refreshExpired: 'auto',
        }}
      />
    </div>
  )
})
