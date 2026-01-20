import Button from "../UI/ButtonItem.tsx";

import classes from "./FileActions.module.css";
import Status from "../UI/Status.tsx";
import { useMutation } from "@tanstack/react-query";
import { deleteFileId, queryClient } from "../../services/client.ts";
import type { OriginalFileActionsProps } from "../../models/subtitle.ts";
import Loader from "../UI/Loader.tsx";

export default function OriginalFileActions({
    id,
    status: statusTranslate,
}: OriginalFileActionsProps) {
    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: deleteFileId,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["files"] });
        },
    });
    const showLoader = isPending || isSuccess;
    return (
        <div className={classes.block}>
            {showLoader ? (
                <Loader key={id} />
            ) : (
                <Button
                    className={`${classes.button} ${classes["button-delete"]}`}
                    onClick={() => mutate(id)}
                >
                    DEL
                </Button>
            )}
            <Button className={`${classes.button} ${classes["button-translate"]}`}>TRANS</Button>
            {/*ТУТ БУДЕТ ДИНАМИЧЕСКИЙ КОМПОНЕНТ*/}
            <Status status={statusTranslate} />
        </div>
    );
}
