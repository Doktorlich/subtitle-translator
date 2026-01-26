// src/services/subtitle.service.ts
import { SubtitleProjectModel } from "../models/SubtitleProject.model.js";
import type { ISubtitleLine, ISubtitleProject } from "../@types/subtitle.js";
import { translateAiQuery } from "./mistral/mistral-client.js";
import type { IAITranslationResponse } from "../@types/ai.js";

export const findFilesByType = (fileType: "original" | "translated") => {
    return SubtitleProjectModel.find({ type: fileType })
        .sort({ fileName: "asc" })
        .collation({ locale: "en_US", numericOrdering: true });
};
// здесь же могут быть другие функции, например, createProject, deleteProject и т.д.
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
    // await SubtitleProjectModel.findByIdAndUpdate(
    //     {
    //         _id: id,
    //         type: "original",
    //     },
    //     { status: "translating" },
    // );
    const original = await SubtitleProjectModel.findOne({
        _id: id,
        type: "original",
    });

    if (!original) {
        throw new Error("Original file not found");
    }
    const originalData = original.toObject() as ISubtitleProject;

    const rawResult = await translateAiQuery(originalData);
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
