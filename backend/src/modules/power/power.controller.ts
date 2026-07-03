import { catchAsync } from "../../core/utils/catchAsync.js";
import { sendResponse } from "../../core/utils/sendResponse.js";
import { powerService } from "./power.service.js";

const getSummary = catchAsync(async (_req, res) => {
  sendResponse(res, {
    statusCode: 200,
    message: "Power summary retrieved successfully",
    data: powerService.getSummary(),
  });
});

export const powerController = {
  getSummary,
};
