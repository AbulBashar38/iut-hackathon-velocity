import type { Device } from '@/types/device.types'

/**
 * Dummy device dataset — 3 rooms x (2 fans + 3 lights) = 15 devices.
 *
 * `powerConsumption` is the current draw (0 when off). Fans ~55-65W,
 * lights ~14-18W when on. Swap this file for the live Socket.io feed later.
 */
export const mockDevices: Device[] = [
  // Drawing Room
  { id: 'drawing-fan-1', name: 'Fan 1', type: 'fan', room: 'Drawing Room', status: 'on', powerConsumption: 62, lastChanged: '10:30 AM' },
  { id: 'drawing-fan-2', name: 'Fan 2', type: 'fan', room: 'Drawing Room', status: 'off', powerConsumption: 0, lastChanged: '09:15 AM' },
  { id: 'drawing-light-1', name: 'Light 1', type: 'light', room: 'Drawing Room', status: 'on', powerConsumption: 15, lastChanged: '08:45 AM' },
  { id: 'drawing-light-2', name: 'Light 2', type: 'light', room: 'Drawing Room', status: 'on', powerConsumption: 14, lastChanged: '08:45 AM' },
  { id: 'drawing-light-3', name: 'Light 3', type: 'light', room: 'Drawing Room', status: 'off', powerConsumption: 0, lastChanged: '07:50 AM' },

  // Work Room 1
  { id: 'wr1-fan-1', name: 'Fan 1', type: 'fan', room: 'Work Room 1', status: 'on', powerConsumption: 58, lastChanged: '09:05 AM' },
  { id: 'wr1-fan-2', name: 'Fan 2', type: 'fan', room: 'Work Room 1', status: 'on', powerConsumption: 60, lastChanged: '09:05 AM' },
  { id: 'wr1-light-1', name: 'Light 1', type: 'light', room: 'Work Room 1', status: 'on', powerConsumption: 16, lastChanged: '08:30 AM' },
  { id: 'wr1-light-2', name: 'Light 2', type: 'light', room: 'Work Room 1', status: 'off', powerConsumption: 0, lastChanged: '12:10 PM' },
  { id: 'wr1-light-3', name: 'Light 3', type: 'light', room: 'Work Room 1', status: 'on', powerConsumption: 15, lastChanged: '08:30 AM' },

  // Work Room 2
  { id: 'wr2-fan-1', name: 'Fan 1', type: 'fan', room: 'Work Room 2', status: 'off', powerConsumption: 0, lastChanged: '11:20 AM' },
  { id: 'wr2-fan-2', name: 'Fan 2', type: 'fan', room: 'Work Room 2', status: 'on', powerConsumption: 61, lastChanged: '10:00 AM' },
  { id: 'wr2-light-1', name: 'Light 1', type: 'light', room: 'Work Room 2', status: 'on', powerConsumption: 18, lastChanged: '08:15 AM' },
  { id: 'wr2-light-2', name: 'Light 2', type: 'light', room: 'Work Room 2', status: 'on', powerConsumption: 17, lastChanged: '08:15 AM' },
  { id: 'wr2-light-3', name: 'Light 3', type: 'light', room: 'Work Room 2', status: 'on', powerConsumption: 15, lastChanged: '08:15 AM' },
]
