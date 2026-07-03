/** Public surface of the auth feature. */
export { LoginPage } from './pages/LoginPage'
export { SignupPage } from './pages/SignupPage'
export { authService } from './services/authService'
export type { AuthSession } from './services/authService'
export type {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  User,
} from './types/auth.types'
