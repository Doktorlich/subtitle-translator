import vvtContent from "../assets/01. Welcome To The Course!.vtt?raw";
import { parserVTT } from "../util/srtParser.ts";
import { Fragment } from "react";
import CardContainer from "../components/UI/CardContainer.tsx";
import ButtonItem from "../components/UI/ButtonItem.tsx";

import classes from "./HomePage.module.css";
import BlockFileList from "../components/BlokFileList.tsx";

export default function HomePage() {
  parserVTT(vvtContent);
  return (
    <Fragment>
      <h1 className={classes["unique-title"]}>translater subtitles</h1>
      <div className={classes.container}>
        <CardContainer title={"Storage original file"}>
          <div className={classes["button-list"]}>
            <ButtonItem className={classes.button}>Clear All</ButtonItem>
            <ButtonItem className={classes.button}>Translate ALL</ButtonItem>
          </div>
          <BlockFileList />
          <ButtonItem
            className={`${classes.button} ${classes["button-download"]}`}
          >
            CHOICE SUBTITLE FILE
          </ButtonItem>

          <input type={"file"} multiple />
        </CardContainer>

        <div className={classes["middle-block"]}>
          <b>CHOICE AI AGENT</b> <br />
          ARROW {"-->"}
        </div>

        <CardContainer title={"Storage translate file"}>
          <div className={classes["button-list"]}>
            <ButtonItem className={classes.button}>Clear All</ButtonItem>
            <ButtonItem className={classes.button}>Translate ALL</ButtonItem>
          </div>
          <BlockFileList />
          BLOCK_FILE_LIST
        </CardContainer>
      </div>
    </Fragment>
  );
}
