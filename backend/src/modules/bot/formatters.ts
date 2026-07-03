import type { Alert, AlertSeverity } from "../../types/domain.js";
import type { RoomFacts, StatusFacts, UsageFacts } from "./bot.types.js";

const pluralize = (word: string, count: number): string =>
  count === 1 ? word : `${word}s`;

const SEVERITY_ICON: Record<AlertSeverity, string> = {
  critical: "🔴",
  warning: "⚠️",
  info: "ℹ️",
};

/** e.g. "🔴 **CRITICAL** [Work Room 2] 3 device(s) are still ON after office hours." */
export const formatAlert = (alert: Alert): string => {
  const icon = SEVERITY_ICON[alert.severity];
  const room = alert.room ? ` [${alert.room}]` : "";
  return `${icon} **${alert.severity.toUpperCase()}**${room} ${alert.message}`;
};

/** e.g. "Drawing Room: 1 fan ON, 2 lights ON." or "Work Room 1: all off." */
export const formatRoom = (facts: RoomFacts): string => {
  if (facts.fansOn === 0 && facts.lightsOn === 0) {
    return `${facts.room}: all off.`;
  }
  const fans = `${facts.fansOn} ${pluralize("fan", facts.fansOn)} ON`;
  const lights = `${facts.lightsOn} ${pluralize("light", facts.lightsOn)} ON`;
  return `${facts.room}: ${fans}, ${lights}.`;
};

/** Joins every room's status into a single line. */
export const formatStatus = (facts: StatusFacts): string =>
  facts.rooms.map(formatRoom).join(" ");

/** e.g. "Total power right now: 740W. Today's estimated usage: 4.2 kWh." */
export const formatUsage = (facts: UsageFacts): string =>
  `Total power right now: ${facts.totalPower}W. Today's estimated usage: ${facts.todayKwh} kWh.`;
