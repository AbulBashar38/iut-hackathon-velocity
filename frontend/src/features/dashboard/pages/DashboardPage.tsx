import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { mockAlerts } from '@/features/alerts/data/alerts.mock'
import { AlertsPanel } from '@/features/alerts/components/AlertsPanel'
import { mockDevices } from '@/features/devices/data/devices.mock'
import { OfficeLayout } from '@/features/office-layout/components/OfficeLayout'
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader'
import { DeviceStatusPanel } from '@/features/dashboard/components/DeviceStatusPanel'
import { PowerConsumptionPanel } from '@/features/dashboard/components/PowerConsumptionPanel'
import { StatisticsCards } from '@/features/dashboard/components/StatisticsCards'
import { DeviceDistributionChart } from '@/features/dashboard/components/charts/DeviceDistributionChart'
import { EstimatedUsageChart } from '@/features/dashboard/components/charts/EstimatedUsageChart'
import { PowerByRoomChart } from '@/features/dashboard/components/charts/PowerByRoomChart'
import { mockHourlyUsage } from '@/features/dashboard/data/usage.mock'
import {
  getPowerByRoom,
  getTypeDistribution,
  summarize,
} from '@/features/dashboard/utils/dashboardStats'

export function DashboardPage() {
  const devices = mockDevices
  const summary = summarize(devices)
  const roomPower = getPowerByRoom(devices)
  const distribution = getTypeDistribution(devices)

  return (
    <div className="min-h-svh bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <DashboardHeader />

        <StatisticsCards summary={summary} />

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Office Layout</CardTitle>
              <CardDescription>Live device states across the floor</CardDescription>
            </CardHeader>
            <CardContent>
              <OfficeLayout devices={devices} />
            </CardContent>
          </Card>

          <AlertsPanel alerts={mockAlerts} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <PowerConsumptionPanel
            totalPower={summary.totalPower}
            roomPower={roomPower}
          />
          <div className="lg:col-span-2">
            <DeviceStatusPanel devices={devices} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <PowerByRoomChart data={roomPower} />
          <DeviceDistributionChart data={distribution} />
          <EstimatedUsageChart data={mockHourlyUsage} />
        </div>
      </div>
    </div>
  )
}
