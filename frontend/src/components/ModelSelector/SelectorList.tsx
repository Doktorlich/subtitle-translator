import classes from "./SelectorList.module.css";
import SelectorItem from "./SelectorItem.tsx";
import { useQuery } from "@tanstack/react-query";
import { getModelList } from "../../services/client.ts";
import type { IGetModelAiResponse } from "../../models/api-responses.ts";

export default function SelectorList() {
    const { data } = useQuery<IGetModelAiResponse, Error, IGetModelAiResponse>({
        queryKey: ["models"],
        queryFn: getModelList,
    });
    return (
        <ul className={classes["selector-list"]}>
            {data?.models.map(model => (
                <SelectorItem
                    key={model.id}
                    id={model.id}
                    label={model.name}
                    description={model.description}
                    route={""}
                    modelId={model.modelId}
                />
            ))}
        </ul>
    );
}
