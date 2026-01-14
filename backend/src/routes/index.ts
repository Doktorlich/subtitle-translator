import type { Request, Response } from "express";
import { Router } from "express";

const router = Router();

router.get("/", function (req: Request, res: Response) {
  res.send("You visit the default page");
});

export default router;
