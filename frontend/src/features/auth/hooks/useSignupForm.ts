import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { resolveAuthErrorMessage } from '@/features/auth/api/auth.api'
import { signupSchema, type SignupFormValues } from '@/features/auth/schemas/signup.schema'
import { authService } from '@/features/auth/services/authService'
import type { AuthResponse } from '@/features/auth/types/auth.types'

interface UseSignupFormOptions {
  onSuccess?: (response: AuthResponse) => void
}

const DEFAULT_VALUES: SignupFormValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
}

/** Bridges the signup form (RHF + Zod) with the auth service. */
export function useSignupForm({ onSuccess }: UseSignupFormOptions = {}) {
  const [formError, setFormError] = useState<string | null>(null)

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  })

  const submit = form.handleSubmit(async (values) => {
    setFormError(null)
    try {
      const response = await authService.signup({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      })
      onSuccess?.(response)
    } catch (error) {
      setFormError(resolveAuthErrorMessage(error))
    }
  })

  return {
    form,
    submit,
    formError,
    isSubmitting: form.formState.isSubmitting,
  }
}
