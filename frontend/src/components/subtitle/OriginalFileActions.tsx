import Button from "../UI/ButtonItem.tsx";

import classes from "./FileActions.module.css";
import Status from "../UI/Status.tsx";

export default function OriginalFileActions() {
  return (
    <div className={classes.block}>
      <Button className={`${classes.button} ${classes["button-delete"]}`}>
        DEL
      </Button>
      <Button className={`${classes.button} ${classes["button-translate"]}`}>
        TRANS
      </Button>
      {/*ТУТ БУДЕТ ДИНАМИЧЕСКИЙ КОМПОНЕНТ*/}
      <Status status={"loading"}/>
    </div>
  );
}
