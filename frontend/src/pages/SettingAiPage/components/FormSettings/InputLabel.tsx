import classes from "./InputLabel.module.css";

interface IInputLabel {
    name: string;
    labelText: string;
}

function InputLabel({ name, labelText }: IInputLabel) {
    return (
        <>
            <input type={"checkbox"} className={classes["settings__input"]} id={name} name={name} />
            <label htmlFor={name} className={classes["settings__label"]}>
                {labelText}
            </label>
        </>
    );
}

export default InputLabel;
