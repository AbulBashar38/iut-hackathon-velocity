import layoutImage from '@/assets/layout-office.png'
import { devicePositions } from '@/config/devicePositions'
import { DeviceNode } from '@/features/devices/components/DeviceNode'
import type { Device } from '@/types/device.types'

interface OfficeLayoutProps {
  devices: Device[]
}

/**
 * Renders the static office floor plan as a background image and overlays
 * every device using absolute, percentage-based positioning from config.
 */
export function OfficeLayout({ devices }: OfficeLayoutProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border bg-muted/30">
      <img
        src={layoutImage}
        alt="Office floor plan"
        className="block w-full select-none"
        draggable={false}
      />

      <div className="absolute inset-0">
        {devices.map((device) => {
          const position = devicePositions[device.id]
          if (!position) return null
          return (
            <DeviceNode key={device.id} device={device} position={position} />
          )
        })}
      </div>
    </div>
  )
}
