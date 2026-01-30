import JSZip from "jszip";
import type { SubtitleFileBlob } from "../models/subtitle.ts";

export function download(blob: Blob, fileName: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    // document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export async function downloadArchiveZip(
    files: SubtitleFileBlob[],
    archiveName: string = "subtitle_archive.zip",
): Promise<void> {
    const zip = JSZip();
    files.forEach(file => {
        return zip.file(file.fileName, file.blob);
    });
    const zipBlob = await zip.generateAsync({
        type: "blob",
        compression: "STORE",
    });
    download(zipBlob, archiveName);
}
