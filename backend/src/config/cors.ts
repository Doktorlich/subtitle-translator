import { type CorsOptions } from 'cors';

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8080" // Ссылка на ваш фронтенд
];

 export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Разрешаем запросы без origin (например, мобильные приложения или curl)
    // или если origin находится в белом списке
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Нужно, если будете использовать куки или сессии
  optionsSuccessStatus: 200 // Для поддержки старых браузеров
};
