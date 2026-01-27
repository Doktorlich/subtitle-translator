import { type Request, type Response, Router } from "express";

import { aiControllers } from "../../controllers/index.js";
const router = Router();

router.get("/models-ai", aiControllers.getAiModel);
router.post("/select-model", aiControllers.postSelectedAiModel);

export default router
