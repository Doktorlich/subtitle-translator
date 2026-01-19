// 1. Импортируем необходимые инструменты из mongoose
// Schema — для описания структуры, model — для создания объекта управления базой
import { Schema, model } from "mongoose";
// 2. Импортируем интерфейс, чтобы TypeScript контролировал соответствие полей
import type { ISubtitleProject } from "../@types/subtitle.js";
// 3. Импортируем вложенную схему (строки субтитров), которая будет храниться массивом
import { subtitleLineSchema } from "./SubtitleLine.schema.js";

// 4. Создаем схему. В <ISubtitleProject> передаем интерфейс для типизации
const projectSchema = new Schema<ISubtitleProject>(
  {
    // Используем ваш UUID в качестве главного ключа базы данных.
    // Мы называем его _id, так как MongoDB физически требует этот ключ для индексации.
    _id: { type: String, required: true },

    // Имя файла субтитров
    fileName: { type: String, required: true },

    // Статус проекта (idle, loading и т.д.). По умолчанию — 'idle'
    status: {
      type: String,
      // Мы перечисляем все допустимые значения из вашего интерфейса
      enum: [
        "idle",
        "loading",
        "translating",
        "verifying",
        "completed",
        "error",
      ],
      // Если значение не пришло — ставим "idle"
      default: "idle",
    },

    // Массив строк субтитров, использующий импортированную схему subtitleLineSchema
    lines: [subtitleLineSchema],
  },
  {
    // Опция timestamps автоматически добавит поля createdAt и updatedAt (тип Date)
    timestamps: true,

    // Настройка для того, чтобы виртуальные поля (например, 'id') попадали в JSON при отправке на фронтенд
    toJSON: { virtuals: true },

    // Настройка для того, чтобы виртуальные поля были видны при обычном выводе объекта в консоль
    toObject: { virtuals: true },
  },
);

/**
 * 5. Создаем "виртуальное поле" (Virtual Property).
 * Оно не хранится в базе данных, а вычисляется "на лету".
 * Мы копируем значение из _id в id, чтобы фронтенд (React) получал привычное поле 'id'.
 */
projectSchema.virtual("id").get(function () {
  return this._id;
});

/**
 * 6. Создаем и экспортируем Модель.
 * 'SubtitleProject' — это имя коллекции в базе данных (в БД будет называться subtitleprojects).
 * Именно через эту константу мы будем делать SubtitleProject.find(), .create() и т.д.
 */
export const SubtitleProjectModel = model<ISubtitleProject>(
  "SubtitleProject",
  projectSchema,
);
