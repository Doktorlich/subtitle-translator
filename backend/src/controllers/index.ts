import {
  deleteOriginalFileId,
  deleteOriginalFiles,
  getOriginalFiles,
  postUpload,
} from "./files/filesOriginal.controller.js";
import {
  getTranslatedFiles,
  postTranslateFileId,
  postTranslateFiles,
} from "./files/filesTranslated.controller.js";

export const filesControllers = {
  postUpload: postUpload,
  getOriginalFiles: getOriginalFiles,
  deleteOriginalFiles: deleteOriginalFiles,
  deleteOriginalFileId: deleteOriginalFileId,

  getTranslatedFiles: getTranslatedFiles,
  postTranslateFiles: postTranslateFiles,
  postTranslateFileId: postTranslateFileId,
};
