/**
 * Auth transport contracts.
 *
 * These describe the payloads exchanged with the auth service/backend.
 * UI-only concerns (rememberMe, confirmPassword, acceptTerms) live in the
 * Zod form schemas, NOT here — the service must never receive them.
 */

/** An authenticated user as returned by the backend. */
export interface User {
  id: string
  fullName: string
  email: string
  /** ISO-8601 timestamp. */
  createdAt: string
}

/** Payload sent to `authService.login()`. */
export interface LoginRequest {
  email: string
  password: string
}

/** Payload sent to `authService.signup()`. */
export interface SignupRequest {
  fullName: string
  email: string
  password: string
}

/** Successful auth result returned by login/signup. */
export interface AuthResponse {
  user: User
  /** Bearer token (mocked for now). */
  token: string
  /** ISO-8601 expiry timestamp. */
  expiresAt: string
}
