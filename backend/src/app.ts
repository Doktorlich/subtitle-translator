import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import {
  notFoundHandler,
  registerProcessEvents,
  globalErrorHandler,
} from "./config/error-handlers.js";
import { corsOptions } from "./config/cors.js";
import { loggerMorgan } from "./config/logger.js";
import { securityHelmet } from "./config/security.js";

const app = express();
//1 регистрируем системные события
registerProcessEvents();
//2 Обычные middleware (cors, json)
app.use(cors(corsOptions));
app.use(loggerMorgan);
// app.use(securityHelmet);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//3 маршруты
app.use(routes);
//4 После всех маршрутов — обработчик 404
app.use(notFoundHandler);
//5 САМЫМ ПОСЛЕДНИМ — глобальный обработчик ошибок
app.use(globalErrorHandler);

export default app;
