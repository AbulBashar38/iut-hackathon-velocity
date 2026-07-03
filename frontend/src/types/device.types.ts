/** Shared domain types for the office monitoring dashboard. */

export const ROOMS = ['Drawing Room', 'Work Room 1', 'Work Room 2'] as const
export type RoomName = (typeof ROOMS)[number]

export type DeviceType = 'fan' | 'light'
export type DeviceStatus = 'on' | 'off'

export interface Device {
  id: string
  name: string
  type: DeviceType
  room: RoomName
  status: DeviceStatus
  /** Current draw in watts. 0 when the device is off. */
  powerConsumption: number
  /** Human-readable time of the last state change, e.g. "10:30 AM". */
  lastChanged: string
}

export type AlertSeverity = 'critical' | 'warning' | 'info'

export interface Alert {
  id: string
  message: string
  severity: AlertSeverity
  /** Human-readable timestamp, e.g. "6:45 PM". */
  timestamp: string
  room?: RoomName
}
