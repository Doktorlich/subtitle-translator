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
  id:string;
  fileName:string;
  status:SubtitleStatus;
  lines:ISubtitleLine[];
}
