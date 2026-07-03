import { Link, useNavigate } from 'react-router-dom'

import { AuthCard } from '@/features/auth/components/AuthCard'
import { AuthLayout } from '@/features/auth/components/AuthLayout'
import { SignupForm } from '@/features/auth/components/SignupForm'

export function SignupPage() {
  const navigate = useNavigate()

  return (
    <AuthLayout>
      <AuthCard
        title="Create your account"
        description="Start monitoring your office in minutes"
        footer={
          <span>
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-foreground hover:underline"
            >
              Sign in
            </Link>
          </span>
        }
      >
        <SignupForm onSuccess={() => navigate('/', { replace: true })} />
      </AuthCard>
    </AuthLayout>
  )
}
