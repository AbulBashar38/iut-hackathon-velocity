import { FanIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { DeviceStatus } from '@/types/device.types'

interface FanDeviceProps {
  status: DeviceStatus
}

/**
 * Fan visual: rotates continuously with a green indicator when ON,
 * stops and dims when OFF. Rotation uses CSS only (motion-safe).
 */
export function FanDevice({ status }: FanDeviceProps) {
  const isOn = status === 'on'

  return (
    <div
      className={cn(
        'relative flex size-full items-center justify-center rounded-full border backdrop-blur-sm transition-all',
        isOn
          ? 'border-emerald-500/40 bg-emerald-500/10 opacity-100'
          : 'border-border bg-muted/70 opacity-50',
      )}
    >
      <FanIcon
        className={cn(
          'size-3/5',
          isOn
            ? 'text-emerald-600 motion-safe:animate-spin animation-duration-[2.5s] dark:text-emerald-400'
            : 'text-muted-foreground',
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          'absolute -top-0.5 -right-0.5 size-2 rounded-full ring-2 ring-background',
          isOn ? 'bg-emerald-500' : 'bg-muted-foreground/40',
        )}
      />
    </div>
  )
}
