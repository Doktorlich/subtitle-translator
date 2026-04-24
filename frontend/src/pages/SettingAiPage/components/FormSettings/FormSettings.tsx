import Item from "./Item.tsx";
import InputLabel from "./InputLabel.tsx";
import React, { useState } from "react";
import ButtonItem from "../../../../components/UI/ButtonItem.tsx";
import classes from "./FormSetting.module.css";

interface ISettingsState {
    "settings__delete-trans-file": boolean;
    "settings__restart-sub-file": boolean;
}

function FormSettings() {
    const [settings, setSettings] = useState<ISettingsState>({
        "settings__delete-trans-file": false,
        "settings__restart-sub-file": false,
    });

    const handleChange = (name: string, value: boolean) => {
        setSettings(prevSettings => ({ ...prevSettings, [name]: value }));
        console.log(`Checked ${name}`);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(settings);
    };

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
                <ButtonItem className={classes.button}>APPLY SETTINGS</ButtonItem>
                <ButtonItem className={classes.button}>CANCEL</ButtonItem>
            </div>
        </form>
    );
}
export default FormSettings;
