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

router.get("/files/original", filesControllers.getOriginalFiles);
router.post("/files/upload", filesControllers.postUpload);
router.delete("/files/delete", filesControllers.deleteOriginalFiles);

router.get("/files/translated", filesControllers.getTranslatedFiles);

//перевод сразу всех файлов, думаю тут будет перевод сразу несколько файлов,
// там условно по 5 парраллельных переводов, просто если переводить сразу все то будет потреблять слишком много мощностей
router.post("/files/translate", filesControllers.postTranslateFiles);
router.post("/files/:id/translate", filesControllers.postTranslateFileId);

router.delete("/files/:id/delete", filesControllers.deleteOriginalFileId);

export default router;
