import type { Alert, Device, RoomName } from '@/types/device.types'

/** Mirrors the backend PowerSummary payload. */
export interface PowerSummary {
  totalPower: number
  activeDevices: number
  activeFans: number
  activeLights: number
  roomPower: { room: RoomName; power: number }[]
}

/** Server → client events emitted by the monitoring backend. */
export interface ServerToClientEvents {
  devicesUpdated: (devices: Device[]) => void
  powerUpdated: (summary: PowerSummary) => void
  alertCreated: (alert: Alert) => void
}

/** The dashboard is read-only — it never emits to the server. */
export type ClientToServerEvents = Record<string, never>
