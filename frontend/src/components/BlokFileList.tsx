import type { BlockFileList } from "../models/typesUI.ts";
import classes from "./BlokFileList.module.css"
import SubtitleItem from "./SubtitleItem.tsx";
export default function BlockFileList() {
  return <div className={classes.container}>
   <ul className={classes["inner-block"]}>
     <SubtitleItem/>
     <SubtitleItem/>
     <SubtitleItem/>
     <SubtitleItem/>
   </ul>
  </div>;
}
