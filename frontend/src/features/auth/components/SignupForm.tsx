import { Link } from 'react-router-dom'
import { Loader2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AuthErrorAlert } from '@/features/auth/components/AuthErrorAlert'
import { PasswordField } from '@/features/auth/components/PasswordField'
import { PasswordStrengthMeter } from '@/features/auth/components/PasswordStrengthMeter'
import { useSignupForm } from '@/features/auth/hooks/useSignupForm'
import type { AuthResponse } from '@/features/auth/types/auth.types'

interface SignupFormProps {
  onSuccess?: (response: AuthResponse) => void
}

export function SignupForm({ onSuccess }: SignupFormProps) {
  const { form, submit, formError, isSubmitting } = useSignupForm({ onSuccess })
  const passwordValue = form.watch('password')

  return (
    <Form {...form}>
      <form onSubmit={submit} noValidate className="grid gap-5">
        <AuthErrorAlert message={formError} />

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input
                  autoComplete="name"
                  placeholder="Jane Cooper"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordField
                  autoComplete="new-password"
                  placeholder="Create a password"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <PasswordStrengthMeter password={passwordValue} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <PasswordField
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  I agree to the{' '}
                  <Link
                    to="/terms"
                    className="font-medium text-foreground underline underline-offset-4"
                  >
                    Terms of Service
                  </Link>
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2Icon className="animate-spin" />
              Creating account...
            </>
          ) : (
            'Create account'
          )}
        </Button>
      </form>
    </Form>
  )
}
