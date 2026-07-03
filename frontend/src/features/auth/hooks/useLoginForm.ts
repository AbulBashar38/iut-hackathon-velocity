import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { resolveAuthErrorMessage } from '@/features/auth/api/auth.api'
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas/login.schema'
import { authService } from '@/features/auth/services/authService'
import type { AuthResponse } from '@/features/auth/types/auth.types'

interface UseLoginFormOptions {
  onSuccess?: (response: AuthResponse) => void
}

const DEFAULT_VALUES: LoginFormValues = {
  email: '',
  password: '',
  rememberMe: false,
}

/** Bridges the login form (RHF + Zod) with the auth service. */
export function useLoginForm({ onSuccess }: UseLoginFormOptions = {}) {
  const [formError, setFormError] = useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  })

  const submit = form.handleSubmit(async (values) => {
    setFormError(null)
    try {
      const response = await authService.login(
        { email: values.email, password: values.password },
        { rememberMe: values.rememberMe },
      )
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
