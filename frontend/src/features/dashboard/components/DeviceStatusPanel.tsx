import { FanIcon, LightbulbIcon } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DeviceStatusBadge } from '@/features/devices/components/DeviceStatusBadge'
import type { Device } from '@/types/device.types'

interface DeviceStatusPanelProps {
  devices: Device[]
}

function DeviceRow({ device }: { device: Device }) {
  const Icon = device.type === 'fan' ? FanIcon : LightbulbIcon

  return (
    <li className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/60">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{device.name}</p>
        <p className="truncate text-xs text-muted-foreground">{device.room}</p>
      </div>

      <div className="hidden text-right sm:block">
        <p className="text-sm tabular-nums">{device.powerConsumption} W</p>
        <p className="text-xs text-muted-foreground">{device.lastChanged}</p>
      </div>

      <DeviceStatusBadge status={device.status} />
    </li>
  )
}

export function DeviceStatusPanel({ devices }: DeviceStatusPanelProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Devices</CardTitle>
        <CardDescription>{devices.length} devices monitored</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ScrollArea className="h-80 pr-3">
          <ul className="grid gap-0.5">
            {devices.map((device) => (
              <DeviceRow key={device.id} device={device} />
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
