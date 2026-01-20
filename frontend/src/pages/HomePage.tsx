import { Fragment } from "react";
import classes from "./HomePage.module.css";


import ModelSelector from "../components/ModelSelector/ModelSelector.tsx";
import SectionOriginalFileSubtitleList from "../components/subtitle/SectionOriginalFileSubtitleList.tsx";
import SectionTranslatedFileSubtitleList from "../components/subtitle/SectionTranslatedFileSubtitleList.tsx";

export default function HomePage() {
  // Используем селектор, чтобы получить массив projects из всего store
  // state.subtitles.projects
  // const subtitleProjects = useAppSelector(
  //   (state) => state.subtitles.subtitleOriginalList,
  // );

  // Дополнительно можно получить статус из UI при его реализации:
  // const uiStatuses = useAppSelector(state => state.ui.fileStatuses);
  return (
    <Fragment>
      <h1 className={classes["unique-title"]}>translater subtitles</h1>
      <div className={classes.container}>
        <SectionOriginalFileSubtitleList />
        <ModelSelector />
        <SectionTranslatedFileSubtitleList />
      </div>
    </Fragment>
  );
}
