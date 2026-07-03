import { CheckIcon, MinusIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  usePasswordStrength,
  type PasswordStrengthLevel,
} from '@/features/auth/hooks/usePasswordStrength'

interface PasswordStrengthMeterProps {
  password: string
}

const LEVEL_STYLES: Record<
  PasswordStrengthLevel,
  { bar: string; text: string }
> = {
  empty: { bar: 'bg-muted', text: 'text-muted-foreground' },
  weak: { bar: 'bg-destructive', text: 'text-destructive' },
  fair: { bar: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-500' },
  good: { bar: 'bg-sky-500', text: 'text-sky-600 dark:text-sky-500' },
  strong: {
    bar: 'bg-emerald-500',
    text: 'text-emerald-600 dark:text-emerald-500',
  },
}

/** Visual strength meter driven by the shared PASSWORD_POLICY. */
export function PasswordStrengthMeter({
  password,
}: PasswordStrengthMeterProps) {
  const { percent, level, label, rules } = usePasswordStrength(password)
  const styles = LEVEL_STYLES[level]

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className={cn('h-full rounded-full transition-all', styles.bar)}
            style={{ width: `${percent}%` }}
          />
        </div>
        {label ? (
          <span className={cn('text-xs font-medium', styles.text)}>
            {label}
          </span>
        ) : null}
      </div>

      <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
        {rules.map((rule) => (
          <li
            key={rule.id}
            className={cn(
              'flex items-center gap-1.5 text-xs',
              rule.satisfied ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            {rule.satisfied ? (
              <CheckIcon className="size-3 text-emerald-500" />
            ) : (
              <MinusIcon className="size-3" />
            )}
            {rule.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
