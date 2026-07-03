import type { ReactNode } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface AuthCardProps {
  title: string
  description: string
  children: ReactNode
  /** Optional footer content (e.g. link to the other auth page). */
  footer?: ReactNode
}

/** Shared shell for auth pages: consistent header, body, and footer. */
export function AuthCard({
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <Card className="w-full max-w-md gap-6 p-2 shadow-xl shadow-foreground/5">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>{children}</CardContent>

      {footer ? (
        <CardFooter className="justify-center text-sm text-muted-foreground">
          {footer}
        </CardFooter>
      ) : null}
    </Card>
  )
}
