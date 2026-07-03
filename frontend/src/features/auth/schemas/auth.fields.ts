import { z } from 'zod'

/**
 * Shared, reusable validation primitives for the auth feature.
 *
 * The PASSWORD_POLICY is the single source of truth: both the signup
 * schema and the password-strength meter reference it, so validation and
 * the strength UI can never drift apart.
 */

export const PASSWORD_POLICY = {
  minLength: 8,
  /** Human-readable rule list, reused by the strength meter. */
  rules: [
    { id: 'length', label: 'At least 8 characters', test: (v: string) => v.length >= 8 },
    { id: 'uppercase', label: 'One uppercase letter', test: (v: string) => /[A-Z]/.test(v) },
    { id: 'lowercase', label: 'One lowercase letter', test: (v: string) => /[a-z]/.test(v) },
    { id: 'number', label: 'One number', test: (v: string) => /[0-9]/.test(v) },
  ],
} as const

/** Non-empty, well-formed email. Shared by login + signup. */
export const emailField = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .pipe(z.email('Enter a valid email address'))

/** Login only requires a non-empty password (no strength enforcement). */
export const requiredPasswordField = z.string().min(1, 'Password is required')

/** Signup password: enforces the full PASSWORD_POLICY. */
export const strongPasswordField = PASSWORD_POLICY.rules.reduce(
  (schema, rule) => schema.refine(rule.test, { message: rule.label }),
  z.string().min(1, 'Password is required'),
)
