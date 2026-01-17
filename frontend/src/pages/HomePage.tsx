import vvtContent from "../assets/01. Welcome To The Course!.vtt?raw";
import { parserVTT } from "../util/srtParser.ts";
import { Fragment } from "react";
import CardContainer from "../components/UI/CardContainer.tsx";
import Button from "../components/UI/ButtonItem.tsx";

import classes from "./HomePage.module.css";
import SubtitleList from "../components/subtitle/SubtitleList.tsx";
import SubtitleItem from "../components/subtitle/SubtitleItem.tsx";
import OriginalFileActions from "../components/subtitle/OriginalFileActions.tsx";
import FilePicker from "../components/UI/FilePicker.tsx";

import { useAppSelector } from "../hooks/hooks.ts";



export default function HomePage() {
  // Используем селектор, чтобы получить массив projects из всего store
  // state.subtitles.projects
  const subtitleProjects = useAppSelector(state => state.subtitles.subtitleOriginalList);

  // Дополнительно можно получить статус из UI слайса, если ты его добавишь:
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
                {/* Композиция: передаем нужные кнопки как дети */}
                <OriginalFileActions />
              </SubtitleItem>
            ))}
          </SubtitleList>
          {/*ДУМАЮ ТУТ ТО ЖЕ СДЕЛАТЬ В ВИДЕ КОМПОНЕНТА,
           Т К ПРИДЕТСЯ СВЯЗЫВАТЬ ВЗАИМОДЕЙСТВИЕ INPUT С КАСТОМНЫМ КОМПОНЕНТОМ*/}
          <FilePicker>
            <Button className={`${classes.button} ${classes["button-download"]}`}>
              CHOICE SUBTITLE FILE
            </Button>
          </FilePicker>

        </CardContainer>

        <div className={classes["middle-block"]}>
          <b>CHOICE AI AGENT</b> <br />
          ARROW {"-->"}
        </div>

        <CardContainer title={"Storage translate file"}>
          <div className={classes["button-list"]}>
            <Button className={classes.button}>Clear All</Button>
            <Button className={classes.button}>Translate ALL</Button>
          </div>
          <SubtitleList>
            <p>NOTHING</p>
            {/*<SubtitleItem>*/}
            {/*  <TranslatedFileActions />*/}
            {/*</SubtitleItem>*/}
          </SubtitleList>
        </CardContainer>
      </div>
    </Fragment>
  );
}
