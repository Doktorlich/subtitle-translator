import type { ChangeEvent } from "react";
import { parserVTT } from "./srtParser.ts";

import type { SubtitleStatus } from "../models/subtitle.ts";

// Добавляем ключевое слово async, так как внутри будет асинхронное чтение
export async function readFiles(event: ChangeEvent<HTMLInputElement>) {
  const files = event.target.files;
  if (!files) return;

  // Используем Array.from для превращения FileList в массив
  const filesArray = Array.from(files);

  // Используем Promise.all, чтобы запустить чтение всех файлов параллельно.
  // Это быстрее, чем читать их по очереди.
  try {
    const projects = await Promise.all(
      filesArray.map(async (file) => {
        // --- АСИНХРОННОЕ ЧТЕНИЕ ---
        // Вместо создания new FileReader() и ожидания onload,
        // мы просто "ждем" (await) текст файла напрямую.
        const content = await file.text();

        // Теперь у нас есть content в виде строки, как и раньше.
        // Передаем его в  парсер.
        let parseFileList = parserVTT(content);

        // Мы возвращаем объект, который потом полетит в RTK.
        // Это и есть тот самый "главный объект", о котором ты говорил.
        return {
          id: crypto.randomUUID(), // ID проекта
          fileName: file.name, // Имя файла
          status: "idle" as SubtitleStatus, // Начальный статус
          lines: parseFileList, //  массив ISubtitleLine[]
        };
      }),
    );

    // В этой точке переменная 'projects' — это массив готовых объектов.

    console.log("Все файлы прочитаны асинхронно:", projects);
    return projects;
  } catch (error) {
    // Если хотя бы один файл не прочитается (например, ошибка диска),
    // мы попадем сюда.

    console.error("Ошибка при асинхронном чтении файлов:", error);
  }
}
