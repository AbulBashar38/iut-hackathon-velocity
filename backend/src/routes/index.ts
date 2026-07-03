import { Router } from "express";

import { alertRoute } from "../modules/alert/alert.route.js";
import { deviceRoute } from "../modules/device/device.route.js";
import { powerRoute } from "../modules/power/power.route.js";

const router = Router();

router.use("/devices", deviceRoute);
router.use("/power", powerRoute);
router.use("/alerts", alertRoute);

export const apiRouter = router;
