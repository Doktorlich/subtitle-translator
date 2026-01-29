import classes from "./SelectorList.module.css";
import SelectorItem from "./SelectorItem.tsx";
import { useQuery } from "@tanstack/react-query";
import { getModelList } from "../../services/client.ts";
import type { ISelectModelAiResponse } from "../../models/api-responses.ts";


export default function SelectorList() {
    const { data } = useQuery<ISelectModelAiResponse, Error, ISelectModelAiResponse>({
        queryKey: ["models", "all"],
        queryFn: getModelList,
    });
    console.log("getModelList",data);
    return (
        <ul className={classes["selector-list"]}>
            {data?.models.map(model => (
                <SelectorItem
                    key={model.id}
                    id={model.id}
                    label={model.name}
                    description={model.description}
                    route={""}
                    provider = {model.provider}
                    modelId={model.modelId}
                />
            ))}
        </ul>
    );
}
