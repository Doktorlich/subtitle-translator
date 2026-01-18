import classes from "./SubtitleItem.module.css";
import type { SubtitleItemProps } from "../../models/typesUI.ts";



export default function SubtitleItem({ fileName, children }:SubtitleItemProps) {
  return (
    <li className={classes.item} >
      <p className={classes["name-file"]} title={fileName}>{fileName}</p>
      {children}
    </li>
  );
}
