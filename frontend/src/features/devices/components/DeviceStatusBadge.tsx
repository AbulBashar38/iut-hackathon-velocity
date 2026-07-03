import { Badge } from '@/components/ui/badge'
import type { DeviceStatus } from '@/types/device.types'

interface DeviceStatusBadgeProps {
  status: DeviceStatus
}

/** Reusable ON/OFF badge with consistent colors across the dashboard. */
export function DeviceStatusBadge({ status }: DeviceStatusBadgeProps) {
  if (status === 'on') {
    return (
      <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
        ON
      </Badge>
    )
  }

  return <Badge variant="secondary">OFF</Badge>
}
