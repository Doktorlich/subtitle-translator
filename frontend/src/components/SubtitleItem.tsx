import classes from "./SubtitleItem.module.css";
import Button from "./UI/ButtonItem.tsx";
export default function SubtitleItem() {
  return (
    <li className={classes.item}>
      <p className={classes["name-file"]}>NAME_FILE_SUBTITLE.VTT</p>
      {/*ПЕРЕДЕЛАТЬ  И ПРОДУМАТЬ*/}

      {/*<div className={classes.block}>*/}
      {/*  <Button className={`${classes.button} ${classes["button-delete"]}`}>*/}
      {/*    DEL*/}
      {/*  </Button>*/}
      {/*  <Button className={`${classes.button} ${classes["button-translate"]}`}>*/}
      {/*    TRANS*/}
      {/*  </Button>*/}
      {/*  /!*ТУТ БУДЕТ ДИНАМИЧЕСКИЙ КОМПОНЕНТ*!/*/}
      {/*  <p>STATUS</p>*/}
      {/*</div>*/}
    </li>
  );
}
