import {
  deleteFileId,
  deleteOriginalFiles,
  getOriginalFiles,
  postUpload,
} from "./files/filesOriginal.controller.js";
import {
  deleteTranslatedFiles,
  getTranslatedFiles,
  postTranslateFileId,
  postTranslateFiles
} from "./files/filesTranslated.controller.js";

export const filesControllers = {
  postUpload: postUpload,
  getOriginalFiles: getOriginalFiles,
  deleteOriginalFiles: deleteOriginalFiles,
  deleteFileId: deleteFileId,

  getTranslatedFiles: getTranslatedFiles,
  postTranslateFiles: postTranslateFiles,
  postTranslateFileId: postTranslateFileId,
  deleteTranslatedFiles: deleteTranslatedFiles,
};
