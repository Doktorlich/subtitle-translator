import { AI_MODELS } from "../../config/free-models.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { AppError } from "../../utils/AppError.js";
import { loadSelectedAiModel, selectedAiModel } from "../../services/subtitle.service.js";

const getAiModels = catchAsync(async (req, res, next) => {
    if (AI_MODELS.length === 0) {
        return next(new AppError("Not fount File list model ", 500));
    }
    res.status(200).json({ message: "Loading ai models", models: AI_MODELS });
});

const postSelectedAiModel = catchAsync(async (req, res, next) => {
    const { modelName, modelId, provider } = req.body;
    if (!modelName || !modelId || !provider) {
        return next(new AppError("Missing required fields: modelName, modelId, or provider", 400));
    }
    const aiModel = await selectedAiModel(modelName, modelId, provider);
    if (!aiModel) {
        return next(new AppError("Failed to select or save the AI model", 422)); // 422: Unprocessable Entity
    }
    res.status(201).json({ message: "AI model selected successfully", modelId: aiModel });
});

const getDefaultAiModel = catchAsync(async (req, res, next) => {
    const aiModel = await loadSelectedAiModel();
    if (!aiModel) {
        return next(new AppError("Default AI model not found", 404));
    }
    res.status(200).json({ message: "Default model retrieved successfully", aiModel });
});

export { getAiModels, postSelectedAiModel, getDefaultAiModel };
