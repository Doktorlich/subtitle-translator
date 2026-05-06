import { Schema, model } from "mongoose";

const SettingsAiSchema = new Schema({
    deleteTransFile: {
        type: Boolean,
        default: true,
    },
    restartSubFile: {
        type: Boolean,
        default: false,
    },
});

export const SettingsAiModel = model("SettingsAi", SettingsAiSchema);
