import { Link, useNavigate } from 'react-router-dom'

import { AuthCard } from '@/features/auth/components/AuthCard'
import { AuthLayout } from '@/features/auth/components/AuthLayout'
import { LoginForm } from '@/features/auth/components/LoginForm'

export function LoginPage() {
  const navigate = useNavigate()

  return (
    <AuthLayout>
      <AuthCard
        title="Welcome back"
        description="Sign in to your Velocity dashboard"
        footer={
          <span>
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-foreground hover:underline"
            >
              Sign up
            </Link>
          </span>
        }
      >
        <LoginForm onSuccess={() => navigate('/', { replace: true })} />
      </AuthCard>
    </AuthLayout>
  )
}
