export interface IAITranslationResponse {
    translations: {
        id: string;
        text: string;
    }[];
}

export interface TypeModelAi {
    key: "selectedAIModel";
    modelName: string;
    modelId: string;
}