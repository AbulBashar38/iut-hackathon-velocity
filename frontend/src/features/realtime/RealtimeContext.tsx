import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { getSocket } from '@/services/socket/socketClient'
import type { PowerSummary } from '@/services/socket/socketEvents'
import { ROOMS, type Alert, type Device } from '@/types/device.types'

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected'

export interface RealtimeState {
  status: ConnectionStatus
  devices: Device[]
  power: PowerSummary
  alerts: Alert[]
}

const MAX_ALERTS = 50

const DEFAULT_POWER: PowerSummary = {
  totalPower: 0,
  activeDevices: 0,
  activeFans: 0,
  activeLights: 0,
  roomPower: ROOMS.map((room) => ({ room, power: 0 })),
}

export const RealtimeContext = createContext<RealtimeState | null>(null)

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ConnectionStatus>('connecting')
  const [devices, setDevices] = useState<Device[]>([])
  const [power, setPower] = useState<PowerSummary>(DEFAULT_POWER)
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    const socket = getSocket()

    const handleConnect = () => setStatus('connected')
    const handleDisconnect = () => setStatus('disconnected')
    const handleAlert = (alert: Alert) =>
      setAlerts((prev) => [alert, ...prev].slice(0, MAX_ALERTS))

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('devicesUpdated', setDevices)
    socket.on('powerUpdated', setPower)
    socket.on('alertCreated', handleAlert)

    if (socket.connected) {
      setStatus('connected')
    } else {
      socket.connect()
    }

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('devicesUpdated', setDevices)
      socket.off('powerUpdated', setPower)
      socket.off('alertCreated', handleAlert)
      socket.disconnect()
    }
  }, [])

  const value = useMemo<RealtimeState>(
    () => ({ status, devices, power, alerts }),
    [status, devices, power, alerts],
  )

  return (
    <RealtimeContext.Provider value={value}>
      {children}
    </RealtimeContext.Provider>
  )
}
