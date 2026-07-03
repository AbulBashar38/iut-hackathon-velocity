import type { LucideIcon } from 'lucide-react'
import { CircleAlertIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Alert, AlertSeverity } from '@/types/device.types'

interface AlertsPanelProps {
  alerts: Alert[]
}

const SEVERITY_META: Record<
  AlertSeverity,
  { icon: LucideIcon; iconClass: string }
> = {
  critical: { icon: CircleAlertIcon, iconClass: 'text-destructive' },
  warning: { icon: TriangleAlertIcon, iconClass: 'text-amber-500' },
  info: { icon: InfoIcon, iconClass: 'text-sky-500' },
}

function AlertRow({ alert }: { alert: Alert }) {
  const { icon: Icon, iconClass } = SEVERITY_META[alert.severity]

  return (
    <li className="flex gap-3 rounded-lg border bg-card p-3">
      <Icon className={cn('mt-0.5 size-4 shrink-0', iconClass)} />
      <div className="min-w-0 flex-1">
        <p className="text-sm">{alert.message}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {alert.room ? `${alert.room} · ` : ''}
          {alert.timestamp}
        </p>
      </div>
    </li>
  )
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Alerts</CardTitle>
        <CardDescription>
          {alerts.length > 0
            ? `${alerts.length} active notifications`
            : 'No active alerts'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {alerts.length > 0 ? (
          <ul className="grid gap-2">
            {alerts.map((alert) => (
              <AlertRow key={alert.id} alert={alert} />
            ))}
          </ul>
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Everything looks healthy.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
