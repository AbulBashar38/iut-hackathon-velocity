import * as React from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { usePasswordVisibility } from '@/features/auth/hooks/usePasswordVisibility'

type PasswordFieldProps = Omit<React.ComponentProps<'input'>, 'type'>

/**
 * Password input with a show/hide toggle. Forwards all props (and ref) to the
 * underlying Input so it composes cleanly inside Shadcn's <FormControl>.
 */
export const PasswordField = React.forwardRef<
  HTMLInputElement,
  PasswordFieldProps
>(({ className, disabled, ...props }, ref) => {
  const { isVisible, inputType, toggle } = usePasswordVisibility()

  return (
    <div className="relative">
      <Input
        ref={ref}
        type={inputType}
        disabled={disabled}
        className={cn('pr-9', className)}
        {...props}
      />
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-label={isVisible ? 'Hide password' : 'Show password'}
        aria-pressed={isVisible}
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-9 items-center justify-center rounded-r-lg text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
      >
        {isVisible ? (
          <EyeOffIcon className="size-4" />
        ) : (
          <EyeIcon className="size-4" />
        )}
      </button>
    </div>
  )
})

PasswordField.displayName = 'PasswordField'
