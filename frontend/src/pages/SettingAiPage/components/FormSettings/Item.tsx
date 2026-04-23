import type { ReactNode } from "react";
import classes from "./Item.module.css";

interface IItemCheckbox {
    children?: ReactNode;
}

function Item({ children }: IItemCheckbox) {
    return <li className={classes["settings__item"]}>{children}</li>;
}

export default Item;
