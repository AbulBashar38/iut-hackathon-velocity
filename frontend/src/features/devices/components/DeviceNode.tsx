import { cn } from '@/lib/utils'
import type { DevicePosition } from '@/config/devicePositions'
import type { Device } from '@/types/device.types'
import { FanDevice } from '@/features/devices/components/FanDevice'
import { LightDevice } from '@/features/devices/components/LightDevice'

interface DeviceNodeProps {
  device: Device
  position: DevicePosition
}

/**
 * Positions a single device on the office layout via percentage coordinates
 * and renders the matching visual. Focusable, with a hover/focus tooltip.
 */
export function DeviceNode({ device, position }: DeviceNodeProps) {
  const label = `${device.name}, ${device.room}, ${device.status === 'on' ? 'On' : 'Off'}, ${device.powerConsumption} watts`

  return (
    <div
      className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      tabIndex={0}
      role="img"
      aria-label={label}
    >
      <div className="size-8 rounded-full ring-offset-background transition-transform group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 sm:size-9 md:size-10">
        {device.type === 'fan' ? (
          <FanDevice status={device.status} />
        ) : (
          <LightDevice status={device.status} />
        )}
      </div>

      <div
        className={cn(
          'pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md',
          'opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100',
        )}
      >
        <span className="font-medium">{device.name}</span>
        <span className="text-muted-foreground">
          {' · '}
          {device.status === 'on' ? `${device.powerConsumption} W` : 'Off'}
        </span>
      </div>
    </div>
  )
}
