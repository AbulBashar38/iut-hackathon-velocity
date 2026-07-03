import { useMemo } from 'react'

import { PASSWORD_POLICY } from '@/features/auth/schemas/auth.fields'

export type PasswordStrengthLevel =
  | 'empty'
  | 'weak'
  | 'fair'
  | 'good'
  | 'strong'

export interface PasswordRuleState {
  id: string
  label: string
  satisfied: boolean
}

export interface PasswordStrength {
  /** Number of satisfied policy rules (0..rules.length). */
  score: number
  /** Fill percentage for a progress bar (0..100). */
  percent: number
  level: PasswordStrengthLevel
  label: string
  rules: PasswordRuleState[]
}

const LEVELS: Record<number, { level: PasswordStrengthLevel; label: string }> = {
  0: { level: 'weak', label: 'Weak' },
  1: { level: 'weak', label: 'Weak' },
  2: { level: 'fair', label: 'Fair' },
  3: { level: 'good', label: 'Good' },
  4: { level: 'strong', label: 'Strong' },
}

/**
 * Derives password strength from the shared PASSWORD_POLICY, so the meter
 * and the signup validation always agree.
 */
export function usePasswordStrength(password: string): PasswordStrength {
  return useMemo(() => {
    const rules: PasswordRuleState[] = PASSWORD_POLICY.rules.map((rule) => ({
      id: rule.id,
      label: rule.label,
      satisfied: rule.test(password),
    }))

    const total = rules.length
    const score = rules.filter((rule) => rule.satisfied).length

    if (password.length === 0) {
      return { score: 0, percent: 0, level: 'empty', label: '', rules }
    }

    const { level, label } = LEVELS[score] ?? LEVELS[0]
    return {
      score,
      percent: Math.round((score / total) * 100),
      level,
      label,
      rules,
    }
  }, [password])
}
