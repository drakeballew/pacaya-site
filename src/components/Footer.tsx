'use client'

import Link from 'next/link'
import React, { useCallback, useEffect, useRef } from 'react'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import {
  TurnstileField,
  type TurnstileFieldHandle,
} from '@/components/TurnstileField'
import type { FormApiResponse } from '@/lib/messages'
import { formMessages } from '@/lib/messages'
import {
  getFieldErrors,
  isValid,
  newsletterSchema,
} from '@/lib/validation/schemas'

declare global {
  interface Window {
    sa_event?: (name: string, data?: Record<string, unknown>, cb?: () => void) => void;
    sa_loaded?: boolean;
  }
}

const navigation = [
  {
    title: 'Work',
    links: [
      { title: 'Fiverr', href: '/work/fiverr' },
      { title: 'Kiva.org', href: '/work/kiva' },
      { title: 'Outdoorsy', href: '/work/outdoorsy' },
      {
        title: (
          <>
            See all <span aria-hidden="true">&rarr;</span>
          </>
        ),
        href: '/work',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'About', href: '/about' },
      { title: 'Process', href: '/process' },
      { title: 'Blog', href: '/blog' },
      { title: 'Contact us', href: '/contact' },
    ],
  },
]

function Navigation() {
  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {navigation.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            <div className="font-display text-sm font-semibold tracking-wider text-neutral-950">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-4">
                  <Link
                    href={link.href}
                    className="transition hover:text-neutral-950"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  )
}

function NewsletterForm() {
  const turnstileRef = useRef<TurnstileFieldHandle>(null)
  const [formData, setFormData] = React.useState({ email: '' })
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [turnstileToken, setTurnstileToken] = React.useState<string | null>(null)
  const [turnstileFailed, setTurnstileFailed] = React.useState(false)

  const formIsValid = isValid(newsletterSchema, formData)
  const waitingForTurnstile =
    formIsValid && turnstileToken === null && !isSubmitting

  useEffect(() => {
    if (!successMessage) return

    const timeout = window.setTimeout(() => {
      setSuccessMessage(null)
    }, 8000)

    return () => window.clearTimeout(timeout)
  }, [successMessage])

  const handleTurnstileSuccess = useCallback((token: string) => {
    setTurnstileToken(token)
    setTurnstileFailed(false)
  }, [])

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null)
  }, [])

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken(null)
    setTurnstileFailed(true)
    turnstileRef.current?.reset()
  }, [])

  const resetTurnstileAfterSubmit = useCallback(() => {
    setTurnstileToken(null)
    turnstileRef.current?.reset()
  }, [])

  function validateField(field: 'email') {
    const fieldErrors = getFieldErrors(newsletterSchema, formData)
    setErrors((current) => ({
      ...current,
      [field]: fieldErrors[field] ?? '',
    }))
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setFormData({ email: value })
    setSubmitError(null)
    setSuccessMessage(null)

    if (errors.email) {
      const fieldErrors = getFieldErrors(newsletterSchema, { email: value })
      setErrors({ email: fieldErrors.email ?? '' })
    }
  }

  function handleBlur() {
    validateField('email')
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError(null)

    const fieldErrors = getFieldErrors(newsletterSchema, formData)
    setErrors(fieldErrors)

    if (!formIsValid) {
      return
    }

    if (!turnstileToken) {
      setSubmitError('Complete the security check to submit.')
      return
    }

    try {
      if (typeof window !== 'undefined' && typeof window.sa_event === 'function') {
        window.sa_event('form_submit_newsletter', {
          form_name: 'Newsletter Form',
          page: window.location.pathname,
          submitted_at: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.error('Simple Analytics tracking failed:', error)
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      })

      const data = (await response.json()) as FormApiResponse

      if (data.ok) {
        setFormData({ email: '' })
        setErrors({})
        setSubmitError(null)
        setSuccessMessage(data.message)
        resetTurnstileAfterSubmit()
        return
      }

      setSubmitError(data.message)
      if (response.status === 403) {
        resetTurnstileAfterSubmit()
      }
    } catch {
      setSubmitError(formMessages.serverError)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <TurnstileField
        ref={turnstileRef}
        className="sr-only"
        size="invisible"
        onSuccess={handleTurnstileSuccess}
        onExpire={handleTurnstileExpire}
        onError={handleTurnstileError}
      />
      <form
        className="max-w-sm"
        onSubmit={handleSubmit}
        noValidate
        data-sa-client-handled="true"
      >
        <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
          Sign up for our newsletter
        </h2>
        <p className="mt-4 text-sm text-neutral-700">
          Subscribe to receive tips, tricks, and thoughts on startup marketing,
          development, and leadership via e-mail.
        </p>
        <div className="relative mt-6">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email address"
          autoComplete="email"
          aria-label="Email address"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={
            errors.email
              ? 'newsletter-email-error'
              : successMessage
                ? 'newsletter-success-message'
                : undefined
          }
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
        />
        {!successMessage ? (
          <div className="absolute inset-y-1 right-1 flex justify-end">
            <button
              type="submit"
              aria-label="Submit"
              disabled={isSubmitting || waitingForTurnstile}
              className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowIcon className="w-4" />
            </button>
          </div>
        ) : null}
      </div>
      {successMessage ? (
        <div
          id="newsletter-success-message"
          className="mt-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800"
          role="status"
          aria-live="polite"
        >
          {successMessage}
        </div>
      ) : null}
      {errors.email ? (
        <p
          id="newsletter-email-error"
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {errors.email}
        </p>
      ) : null}
      {turnstileFailed ? (
        <p className="mt-2 text-sm text-red-600" role="alert">
          Security verification failed. Please refresh the page and try again.
        </p>
      ) : waitingForTurnstile && !successMessage ? (
        <p className="mt-2 text-sm text-neutral-600">
          Preparing secure submission…
        </p>
      ) : null}
      {submitError ? (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {submitError}
        </p>
      ) : null}
      </form>
    </>
  )
}

export function Footer() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
        <FadeIn>
          <Navigation />
        </FadeIn>
        <div className="flex lg:justify-end">
          <NewsletterForm />
        </div>
      </div>
      <FadeIn>
        <div className="mb-20 mt-24 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <Link href="/" aria-label="Home">
            <Logo className="h-8" fillOnHover />
          </Link>
          <p className="text-sm text-neutral-700">
            © Pacaya Digital LLC {new Date().getFullYear()}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
