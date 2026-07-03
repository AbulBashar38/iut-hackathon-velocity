import { AppError } from "../core/errors/AppError.js";
import type { Device, RoomName } from "../types/domain.js";
import { seedDevices } from "./deviceSeeder.js";

/** Fields a service is allowed to mutate on a device. */
export type DeviceMutation = Partial<
  Pick<Device, "status" | "powerConsumption" | "lastChanged">
>;

export interface DeviceUpdate {
  id: string;
  changes: DeviceMutation;
}

type ChangeListener = (changed: Device[]) => void;

/**
 * In-memory single source of truth for device state.
 *
 * Reads return copies to protect internal state; mutations happen only through
 * `update`/`applyUpdates` and notify subscribers via `onChange`. The store has
 * no knowledge of sockets, power, or alerts — they subscribe to it.
 */
export class DeviceStore {
  private readonly devices = new Map<string, Device>();
  private readonly listeners = new Set<ChangeListener>();

  constructor(initialDevices: Device[]) {
    for (const device of initialDevices) {
      this.devices.set(device.id, { ...device });
    }
  }

  getAll(): Device[] {
    return [...this.devices.values()].map((device) => ({ ...device }));
  }

  getById(id: string): Device | undefined {
    const device = this.devices.get(id);
    return device ? { ...device } : undefined;
  }

  getByRoom(room: RoomName): Device[] {
    return this.getAll().filter((device) => device.room === room);
  }

  /** Applies a single device change and notifies subscribers. */
  update(id: string, changes: DeviceMutation): Device {
    const [updated] = this.applyUpdates([{ id, changes }]);
    return updated as Device;
  }

  /** Applies multiple device changes atomically, notifying subscribers once. */
  applyUpdates(updates: DeviceUpdate[]): Device[] {
    const changed: Device[] = [];

    for (const { id, changes } of updates) {
      const existing = this.devices.get(id);
      if (!existing) {
        throw AppError.notFound(`Device '${id}' not found`);
      }
      const updated: Device = { ...existing, ...changes };
      this.devices.set(id, updated);
      changed.push(updated);
    }

    if (changed.length > 0) {
      this.emit(changed);
    }

    return changed.map((device) => ({ ...device }));
  }

  /** Subscribe to state changes. Returns an unsubscribe function. */
  onChange(listener: ChangeListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit(changed: Device[]): void {
    const snapshot = changed.map((device) => ({ ...device }));
    for (const listener of this.listeners) {
      listener(snapshot);
    }
  }
}

/** Application-wide singleton, seeded with the 15 office devices. */
export const deviceStore = new DeviceStore(seedDevices());
