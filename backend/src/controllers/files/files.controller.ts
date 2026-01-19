import type { RequestHandler } from "express";
import type { ISubtitleProject } from "../../@types/subtitle.js";
import { SubtitleProjectModel } from "../../models/SubtitleProject.model.js";

// export const uploadFile: RequestHandler = async (req, res, next) => {
//   // IDE сама подскажет, что в req есть body, params и т.д.
//   const { fileName } = req.body;
//
//   res.status(200).json({ message: "Файл получен" });
// };

const postUpload: RequestHandler = async (req, res, next) => {
  try {
    const files = req.body;
    // console.log(body);

    const projectToSave = files.map((file: ISubtitleProject) => ({
      _id: crypto.randomUUID(),
      fileName: file.fileName,
      lines: file.lines,
      status: "idle",
    }));

    await SubtitleProjectModel.insertMany(projectToSave);

    res.status(201).json({ message: "success file upload " });
  } catch (err: any) {
    // продумать вывод ошибки ,
    return next(err);
  }
};

const getOriginalFiles: RequestHandler = async (req, res, next) => {
  const filesSubtitle = await SubtitleProjectModel.find();
  try {
    res.status(200).json({ message: "Found all files", filesSubtitle });
  } catch (e) {
    // продумать вывод ошибки ,
    return next(e);
  }
};

export { postUpload, getOriginalFiles };
