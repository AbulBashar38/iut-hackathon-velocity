import { randomUUID } from "node:crypto";

import type { Alert, Device } from "../../types/domain.js";
import { getTotalPower } from "../power/power.service.js";
import { alertRules } from "./alert.rules.js";
import type { AlertContext } from "./alert.types.js";

/** Newest-first cap so the in-memory alert list can't grow unbounded. */
const MAX_ALERTS = 50;

/**
 * Evaluates device state against the alert rules and stores generated alerts
 * in memory. Alerts are edge-triggered: an active-signature set ensures each
 * condition fires once until it clears, preventing per-tick duplicates.
 */
class AlertEngine {
  private alerts: Alert[] = [];
  private readonly activeSignatures = new Set<string>();

  evaluate(devices: Device[]): Alert[] {
    const context: AlertContext = {
      devices,
      now: new Date(),
      totalPower: getTotalPower(devices),
    };

    const candidates = alertRules.flatMap((rule) => rule(context));
    const currentSignatures = new Set(candidates.map((c) => c.signature));

    // Reset signatures whose condition no longer holds.
    for (const signature of this.activeSignatures) {
      if (!currentSignatures.has(signature)) {
        this.activeSignatures.delete(signature);
      }
    }

    const created: Alert[] = [];

    for (const candidate of candidates) {
      if (this.activeSignatures.has(candidate.signature)) continue;
      this.activeSignatures.add(candidate.signature);

      const alert: Alert = {
        id: `alert-${randomUUID()}`,
        type: candidate.type,
        severity: candidate.severity,
        message: candidate.message,
        timestamp: context.now.toISOString(),
        ...(candidate.room ? { room: candidate.room } : {}),
      };

      this.alerts.unshift(alert);
      created.push(alert);
    }

    if (this.alerts.length > MAX_ALERTS) {
      this.alerts.length = MAX_ALERTS;
    }

    return created;
  }

  getAll(): Alert[] {
    return this.alerts.map((alert) => ({ ...alert }));
  }
}

export const alertService = new AlertEngine();
