import { QueryClient } from "@tanstack/react-query";
import type { IGetFilesResponse } from "../models/api-responses.ts";
import type { ISubtitleProject } from "../models/subtitle.ts";

export const queryClient = new QueryClient();

export async function getFilesSubtitle(): Promise<IGetFilesResponse[]> {
    // await new Promise(resolve => setTimeout(resolve, 2500));
    const response = await fetch("api/v1/files/original", { method: "GET" });

    if (!response.ok) {
        const error = new Error("An error occurred while fetching the files subtitle");
        // error.code = response.status;
        // error.info = await response.json();
        console.log(error);
        throw error;
    }
    const files = await response.json();
    return files;
}

export async function postUploadFiles(filesSubtitle: ISubtitleProject[]): Promise<Response> {
    const response = await fetch("/api/v1/files/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filesSubtitle),
    });
    if (!response.ok) {
        const error = new Error("An error occurred while upload the files");
        console.log(error);
        throw error;
    }
    return response;
}

export async function deleteAllFiles() {
    const response = await fetch(`/api/v1/files/delete`, { method: "DELETE" });
    if (!response.ok) {
        // Старайтесь извлекать описание ошибки из ответа сервера, если оно есть
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData.message || "An error occurred while deleting the file");
        console.error(error);
        throw error; // TanStack Query перехватит эту ошибку и перейдет в состояние isError
    }
}
export async function deleteFileId(id: string): Promise<void> {
    const response = await fetch(`/api/v1/files/${id}/delete`, { method: "DELETE" });
    if (!response.ok) {
        // Старайтесь извлекать описание ошибки из ответа сервера, если оно есть
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData.message || "An error occurred while deleting the file");
        console.error(error);
        throw error; // TanStack Query перехватит эту ошибку и перейдет в состояние isError
    }
}
