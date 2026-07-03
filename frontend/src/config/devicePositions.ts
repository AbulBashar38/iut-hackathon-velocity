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
  // Drawing Room (interior ~4-31%, wall at ~33%)
  'drawing-fan-1': { x: 13, y: 26 },
  'drawing-fan-2': { x: 27, y: 26 },
  'drawing-light-1': { x: 8, y: 57 },
  'drawing-light-2': { x: 18, y: 57 },
  'drawing-light-3': { x: 28, y: 57 },

  // Work Room 1 (interior ~35-59%, walls at ~33% and ~60%)
  'wr1-fan-1': { x: 41, y: 26 },
  'wr1-fan-2': { x: 55, y: 26 },
  'wr1-light-1': { x: 39, y: 57 },
  'wr1-light-2': { x: 47, y: 57 },
  'wr1-light-3': { x: 55, y: 57 },

  // Work Room 2 (interior ~63-92%, wall at ~60%)
  'wr2-fan-1': { x: 70, y: 26 },
  'wr2-fan-2': { x: 86, y: 26 },
  'wr2-light-1': { x: 67, y: 57 },
  'wr2-light-2': { x: 78, y: 57 },
  'wr2-light-3': { x: 89, y: 57 },
}
