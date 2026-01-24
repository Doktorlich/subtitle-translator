// Какие модели доступны и их особенности
export const MistralModels = {
  // Основные chat-модели
  "mistral-small": {
    // Самый быстрый и дешевый
    maxTokens: 32768, // Контекстное окно
    description: "Для простых задач, 24B параметров",
    costPer1KInput: 0.002, // $ за 1000 токенов ввода
    costPer1KOutput: 0.006, // $ за 1000 токенов вывода
  },

  "mistral-medium": {
    // Баланс качества/цены
    maxTokens: 32768,
    description: "Для сложных задач, лучшее качество",
    costPer1KInput: 0.0027,
    costPer1KOutput: 0.0081,
  },

  "mistral-large": {
    // Самая мощная (новейшая)
    maxTokens: 32768,
    description: "Для самых сложных задач, 123B параметров",
    costPer1KInput: 0.008,
    costPer1KOutput: 0.024,
  },

  // Специальные модели
  "codestral-mistral": {
    // Для программирования
    maxTokens: 32768,
    description: "Специализирована на коде",
    costPer1KInput: 0.003,
    costPer1KOutput: 0.009,
  },
} as const;

// Тип для TypeScript
export type MistralModel = keyof typeof MistralModels;
