import { useCallback, useState } from 'react'

type PasswordInputType = 'text' | 'password'

interface UsePasswordVisibilityResult {
  isVisible: boolean
  inputType: PasswordInputType
  toggle: () => void
}

/** Encapsulates show/hide state for a password input. */
export function usePasswordVisibility(
  initialVisible = false,
): UsePasswordVisibilityResult {
  const [isVisible, setIsVisible] = useState(initialVisible)

  const toggle = useCallback(() => setIsVisible((prev) => !prev), [])

  return {
    isVisible,
    inputType: isVisible ? 'text' : 'password',
    toggle,
  }
}
