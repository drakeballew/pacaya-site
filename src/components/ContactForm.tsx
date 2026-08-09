"use client";

import { useId } from 'react'
import React, { useState } from 'react'

import { Button } from '@/components/Button'
import { FadeIn } from '@/components/FadeIn'
import type { FormApiResponse } from '@/lib/messages'
import { formMessages } from '@/lib/messages'
import {
  contactSchema,
  getFieldErrors,
  isValid,
} from '@/lib/validation/schemas'

function TextInput({
  label,
  error,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & {
  label: string
  error?: string
}) {
  let id = useId()

  return (
    <div>
      <div className="group relative z-0 transition-all focus-within:z-10">
        <input
          type="text"
          id={id}
          {...props}
          placeholder=" "
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
        >
          {label}
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} className="px-6 pt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function TextArea({
  label,
  error,
  ...props
}: React.ComponentPropsWithoutRef<'textarea'> & {
  label: string
  error?: string
}) {
  let id = useId();

  return (
    <div>
      <div className="group relative z-0 transition-all focus-within:z-10">
        <textarea
          id={id}
          rows={4}
          {...props}
          placeholder=""
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl resize-none"
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-6 top-6 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-0 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
        >
          {label}
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} className="px-6 pt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
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

const initialFormData = {
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  budget: '',
}

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canSubmit = isValid(contactSchema, formData) && !isSubmitting

  function validateField(field: keyof typeof initialFormData) {
    const fieldErrors = getFieldErrors(contactSchema, formData)
    setErrors((current) => ({
      ...current,
      [field]: fieldErrors[field] ?? '',
    }))
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setSubmitError(null)

    if (errors[name]) {
      const nextData = { ...formData, [name]: value }
      const fieldErrors = getFieldErrors(contactSchema, nextData)
      setErrors((current) => ({
        ...current,
        [name]: fieldErrors[name] ?? '',
      }))
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    validateField(event.target.name as keyof typeof initialFormData)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null)

    const fieldErrors = getFieldErrors(contactSchema, formData)
    setErrors(fieldErrors)

    if (!isValid(contactSchema, formData)) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as FormApiResponse

      if (data.ok) {
        setIsSubmitted(true)
        return
      }

      setSubmitError(data.message)
    } catch {
      setSubmitError(formMessages.serverError)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FadeIn className="lg:order-last">
      {isSubmitted ? (
        <div className="flex items-center justify-center">
          ✅ {formMessages.contactSuccess}
        </div>
      ) : (
      <form onSubmit={handleSubmit} noValidate>
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
            onBlur={handleBlur}
            error={errors.name}
          />
          <TextInput
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
          />
          <TextInput
            label="Company"
            name="company"
            autoComplete="organization"
            value={formData.company}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.company}
          />
          <TextInput
            label="Phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phone}
          />
          <TextArea
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.message}
          />
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
                  onBlur={handleBlur}
                />
                <RadioInput
                  label="$50K – $100K"
                  name="budget"
                  value="50"
                  checked={formData.budget === '50'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <RadioInput
                  label="$100K – $150K"
                  name="budget"
                  value="100"
                  checked={formData.budget === '100'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <RadioInput
                  label="More than $150K"
                  name="budget"
                  value="150"
                  checked={formData.budget === '150'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </fieldset>
            {errors.budget ? (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {errors.budget}
              </p>
            ) : null}
          </div>
        </div>
        {submitError ? (
          <p className="mt-6 text-sm text-red-600" role="alert">
            {submitError}
          </p>
        ) : null}
        <Button
          type="submit"
          className="mt-10 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!canSubmit}
        >
          {isSubmitting ? 'Sending…' : 'Let’s work together'}
        </Button>
      </form>
    )}
    </FadeIn>
  );
}
