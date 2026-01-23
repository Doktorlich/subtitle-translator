import type { ISubtitleLine, ISubtitleProject } from "../models/subtitle.ts";
// это

function transformMsToTimeCode(timeMs: number) {
    const hours = Math.floor(timeMs / 3600000);
    const minutes = Math.floor((timeMs % 3600000) / 60000);
    const seconds = Math.floor((timeMs % 60000) / 1000);
    const milliseconds = timeMs % 1000;

    // Форматирование с добавлением нулей (pad)
    const h: string = String(hours).padStart(2, "0");
    const m: string = String(minutes).padStart(2, "0");
    const s: string = String(seconds).padStart(2, "0");
    const msStr: string = String(milliseconds).padStart(3, "0");
    const timeCode: string = `${h}:${m}:${s}.${msStr}`;
    return timeCode;
}

export function serializeToVtt(fileSub: ISubtitleProject[]) {
    const [{ lines }] = fileSub;
    let listLines = ``;
    lines.map((line: ISubtitleLine) => {
        return (listLines =
            listLines +
            `${line.index}\n${transformMsToTimeCode(line.startTime)} --> ${transformMsToTimeCode(line.endTime)}\n${line.translatedText}\n\n`);
    });

    const subtitleText = `WEBVTT\n\n${listLines}`;
    return subtitleText;
}
