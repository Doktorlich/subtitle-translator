export interface IAITranslationResponse {
    translations: {
        id: string;
        text: string;
    }[];
}

export interface TypeModelAi {
    key: string;
    modelName: string;
    modelId: string;
    provider:string;
}