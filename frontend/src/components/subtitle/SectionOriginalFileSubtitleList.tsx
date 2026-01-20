import SubtitleList from "./SubtitleList.tsx";
import SubtitleItem from "./SubtitleItem.tsx";
import OriginalFileActions from "./OriginalFileActions.tsx";
import type { ISubtitleProject } from "../../models/subtitle.ts";
import { deleteAllFiles, getFilesSubtitle, queryClient } from "../../services/client.ts";
import type { IGetFilesResponse } from "../../models/api-responses.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import classes from "../../pages/HomePage.module.css";
import Button from "../UI/ButtonItem.tsx";
import FilePicker from "../UI/FilePicker.tsx";
import CardContainer from "../UI/CardContainer.tsx";
import Loader from "../UI/Loader.tsx";

export default function SectionOriginalFileSubtitleList() {
    //работа с TSQ
    const { data, isPending } = useQuery<IGetFilesResponse[], Error, IGetFilesResponse>({
        queryKey: ["files"],
        queryFn: getFilesSubtitle,
    });
    const deleteAll = useMutation({
        mutationFn: deleteAllFiles,
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

    return (
        <CardContainer title={"Storage original file"}>
            <div className={classes["button-list"]}>
                <Button
                    className={classes.button}
                    onClick={() => deleteAll.mutate()}
                    disabled={data?.filesSubtitle.length === 0 }
                >
                    Clear All
                </Button>
                <Button className={classes.button}>Translate ALL</Button>
            </div>
            <SubtitleList>{filesSubtitle}</SubtitleList>
            <FilePicker/>
        </CardContainer>
    );
}
