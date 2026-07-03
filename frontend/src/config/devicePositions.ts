/**
 * Device overlay coordinates for the office layout image.
 *
 * Values are PERCENTAGES of the layout container (0-100), so the overlay
 * scales responsively and positions never live inside components. Tweak these
 * to line devices up precisely with `assets/layout-office.png`.
 */
export interface DevicePosition {
  /** Horizontal position, % from the left. */
  x: number
  /** Vertical position, % from the top. */
  y: number
}

export const devicePositions: Record<string, DevicePosition> = {
  // Drawing Room (left third)
  'drawing-fan-1': { x: 14, y: 26 },
  'drawing-fan-2': { x: 30, y: 26 },
  'drawing-light-1': { x: 10, y: 60 },
  'drawing-light-2': { x: 22, y: 60 },
  'drawing-light-3': { x: 34, y: 60 },

  // Work Room 1 (middle third)
  'wr1-fan-1': { x: 44, y: 26 },
  'wr1-fan-2': { x: 58, y: 26 },
  'wr1-light-1': { x: 42, y: 60 },
  'wr1-light-2': { x: 52, y: 60 },
  'wr1-light-3': { x: 62, y: 60 },

  // Work Room 2 (right third)
  'wr2-fan-1': { x: 74, y: 26 },
  'wr2-fan-2': { x: 88, y: 26 },
  'wr2-light-1': { x: 72, y: 60 },
  'wr2-light-2': { x: 82, y: 60 },
  'wr2-light-3': { x: 92, y: 60 },
}
