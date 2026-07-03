import { z } from 'zod'

import { emailField, requiredPasswordField } from './auth.fields'

/** Full shape of the login form (includes UI-only `rememberMe`). */
export const loginSchema = z.object({
  email: emailField,
  password: requiredPasswordField,
  rememberMe: z.boolean(),
})

export type LoginFormValues = z.infer<typeof loginSchema>
