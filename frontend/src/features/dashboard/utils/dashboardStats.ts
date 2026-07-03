import { ROOMS, type Device, type DeviceType, type RoomName } from '@/types/device.types'

/**
 * Pure selectors over the device list. Components render these numbers but
 * never compute them, keeping a single source of truth for all derivations.
 */

export interface DashboardSummary {
  totalDevices: number
  activeDevices: number
  activeFans: number
  activeLights: number
  totalPower: number
}

export interface RoomPower {
  room: RoomName
  power: number
}

export interface TypeDistribution {
  type: DeviceType
  label: string
  total: number
  active: number
}

const isOn = (device: Device): boolean => device.status === 'on'

export function getTotalPower(devices: Device[]): number {
  return devices.reduce((sum, device) => sum + device.powerConsumption, 0)
}

export function getActiveCountByType(
  devices: Device[],
  type: DeviceType,
): number {
  return devices.filter((device) => device.type === type && isOn(device)).length
}

export function summarize(devices: Device[]): DashboardSummary {
  return {
    totalDevices: devices.length,
    activeDevices: devices.filter(isOn).length,
    activeFans: getActiveCountByType(devices, 'fan'),
    activeLights: getActiveCountByType(devices, 'light'),
    totalPower: getTotalPower(devices),
  }
}

export function getPowerByRoom(devices: Device[]): RoomPower[] {
  return ROOMS.map((room) => ({
    room,
    power: devices
      .filter((device) => device.room === room)
      .reduce((sum, device) => sum + device.powerConsumption, 0),
  }))
}

export function getTypeDistribution(devices: Device[]): TypeDistribution[] {
  const types: { type: DeviceType; label: string }[] = [
    { type: 'fan', label: 'Fans' },
    { type: 'light', label: 'Lights' },
  ]

  return types.map(({ type, label }) => {
    const ofType = devices.filter((device) => device.type === type)
    return {
      type,
      label,
      total: ofType.length,
      active: ofType.filter(isOn).length,
    }
  })
}
