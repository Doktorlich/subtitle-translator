import classes from "./ModelSelector.module.css";
import SelectorList from "./SelectorList.tsx";
import SelectorTrigger from "./SelectorTrigger.tsx";
import { useAppSelector } from "../../../../hooks/hooks.ts";

export default function ModelSelector() {
    const isActive = useAppSelector(state => state.selector.isActive);
    return (
        <section className={classes.selector}>
            <SelectorTrigger />
            {isActive && <SelectorList />}
        </section>
    );
}
