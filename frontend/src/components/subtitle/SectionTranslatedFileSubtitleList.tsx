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
import type { ISubtitleProject, SubtitleFileBlob } from "../../models/subtitle.ts";
import { serializeToVtt } from "../../util/serializeToVtt.ts";
import { downloadArchiveZip } from "../../util/download.ts";

export default function SectionTranslatedFileSubtitleList({}) {
    const { data, isPending } = useQuery<IGetFilesResponse, Error, IGetFilesResponse>({
        queryKey: ["files", "translated"],
        queryFn: () => getFilesSubtitle("translated"),

    });
    const deleteAll = useMutation({
        mutationFn: () => deleteAllFiles("translated"),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["files", "translated"] });
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
    function handleDownloadArchive() {
        console.log("DOWNLOAD ARCHIVE ");
        if (!data) {
            throw new Error("Files data not found");
        }
        const fileList:SubtitleFileBlob[] | undefined = data?.filesSubtitle.map(file => {
            const content = serializeToVtt([file]);
            const blob = new Blob([content], { type: "text/vtt" });
            const fileNameSplit = file.fileName.split(".vtt");
            const fileName = fileNameSplit[0] + "__translated.vtt";
            return { fileName: fileName, blob: blob };
        });
        downloadArchiveZip(fileList)

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
                <Button
                    className={classes.button}
                    onClick={handleDownloadArchive}
                    disabled={data?.filesSubtitle.length === 0}
                >
                    Download All
                </Button>
            </div>
            {/*ТЕСТОВЫЙ ПРИМЕР*/}
            <SubtitleList>{filesSubtitle}</SubtitleList>
        </CardContainer>
    );
}
