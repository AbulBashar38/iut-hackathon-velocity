import type { LucideIcon } from 'lucide-react'
import {
  ActivityIcon,
  FanIcon,
  LayoutGridIcon,
  LightbulbIcon,
  ZapIcon,
} from 'lucide-react'

import { Card } from '@/components/ui/card'
import type { DashboardSummary } from '@/features/dashboard/utils/dashboardStats'

interface StatisticsCardsProps {
  summary: DashboardSummary
}

interface StatItem {
  label: string
  value: string
  icon: LucideIcon
}

function StatCard({ label, value, icon: Icon }: StatItem) {
  return (
    <Card className="gap-0 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <p className="mt-2 font-heading text-2xl font-semibold tracking-tight tabular-nums">
        {value}
      </p>
    </Card>
  )
}

export function StatisticsCards({ summary }: StatisticsCardsProps) {
  const items: StatItem[] = [
    { label: 'Total Devices', value: String(summary.totalDevices), icon: LayoutGridIcon },
    { label: 'Active Devices', value: String(summary.activeDevices), icon: ActivityIcon },
    { label: 'Active Fans', value: String(summary.activeFans), icon: FanIcon },
    { label: 'Active Lights', value: String(summary.activeLights), icon: LightbulbIcon },
    { label: 'Total Power', value: `${summary.totalPower} W`, icon: ZapIcon },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
      {items.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  )
}
