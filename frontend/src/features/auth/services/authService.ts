import {
  loginRequest,
  logoutRequest,
  signupRequest,
} from '@/features/auth/api/auth.api'
import type {
  AuthResponse,
  LoginRequest,
  SignupRequest,
} from '@/features/auth/types/auth.types'

/**
 * Application-level auth service consumed by hooks.
 *
 * Owns client concerns the transport shouldn't know about: where the session
 * is persisted (localStorage when "remember me" is on, sessionStorage
 * otherwise) and clearing it on logout.
 */

const SESSION_KEY = 'auth.session'

export interface AuthSession {
  token: string
  expiresAt: string
  user: AuthResponse['user']
}

export interface LoginOptions {
  rememberMe?: boolean
}

const toSession = (response: AuthResponse): AuthSession => ({
  token: response.token,
  expiresAt: response.expiresAt,
  user: response.user,
})

function persistSession(session: AuthSession, rememberMe: boolean): void {
  const primary = rememberMe ? window.localStorage : window.sessionStorage
  const secondary = rememberMe ? window.sessionStorage : window.localStorage
  secondary.removeItem(SESSION_KEY)
  primary.setItem(SESSION_KEY, JSON.stringify(session))
}

function clearSession(): void {
  window.localStorage.removeItem(SESSION_KEY)
  window.sessionStorage.removeItem(SESSION_KEY)
}

function readSession(): AuthSession | null {
  const raw =
    window.localStorage.getItem(SESSION_KEY) ??
    window.sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null

  try {
    const session = JSON.parse(raw) as AuthSession
    if (new Date(session.expiresAt).getTime() <= Date.now()) {
      clearSession()
      return null
    }
    return session
  } catch {
    clearSession()
    return null
  }
}

export const authService = {
  async login(
    payload: LoginRequest,
    options: LoginOptions = {},
  ): Promise<AuthResponse> {
    const response = await loginRequest(payload)
    persistSession(toSession(response), options.rememberMe ?? false)
    return response
  },

  async signup(payload: SignupRequest): Promise<AuthResponse> {
    const response = await signupRequest(payload)
    persistSession(toSession(response), false)
    return response
  },

  async logout(): Promise<void> {
    await logoutRequest()
    clearSession()
  },

  getSession(): AuthSession | null {
    return readSession()
  },
}
