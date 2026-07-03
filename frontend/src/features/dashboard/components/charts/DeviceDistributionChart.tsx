import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  chartTooltipStyle,
  DEVICE_TYPE_COLORS,
} from '@/features/dashboard/components/charts/chartTheme'
import type { TypeDistribution } from '@/features/dashboard/utils/dashboardStats'

interface DeviceDistributionChartProps {
  data: TypeDistribution[]
}

export function DeviceDistributionChart({ data }: DeviceDistributionChartProps) {
  const total = data.reduce((sum, item) => sum + item.total, 0)
  const chartData = data.map((item) => ({
    name: item.label,
    value: item.total,
    color: DEVICE_TYPE_COLORS[item.type],
  }))

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Device Distribution</CardTitle>
        <CardDescription>Fans vs lights across the office</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                strokeWidth={0}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={chartTooltipStyle} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-x-0 top-[88px] flex flex-col items-center">
            <span className="font-heading text-2xl font-semibold tabular-nums">
              {total}
            </span>
            <span className="text-xs text-muted-foreground">Devices</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
