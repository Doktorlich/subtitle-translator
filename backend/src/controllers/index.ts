import {
  deleteOriginalFileId,
  deleteOriginalFiles,
  getOriginalFiles,
  postUpload,
} from "./files/files.controller.js";

export const filesControllers = {
  postUpload: postUpload,
  getFiles: getOriginalFiles,
  deleteAllFile: deleteOriginalFiles,
  deleteFile: deleteOriginalFileId,
};
