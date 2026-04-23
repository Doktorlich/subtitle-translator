import type { Children } from "../../../../models/typesUI.ts";
import StatusBar from "../UI/StatusBar.tsx";
import classes from "./SubtitleList.module.css";

export default function BlockFileList({ children }: Children) {
    return (
        <div className={classes.container}>
            <ul className={classes["inner-block"]}>{children}</ul>
        </div>
    );
}
