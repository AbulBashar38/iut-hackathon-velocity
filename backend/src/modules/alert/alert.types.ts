import type {
  AlertSeverity,
  AlertType,
  Device,
  RoomName,
} from "../../types/domain.js";

/** Input passed to every alert rule. */
export interface AlertContext {
  devices: Device[];
  now: Date;
  totalPower: number;
}

/**
 * A potential alert produced by a rule. `signature` is a stable key used for
 * edge-triggered deduplication (fire once until the condition clears).
 */
export interface AlertCandidate {
  signature: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  room?: RoomName;
}

export type AlertRule = (context: AlertContext) => AlertCandidate[];
