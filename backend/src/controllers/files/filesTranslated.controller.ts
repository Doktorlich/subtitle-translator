// потом добавить еще один контроллер
// translateAi.controller.ts

import type { RequestHandler } from "express";
import { SubtitleProjectModel } from "../../models/SubtitleProject.model.js";
import {
  removeFilesByType,
  findFilesByType,
  translateProjectById,
} from "../../services/subtitle.service.js";
import { translateAiQuery } from "../../services/mistral/mistral-client.js";
import type { ISubtitleLine, ISubtitleProject } from "../../@types/subtitle.js";
import type { IAITranslationResponse } from "../../@types/ai.js";

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
    // const files = req.body;
    // await files;
    // res.status(201).json({ message: "success file upload " });
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
    await translateProjectById(id);
    res.status(201).json({ message: "success  created  file's copy" });
  } catch (err: any) {
    // 5. Расширенная обработка ошибок
    console.error("--- AI Translation Error ---");
    // Если ошибка от самого Mistral (например, лимиты или ключ)
    if (err.name === "MistralError") {
      return res
        .status(502)
        .json({ error: "Mistral API unreachable", details: err.message });
    }
    // Если ошибка парсинга JSON (нейросеть "сломала" формат)
    if (err instanceof SyntaxError) {
      return res
        .status(422)
        .json({ error: "AI returned invalid JSON structure" });
    }
    // Остальные ошибки (БД, сеть и т.д.)
    next(err);
  }
};

const deleteTranslatedFiles: RequestHandler = async (req, res, next) => {
  try {
    const deletedAllFiles = await removeFilesByType("translated");
    if (!deletedAllFiles) {
      return res
        .status(404)
        .json({ message: "Files not found or already deleted" });
    }
    res.status(200).json({ message: "All files delete successfully" });
  } catch (e) {
    next(e);
  }
};

export {
  getTranslatedFiles,
  postTranslateFiles,
  postTranslateFileId,
  deleteTranslatedFiles,
};
