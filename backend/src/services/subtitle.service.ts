// src/services/subtitle.service.ts
import { SubtitleProjectModel } from "../models/SubtitleProject.model.js";
import type { ISubtitleProject } from "../@types/subtitle.js";

export const getFilesByType = (fileType: "original" | "translated") => {
  return SubtitleProjectModel.find({ type: fileType });
};
// здесь же могут быть другие функции, например, createProject, deleteProject и т.д.
export const deleteAllFilesByType = (fileType: "original" | "translated") => {
  return SubtitleProjectModel.deleteMany({ type: fileType });
};

export const deleteOriginalById = (id: string) => {
  return SubtitleProjectModel.findOneAndDelete({
    _id: id,
    type: "original",
  });
};

export const postUploadOriginalByFiles = (files: ISubtitleProject[]) => {
  const projectToSave = files.map((file: ISubtitleProject) => ({
    _id: crypto.randomUUID(),
    type: "original",
    fileName: file.fileName,
    lines: file.lines,
    status: "idle",
  }));
  return SubtitleProjectModel.insertMany(projectToSave);
};
