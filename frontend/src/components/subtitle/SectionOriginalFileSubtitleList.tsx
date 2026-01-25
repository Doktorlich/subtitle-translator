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
import { useIsMutating, useMutation, useQuery } from "@tanstack/react-query";
import classes from "../../pages/HomePage.module.css";
import Button from "../UI/ButtonItem.tsx";
import FilePicker from "../UI/FilePicker.tsx";
import CardContainer from "../UI/CardContainer.tsx";
import Loader from "../UI/Loader.tsx";

export default function SectionOriginalFileSubtitleList() {
    //работа с TSQ
    const type = "original";
    // const isAnyMutating = useIsMutating();
    const isTranslating = useIsMutating({ mutationKey: ["translate"] });
    const query = useQuery<IGetFilesResponse, Error, IGetFilesResponse>({
        queryKey: ["files", type],
        queryFn: () => getFilesSubtitle(type),
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
            queryClient.invalidateQueries({ queryKey: ["files", type] });
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
                    {isTranslating ? <Loader size={25} /> : "Translate ALL"}
                    {/*Translate ALL*/}
                </Button>
            </div>
            <SubtitleList>{filesSubtitle}</SubtitleList>
            <FilePicker />
        </CardContainer>
    );
}
