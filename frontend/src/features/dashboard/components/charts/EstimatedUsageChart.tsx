import {
  Area,
  AreaChart,
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
import type { HourlyUsage } from '@/features/dashboard/data/usage.mock'

interface EstimatedUsageChartProps {
  data: HourlyUsage[]
}

export function EstimatedUsageChart({ data }: EstimatedUsageChartProps) {
  const totalKwh = data.reduce((sum, point) => sum + point.kwh, 0)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Today&apos;s Estimated Usage</CardTitle>
        <CardDescription>
          ~{totalKwh.toFixed(1)} kWh estimated across office hours
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="usageFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="time" {...chartAxisProps} />
            <YAxis {...chartAxisProps} width={36} />
            <Tooltip
              contentStyle={chartTooltipStyle}
              formatter={(value) => [`${value} kWh`, 'Usage']}
            />
            <Area
              type="monotone"
              dataKey="kwh"
              stroke="var(--primary)"
              strokeWidth={2}
              fill="url(#usageFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
