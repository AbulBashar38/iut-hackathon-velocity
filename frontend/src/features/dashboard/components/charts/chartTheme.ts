import type { CSSProperties } from 'react'

import type { DeviceType } from '@/types/device.types'

/** Shared chart styling so all Recharts visuals stay visually consistent. */

export const chartTooltipStyle: CSSProperties = {
  background: 'var(--popover)',
  border: '1px solid var(--border)',
  borderRadius: '0.5rem',
  fontSize: '12px',
  color: 'var(--popover-foreground)',
  boxShadow: 'var(--shadow, 0 4px 12px rgba(0,0,0,0.08))',
}

export const chartAxisProps = {
  tickLine: false,
  axisLine: false,
  stroke: 'var(--muted-foreground)',
  fontSize: 12,
} as const

/** Device-type colors, matching the on-canvas device visuals. */
export const DEVICE_TYPE_COLORS: Record<DeviceType, string> = {
  fan: '#10b981', // emerald-500
  light: '#f59e0b', // amber-500
}
