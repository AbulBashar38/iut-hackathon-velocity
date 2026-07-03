import { LightbulbIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { DeviceStatus } from '@/types/device.types'

interface LightDeviceProps {
  status: DeviceStatus
}

/**
 * Light visual: bright yellow with a soft glow when ON, gray with no glow
 * when OFF. Glow is a CSS box-shadow.
 */
export function LightDevice({ status }: LightDeviceProps) {
  const isOn = status === 'on'

  return (
    <div
      className={cn(
        'flex size-full items-center justify-center rounded-full border transition-all',
        isOn
          ? 'border-amber-400/60 bg-amber-300/20 shadow-[0_0_18px_4px_rgba(251,191,36,0.55)]'
          : 'border-border bg-muted/70 opacity-60',
      )}
    >
      <LightbulbIcon
        className={cn(
          'size-3/5 transition-colors',
          isOn ? 'fill-amber-300 text-amber-500' : 'text-muted-foreground',
        )}
      />
    </div>
  )
}
