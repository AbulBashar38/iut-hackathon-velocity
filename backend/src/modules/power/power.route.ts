import { Router } from "express";

import { powerController } from "./power.controller.js";

const router = Router();

router.get("/summary", powerController.getSummary);

export const powerRoute = router;
