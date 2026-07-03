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
import { useLoginForm } from '@/features/auth/hooks/useLoginForm'
import type { AuthResponse } from '@/features/auth/types/auth.types'

interface LoginFormProps {
  onSuccess?: (response: AuthResponse) => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { form, submit, formError, isSubmitting } = useLoginForm({ onSuccess })

  return (
    <Form {...form}>
      <form onSubmit={submit} noValidate className="grid gap-5">
        <AuthErrorAlert message={formError} />

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
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  Forgot password?
                </Link>
              </div>
              <FormControl>
                <PasswordField
                  autoComplete="current-password"
                  placeholder="Enter your password"
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
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex-row items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormLabel className="font-normal">Remember me</FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2Icon className="animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </Form>
  )
}
