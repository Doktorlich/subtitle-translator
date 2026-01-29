import * as React from "react";

export type SubtitleStatus =
    | "idle"
    | "loading"
    | "translating"
    | "verifying"
    | "completed"
    | "error";

export interface ISubtitleLine {
    id: string;
    index: string;
    startTime: number;
    endTime: number;
    originalText: string;
    translatedText?: string;
}

export interface ISubtitleProject {
    id: string;
    fileName: string;
    status: SubtitleStatus;
    lines: ISubtitleLine[];
    createdAt?: Date;
    updatedAt?: Date;
}
export interface SubtitleState {
    subtitleOriginalList: ISubtitleProject[];
}

export interface SubtitleItemProps extends Pick<ISubtitleProject, "fileName"> {
    children: React.ReactNode;
}
export interface SubtitleFileBlob {
    fileName: string; // Имя файла (например, "movie_subs_en.vtt")
    blob: Blob; // Бинарные данные файла
}
export interface OriginalFileActionsProps extends Pick<ISubtitleProject, "id" | "status"> {}
export interface TranslatedFileActionsProps extends Pick<ISubtitleProject, "id"> {}

export interface IModelAi {
    id: string;
    name: string;
    provider: string;
    route: string;
    modelId: string;
    isFree: boolean;
    description:string;
}

export type SubtitleFormat = "vtt" | "srt";