import { deviceStore } from "../../store/deviceStore.js";
import { ROOMS, type Device, type DeviceType } from "../../types/domain.js";
import type { PowerSummary, RoomPower } from "./power.types.js";

const isOn = (device: Device): boolean => device.status === "on";

const sumPower = (devices: Device[]): number =>
  devices.reduce((total, device) => total + device.powerConsumption, 0);

/**
 * Pure calculations over a device list. Deterministic and store-agnostic so
 * they can be unit-tested and reused by both REST and Socket.io layers.
 */

export const getTotalPower = (devices: Device[]): number => sumPower(devices);

export const getActiveDeviceCount = (devices: Device[]): number =>
  devices.filter(isOn).length;

export const getActiveCountByType = (
  devices: Device[],
  type: DeviceType,
): number => devices.filter((device) => device.type === type && isOn(device)).length;

export const getRoomPower = (devices: Device[]): RoomPower[] =>
  ROOMS.map((room) => ({
    room,
    power: sumPower(devices.filter((device) => device.room === room)),
  }));

export const calculatePowerSummary = (devices: Device[]): PowerSummary => ({
  totalPower: getTotalPower(devices),
  activeDevices: getActiveDeviceCount(devices),
  activeFans: getActiveCountByType(devices, "fan"),
  activeLights: getActiveCountByType(devices, "light"),
  roomPower: getRoomPower(devices),
});

/**
 * Service facade: reads the current device snapshot from the store and returns
 * the computed summary. Controllers and the socket layer call this.
 */
export const powerService = {
  getSummary(): PowerSummary {
    return calculatePowerSummary(deviceStore.getAll());
  },
};
