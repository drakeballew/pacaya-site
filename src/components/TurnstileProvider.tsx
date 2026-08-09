'use client'

import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'

type TurnstileContextValue = {
  requestToken: () => Promise<string>
}

const TurnstileContext = createContext<TurnstileContextValue | null>(null)

const TURNSTILE_TIMEOUT_MS = 30_000

export function useTurnstile() {
  const context = useContext(TurnstileContext)

  if (!context) {
    throw new Error('useTurnstile must be used within TurnstileProvider')
  }

  return context
}

export function TurnstileProvider({ children }: { children: React.ReactNode }) {
  const turnstileRef = useRef<TurnstileInstance>(null)
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const pendingRef = useRef<{
    resolve: (token: string) => void
    reject: (error: Error) => void
    timeoutId: number
  } | null>(null)
  const readyRef = useRef(false)
  const readyPromiseRef = useRef<Promise<void> | null>(null)
  const readyResolveRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!siteKey) {
      readyRef.current = true
      return
    }

    readyRef.current = false
    readyPromiseRef.current = new Promise((resolve) => {
      readyResolveRef.current = resolve
    })
  }, [siteKey])

  const clearPending = useCallback((reject?: Error) => {
    const pending = pendingRef.current

    if (!pending) {
      return
    }

    window.clearTimeout(pending.timeoutId)
    pendingRef.current = null

    if (reject) {
      pending.reject(reject)
    }
  }, [])

  const handleWidgetLoad = useCallback(() => {
    readyRef.current = true
    readyResolveRef.current?.()
  }, [])

  const requestToken = useCallback(async (): Promise<string> => {
    if (!siteKey) {
      if (process.env.NODE_ENV === 'development') {
        return 'dev-bypass'
      }

      throw new Error('turnstile-unavailable')
    }

    if (pendingRef.current) {
      throw new Error('turnstile-busy')
    }

    if (!readyRef.current && readyPromiseRef.current) {
      await readyPromiseRef.current
    }

    return new Promise((resolve, reject) => {
      const timeoutId = window.setTimeout(() => {
        clearPending(new Error('turnstile-timeout'))
        turnstileRef.current?.reset()
      }, TURNSTILE_TIMEOUT_MS)

      pendingRef.current = { resolve, reject, timeoutId }

      try {
        turnstileRef.current?.execute()
      } catch {
        clearPending(new Error('turnstile-execute-failed'))
      }
    })
  }, [siteKey, clearPending])

  const handleSuccess = useCallback((token: string) => {
    const pending = pendingRef.current

    if (!pending) {
      return
    }

    window.clearTimeout(pending.timeoutId)
    pendingRef.current = null
    pending.resolve(token)
    turnstileRef.current?.reset()
  }, [])

  const handleError = useCallback(() => {
    clearPending(new Error('turnstile-error'))
    turnstileRef.current?.reset()
  }, [clearPending])

  const handleExpire = useCallback(() => {
    clearPending(new Error('turnstile-expired'))
    turnstileRef.current?.reset()
  }, [clearPending])

  return (
    <TurnstileContext.Provider value={{ requestToken }}>
      {children}
      {siteKey ? (
        <div className="sr-only" aria-hidden="true">
          <Turnstile
            ref={turnstileRef}
            siteKey={siteKey}
            onSuccess={handleSuccess}
            onError={handleError}
            onExpire={handleExpire}
            onWidgetLoad={handleWidgetLoad}
            options={{
              size: 'invisible',
              execution: 'execute',
              refreshExpired: 'auto',
            }}
          />
        </div>
      ) : null}
    </TurnstileContext.Provider>
  )
}
