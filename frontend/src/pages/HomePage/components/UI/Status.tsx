import type { ISubtitleProject } from "../../../../models/subtitle.ts";
import classes from "./Status.module.css";

export default function Status({ status }: Pick<ISubtitleProject, "status">) {
    let layout;
    switch (status) {
        case "idle":
            layout = (
                <div className={`${classes.container} ${classes["status-idle"]}`}>
                    <p className={classes["status-content"]}>idle</p>
                </div>
            );
            break;
        case "loading":
            layout = (
                <div className={`${classes.container} ${classes["status-loading"]}`}>
                    <p className={classes["status-content"]}>load</p>
                </div>
            );
            break;
        case "translating":
            layout = (
                <div className={`${classes.container} ${classes["status-translating"]}`}>
                    <p className={classes["status-content"]}>trans</p>
                </div>
            );
            break;
        case "completed":
            layout = (
                <div className={`${classes.container} ${classes["status-completed"]}`}>
                    <p className={classes["status-content"]}>comp</p>
                </div>
            );
            break;
        case "error":
            layout = (
                <div className={`${classes.container} ${classes["status-error"]}`}>
                    <p className={classes["status-content"]}>err</p>
                </div>
            );
            break;
        case "verifying":
            layout = (
                <div className={`${classes.container} ${classes["status-verifying"]}`}>
                    <p className={classes["status-content"]}>ver</p>
                </div>
            );
            break;
    }
    return <div>{layout}</div>;
}
