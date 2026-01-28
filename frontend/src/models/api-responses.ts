import type { IModelAi, ISubtitleProject } from "./subtitle.ts";

export interface IGetFilesResponse {
    message: string;
    filesSubtitle: ISubtitleProject[];
}
export interface ISelectModelAiResponse {
    message: string;
    models: IModelAi[];
}


export interface TypeModelAi {
    key: "selectedAIModel";
    modelName: string;
    modelId: string;
}
export interface IGetModelAiResponse {
    message: string;
    modelAi: TypeModelAi[];
}