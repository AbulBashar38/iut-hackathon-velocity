import { catchAsync } from "../../core/utils/catchAsync.js";
import { sendResponse } from "../../core/utils/sendResponse.js";
import { deviceService } from "./device.service.js";

const getAllDevices = catchAsync(async (_req, res) => {
  const devices = deviceService.getAll();
  sendResponse(res, {
    statusCode: 200,
    message: "Devices retrieved successfully",
    data: devices,
  });
});

const getDeviceById = catchAsync(async (req, res) => {
  const id = req.params.id as string; // validated by deviceIdParamSchema
  const device = deviceService.getById(id);
  sendResponse(res, {
    statusCode: 200,
    message: "Device retrieved successfully",
    data: device,
  });
});

export const deviceController = {
  getAllDevices,
  getDeviceById,
};
