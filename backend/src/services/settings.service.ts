import { SettingsAiModel } from "../models/SettingsAi.model.js";

export async function loadSettingsAi() {
    return SettingsAiModel.find();
}
export function applySettings(deleteTransFile: boolean, restartSubFile: boolean) {
    return SettingsAiModel.findOneAndUpdate(
        {},
        { deleteTransFile: deleteTransFile, restartSubFile: restartSubFile },
        {
            upsert: true, // Создать если не найдено
            new: true, // Вернуть обновлённый документ
            setDefaultsOnInsert: true, // Применит дефолтные значения из схемы при создании
        },
    );
}
