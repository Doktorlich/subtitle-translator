import { Router } from "express";
import filesRouter from "./files.routes.js";
import aiRouter from "./ai.routes.js";

const router = Router();

router.use("/v1/files", filesRouter);
router.use("/v1/ai", aiRouter);

export default router;
