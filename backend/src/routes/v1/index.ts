import { Router } from "express";
import filesRouter from "./files.routes.js";

const router = Router();

router.use("/v1", filesRouter);

export default router;
