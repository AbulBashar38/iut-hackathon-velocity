import { deviceStore } from "../../store/deviceStore.js";
import { ROOMS, type Device, type RoomName } from "../../types/domain.js";
import { powerService } from "../power/power.service.js";
import { energyMeter } from "../usage/energyMeter.js";
import type { RoomFacts, StatusFacts, UsageFacts } from "./bot.types.js";

const countOn = (devices: Device[]): number =>
  devices.filter((device) => device.status === "on").length;

const buildRoomFacts = (room: RoomName, devices: Device[]): RoomFacts => {
  const fans = devices.filter((device) => device.type === "fan");
  const lights = devices.filter((device) => device.type === "light");

  return {
    room,
    fansOn: countOn(fans),
    fansTotal: fans.length,
    lightsOn: countOn(lights),
    lightsTotal: lights.length,
  };
};

/**
 * Gathers structured facts for the bot from existing services. Read-only and
 * deterministic — this is the grounded truth the LLM later rephrases.
 */
export const botFactsService = {
  getRoomFacts(room: RoomName): RoomFacts {
    return buildRoomFacts(room, deviceStore.getByRoom(room));
  },

  getStatusFacts(): StatusFacts {
    return {
      rooms: ROOMS.map((room) =>
        buildRoomFacts(room, deviceStore.getByRoom(room)),
      ),
    };
  },

  getUsageFacts(): UsageFacts {
    return {
      totalPower: powerService.getSummary().totalPower,
      todayKwh: energyMeter.getTodayKwh(),
    };
  },
};
