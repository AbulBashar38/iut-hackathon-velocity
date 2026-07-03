/**
 * Shared domain contracts for the IoT Office Monitoring System.
 *
 * These types are the wire format between the backend, Socket.io, and the
 * dashboard. Timestamps are ISO-8601 strings; the client formats for display.
 */

export const ROOMS = ["Drawing Room", "Work Room 1", "Work Room 2"] as const;
export type RoomName = (typeof ROOMS)[number];

export type DeviceType = "fan" | "light";
export type DeviceStatus = "on" | "off";

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  room: RoomName;
  status: DeviceStatus;
  /** Current draw in watts. 0 when the device is off. */
  powerConsumption: number;
  /** ISO-8601 timestamp of the last state change. */
  lastChanged: string;
}

export type AlertSeverity = "critical" | "warning" | "info";

export type AlertType = "after_hours" | "room_continuous" | "high_power";

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  room?: RoomName;
  /** ISO-8601 timestamp of when the alert was raised. */
  timestamp: string;
}
