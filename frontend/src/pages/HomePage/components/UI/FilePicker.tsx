import classes from "./FilePicker.module.css";
import { useRef } from "react";
import * as React from "react";

import { readFiles } from "../../../../util/readFiles.ts";
import { useMutation } from "@tanstack/react-query";
import { postUploadFiles, queryClient } from "../../../../services/client.ts";
import Loader from "../../../../components/UI/Loader.tsx";
import Button from "../../../../components/UI/ButtonItem.tsx";

export default function FilePicker() {
    const { mutate, isPending } = useMutation({
        mutationFn: postUploadFiles,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["files"] });
        },
    });

    const inputRef = useRef<HTMLInputElement>(null);

    function handleBtnClick() {
        inputRef.current?.click();
    }

    async function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const projects = await readFiles(event);
        if (projects) {
            // Трансформируем данные, заменяя undefined на []
            const validProjects = projects.map(project => ({
                ...project,
                lines: project.lines ?? [],
            }));

            mutate(validProjects);
        }
        event.target.value = "";
    }
    const showLoader = isPending;
    return (
        <div className={classes.picker}>
            <input
                className={classes.input}
                ref={inputRef}
                onChange={handleInputChange}
                type="file"
                accept=".vtt, .srt, text/vtt, application/x-subrip"
                multiple
                disabled={isPending}
            />

            <div
                className={`${classes.wrapper} ${isPending ? classes.disabled : ""}`}
                onClick={!isPending ? handleBtnClick : undefined}
            >
                {/* Если идет загрузка — показываем лоадер, если нет — кнопку (children) */}
                <Button
                    className={`${classes.button} ${classes["button-download"]}`}
                    disabled={isPending}
                >
                    {showLoader ? (
                        <div className={classes["loader-wrapper"]}>
                            <Loader size={25} />
                        </div>
                    ) : (
                        "CHOICE SUBTITLE FILE"
                    )}
                </Button>
            </div>
        </div>
    );
}
