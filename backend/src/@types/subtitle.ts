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
  translatedText?:string;
}

export interface ISubtitleProject {
  _id:string;
  type: string;
  fileName:string;
  status:SubtitleStatus;
  lines:ISubtitleLine[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface SubtitleState {
  subtitleOriginalList: ISubtitleProject[];
}