import { SIMULATION_INTERVAL_MS } from "../../config/constants.js";
import { logger } from "../../core/utils/logger.js";
import { deviceStore } from "../../store/deviceStore.js";
import { getTotalPower } from "../power/power.service.js";

const MS_PER_HOUR = 3_600_000;

const round2 = (value: number): number => Math.round(value * 100) / 100;

/**
 * Accumulates estimated energy usage (kWh) by periodically sampling the total
 * power draw over elapsed time. Resets at midnight. In-memory only — a real
 * meter or time-series DB can replace this behind the same interface.
 */
class EnergyMeter {
  private accumulatedKwh = 0;
  private lastSampleAt = Date.now();
  private currentDay = new Date().toDateString();
  private timer: NodeJS.Timeout | null = null;

  start(intervalMs: number = SIMULATION_INTERVAL_MS): void {
    if (this.timer) return;
    this.lastSampleAt = Date.now();
    this.timer = setInterval(() => this.sample(), intervalMs);
    logger.info("Energy meter started");
  }

  stop(): void {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
    logger.info("Energy meter stopped");
  }

  /** Today's accumulated usage in kWh (rounded to 2 decimals). */
  getTodayKwh(): number {
    this.sample(); // keep the reading fresh at query time
    return round2(this.accumulatedKwh);
  }

  private sample(): void {
    const now = Date.now();
    this.rolloverIfNewDay(now);

    const elapsedHours = (now - this.lastSampleAt) / MS_PER_HOUR;
    const watts = getTotalPower(deviceStore.getAll());
    this.accumulatedKwh += (watts * elapsedHours) / 1000;
    this.lastSampleAt = now;
  }

  private rolloverIfNewDay(now: number): void {
    const today = new Date(now).toDateString();
    if (today !== this.currentDay) {
      this.currentDay = today;
      this.accumulatedKwh = 0;
    }
  }
}

export const energyMeter = new EnergyMeter();
