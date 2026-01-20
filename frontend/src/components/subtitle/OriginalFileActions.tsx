import Button from "../UI/ButtonItem.tsx";

import classes from "./FileActions.module.css";
import Status from "../UI/Status.tsx";
import { useMutation } from "@tanstack/react-query";
import { deleteFileId, queryClient } from "../../services/client.ts";
import type {  OriginalFileActionsProps } from "../../models/subtitle.ts";

export default function OriginalFileActions({ id,status }: OriginalFileActionsProps) {
    const deleteFile = useMutation({
        mutationFn: deleteFileId,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["files"] });
        },
    });
    return (
        <div className={classes.block}>
            <Button
                className={`${classes.button} ${classes["button-delete"]}`}
                onClick={() => deleteFile.mutate(id)}
            >
                DEL
            </Button>
            <Button className={`${classes.button} ${classes["button-translate"]}`}>TRANS</Button>
            {/*ТУТ БУДЕТ ДИНАМИЧЕСКИЙ КОМПОНЕНТ*/}
            <Status status={status} />
        </div>
    );
}
