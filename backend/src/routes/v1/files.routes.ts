// POST /api/v1/files/upload — Загрузка файла.
// GET /api/v1/files — Список всех загруженных файлов (ваше loading-files).
// GET /api/v1/files/:id — Информация о конкретном файле.
// DELETE /api/v1/files — Удалить все файлы.
// DELETE /api/v1/files/:id — Удалить конкретный файл.

import { type Request, type Response, Router } from "express";
import { filesControllers } from "../../controllers/index.js";

const router = Router();
//test
// router.get("/files/upload", function (req: Request, res: Response) {
//   res.send("You visit the upload route");
// });

router.get("/files", filesControllers.getFiles);
router.post("/files/upload", filesControllers.postUpload );
router.delete("/files/delete",  filesControllers.deleteAllFile);
router.delete("/files/:id/delete",  filesControllers.deleteFile);
export default router;
