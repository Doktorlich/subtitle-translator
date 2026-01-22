// потом добавить еще один контроллер
// translateAi.controller.ts

import type { RequestHandler } from "express";
import type { ISubtitleProject } from "../../@types/subtitle.js";
import { SubtitleProjectModel } from "../../models/SubtitleProject.model.js";
import {
  deleteAllFilesByType,
    getFilesByType,
} from "../../services/subtitle.service.js";

const getTranslatedFiles: RequestHandler = async (req, res, next) => {
  try {
    const filesSubtitle = await getFilesByType("translated");
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
    const fileData = req.body;
    

    //Данный код понадобится при реализации уже перевода через нейросеть
    // const id = req.params.id;

    // if (!id || typeof id !== "string") {
    //   return res.status(400).json({ message: "Invalid or missing ID" });
    // }

    // const original = await SubtitleProjectModel.findOne({
    //   _id: id,
    //   type: "original",
    // });
    // if (!original) {
    //   return res.status(404).json({ message: "Original file not found" });
    // }
    // временное тестовое решение
    const copy = new SubtitleProjectModel({
      ...fileData[0],
      _id: crypto.randomUUID(),
      type: "translated",
      status: "completed",
    });
    await copy.save();
    res
      .status(201)
      .json({ message: "success  created  file's copy", id: copy._id });
  } catch (err: any) {
    // продумать вывод ошибки ,
    console.log(err);
    return next(err);
  }
};

const deleteTranslatedFiles: RequestHandler = async (req, res, next) => {
  try {
    const deletedAllFiles = await deleteAllFilesByType("translated");
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
