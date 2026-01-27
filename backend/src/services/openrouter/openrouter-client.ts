import type { ISubtitleProject } from "../../@types/subtitle.js";
import { validateEnv } from "../../config/env.js";

validateEnv();

const systemPrompt = `
Ты — модуль перевода субтитров. Твои правила:
1. Вход: Массив объектов с "id" и "originalText".
2. Выход: СТРОГО JSON формат: { "translations": [ { "id": "...", "text": "..." } ] }.
3. Переводи только "originalText" на русский.
4. Сохраняй технические термины и теги <v ...>.
5. НЕ возвращай оригинальный текст, тайминги или метаданные. Только ID и перевод.
`;


export const translateAiQueryOR = async (original: ISubtitleProject, modelAi:string) => {
    const apiKey = process.env.OPENROUTER_API_KEY!;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            // URL вашего приложения
            "HTTP-Referer": process.env.APP_URL || "http://localhost:3000",
            // Название вашего приложения
            "X-Title": "Subtitle Translator",
        },
        body: JSON.stringify({
            //  Выбираем модель для перевода
            model: modelAi, // Или 'anthropic/claude-3-haiku' для качества

            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: JSON.stringify(original) },
            ],

            //  Обязательно для JSON ответа
            response_format: { type: "json_object" },

            // Ваши настройки
            temperature: 0,
            max_tokens: 10000,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`OpenRouter error: ${data.error?.message || "Unknown error"}`);
    }

    console.log("******************************************************************************");
    console.log("Translation response:", data);
    console.log("******************************************************************************");
    return data.choices[0].message.content;
};
