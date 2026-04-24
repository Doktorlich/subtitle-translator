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
    postTranslateFiles,
} from "./files/filesTranslated.controller.js";
import {
    getAiModels,
    getDefaultAiModel,
    getSettingsAi,
    postSelectedAiModel,
    postSettingsAi,
} from "./ai/ai.controller.js";

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
export const aiControllers = {
    getAiModel: getAiModels,
    postSelectedAiModel: postSelectedAiModel,
    getDefaultAiModel: getDefaultAiModel,

    getSettingsAi: getSettingsAi,
    postSettingsAi: postSettingsAi,
};
