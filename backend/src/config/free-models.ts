export const FREE_MODELS = {
    //  бесплатные
    MISTRAL_7B: "mistralai/mistral-7b-instruct",
    MISTRAL_SMALL: "mistralai/mistral-small-latest",
    GEMMA_7B: "google/gemma-7b-it",
    LLAMA3_8B: "meta-llama/llama-3-8b-instruct",
    LLAMA3_3B: "meta-llama/llama-3.2-3b-instruct",
    ZEPHYR_7B: "huggingfaceh4/zephyr-7b-beta",

    PHI3_MEDIUM: "microsoft/phi-3-medium-4k-instruct",
    QWEN_7B: "qwen/qwen-2.5-7b-instruct",
    DOLPHIN_LLAMA: "cognitivecomputations/dolphin-2.9-llama-3-8b",

    // 🇷🇺
    SAO10K_RU: "sao10k/l3.1-8b-russia",
    OPENCHAT: "openchat/openchat-3.5-0106",

    //  Бесплатные лимиты (есть квоты)
    GPT35_TURBO: "openai/gpt-3.5-turbo",
    GPT4O_MINI: "openai/gpt-4o-mini",
    CLAUDE_HAIKU: "anthropic/claude-3.5-haiku",
    GEMINI_FLASH: "google/gemini-2.0-flash",
};

export const AI_MODELS = [
    // --- OPENROUTER (Бесплатные) ---
    {
        id: "mistral-7b", //valid
        name: "Mistral 7B Instruct",
        provider: "OpenRouter",
        // route: "/api/translate/mistral",
        modelId: "mistralai/mistral-7b-instruct",
        isFree: true,
        description: "Легкая и быстрая модель, отлично подходит для простых задач.",
    },
    // {
    //     id: "mistral-small", //invalid
    //     name: "Mistral Small",
    //     provider: "OpenRouter",
    //     // route: "/api/translate/mistral",
    //     modelId: "mistralai/mistral-small-latest",
    //     isFree: true,
    //     description: "Сбалансированная модель от Mistral AI для широкого спектра задач.",
    // },
    // {
    //     id: "gemma-7b", //invalid
    //     name: "Gemma 7B IT",
    //     provider: "OpenRouter",
    //     // route: "/api/translate/google",
    //     modelId: "google/gemma-7b-it",
    //     isFree: true,
    //     description: "Модель от Google, оптимизированная для чатов.",
    // },
    {
        id: "llama3-8b", //valid
        name: "Llama 3 8B",
        provider: "OpenRouter",
        // route: "/api/translate/llama",
        modelId: "meta-llama/llama-3-8b-instruct",
        isFree: true,
        description: "Популярная модель от Meta с хорошим пониманием инструкций.",
    },
    {
        id: "llama3-3b", //valid
        name: "Llama 3.2 3B",
        provider: "OpenRouter",
        // route: "/api/translate/llama",
        modelId: "meta-llama/llama-3.2-3b-instruct",
        isFree: true,
        description: "Ультра-легкая модель для мгновенных ответов.",
    },
    // {
    //     id: "zephyr-7b", //invalid
    //     name: "Zephyr 7B Beta",
    //     provider: "OpenRouter",
    //     // route: "/api/translate/mistral",
    //     modelId: "huggingfaceh4/zephyr-7b-beta",
    //     isFree: true,
    //     description: "Дообученная Mistral, одна из лучших в категории 7B.",
    // },
    // {
    //     id: "phi3-medium", //invalid
    //     name: "Phi-3 Medium",
    //     provider: "OpenRouter",
    //     // route: "/api/translate/microsoft",
    //     modelId: "microsoft/phi-3-medium-4k-instruct",
    //     isFree: true,
    //     description: "Компактная модель от Microsoft с высокой эффективностью.",
    // },
    {
        id: "qwen-7b", //valid
        name: "Qwen 2.5 7B",
        provider: "OpenRouter",
        // route: "/api/translate/qwen",
        modelId: "qwen/qwen-2.5-7b-instruct",
        isFree: true,
        description: "Модель от Alibaba, сильна в логике и математике.",
    },
    // {
    //     id: "dolphin-llama", //invalid
    //     name: "Dolphin Llama 3",
    //     provider: "OpenRouter",
    //     // route: "/api/translate/llama",
    //     modelId: "cognitivecomputations/dolphin-2.9-llama-3-8b",
    //     isFree: true,
    //     description: "Llama без цензуры для творческих задач.",
    // },
    // // --- РУССКОЯЗЫЧНЫЕ ---
    // {
    //     id: "sao10k-ru", //invalid
    //     name: "L3.1 Russia",
    //     provider: "OpenRouter",
    //     // route: "/api/translate/llama",
    //     modelId: "sao10k/l3.1-8b-russia",
    //     isFree: true,
    //     description: "Специально дообучена для работы с русским языком.",
    // },
    // {
    //     id: "openchat", //invalid
    //     name: "OpenChat 3.5",
    //     provider: "OpenRouter",
    //     // route: "/api/translate/openchat",
    //     modelId: "openchat/openchat-3.5-0106",
    //     isFree: true,
    //     description: "Открытая модель, сопоставимая с GPT-3.5 по качеству.",
    // },
    // --- МОДЕЛИ С ЛИМИТАМИ ---
    {
        id: "gpt35-turbo", //valid
        name: "GPT-3.5 Turbo",
        provider: "OpenRouter",
        // route: "/api/translate/openai",
        modelId: "openai/gpt-3.5-turbo",
        isFree: true,
        description: "Классика от OpenAI, быстрая и надежная.",
    },
    {
        id: "gpt4o-mini", //valid
        name: "GPT-4o Mini",
        provider: "OpenRouter",
        // route: "/api/translate/openai",
        modelId: "openai/gpt-4o-mini",
        isFree: true,
        description: "Новая умная модель, заменяющая GPT-3.5.",
    },
    {
        id: "claude-haiku", //valid
        name: "Claude 3.5 Haiku",
        provider: "OpenRouter",
        // route: "/api/translate/anthropic",
        modelId: "anthropic/claude-3.5-haiku",
        isFree: true,
        description: "Самая быстрая модель от Anthropic.",
    },
    // {
    //     id: "gemini-flash", //invalid
    //     name: "Gemini 2.0 Flash",
    //     provider: "OpenRouter",
    //     // route: "/api/translate/google",
    //     modelId: "google/gemini-2.0-flash",
    //     isFree: true,
    //     description: "Мультимодальная модель от Google с огромным контекстом.",
    // },
    {
        id: "mistral-direct-small", //valid
        name: "Mistral Small (Direct)",
        provider: "Mistral AI",
        // route: "/api/translate/mistral-direct",
        modelId: "mistral-small-latest",
        isFree: false,
        description: "Прямое API Mistral. Самый стабильный и быстрый перевод JSON.",
    },
    {
        id: "Upstage: Solar Pro 3 (free)", //valid
        name: "Upstage: Solar Pro 3 (free)",
        provider: "Solar Pro 3",
        // route: "/api/translate/mistral-direct",
        modelId: "upstage/solar-pro-3:free",
        isFree: false,
        description: "Слишком долгий перевод",
    },
    {
        id: "TNG: DeepSeek R1T Chimera (free)", //valid
        name: "DeepSeek R1T Chimera",
        provider: "TNG: DeepSeek R1T Chimera (free)",
        modelId: "tngtech/deepseek-r1t-chimera:free",
        isFree: true,
        description: "Бесплатная модель от DS",
    },
    {
        id: "TNG: DeepSeek R1T2 Chimera (free)", //valid
        name: "DeepSeek R1T2 Chimera",
        provider: "TNG: DeepSeek R1T2 Chimera (free)",
        // route: "",
        modelId: "tngtech/deepseek-r1t2-chimera:free",
        isFree: true,
        description: "Бесплатная модель от DS",
    },

];

// {
//     id: "", //valid
//         name: "",
//     provider: "",
//     // route: "",
//     modelId: "",
//     isFree: ,
//     description: "",
// },
