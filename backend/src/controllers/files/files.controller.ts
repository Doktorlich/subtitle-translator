import type { RequestHandler } from "express";
import type { ISubtitleProject } from "../../@types/subtitle.js";
import { SubtitleProjectModel } from "../../models/SubtitleProject.model.js";


const postUpload: RequestHandler = async (req, res, next) => {
  try {
    const files = req.body;
    const projectToSave = files.map((file: ISubtitleProject) => ({
      _id: crypto.randomUUID(),
      type: "original",
      fileName: file.fileName,
      lines: file.lines,
      status: "idle",
    }));
    await SubtitleProjectModel.insertMany(projectToSave);
    res.status(201).json({ message: "success file upload " });
  } catch (err: any) {
    // продумать вывод ошибки ,
    console.log(err);
    return next(err);
  }
};

const getOriginalFiles: RequestHandler = async (req, res, next) => {
  const filesSubtitle = await SubtitleProjectModel.find({ type: "original" });
  try {
    res.status(200).json({ message: "Found all files", filesSubtitle });
  } catch (e) {
    // продумать вывод ошибки ,
    console.log(e);
    return next(e);
  }
};

const deleteOriginalFiles: RequestHandler = async (req, res, next) => {
  try {
    const deletedAllFiles = await SubtitleProjectModel.deleteMany({
      type: "original",
    });
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
  const id = req.params.id;
  try {
    const deletedFile = await SubtitleProjectModel.findOneAndDelete({
      _id: id as string,
      type: "original",
    });
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
