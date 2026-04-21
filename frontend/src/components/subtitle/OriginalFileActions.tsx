import Button from "../UI/ButtonItem.tsx";

import classes from "./FileActions.module.css";
import Status from "../UI/Status.tsx";
import { useMutation } from "@tanstack/react-query";
import { deleteFileId, queryClient, translateFileById } from "../../services/client.ts";
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
    const { mutate: mutateTrans, isPending: isPendingTrans } = useMutation({
        mutationFn: translateFileById,
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
            {statusTranslate === "translating" || isPendingTrans ? (
                <Loader key={id} />
            ) : (
                <Button
                    className={`${classes.button} ${classes["button-translate"]}`}
                    onClick={() => mutateTrans(id)}
                    disabled={isPending}
                >
                    TRANS
                </Button>
            )}

            {/*ТУТ БУДЕТ ДИНАМИЧЕСКИЙ КОМПОНЕНТ*/}
            <Status status={statusTranslate} />
        </div>
    );
}
