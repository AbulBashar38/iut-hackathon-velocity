import { Router } from "express";

import { validateRequest } from "../../core/middleware/validateRequest.js";
import { deviceController } from "./device.controller.js";
import { deviceIdParamSchema } from "./device.validation.js";

const router = Router();

router.get("/", deviceController.getAllDevices);
router.get(
  "/:id",
  validateRequest({ params: deviceIdParamSchema }),
  deviceController.getDeviceById,
);

export const deviceRoute = router;
