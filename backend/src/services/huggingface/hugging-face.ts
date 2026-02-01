
import { InferenceClient } from "@huggingface/inference";
import type { ISubtitleProject } from "../../@types/subtitle.js";

const systemPrompt = `
Ты — модуль перевода субтитров. Твои правила:
1. Вход: Массив объектов с "id" и "originalText".
2. Выход: СТРОГО JSON формат: { "translations": [ { "id": number, "text": "string" } ] }.
3. Переводи только "originalText" на русский.
4. Сохраняй технические термины и теги <v ...>.
5. НЕ пиши ничего, кроме JSON.
`;

export const translateAiQueryHF = async (original: ISubtitleProject, modelAi: string) => {
    // Используем новый актуальный класс InferenceClient
    const client = new InferenceClient(process.env.HF_TOKEN);

    try {
        const response = await client.chatCompletion({
            model: modelAi,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: JSON.stringify(original) },
            ],
            // Параметры генерации
            max_tokens: 25000,
            temperature: 0.1,
            // Для принудительного JSON на HF часто используют подсказки в промпте,
            // так как параметр response_format поддерживается не всеми провайдерами
        });

        const content = response.choices[0]?.message?.content;
        if (!content) throw new Error("Empty response from Hugging Face");

        return content;
    } catch (error) {
        console.error("Hugging Face API Error:", error);
        throw error;
    }
};


// Рекомендуемые модели для HF Inference:
// "meta-llama/Llama-3.1-8B-Instruct"
// "mistralai/Mistral-7B-Instruct-v0.3"
// "Qwen/Qwen2.5-72B-Instruct"
