import type { RequestHandler } from "express";
import { AI_MODELS } from "../../config/free-models.js";
import { SelectedModel } from "../../models/SelectedAiModel.model.js";

const getAiModels: RequestHandler = async (req, res, next) => {
    try {
        res.status(200).json({ message: "Loading ai models", models: AI_MODELS });
    } catch (e) {
        console.log(e);
    }
};

const postSelectedAiModel: RequestHandler = async (req, res, next) => {
        const { modelId } = req.body;
        console.log("*******************************************");
        console.log("modelId", modelId);
        console.log("*******************************************");
    try {


        const aiModel = await SelectedModel.findOneAndUpdate(
            { key: "selectedAIModel" },
            { modelId: modelId },
            {
                upsert: true, // Создать если не найдено
                new: true, // Вернуть обновлённый документ
            },
        );
        res.status(200).json({ message: "saved modelId", modelId: aiModel });
    } catch (e) {
        console.log(e);
    }
};
// const getDefaultAiModel: RequestHandler = async (req, res, next) => {}
export { getAiModels, postSelectedAiModel };
