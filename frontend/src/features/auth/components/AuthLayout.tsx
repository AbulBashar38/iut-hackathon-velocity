import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

/** Full-screen, responsive, branded shell shared by the auth pages. */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-8 bg-muted/40 px-4 py-10">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground"
        >
          V
        </span>
        <span className="font-heading text-lg font-semibold tracking-tight">
          Velocity
        </span>
      </div>

      {children}

      <p className="text-xs text-muted-foreground">
        Office Monitoring System
      </p>
    </main>
  )
}
