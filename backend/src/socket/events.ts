import type { PowerSummary } from "../modules/power/power.types.js";
import type { Alert, Device } from "../types/domain.js";

/** Broadcast event names (kept as constants to avoid stringly-typed emits). */
export const SOCKET_EVENTS = {
  devicesUpdated: "devicesUpdated",
  powerUpdated: "powerUpdated",
  alertCreated: "alertCreated",
} as const;

/** Server → client event payloads (makes io.emit fully typed). */
export interface ServerToClientEvents {
  devicesUpdated: (devices: Device[]) => void;
  powerUpdated: (summary: PowerSummary) => void;
  alertCreated: (alert: Alert) => void;
}

/**
 * Client → server events. Intentionally empty: the dashboard is read-only,
 * so the frontend can never command devices — enforced at the type level.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ClientToServerEvents {}
