import { Fragment } from "react";
import CardContainer from "../components/UI/CardContainer.tsx";
import Button from "../components/UI/ButtonItem.tsx";

import classes from "./HomePage.module.css";
import SubtitleList from "../components/subtitle/SubtitleList.tsx";
import SubtitleItem from "../components/subtitle/SubtitleItem.tsx";
import OriginalFileActions from "../components/subtitle/OriginalFileActions.tsx";
import FilePicker from "../components/UI/FilePicker.tsx";

import { useAppSelector } from "../hooks/hooks.ts";
import TranslatedFileActions from "../components/subtitle/TranslatedFileActions.tsx";
import ModelSelector from "../components/ModelSelector/ModelSelector.tsx";

export default function HomePage() {
  // Используем селектор, чтобы получить массив projects из всего store
  // state.subtitles.projects
  const subtitleProjects = useAppSelector(
    (state) => state.subtitles.subtitleOriginalList,
  );

  // Дополнительно можно получить статус из UI при его реализации:
  // const uiStatuses = useAppSelector(state => state.ui.fileStatuses);
  return (
    <Fragment>
      <h1 className={classes["unique-title"]}>translater subtitles</h1>
      <div className={classes.container}>
        <CardContainer title={"Storage original file"}>
          <div className={classes["button-list"]}>
            <Button className={classes.button}>Clear All</Button>
            <Button className={classes.button}>Translate ALL</Button>
          </div>
          <SubtitleList>
            {subtitleProjects.map((project) => (
              <SubtitleItem
                key={project.id} // Всегда нужен уникальный key для списка
                fileName={project.fileName} // Передаем имя файла в дочерний компонент
                projectId={project.id} // Передаем ID для дальнейших действий (DEL/TRANS)
              >
                <OriginalFileActions />
              </SubtitleItem>
            ))}
          </SubtitleList>
          {/*ДУМАЮ ТУТ ТО ЖЕ СДЕЛАТЬ В ВИДЕ КОМПОНЕНТА,
           Т К ПРИДЕТСЯ СВЯЗЫВАТЬ ВЗАИМОДЕЙСТВИЕ INPUT С КАСТОМНЫМ КОМПОНЕНТОМ*/}
          <FilePicker>
            <Button
              className={`${classes.button} ${classes["button-download"]}`}
            >
              CHOICE SUBTITLE FILE
            </Button>
          </FilePicker>
        </CardContainer>

        <ModelSelector />

        <CardContainer title={"Storage translate file"}>
          <div className={classes["button-list"]}>
            <Button className={classes.button}>Clear All</Button>
            <Button className={classes.button}>Translate ALL</Button>
          </div>
          {/*ТЕСТОВЫЙ ПРИМЕР*/}
          <SubtitleList>
            <SubtitleItem
              fileName={"project.fileName project.fileName project.fileName"} // Передаем имя файла в дочерний компонент
              projectId={""}
            >
              <TranslatedFileActions />
            </SubtitleItem>
          </SubtitleList>
        </CardContainer>
      </div>
    </Fragment>
  );
}
