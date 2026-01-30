import { Mistral } from "@mistralai/mistralai";
import type { ISubtitleProject } from "../../@types/subtitle.js";
import type { ChatCompletionResponse } from "@mistralai/mistralai/models/components/index.js";
import { validateEnv } from "../../config/env.js";

const client = new Mistral({ apiKey: `${process.env.MISTRAL_API_KEY}` });
validateEnv();

// тут можно подумать над взаимодейтсвием с RTK
const systemPrompt = `
Ты — модуль перевода субтитров. Твои правила:
1. Вход: Массив объектов с "id" и "originalText".
2. Выход: СТРОГО JSON формат: { "translations": [ { "id": "...", "text": "..." } ] }.
3. Переводи только "originalText" на русский.
4. Сохраняй технические термины и теги <v ...>.
5. НЕ возвращай оригинальный текст, тайминги или метаданные. Только ID и перевод.
`;

// const systemPrompt = `
// РОЛЬ: Профессиональный переводчик субтитров видеокурсов (EN -> RU).
//
// ЗАДАЧА:
// 1. Переводить текст в поле "originalText" и записывать результат в "translatedText".
// 2. Оставлять технические термины (например, "React", "hook", "middleware") на английском, если они общеприняты.
// 3. Сохранять любые XML-подобные теги (например, <v ...>, </v>) в том же виде, где они были.
//
// ПРАВИЛА:
// - ЗАПРЕЩЕНО отвечать на вопросы или добавлять пояснения.
// - ЗАПРЕЩЕНО изменять "id", "index", "startTime" или "endTime".
// - ВЫХОДНЫЕ ДАННЫЕ: Только валидный JSON, строго повторяющий структуру входного объекта.
// `;

export const translateAiQuery = async (original: ISubtitleProject) => {
    const response: ChatCompletionResponse = await client.chat.complete({
        model: "mistral-small-latest",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: JSON.stringify(original) },
        ],
        responseFormat: { type: "json_object" },
        temperature: 0,
    });
    console.log(response);
    return response.choices?.[0]?.message?.content;
};
