import type { Alert } from '@/types/device.types'

/** Dummy alerts for the monitoring dashboard. */
export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    message: 'Work Room 2 lights are still ON after office hours.',
    severity: 'critical',
    timestamp: '6:45 PM',
    room: 'Work Room 2',
  },
  {
    id: 'alert-2',
    message: 'Drawing Room fans have been running for more than 2 hours.',
    severity: 'warning',
    timestamp: '12:30 PM',
    room: 'Drawing Room',
  },
  {
    id: 'alert-3',
    message: 'Work Room 1 power draw is above the daily average.',
    severity: 'warning',
    timestamp: '11:05 AM',
    room: 'Work Room 1',
  },
  {
    id: 'alert-4',
    message: 'All Drawing Room devices reported healthy.',
    severity: 'info',
    timestamp: '9:00 AM',
    room: 'Drawing Room',
  },
]
