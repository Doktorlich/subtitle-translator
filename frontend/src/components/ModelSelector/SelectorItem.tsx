import classes from "./SelectorItem.module.css";
import type { SelectorItemProps } from "../../models/typesUI.ts";
import { chooseItem, toggleSelectorItem } from "../../store/SelectorSlice.tsx";
import { useAppDispatch } from "../../hooks/hooks.ts";
import { useMutation } from "@tanstack/react-query";
import { selectedModel } from "../../services/client.ts";

export default function SelectorItem({ modelId, label, description }: SelectorItemProps) {
    const dispatch = useAppDispatch();
    const { mutate } = useMutation({
        mutationKey: ["models"],
        mutationFn: selectedModel,
    });

    function handleClickItem() {
        dispatch(chooseItem(label));
        dispatch(toggleSelectorItem());
        mutate(modelId);
    }
    return (
        <li className={classes.item} onClick={handleClickItem}>
            <h3 className={classes.title} title={description}>
                {label}
            </h3>
        </li>
    );
}
