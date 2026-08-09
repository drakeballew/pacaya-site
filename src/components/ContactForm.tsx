"use client";

import { useId } from 'react'
import React, { useState } from 'react'

import { Button } from '@/components/Button'
import { FadeIn } from '@/components/FadeIn'

declare global {
  interface Window {
    sa_event?: (name: string, data?: any, cb?: () => void) => void;
    sa_loaded?: boolean;
  }
}

function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

function TextArea({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'textarea'> & { label: string }) {
  let id = useId();

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <textarea
        id={id}
        rows={4}
        {...props}
        placeholder=""
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl resize-none"
      />
      <label
        htmlFor={id}
      className="pointer-events-none absolute left-6 top-6 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-0 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
      >
        {label}
      </label>
    </div>
  );
}

function RadioInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  return (
    <label className="flex gap-x-3">
      <input
        type="radio"
        {...props}
        className="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-none checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
      />
      <span className="text-base/6 text-neutral-950">{label}</span>
    </label>
  )
}

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    budget: '',
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    event.stopPropagation()
    // client-side validation
    const nextErrors: Record<string, string> = {}
    if (!formData.name.trim()) nextErrors.name = 'Please provide your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email || '')) nextErrors.email = 'Please provide a valid email.'
    if (!formData.message.trim()) nextErrors.message = 'Please enter a message.'
    if (formData.message.length > 2000) nextErrors.message = 'Message is too long (max 2000 chars).'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    try {
      if (typeof window !== 'undefined' && typeof window.sa_event === 'function') {
        window.sa_event('form_submit_contact', {
          form_name: 'Contact Form',
          page: window.location.pathname,
          submitted_at: new Date().toISOString(),
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
          referrer: typeof document !== 'undefined' ? document.referrer : undefined,
          fields: { ...formData },
        })
      }
    } catch (error) {
      console.error('Simple Analytics tracking failed:', error)
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const body = await res.json().catch(() => ({}))

      if (!res.ok) {
        setErrors(body.errors || { form: body.error || 'Submission failed' })
        return
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error:', error)
      setErrors({ form: 'Network error' })
    }
}

  return (
    <FadeIn className="lg:order-last">
      {isSubmitted ? (
        <div className="flex items-center justify-center">
          ✅ Got it. We&apos;ll be in touch soon.
        </div>
      ) : (
      <form onSubmit={handleSubmit}>
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Work inquiries
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput
            label="Name"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
          <TextInput
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
          <TextInput
            label="Company"
            name="company"
            autoComplete="organization"
            value={formData.company}
            onChange={handleChange}
          />
          <TextInput
            label="Phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextArea
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">Budget</legend>
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <RadioInput
                  label="$25K – $50K"
                  name="budget"
                  value="25"
                  checked={formData.budget === '25'}
                  onChange={handleChange}
                />
                <RadioInput
                  label="$50K – $100K"
                  name="budget"
                  value="50"
                  checked={formData.budget === '50'}
                  onChange={handleChange}
                />
                <RadioInput
                  label="$100K – $150K"
                  name="budget"
                  value="100"
                  checked={formData.budget === '100'}
                  onChange={handleChange}
                />
                <RadioInput
                  label="More than $150K"
                  name="budget"
                  value="150"
                  checked={formData.budget === '150'}
                  onChange={handleChange}
                />
              </div>
            </fieldset>
          </div>
        </div>
        <Button type="submit" className="mt-10">
          Let’s work together
        </Button>
        {errors.form && <p className="mt-4 text-sm text-red-600">{errors.form}</p>}
      </form>
    )}
    </FadeIn>
  );
}