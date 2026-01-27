import type { IModelAi, ISubtitleProject } from "./subtitle.ts";

export interface IGetFilesResponse {
    message: string;
    filesSubtitle: ISubtitleProject[];
}
export interface IGetModelAiResponse {
    message: string;
    models: IModelAi[];
}