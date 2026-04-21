import type { ISubtitleProject, SubtitleStatus } from "../../models/subtitle.ts";
import CompleteIcon from "./icons/CompleteIcon.tsx";
import ErrorIcon from "./icons/ErrorIcon.tsx";
import IdleIcon from "./icons/IdleIcon.tsx";
import ProcessingIcon from "./icons/ProcessingIcon.tsx";

import classes from "./StatusBar.module.css";
export default function StatusBar({ subtitleList }: { subtitleList: ISubtitleProject[] }) {
    function getQuantityStatus(nameStatus: SubtitleStatus) {
        const quantityStatus = subtitleList.filter(sub => sub.status === nameStatus);
        return quantityStatus;
    }
    return (
        <ul className={classes["status-bar__list"]}>
            <li className={classes["status-bar__item"]}>
                {getQuantityStatus("completed") && (
                    <div className={classes["status-bar__item-block"]}>
                        {getQuantityStatus("completed").length}-
                        <CompleteIcon />
                    </div>
                )}
            </li>
            <li className={classes["status-bar__item"]}>
                {getQuantityStatus("error") && (
                    <div className={classes["status-bar__item-block"]}>
                        {getQuantityStatus("error").length}- <ErrorIcon />
                    </div>
                )}
            </li>
            <li className={classes["status-bar__item"]}>
                {getQuantityStatus("translating") && (
                    <div className={classes["status-bar__item-block"]}>
                        {getQuantityStatus("translating").length}- <ProcessingIcon />
                    </div>
                )}
            </li>
            <li className={classes["status-bar__item"]}>
                {getQuantityStatus("idle") && (
                    <div className={classes["status-bar__item-block"]}>
                        {getQuantityStatus("idle").length}- <IdleIcon />
                    </div>
                )}
            </li>
        </ul>
    );
}
