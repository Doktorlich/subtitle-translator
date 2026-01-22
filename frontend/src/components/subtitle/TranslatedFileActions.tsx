import Button from "../UI/ButtonItem.tsx";

import classes from "./FileActions.module.css";
import { useMutation } from "@tanstack/react-query";
import { deleteFileId, queryClient } from "../../services/client.ts";
import Loader from "../UI/Loader.tsx";
import type { TranslatedFileActionsProps } from "../../models/subtitle.ts";

export default function TranslatedFileActions({ id }: TranslatedFileActionsProps) {

    const { mutate, isPending,  } = useMutation({
        mutationFn: deleteFileId,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["files"] });
        },
    });
    const showLoader = isPending ;
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
            <Button className={`${classes.button} ${classes["button-check"]}`}>CHECK</Button>
            <Button className={`${classes.button} ${classes["button-download"]}`}>DOWN</Button>
        </div>
    );
}
