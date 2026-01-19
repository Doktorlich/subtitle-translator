import { QueryClient } from "@tanstack/react-query";
import type { IGetFilesResponse } from "../models/api-responses.ts";

export const queryClient = new QueryClient();

export async function getFilesSubtitle(): Promise<IGetFilesResponse[]> {
  await new Promise((resolve) => setTimeout(resolve, 2500));
  const response = await fetch("api/v1/files", { method: "GET" });

  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching the files subtitle",
    );
    // error.code = response.status;
    // error.info = await response.json();
    throw error;
  }
  const files = await response.json();
  console.log("************************************************************");
  console.log("FILES SUBTITLE", files);
  console.log("************************************************************");

  return files;
}
