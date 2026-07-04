import { ROOMS, type DeviceType } from "../types/domain.js";

/**
 * Domain constants that drive simulation and alerting.
 *
 * These are office-level facts and tunables — intentionally separate from
 * environment variables so behavior can be adjusted without touching config.
 */

/** Canonical list of rooms (re-exported for convenience). */
export { ROOMS };

/** Device composition per room → 2 fans + 3 lights = 15 devices total. */
export const DEVICES_PER_ROOM: Record<DeviceType, number> = {
  fan: 2,
  light: 3,
};

/** Rated power draw (watts) when ON, used to randomize simulated consumption. */
export const POWER_RATINGS: Record<DeviceType, { min: number; max: number }> = {
  fan: { min: 55, max: 65 },
  light: { min: 12, max: 18 },
};

/** How often the simulation engine mutates device state. */
export const SIMULATION_INTERVAL_MS = 5000;

/** Probability that a given device flips state on each simulation tick. */
export const DEVICE_TOGGLE_PROBABILITY = 0.2;

/** Office hours in 24h local time. Devices ON outside this window alert. */
export const OFFICE_HOURS = {
  start: 9,
  end: 18,
} as const;

/** Thresholds that trigger alerts. */
export const ALERT_THRESHOLDS = {
  /** Total office draw (W) at/above which a high-power alert is raised. */
  highPowerWatts: 600,
} as const;
