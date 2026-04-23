import classes from "./SelectorItem.module.css";
import type { SelectorItemProps } from "../../../../models/typesUI.ts";
import { chooseItem, toggleSelectorItem } from "../../../../store/SelectorSlice.tsx";
import { useAppDispatch } from "../../../../hooks/hooks.ts";
import { useMutation } from "@tanstack/react-query";
import { queryClient, selectedModel } from "../../../../services/client.ts";

export default function SelectorItem({
    modelId,
    label: modelName,
    provider,
    description,
}: SelectorItemProps) {
    const dispatch = useAppDispatch();
    const { mutate } = useMutation({
        // mutationKey: ["models"],
        mutationFn: selectedModel,
        onSuccess: () => {
            // Заставляем SelectorTrigger перезапросить актуальную модель из БД
            queryClient.invalidateQueries({ queryKey: ["models", "selected"] });
        },
    });

    function handleClickItem() {
        dispatch(chooseItem(modelName));
        dispatch(toggleSelectorItem());
        mutate({ modelId: modelId, modelName: modelName, provider: provider });
    }
    return (
        <li className={classes.item} onClick={handleClickItem}>
            <h3 className={classes.title} title={description}>
                {modelName}
            </h3>
        </li>
    );
}
