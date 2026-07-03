import { catchAsync } from "../../core/utils/catchAsync.js";
import { sendResponse } from "../../core/utils/sendResponse.js";
import { alertService } from "./alert.service.js";

const getAllAlerts = catchAsync(async (_req, res) => {
  sendResponse(res, {
    statusCode: 200,
    message: "Alerts retrieved successfully",
    data: alertService.getAll(),
  });
});

export const alertController = {
  getAllAlerts,
};
