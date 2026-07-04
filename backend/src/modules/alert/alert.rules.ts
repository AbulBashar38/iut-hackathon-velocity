import { ALERT_THRESHOLDS, OFFICE_HOURS } from "../../config/constants.js";
import { ROOMS, type Device } from "../../types/domain.js";
import type { AlertRule } from "./alert.types.js";

const isAfterHours = (now: Date): boolean => {
  const hour = now.getHours();
  return hour < OFFICE_HOURS.start || hour >= OFFICE_HOURS.end;
};

const roomPower = (devices: Device[]): number =>
  devices.reduce((sum, device) => sum + device.powerConsumption, 0);

/** Devices left ON outside office hours, with a per-room breakdown. */
export const afterHoursRule: AlertRule = ({ devices, now }) => {
  if (!isAfterHours(now)) return [];

  const active = devices.filter((device) => device.status === "on");
  if (active.length === 0) return [];

  const breakdown = ROOMS.map((room) => {
    const count = active.filter((device) => device.room === room).length;
    return count > 0 ? `${room} (${count})` : null;
  })
    .filter((entry): entry is string => entry !== null)
    .join(", ");

  return [
    {
      signature: "after_hours",
      type: "after_hours",
      severity: "critical",
      message: `${active.length} device(s) still ON after office hours (closes ${OFFICE_HOURS.end}:00) — ${breakdown}.`,
    },
  ];
};

/** Every device in a room is running, with count and current draw. */
export const roomContinuousRule: AlertRule = ({ devices }) =>
  ROOMS.flatMap((room) => {
    const inRoom = devices.filter((device) => device.room === room);
    const allOn =
      inRoom.length > 0 && inRoom.every((device) => device.status === "on");

    if (!allOn) return [];

    return [
      {
        signature: `room_continuous:${room}`,
        type: "room_continuous" as const,
        severity: "warning" as const,
        message: `All ${inRoom.length} devices in ${room} are ON, drawing ${roomPower(inRoom)} W. Consider switching some off.`,
        room,
      },
    ];
  });

/** Total office power draw above the configured threshold. */
export const highPowerRule: AlertRule = ({ totalPower }) => {
  const limit = ALERT_THRESHOLDS.highPowerWatts;
  if (totalPower < limit) return [];

  const over = totalPower - limit;
  const severity = totalPower >= limit * 1.5 ? "critical" : "warning";

  return [
    {
      signature: "high_power",
      type: "high_power",
      severity,
      message: `High power draw: ${totalPower} W — ${over} W over the ${limit} W limit.`,
    },
  ];
};

/** Ordered list of active rules. Add/remove here without touching the engine. */
export const alertRules: AlertRule[] = [
  afterHoursRule,
  roomContinuousRule,
  highPowerRule,
];
