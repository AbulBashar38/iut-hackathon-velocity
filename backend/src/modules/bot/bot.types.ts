import type { RoomName } from "../../types/domain.js";

export interface RoomFacts {
  room: RoomName;
  fansOn: number;
  fansTotal: number;
  lightsOn: number;
  lightsTotal: number;
}

export interface StatusFacts {
  rooms: RoomFacts[];
}

export interface UsageFacts {
  /** Current total draw in watts. */
  totalPower: number;
  /** Estimated energy used so far today, in kWh. */
  todayKwh: number;
}
