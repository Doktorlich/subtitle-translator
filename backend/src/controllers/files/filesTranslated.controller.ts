import type { RequestHandler } from "express";
import pLimit from "p-limit";

import {
    removeFilesByType,
    findFilesByType,
    translateProject,
} from "../../services/subtitle.service.js";
import { SubtitleProjectModel } from "../../models/SubtitleProject.model.js";

const getTranslatedFiles: RequestHandler = async (req, res, next) => {
    try {
        const filesSubtitle = await findFilesByType("translated");
        res.status(200).json({ message: "Found all files", filesSubtitle });
    } catch (e) {
        // продумать вывод ошибки ,
        console.log(e);
        return next(e);
    }
};

const postTranslateFiles: RequestHandler = async (req, res, next) => {
    try {
        await SubtitleProjectModel.updateMany({ type: "original" }, { status: "translating" });

        const original = await SubtitleProjectModel.find({ type: "original" });
        if (!original) {
            throw new Error("Original file not found");
        }
        const limit = pLimit(5);

        (async () => {
            const translationPromises = original.map(file =>
                limit(() => translateProject(file._id)),
            );
            await Promise.all(translationPromises);
        })().catch(console.error);

        res.status(200).json({ message: "Mass transfer completed" });
    } catch (err: any) {
        // продумать вывод ошибки ,
        console.log(err);
        return next(err);
    }
};

const postTranslateFileId: RequestHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id || typeof id !== "string") {
            return res.status(400).json({ message: "Invalid or missing ID" });
        }
        await SubtitleProjectModel.findByIdAndUpdate(id, { status: "translating" });
        (async () => {
            await translateProject(id);
        })().catch(console.error);
        res.status(201).json({ message: "success  created  file's copy" });
    } catch (err: any) {
        // 5. Расширенная обработка ошибок
        console.error("--- AI Translation Error ---");
        // Если ошибка от самого Mistral (например, лимиты или ключ)
        if (err.name === "MistralError") {
            return res.status(502).json({ error: "Mistral API unreachable", details: err.message });
        }
        // Если ошибка парсинга JSON (нейросеть "сломала" формат)
        if (err instanceof SyntaxError) {
            return res.status(422).json({ error: "AI returned invalid JSON structure" });
        }
        // Остальные ошибки (БД, сеть и т.д.)
        next(err);
    }
};

const deleteTranslatedFiles: RequestHandler = async (req, res, next) => {
    try {
        const deletedAllFiles = await removeFilesByType("translated");
        if (!deletedAllFiles) {
            return res.status(404).json({ message: "Files not found or already deleted" });
        }
        res.status(200).json({ message: "All files delete successfully" });
    } catch (e) {
        next(e);
    }
};

export { getTranslatedFiles, postTranslateFiles, postTranslateFileId, deleteTranslatedFiles };
