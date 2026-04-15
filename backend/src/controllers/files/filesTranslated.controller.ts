import pLimit from "p-limit";
import {
    removeFilesByType,
    findFilesByType,
    translateProject,
    startTranslation,
} from "../../services/subtitle.service.js";
import { SubtitleProjectModel } from "../../models/SubtitleProject.model.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { AppError } from "../../utils/AppError.js";

const getTranslatedFiles = catchAsync(async (req, res, next) => {
    const filesSubtitle = await findFilesByType("translated");
    if (!filesSubtitle) {
        return next(new AppError("No translated files found", 404));
    }
    res.status(200).json({ message: "Files retrieved successfully", filesSubtitle });
});

const postTranslateFiles = catchAsync(async (req, res, next) => {
    await SubtitleProjectModel.updateMany({ type: "original" }, { status: "translating" });
    const original = await findFilesByType("original");
    if (!original || original.length === 0) {
        return next(new AppError("No original files available for translation", 404));
    }
    const limit = pLimit(Number(process.env.PER_LIMIT));
    await startTranslation(limit, original);
    res.status(202).json({ message: "Translation process started in the background" });
});

const postTranslateFileId = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    if (!id || typeof id !== "string") {
        return next(new AppError("Missing project ID in request parameters", 400));
    }
    await SubtitleProjectModel.findByIdAndUpdate(id, { status: "translating" });
    (async () => {
        try {
            await translateProject(id);
        } catch (err: any) {
            console.error(`[Task Error] File ${id} failed:`, err.message);
            await SubtitleProjectModel.findByIdAndUpdate(id, {
                status: "error",
            });
        }
    })().catch(err => console.error("Queue system error:", err));

    res.status(202).json({ message: "Translation started for this file" });
});

const deleteTranslatedFiles = catchAsync(async (req, res, next) => {
    const deletedAllFiles = await removeFilesByType("translated");
    if (!deletedAllFiles) {
        return next(new AppError("Translated files not found or already deleted", 404));
    }
    res.status(200).json({ message: "All translated files deleted successfully" });
});

export { getTranslatedFiles, postTranslateFiles, postTranslateFileId, deleteTranslatedFiles };
