import type { TypeModelAi } from "../@types/ai.js";
import { AI_MODELS } from "../config/free-models.js";
import { translateAiQuery } from "./mistral/mistral-client.js";
import { translateAiQueryOR } from "./openrouter/openrouter-client.js";
import type { ISubtitleProject } from "../@types/subtitle.js";


export async function searchAndSelectModelAi(modelAi: TypeModelAi[], original: ISubtitleProject) {
    const findModel = AI_MODELS.filter(model => model.modelId === modelAi[0]?.modelId);

    console.log("***********************************************************");
    console.log("Find the Model Id:", {
        modelAi: findModel[0]?.modelId,
        provider: findModel[0]?.provider,
    });
    console.log("***********************************************************");
    switch (findModel[0]?.provider) {
        case "MistralAI":
            return await translateAiQuery(original);
        case "OpenRouter":
            return await translateAiQueryOR(original, findModel[0]?.modelId);
        default:
            throw new Error("Unknown provider");
    }
}
