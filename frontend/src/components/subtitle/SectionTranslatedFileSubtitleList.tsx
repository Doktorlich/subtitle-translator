import SubtitleItem from "./SubtitleItem.tsx";
import TranslatedFileActions from "./TranslatedFileActions.tsx";
import SubtitleList from "./SubtitleList.tsx";
import classes from "../../pages/HomePage.module.css";
import Button from "../UI/ButtonItem.tsx";
import CardContainer from "../UI/CardContainer.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { IGetFilesResponse } from "../../models/api-responses.ts";
import { deleteAllFiles, getFilesSubtitle, queryClient } from "../../services/client.ts";
import Loader from "../UI/Loader.tsx";
import type { ISubtitleProject } from "../../models/subtitle.ts";

export default function SectionTranslatedFileSubtitleList({}) {
    const type = "translated";
    const { data, isPending } = useQuery<IGetFilesResponse[], Error, IGetFilesResponse>({
        queryKey: ["files", type],
        queryFn: () => getFilesSubtitle(type),
    });
    const deleteAll = useMutation({
        mutationFn: () => deleteAllFiles(type),
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
            <SubtitleItem
                key={project.id}
                fileName={project.fileName} // Передаем имя файла в дочерний компонент
            >
                <TranslatedFileActions id={project.id} />
            </SubtitleItem>
        ));
    }
    if (data?.filesSubtitle.length === 0) {
        filesSubtitle = <div className={classes["loader-wrapper"]}>nothing</div>;
    }

    return (
        <CardContainer title={"Storage translated files"}>
            <div className={classes["button-list"]}>
                <Button
                    className={classes.button}
                    onClick={() => deleteAll.mutate()}
                    disabled={data?.filesSubtitle.length === 0}
                >
                    Clear All
                </Button>
                <Button className={classes.button}>Download All</Button>
            </div>
            {/*ТЕСТОВЫЙ ПРИМЕР*/}
            <SubtitleList>{filesSubtitle}</SubtitleList>
        </CardContainer>
    );
}
