import { Navigate, Route, Routes } from 'react-router-dom'

import { LoginPage, SignupPage } from '@/features/auth'

/**
 * Temporary landing target after authentication.
 * Replaced by the real dashboard route in a later module.
 */
function DashboardPlaceholder() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-2 px-4 text-center">
      <h1 className="font-heading text-2xl font-semibold">You&apos;re signed in</h1>
      <p className="text-sm text-muted-foreground">
        The monitoring dashboard will live here.
      </p>
    </main>
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPlaceholder />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
