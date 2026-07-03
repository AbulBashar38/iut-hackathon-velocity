import type { RoomName } from "../../types/domain.js";

export interface RoomPower {
  room: RoomName;
  power: number;
}

export interface PowerSummary {
  totalPower: number;
  activeDevices: number;
  activeFans: number;
  activeLights: number;
  roomPower: RoomPower[];
}
