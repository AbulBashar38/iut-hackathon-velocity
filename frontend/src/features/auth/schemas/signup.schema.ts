import { z } from 'zod'

import { emailField, strongPasswordField } from './auth.fields'

/** Full shape of the signup form (includes UI-only confirm + terms). */
export const signupSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, 'Please enter your full name')
      .max(60, 'Name is too long'),
    email: emailField,
    password: strongPasswordField,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    acceptTerms: z.boolean().refine((value) => value === true, {
      message: 'You must accept the terms to continue',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignupFormValues = z.infer<typeof signupSchema>
