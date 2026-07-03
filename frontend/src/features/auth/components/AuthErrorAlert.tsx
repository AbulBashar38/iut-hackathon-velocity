import { CircleAlertIcon } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface AuthErrorAlertProps {
  message: string | null
}

/** Top-level form error surface. Renders nothing when there's no error. */
export function AuthErrorAlert({ message }: AuthErrorAlertProps) {
  if (!message) return null

  return (
    <Alert variant="destructive" aria-live="assertive">
      <CircleAlertIcon />
      <AlertTitle>Authentication failed</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
