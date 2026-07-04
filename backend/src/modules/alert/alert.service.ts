import { randomUUID } from "node:crypto";

import { ALERT_COOLDOWN_MS, ALERT_SUSTAIN_MS } from "../../config/constants.js";
import { logger } from "../../core/utils/logger.js";
import type { Alert, Device } from "../../types/domain.js";
import { getTotalPower } from "../power/power.service.js";
import { alertRules } from "./alert.rules.js";
import type { AlertCandidate, AlertContext } from "./alert.types.js";

/** Newest-first cap so the in-memory alert list can't grow unbounded. */
const MAX_ALERTS = 50;

type AlertListener = (alert: Alert) => void;

/** Per-condition tracking for sustain + cooldown throttling. */
interface ConditionState {
  firstSeenAt: number;
  lastFiredAt: number;
}

/**
 * Evaluates device state against the alert rules and stores generated alerts
 * in memory. Alerts are throttled two ways so they stay meaningful:
 *  - Sustain: a condition must hold continuously for ALERT_SUSTAIN_MS before
 *    firing (ignores momentary simulation flips).
 *  - Cooldown: after firing, the same condition stays quiet for
 *    ALERT_COOLDOWN_MS even if it keeps holding (then re-fires as a reminder).
 * A condition that clears resets its sustain timer.
 */
class AlertEngine {
  private alerts: Alert[] = [];
  private readonly states = new Map<string, ConditionState>();
  private readonly listeners = new Set<AlertListener>();

  onAlert(listener: AlertListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(alert: Alert): void {
    for (const listener of this.listeners) {
      try {
        listener({ ...alert });
      } catch (error) {
        logger.error("Alert listener failed", error);
      }
    }
  }

  private createAlert(candidate: AlertCandidate, timestamp: string): Alert {
    return {
      id: `alert-${randomUUID()}`,
      type: candidate.type,
      severity: candidate.severity,
      message: candidate.message,
      timestamp,
      ...(candidate.room ? { room: candidate.room } : {}),
    };
  }

  evaluate(devices: Device[]): Alert[] {
    const context: AlertContext = {
      devices,
      now: new Date(),
      totalPower: getTotalPower(devices),
    };
    const now = context.now.getTime();

    const candidates = alertRules.flatMap((rule) => rule(context));
    const current = new Map(candidates.map((c) => [c.signature, c]));

    // Reset tracking for conditions that no longer hold.
    for (const signature of this.states.keys()) {
      if (!current.has(signature)) {
        this.states.delete(signature);
      }
    }

    const created: Alert[] = [];

    for (const [signature, candidate] of current) {
      let state = this.states.get(signature);
      if (!state) {
        state = { firstSeenAt: now, lastFiredAt: 0 };
        this.states.set(signature, state);
      }

      const sustained = now - state.firstSeenAt >= ALERT_SUSTAIN_MS;
      const cooledDown =
        state.lastFiredAt === 0 || now - state.lastFiredAt >= ALERT_COOLDOWN_MS;

      if (sustained && cooledDown) {
        state.lastFiredAt = now;
        const alert = this.createAlert(candidate, context.now.toISOString());
        this.alerts.unshift(alert);
        created.push(alert);
        this.notify(alert);
      }
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
