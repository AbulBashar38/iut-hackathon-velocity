import type {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  User,
} from '@/features/auth/types/auth.types'

/**
 * Mock auth transport.
 *
 * Simulates a network boundary: latency, an in-memory user store, and typed
 * failures. This is the ONLY file that changes when a real backend lands —
 * swap the bodies for `fetch`/axios calls returning the same shapes.
 */

export type AuthErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'EMAIL_TAKEN'
  | 'NETWORK'
  | 'UNKNOWN'

/** Machine-readable auth failure. */
export class AuthApiError extends Error {
  readonly code: AuthErrorCode

  constructor(code: AuthErrorCode, message: string) {
    super(message)
    this.name = 'AuthApiError'
    this.code = code
  }
}

const NETWORK_DELAY_MS = 900
const SESSION_TTL_MS = 1000 * 60 * 60 // 1 hour

interface StoredUser extends User {
  password: string
}

/** Seeded demo account so login works out of the box. */
const users: StoredUser[] = [
  {
    id: 'usr_demo',
    fullName: 'Demo User',
    email: 'demo@acme.io',
    password: 'Password1',
    createdAt: new Date().toISOString(),
  },
]

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

const toAuthResponse = (user: StoredUser): AuthResponse => {
  const { password: _password, ...safeUser } = user
  return {
    user: safeUser,
    token: `mock.${crypto.randomUUID()}`,
    expiresAt: new Date(Date.now() + SESSION_TTL_MS).toISOString(),
  }
}

export async function loginRequest(
  payload: LoginRequest,
): Promise<AuthResponse> {
  await delay(NETWORK_DELAY_MS)

  const user = users.find(
    (u) => u.email.toLowerCase() === payload.email.trim().toLowerCase(),
  )

  if (!user || user.password !== payload.password) {
    throw new AuthApiError('INVALID_CREDENTIALS', 'Invalid email or password')
  }

  return toAuthResponse(user)
}

export async function signupRequest(
  payload: SignupRequest,
): Promise<AuthResponse> {
  await delay(NETWORK_DELAY_MS)

  const email = payload.email.trim().toLowerCase()
  const exists = users.some((u) => u.email.toLowerCase() === email)

  if (exists) {
    throw new AuthApiError('EMAIL_TAKEN', 'An account with this email already exists')
  }

  const newUser: StoredUser = {
    id: `usr_${crypto.randomUUID()}`,
    fullName: payload.fullName.trim(),
    email,
    password: payload.password,
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)

  return toAuthResponse(newUser)
}

export async function logoutRequest(): Promise<void> {
  await delay(NETWORK_DELAY_MS / 3)
}

/** Maps any thrown value to a user-facing message for the UI. */
export function resolveAuthErrorMessage(error: unknown): string {
  if (error instanceof AuthApiError) return error.message
  return 'Something went wrong. Please try again.'
}
