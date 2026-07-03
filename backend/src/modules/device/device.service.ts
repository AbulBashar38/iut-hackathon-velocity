import { AppError } from "../../core/errors/AppError.js";
import { deviceStore } from "../../store/deviceStore.js";
import type { Device } from "../../types/domain.js";

/** Read-model service over the device store. Controllers call this, not the store. */
export const deviceService = {
  getAll(): Device[] {
    return deviceStore.getAll();
  },

  getById(id: string): Device {
    const device = deviceStore.getById(id);
    if (!device) {
      throw AppError.notFound(`Device '${id}' not found`);
    }
    return device;
  },
};
