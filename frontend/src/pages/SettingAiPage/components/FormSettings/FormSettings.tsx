import Item from "./Item.tsx";
import InputLabel from "./InputLabel.tsx";
import React, { useEffect, useState } from "react";
import ButtonItem from "../../../../components/UI/ButtonItem.tsx";
import classes from "./FormSetting.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettingsAi, postApplySettings } from "../../../../services/client.ts";
import Loader from "../../../../components/UI/Loader.tsx";

interface ISettingsState {
    "settings__delete-trans-file": boolean;
    "settings__restart-sub-file": boolean;
}

function FormSettings() {
    const queryClient = useQueryClient();

    // 1. Получаем данные
    const { data, isLoading, error } = useQuery({
        queryKey: ["settings"],
        queryFn: getSettingsAi,
    });

    // Локальный стейт для работы формы (чекбоксов)
    const [settings, setSettings] = useState<ISettingsState>({
        "settings__delete-trans-file": false,
        "settings__restart-sub-file": false,
    });

    // 2. Когда данные с сервера пришли, обновляем локальный стейт
    useEffect(() => {
        if (data) {
            setSettings({
                "settings__delete-trans-file": data.deleteTransFile,
                "settings__restart-sub-file": data.restartSubFile,
            });
        }
    }, [data]);

    // 3. Мутация для отправки
    const mutation = useMutation({
        mutationFn: postApplySettings,
        onSuccess: () => {
            // Заставляем React Query перекачать данные, чтобы всё было актуально
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
    });

    const handleChange = (name: string, value: boolean) => {
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate(settings);
    };

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка</div>;
    return (
        <form onSubmit={handleSubmit} className={classes["settings__form"]}>
            <ul className={classes["settings__list"]}>
                <Item>
                    <InputLabel
                        name={"settings__delete-trans-file"}
                        labelText={"delete file subtitle after translated"}
                        onChange={val => handleChange("settings__delete-trans-file", val)}
                        checked={settings["settings__delete-trans-file"]}
                    />
                </Item>

                <Item>
                    <InputLabel
                        name={"settings__restart-sub-file"}
                        labelText={"restart translate error subtitle"}
                        onChange={val => handleChange("settings__restart-sub-file", val)}
                        checked={settings["settings__restart-sub-file"]}
                    />
                </Item>
            </ul>
            <div className={classes["button__list"]}>
                <ButtonItem className={classes.button} disabled={mutation.isPending}>
                    {mutation.isPending ? <Loader /> : "APPLY SETTINGS"}
                </ButtonItem>
            </div>
        </form>
    );
}
export default FormSettings;
