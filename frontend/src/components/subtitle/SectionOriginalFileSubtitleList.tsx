import SubtitleList from "./SubtitleList.tsx";
import SubtitleItem from "./SubtitleItem.tsx";
import OriginalFileActions from "./OriginalFileActions.tsx";
import type { ISubtitleProject } from "../../models/subtitle.ts";
import {
    deleteAllFiles,
    getFilesSubtitle,
    queryClient,
    translateFiles,
} from "../../services/client.ts";
import type { IGetFilesResponse } from "../../models/api-responses.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import classes from "../../pages/HomePage.module.css";
import Button from "../UI/ButtonItem.tsx";
import FilePicker from "../UI/FilePicker.tsx";
import CardContainer from "../UI/CardContainer.tsx";
import Loader from "../UI/Loader.tsx";
import StatusBar from "../UI/StatusBar.tsx";

export default function SectionOriginalFileSubtitleList() {
    //работа с TSQ
    const type = "original";
    // const isAnyMutating = useIsMutating();
    // const isTranslating = useIsMutating({ mutationKey: ["translate"] });
    const query = useQuery<IGetFilesResponse, Error, IGetFilesResponse>({
        queryKey: ["files", "original"],
        queryFn: () => getFilesSubtitle(type),
        // refetchInterval: query =>
        //     query.state.data?.filesSubtitle.some(f => f.status === "translating") ? 2000 : false,
        refetchInterval: query => {
            const hasTranslating = query.state.data?.filesSubtitle.some(
                f => f.status === "translating",
            );
            if (!hasTranslating) {
                // Когда все файлы перешли из "translating" в "completed"
                // принудительно обновляем второй блок
                queryClient.invalidateQueries({ queryKey: ["files", "translated"] });
                return false;
            }
            return 2000;
        },
    });
    const { data, isPending } = query;
    const deleteAll = useMutation({
        mutationFn: () => deleteAllFiles(type),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["files", type] });
        },
    });
    const translateAll = useMutation({
        mutationFn: translateFiles,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["files"] });
        },
    });
    let filesSubtitle;
    if (isPending) {
        filesSubtitle = (
            <div className={classes["loader-wrapper"]}>
                <Loader size={150} thickness={15} />
            </div>
        );
    }

    if (data) {
        filesSubtitle = data?.filesSubtitle.map((project: ISubtitleProject) => (
            <SubtitleItem key={project.id} fileName={project.fileName}>
                <OriginalFileActions id={project.id} status={project.status} />
            </SubtitleItem>
        ));
    }
    if (data?.filesSubtitle.length === 0) {
        filesSubtitle = <div className={classes["loader-wrapper"]}>nothing</div>;
    }
    const isAnyFileTranslating = data?.filesSubtitle.some(
        (project: ISubtitleProject) => project.status === "translating",
    );
    console.log("isAnyFileTranslating", isAnyFileTranslating);
    let isDisabled = translateAll.isPending || data?.filesSubtitle.length === 0;
    return (
        <CardContainer title={"Storage original file"}>
            <div className={classes["button-list"]}>
                <Button
                    className={classes.button}
                    onClick={() => deleteAll.mutate()}
                    disabled={data?.filesSubtitle.length === 0}
                >
                    Clear All
                </Button>
                <Button
                    className={classes.button}
                    onClick={translateAll.mutate}
                    disabled={isDisabled}
                >
                    {isAnyFileTranslating ? (
                        <div className={classes.center}>
                            <Loader size={25} />
                        </div>
                    ) : (
                        "Translate ALL"
                    )}
                    {/*Translate ALL*/}
                </Button>
            </div>
            <SubtitleList>{filesSubtitle}</SubtitleList>
            {!!data?.filesSubtitle?.length && (
                <div className={classes.bar}>
                    {<StatusBar subtitleList={data?.filesSubtitle} />}
                </div>
            )}
            <FilePicker />
        </CardContainer>
    );
}
