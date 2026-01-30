import { Groq } from "groq-sdk";
import type { ISubtitleProject } from "../../@types/subtitle.js";

const systemPrompt = `
Ты — модуль перевода субтитров. Твои правила:
1. Вход: Массив объектов с "id" и "originalText".
2. Выход: СТРОГО JSON формат: { "translations": [ { "id": number, "text": "string" } ] }.
3. Переводи только "originalText" на русский. Сохраняй технический контекст программирования.
4. Сохраняй теги <v ...>.
5. НЕ пиши ничего, кроме JSON.
`;

export const translateAiQueryGroq = async (original: ISubtitleProject, modelAi: string) => {
    const client = new Groq({
        apiKey: process.env.GROQ_API_KEY,
    });

    try {
        const response = await client.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: JSON.stringify(original) },
            ],
            // Используйте актуальную модель из списка Groq
            model: modelAi,
            response_format: { type: "json_object" },
            temperature: 0, // Ставим 0 для стабильности JSON и точности перевода
        });

        // Контент приходит строкой, его нужно распарсить
        const content = response.choices[0]?.message?.content;
        if (!content) throw new Error("Empty response from AI");

        return content;
    } catch (error) {
        console.error("Groq API Error:", error);
        throw error;
    }
};

//llama-3.1-8b-instant
//llama-3.3-70b-versatile
