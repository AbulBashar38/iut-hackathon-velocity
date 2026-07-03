import { Router } from "express";

import { alertController } from "./alert.controller.js";

const router = Router();

router.get("/", alertController.getAllAlerts);

export const alertRoute = router;
