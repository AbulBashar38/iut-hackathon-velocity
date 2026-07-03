import { DEVICES_PER_ROOM } from "../config/constants.js";
import {
  ROOMS,
  type Device,
  type DeviceType,
  type RoomName,
} from "../types/domain.js";

/** Short, stable id prefixes per room (match the frontend device ids). */
const ROOM_SLUGS: Record<RoomName, string> = {
  "Drawing Room": "drawing",
  "Work Room 1": "wr1",
  "Work Room 2": "wr2",
};

const createDevice = (
  id: string,
  name: string,
  type: DeviceType,
  room: RoomName,
  timestamp: string,
): Device => ({
  id,
  name,
  type,
  room,
  status: "off",
  powerConsumption: 0,
  lastChanged: timestamp,
});

/**
 * Builds the initial 15 devices: 3 rooms x (2 fans + 3 lights).
 * All start OFF; the simulation engine brings them to life.
 */
export const seedDevices = (): Device[] => {
  const now = new Date().toISOString();
  const devices: Device[] = [];

  for (const room of ROOMS) {
    const slug = ROOM_SLUGS[room];

    for (let i = 1; i <= DEVICES_PER_ROOM.fan; i++) {
      devices.push(createDevice(`${slug}-fan-${i}`, `Fan ${i}`, "fan", room, now));
    }

    for (let i = 1; i <= DEVICES_PER_ROOM.light; i++) {
      devices.push(
        createDevice(`${slug}-light-${i}`, `Light ${i}`, "light", room, now),
      );
    }
  }

  return devices;
};
