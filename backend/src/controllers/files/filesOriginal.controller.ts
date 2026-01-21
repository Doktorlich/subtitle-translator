import type { RequestHandler } from "express";
import type { ISubtitleProject } from "../../@types/subtitle.js";
import { SubtitleProjectModel } from "../../models/SubtitleProject.model.js";
import {
  deleteAllFilesByType,
  deleteOriginalById,
  getFilesByType, postUploadOriginalByFiles
} from "../../services/subtitle.service.js";

const postUpload: RequestHandler = async (req, res, next) => {
  try {
    const files = req.body;
    await postUploadOriginalByFiles(files)
    res.status(201).json({ message: "success file upload " });
  } catch (err: any) {
    // продумать вывод ошибки ,
    console.log(err);
    return next(err);
  }
};

const getOriginalFiles: RequestHandler = async (req, res, next) => {
  try {
    const filesSubtitle = await getFilesByType("original");
    res.status(200).json({ message: "Found all files", filesSubtitle });
  } catch (e) {
    // продумать вывод ошибки ,
    console.log(e);
    return next(e);
  }
};

const deleteOriginalFiles: RequestHandler = async (req, res, next) => {
  try {
    const deletedAllFiles = await deleteAllFilesByType("original");
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

const deleteOriginalFileId: RequestHandler = async (req, res, next) => {
  try {
    const deletedFile = await deleteOriginalById(req.params.id as string);
    if (!deletedFile) {
      return res
        .status(404)
        .json({ message: "File not found or already deleted" });
    }
    res.status(200).json({ message: "Success delete file" });
  } catch (e) {
    next(e);
  }
};

export {
  postUpload,
  getOriginalFiles,
  deleteOriginalFiles,
  deleteOriginalFileId,
};
