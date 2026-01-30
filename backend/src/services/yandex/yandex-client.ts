import OpenAI from "openai";
import type { ISubtitleProject } from "../../@types/subtitle.js";
import { validateEnv } from "../../config/env.js";

validateEnv();

// Инициализируем клиент Яндекса один раз
const client = new OpenAI({
    apiKey: process.env.YANDEX_API_KEY!,
    baseURL: "https://ai.api.cloud.yandex.net/v1",
});

const systemPrompt = `
Ты — модуль перевода субтитров. Твои правила:
1. Вход: Массив объектов с "id" и "originalText".
2. Выход: СТРОГО JSON формат: { "translations": }.
3. Переводи только "originalText" на русский.
4. Сохраняй технические термины и теги <v ...>.
5. НЕ возвращай оригинальный текст, тайминги или метаданные. Только ID и перевод.
`;

// Передаем сюда только имя модели (например, 'yandexgpt-lite' или 'yandexgpt')
export const translateAiQueryYC = async (original: ISubtitleProject, modelName: string) => {
    // !!! ВАЖНО: Добавьте ваш ID КАТАЛОГА в переменную окружения !!!
    const FOLDER_ID = process.env.YANDEX_FOLDER_ID;

    const modelUri = `gpt://${FOLDER_ID}/${modelName}`;

    const response = await client.chat.completions.create({
        model: modelUri, // Динамически формируем полный URI модели
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: JSON.stringify(original) },
        ],
        response_format: { type: "json_object" },
        temperature: 0,
    });

    console.log(response);
    return response.choices?.[0]?.message?.content;
};

// Пример использования:
// translateAiQueryYC(originalData, 'yandexgpt-lite'); // Быстрая модель
// translateAiQueryYC(originalData, 'yandexgpt');     // Качественная модель
