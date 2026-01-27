// models/SelectedModel.ts
import { Schema, model } from "mongoose";

// const SelectedModelSchema = new Schema({
//     key: { type: String, required: true, default: "selectedAIMode", unique: true },
//
// });
const SelectedModelSchema = new Schema({
    // Уникальный ключ настройки (например: 'selectedAIModel', 'defaultLanguage')
    key: {
        type: String,
        required: true,
        unique: true, // ⬅️ Гарантируем только одну запись на ключ
    },

    // Значение может быть любым типом (строка, число, объект, массив)
    modelId: {
        type: String,
        required: true,
    },


});

export const SelectedModel = model("SelectedModel", SelectedModelSchema);
