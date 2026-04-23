import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

export default function Header() {
    return (
        <header className={classes.header}>
            <ul>
                <li>
                    <NavLink to={"/"}>LOGO</NavLink>
                </li>
                <li>
                    <NavLink to={"#"}>LOG PAGE</NavLink>
                </li>
                <li>
                    <NavLink to={"/settings-ai"}>SETTINGS AI AGENT</NavLink>
                </li>
            </ul>
        </header>
    );
}
