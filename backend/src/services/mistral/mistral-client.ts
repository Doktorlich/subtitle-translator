import { Mistral } from "@mistralai/mistralai";
import type { ISubtitleProject } from "../../@types/subtitle.js";
import type { ChatCompletionResponse } from "@mistralai/mistralai/models/components/index.js";
import pRetry from "p-retry";
import { validateEnv } from "../../config/env.js";
import { Agent, setGlobalDispatcher } from "undici";
const client = new Mistral({ apiKey: `${process.env.MISTRAL_API_KEY}` });
validateEnv();

// тут можно подумать над взаимодейтсвием с RTK
// const systemPrompt2 = `
// Ты — модуль перевода субтитров. Твои правила:
// 1. Вход: Массив объектов с "id" и "originalText".
// 2. Выход: СТРОГО JSON формат: { "translations": [ { "id": "...", "text": "..." } ] }.
// 3. Переводи только "originalText" на русский.
// 4. Сохраняй технические термины и теги <v ...>.
// 5. НЕ возвращай оригинальный текст, тайминги или метаданные. Только ID и перевод.
// `;

// const systemPrompt = `Translate subtitle objects to Russian.
// Input: [{"id": "...", "originalText": "..."}].
// Output JSON: {"translations": [{"id": "...", "text": "..."}]}.
// Keep <v ...> tags. No talk, just JSON.`;

// const systemPrompt = `
// ACT: Professional Subtitle Translator.
// STRICT RULES:
// 1. Input: Array of objects {id, originalText}.
// 2. Output: JSON { "translations": [{id, text}] }.
// 3. CONSTRAINT: Output array length MUST EQUAL input array length.
// 4. MAPPING: Translate each "originalText" into Russian individually. Do not merge, do not split, do not skip.
// 5. FORMAT: No conversational text, only valid JSON.
// 6. CONTENT: Keep technical terms in English.
// `;

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

const systemPrompt = `
ACT: Professional Subtitle Translator.
STRICT RULES:
1. Input: Array of objects {id, originalText}.
2. Output: JSON { "translations": [{id, text}] }.
3. CONSTRAINT: Output array length MUST EXACTLY EQUAL input array length (e.g., if there are 150 inputs, there must be 150 translations).
4. MAPPING: Translate each "originalText" into Russian individually. Do not merge, do not split, do not skip.
5. TIMING: Maintain strict 1:1 mapping between IDs and translations to preserve timing alignment. Do not consolidate sentences.
6. FORMAT: No conversational text, only valid JSON.
7. CONTENT: Keep technical terms in English.
`;
setGlobalDispatcher(
    new Agent({
        connectTimeout: 60_000,
        headersTimeout: 0, // Ждать заголовки сколько угодно
        bodyTimeout: 0, // Ждать тело ответа (перевод) сколько угодно
    }),
);
export const translateAiQuery = async (original: any[], modelAi: string) => {
    const run = async () => {
        const response = await client.chat.complete({
            model: modelAi,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: JSON.stringify(original) },
            ],
            responseFormat: { type: "json_object" },
            temperature: 0,
        });

        const content = response.choices?.[0]?.message?.content;
        if (!content) throw new Error("Empty content");

        // Проверка на "схлопывание" (чтобы не было пропусков)

        if (parsed.translations.length !== original.length) {
            throw new Error("Row count mismatch");
        }

        return content;
    };

    // Если упал fetch или не совпало кол-во строк — он попробует 3 раза
    return await pRetry(run, { retries: 3 });
};
