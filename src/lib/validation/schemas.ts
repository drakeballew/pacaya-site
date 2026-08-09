import { z } from 'zod'

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Enter a valid email address.')
    .email('Enter a valid email address.'),
})

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.'),
  email: z
    .string()
    .trim()
    .min(1, 'Enter a valid email address.')
    .email('Enter a valid email address.'),
  company: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(1, 'Tell us a bit about your project.'),
  budget: z.enum(['25', '50', '100', '150'], {
    message: 'Select a budget range.',
  }),
})

export type NewsletterInput = z.infer<typeof newsletterSchema>
export type ContactInput = z.infer<typeof contactSchema>

export function getFieldErrors<T extends z.ZodType>(
  schema: T,
  data: unknown,
): Record<string, string> {
  const result = schema.safeParse(data)

  if (result.success) {
    return {}
  }

  const errors: Record<string, string> = {}

  for (const issue of result.error.issues) {
    const field = issue.path[0]

    if (typeof field === 'string' && !errors[field]) {
      errors[field] = issue.message
    }
  }

  return errors
}

export function isValid<T extends z.ZodType>(schema: T, data: unknown): boolean {
  return schema.safeParse(data).success
}
