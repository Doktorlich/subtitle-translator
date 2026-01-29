import type { ISubtitleLine, SubtitleFormat } from "../models/subtitle.ts";

function convertTimeSubToMs(time: string, formatFile: SubtitleFormat) {
    const parts = time
        .replace(formatFile === "vtt" ? "." : ",", ":")
        .split(":")
        .map(Number);
    const totalMs = ((parts[0] * 60 + parts[1]) * 60 + parts[2]) * 1000 + parts[3];
    return totalMs;
}


export const parser = (fileContent: string, formatFile: SubtitleFormat): ISubtitleLine[] => {
    const splitFileSub = fileContent
        .replace(/\r\n|\r/g, "\n")
        .replace(/\n/g, "\r\n")
        .trim()
        .split(/\n\s*\n/);

    let lineList;
    if (formatFile === "vtt") {
        lineList = splitFileSub
            .filter(sub => sub !== "WEBVTT\r")
            .map(subLine => subLine.trim().split(/\r\n/));
    } else {
        lineList = splitFileSub.map(subLine => subLine.trim().split(/\r\n/));
    }

    const formatSub = lineList
        .map((itemSub, index) => {
            if (itemSub[0].includes("-->")) {
                return [String(index + 1), ...itemSub];
            }
            const [indexSub, time, ...text] = itemSub;
            const joinText = text.join(" ");
            return [indexSub, time, joinText];
        })
        .map(itemSub => {
            const [indexSub, time, text] = itemSub;
            const [startTimeSub, endTimeSub] = time.split("-->");

            const startTime = convertTimeSubToMs(startTimeSub, formatFile);
            const endTime = convertTimeSubToMs(endTimeSub, formatFile);

            return {
                id: crypto.randomUUID(),
                index: indexSub,
                startTime: startTime,
                endTime: endTime,
                originalText: text,
            };
        });
    // console.log(formatSub);
    return formatSub;
};
