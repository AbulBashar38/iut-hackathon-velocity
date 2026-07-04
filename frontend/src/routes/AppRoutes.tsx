import { Navigate, Route, Routes } from 'react-router-dom'

import { LoginPage, SignupPage } from '@/features/auth'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
