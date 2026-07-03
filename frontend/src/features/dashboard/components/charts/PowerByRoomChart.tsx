import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  chartAxisProps,
  chartTooltipStyle,
} from '@/features/dashboard/components/charts/chartTheme'
import type { RoomPower } from '@/features/dashboard/utils/dashboardStats'

interface PowerByRoomChartProps {
  data: RoomPower[]
}

export function PowerByRoomChart({ data }: PowerByRoomChartProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Power by Room</CardTitle>
        <CardDescription>Current draw per room (W)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="room" {...chartAxisProps} interval={0} />
            <YAxis {...chartAxisProps} width={36} />
            <Tooltip
              cursor={{ fill: 'var(--muted)', opacity: 0.4 }}
              contentStyle={chartTooltipStyle}
              formatter={(value) => [`${value} W`, 'Power']}
            />
            <Bar dataKey="power" fill="var(--primary)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
