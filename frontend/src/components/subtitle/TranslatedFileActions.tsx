import Button from "../UI/ButtonItem.tsx";

import classes from "./FileActions.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteFileId, getFilesSubtitle, queryClient } from "../../services/client.ts";
import Loader from "../UI/Loader.tsx";
import type { TranslatedFileActionsProps } from "../../models/subtitle.ts";
import { serializeToVtt } from "../../util/serializeToVtt.ts";

import type { IGetFilesResponse } from "../../models/api-responses.ts";
import { downloadFile } from "../../util/downloadFile.ts";

export default function TranslatedFileActions({ id }: TranslatedFileActionsProps) {
    const { mutate, isPending } = useMutation({
        mutationFn: deleteFileId,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["files"] });
        },
    });
    const { data } = useQuery<IGetFilesResponse[], Error, IGetFilesResponse>({
        queryKey: ["files", "translated"],
        queryFn: () => getFilesSubtitle("translated"),
        enabled: false,
    });

    function handleDownload() {
        const file = data?.filesSubtitle.filter((file: { id: string }) => file.id === id);
        if (!file) {
            throw new Error("File data not found");
        }
        const [{ fileName }] = file;
        const content = serializeToVtt(file);
        const blob = new Blob([content], { type: "text/vtt" });
        downloadFile(blob, `${fileName}`);
    }

    return (
        <div className={classes.block}>
            {isPending ? (
                <Loader key={id} />
            ) : (
                <Button
                    className={`${classes.button} ${classes["button-delete"]}`}
                    onClick={() => mutate(id)}
                >
                    DEL
                </Button>
            )}
            <Button className={`${classes.button} ${classes["button-check"]}`}>CHECK</Button>
            <Button
                className={`${classes.button} ${classes["button-download"]}`}
                onClick={handleDownload}
            >
                DOWN
            </Button>
        </div>
    );
}
