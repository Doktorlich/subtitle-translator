import { Schema } from "mongoose";
import type { ISubtitleLine } from "../@types/subtitle.js";

export const subtitleLineSchema = new Schema<ISubtitleLine>(
  {
    id: { type: String, required: true },
    index: { type: String, required: true },
    startTime: { type: Number, required: true },
    endTime: { type: Number, required: true },
    originalText: { type: String, required: true },
    translatedText: { type: String },
  },
  { _id: false },// ОТКЛЮЧАЕМ автоматический _id
);
