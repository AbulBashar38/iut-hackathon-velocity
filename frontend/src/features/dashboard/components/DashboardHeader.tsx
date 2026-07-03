import { WifiIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { useCurrentTime } from '@/features/dashboard/hooks/useCurrentTime'

interface DashboardHeaderProps {
  isOnline?: boolean
}

export function DashboardHeader({ isOnline = true }: DashboardHeaderProps) {
  const now = useCurrentTime()
  const time = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const date = now.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex size-9 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground"
        >
          V
        </span>
        <div>
          <h1 className="font-heading text-lg font-semibold tracking-tight">
            Velocity
          </h1>
          <p className="text-xs text-muted-foreground">
            Office Monitoring System
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-mono text-sm font-medium tabular-nums">{time}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
        <Badge
          className={
            isOnline
              ? 'gap-1.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
              : 'gap-1.5'
          }
          variant={isOnline ? 'default' : 'destructive'}
        >
          <span className="relative flex size-1.5">
            {isOnline ? (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            ) : null}
            <span
              className={
                isOnline
                  ? 'relative inline-flex size-1.5 rounded-full bg-emerald-500'
                  : 'relative inline-flex size-1.5 rounded-full bg-destructive'
              }
            />
          </span>
          <WifiIcon />
          {isOnline ? 'Online' : 'Offline'}
        </Badge>
      </div>
    </header>
  )
}
