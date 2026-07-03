import { ZapIcon } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { RoomPower } from '@/features/dashboard/utils/dashboardStats'

interface PowerConsumptionPanelProps {
  totalPower: number
  roomPower: RoomPower[]
}

export function PowerConsumptionPanel({
  totalPower,
  roomPower,
}: PowerConsumptionPanelProps) {
  const maxRoomPower = Math.max(1, ...roomPower.map((room) => room.power))

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Live Power Consumption</CardTitle>
        <CardDescription>Real-time draw across the office</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="flex items-end gap-2">
          <ZapIcon className="mb-1 size-6 text-amber-500" />
          <span className="font-heading text-4xl font-semibold tracking-tight tabular-nums">
            {totalPower}
          </span>
          <span className="mb-1 text-lg text-muted-foreground">W</span>
        </div>

        <div className="grid gap-3">
          {roomPower.map((room) => (
            <div key={room.room} className="grid gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{room.room}</span>
                <span className="font-medium tabular-nums">{room.power} W</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${(room.power / maxRoomPower) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
