import classes from "./InputLabel.module.css";
import React from "react";

interface IInputLabel {
    name: string;
    onChange: (value: boolean) => void;
    checked: boolean;
    labelText: string;
}

function InputLabel({ name, labelText, checked, onChange }: IInputLabel) {
    return (
        <>
            <input
                type={"checkbox"}
                className={classes["settings__input"]}
                id={name}
                name={name}
                checked={checked}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(event.target.checked)
                }
            />
            <label htmlFor={name} className={classes["settings__label"]}>
                {labelText}
            </label>
        </>
    );
}

export default InputLabel;
