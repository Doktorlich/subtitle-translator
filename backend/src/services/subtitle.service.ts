// src/services/subtitle.service.ts
import { SubtitleProjectModel } from "../models/SubtitleProject.model.js";
import type { ISubtitleLine, ISubtitleProject } from "../@types/subtitle.js";

import type { IAITranslationResponse } from "../@types/ai.js";

import { SelectedModel } from "../models/SelectedAiModel.model.js";
import { SettingsAiModel } from "../models/SettingsAi.model.js";
import { searchAndSelectModelAi } from "./searchModelAi.service.js";
import type { LimitFunction } from "p-limit";

export const findFilesByType = (fileType: "original" | "translated") => {
    return SubtitleProjectModel.find({ type: fileType })
        .sort({ fileName: "asc" })
        .collation({ locale: "en_US", numericOrdering: true });
};

export const removeFilesByType = (fileType: "original" | "translated") => {
    return SubtitleProjectModel.deleteMany({ type: fileType });
};

export const removeProjectById = (id: string) => {
    return SubtitleProjectModel.findOneAndDelete({
        _id: id,
    });
};

export const bulkCreateOriginals = (files: ISubtitleProject[]) => {
    const projectToSave = files.map((file: ISubtitleProject) => ({
        _id: crypto.randomUUID(),
        type: "original",
        fileName: file.fileName,
        lines: file.lines,
        status: "idle",
    }));
    return SubtitleProjectModel.insertMany(projectToSave);
};

export const translateProject = async (id: string) => {
    const original = await SubtitleProjectModel.findOne({
        _id: id,
        type: "original",
    });
    if (!original) {
        throw new Error("Original file not found");
    }
    const originalData = original.toObject() as ISubtitleProject;

    const modelAi = await SelectedModel.find();
    if (!modelAi) {
        throw new Error("The Model ai selected not found");
    }

    const rawResult = await searchAndSelectModelAi(modelAi, originalData);

    if (!rawResult) throw new Error("AI_EMPTY_RESPONSE");

    if (typeof rawResult !== "string") {
        throw new Error("AI_INVALID_CONTENT_FORMAT:Expected string, received array or empty");
    }
    const { translations }: IAITranslationResponse = JSON.parse(rawResult);

    const mergedLines = originalData.lines.map((line: ISubtitleLine) => {
        const found = translations.find(t => t.id === line.id);
        return {
            ...line,
            translatedText: found ? found.text : "",
        };
    });

    const copy = new SubtitleProjectModel({
        ...originalData,
        lines: mergedLines,
        _id: crypto.randomUUID(),
        type: "translated",
        status: "completed",
    });
    await SubtitleProjectModel.findByIdAndUpdate(
        {
            _id: id,
            type: "original",
        },
        { status: "completed" },
    );
    await copy.save();
};

export function selectedAiModel(modelName: string, modelId: string, provider: string) {
    return SelectedModel.findOneAndUpdate(
        { key: "selectedAIModel" },
        { modelName: modelName, modelId: modelId, provider: provider },
        {
            upsert: true, // Создать если не найдено
            new: true, // Вернуть обновлённый документ
        },
    );
}

export async function loadSelectedAiModel() {
    return SelectedModel.find();
}

export async function startTranslation(limit: LimitFunction, original: ISubtitleProject[]) {
    (async () => {
        const translationPromises = original.map((file, index) =>
            limit(async () => {
                try {
                    await new Promise(resolve => setTimeout(resolve, index * 1100));
                    await translateProject(file._id);

                    const updatedModel = await SubtitleProjectModel.findById(file._id);
                    const settingsAi = await SettingsAiModel.findOne();
                    if (settingsAi?.deleteTransFile === true) {
                        if (updatedModel?.status === "completed") {
                            await removeProjectById(file._id);
                        }
                    }
                } catch (err: any) {
                    console.error(`[Task Error] File ${file._id} failed:`, err.message);
                    await SubtitleProjectModel.findByIdAndUpdate(file._id, {
                        status: "error",
                    });
                }
            }),
        );
        await Promise.all(translationPromises);
        console.log("Background batch processing finished");
    })().catch(err => console.error("Queue system error:", err));
}
