import Button from "../UI/ButtonItem.tsx";

import classes from "./FileActions.module.css";

export default function TranslatedFileActions() {
  return (
    <div className={classes.block}>
      <Button className={`${classes.button} ${classes["button-delete"]}`}>
        DEL
      </Button>
      <Button className={`${classes.button} ${classes["button-check"]}`}>
        CHECK
      </Button>
      <Button className={`${classes.button} ${classes["button-download"]}`}>
        DOWN
      </Button>
    </div>
  );
}
