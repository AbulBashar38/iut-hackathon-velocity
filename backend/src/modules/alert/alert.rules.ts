import { ALERT_THRESHOLDS, OFFICE_HOURS } from "../../config/constants.js";
import { ROOMS } from "../../types/domain.js";
import type { AlertRule } from "./alert.types.js";

const isAfterHours = (now: Date): boolean => {
  const hour = now.getHours();
  return hour < OFFICE_HOURS.start || hour >= OFFICE_HOURS.end;
};

/** Devices left ON outside office hours. */
export const afterHoursRule: AlertRule = ({ devices, now }) => {
  if (!isAfterHours(now)) return [];

  const activeCount = devices.filter((device) => device.status === "on").length;
  if (activeCount === 0) return [];

  return [
    {
      signature: "after_hours",
      type: "after_hours",
      severity: "critical",
      message: `${activeCount} device(s) are still ON after office hours.`,
    },
  ];
};

/** Every device in a room is running. */
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
        message: `All devices in ${room} are running.`,
        room,
      },
    ];
  });

/** Total office power draw above the configured threshold. */
export const highPowerRule: AlertRule = ({ totalPower }) => {
  if (totalPower < ALERT_THRESHOLDS.highPowerWatts) return [];

  return [
    {
      signature: "high_power",
      type: "high_power",
      severity: "warning",
      message: `High power consumption: ${totalPower} W exceeds ${ALERT_THRESHOLDS.highPowerWatts} W.`,
    },
  ];
};

/** Ordered list of active rules. Add/remove here without touching the engine. */
export const alertRules: AlertRule[] = [
  afterHoursRule,
  roomContinuousRule,
  highPowerRule,
];
