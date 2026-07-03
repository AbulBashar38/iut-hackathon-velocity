import {
  DEVICE_TOGGLE_PROBABILITY,
  POWER_RATINGS,
  SIMULATION_INTERVAL_MS,
} from "../config/constants.js";
import { logger } from "../core/utils/logger.js";
import {
  deviceStore,
  type DeviceMutation,
  type DeviceUpdate,
} from "../store/deviceStore.js";
import type { Device } from "../types/domain.js";
import { randomInt, withProbability } from "./simulation.utils.js";

/**
 * Background engine that mutates device state on an interval to mimic a live
 * IoT feed. Isolated from transport concerns: it only writes to the device
 * store, which notifies subscribers. Replaceable by real devices/MQTT later.
 */
class SimulationEngine {
  private timer: NodeJS.Timeout | null = null;

  get isRunning(): boolean {
    return this.timer !== null;
  }

  start(): void {
    if (this.timer) return;

    logger.info(`Simulation engine started (interval ${SIMULATION_INTERVAL_MS}ms)`);
    this.tick(); // immediate first tick so the dashboard isn't empty
    this.timer = setInterval(() => this.tick(), SIMULATION_INTERVAL_MS);
  }

  stop(): void {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
    logger.info("Simulation engine stopped");
  }

  private tick(): void {
    const updates = this.computeUpdates(deviceStore.getAll());
    if (updates.length > 0) {
      deviceStore.applyUpdates(updates);
    }
  }

  /** Decides which devices flip this tick and their new power/timestamp. */
  private computeUpdates(devices: Device[]): DeviceUpdate[] {
    const now = new Date().toISOString();
    const updates: DeviceUpdate[] = [];

    for (const device of devices) {
      if (!withProbability(DEVICE_TOGGLE_PROBABILITY)) continue;

      const turningOn = device.status === "off";
      const rating = POWER_RATINGS[device.type];

      const changes: DeviceMutation = turningOn
        ? {
            status: "on",
            powerConsumption: randomInt(rating.min, rating.max),
            lastChanged: now,
          }
        : { status: "off", powerConsumption: 0, lastChanged: now };

      updates.push({ id: device.id, changes });
    }

    return updates;
  }
}

export const simulationEngine = new SimulationEngine();
