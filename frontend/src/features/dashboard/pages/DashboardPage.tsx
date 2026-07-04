import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AlertsPanel } from '@/features/alerts/components/AlertsPanel'
import { BotCommandsCard } from '@/features/dashboard/components/BotCommandsCard'
import { OfficeLayout } from '@/features/office-layout/components/OfficeLayout'
import { RealtimeProvider } from '@/features/realtime/RealtimeContext'
import { useRealtime } from '@/features/realtime/useRealtime'
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader'
import { DeviceStatusPanel } from '@/features/dashboard/components/DeviceStatusPanel'
import { PowerConsumptionPanel } from '@/features/dashboard/components/PowerConsumptionPanel'
import { StatisticsCards } from '@/features/dashboard/components/StatisticsCards'
import { DeviceDistributionChart } from '@/features/dashboard/components/charts/DeviceDistributionChart'
import { PowerByRoomChart } from '@/features/dashboard/components/charts/PowerByRoomChart'
// "Today's Estimated Usage" is dummy data and not applicable to live monitoring — hidden for now.
// import { EstimatedUsageChart } from '@/features/dashboard/components/charts/EstimatedUsageChart'
// import { mockHourlyUsage } from '@/features/dashboard/data/usage.mock'
import {
  getTypeDistribution,
  type DashboardSummary,
} from '@/features/dashboard/utils/dashboardStats'

function DashboardView() {
  const { status, devices, power, alerts } = useRealtime()

  const summary: DashboardSummary = {
    totalDevices: devices.length,
    activeDevices: power.activeDevices,
    activeFans: power.activeFans,
    activeLights: power.activeLights,
    totalPower: power.totalPower,
  }

  const distribution = getTypeDistribution(devices)

  return (
    <div className="min-h-svh bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <DashboardHeader isOnline={status === 'connected'} />

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

          <div className="grid content-start gap-6">
            <AlertsPanel alerts={alerts} />
            <BotCommandsCard />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <PowerConsumptionPanel
            totalPower={power.totalPower}
            roomPower={power.roomPower}
          />
          <div className="lg:col-span-2">
            <DeviceStatusPanel devices={devices} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <PowerByRoomChart data={power.roomPower} />
          <DeviceDistributionChart data={distribution} />
          {/* "Today's Estimated Usage" chart hidden — dummy data, not applicable to live monitoring.
          <EstimatedUsageChart data={mockHourlyUsage} /> */}
        </div>
      </div>
    </div>
  )
}

export function DashboardPage() {
  return (
    <RealtimeProvider>
      <DashboardView />
    </RealtimeProvider>
  )
}
