import type { ISubtitleProject } from "./subtitle.ts";

export interface IGetFilesResponse {
  message: string;
  filesSubtitle: ISubtitleProject[];
}