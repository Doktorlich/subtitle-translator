import Item from "./Item.tsx";
import InputLabel from "./InputLabel.tsx";

function FormSettings() {
    return (
        <form action="">
            <ul className="settings__list">
                <Item>
                    <InputLabel
                        name={"settings__delete-trans-file"}
                        labelText={"delete file subtitle after translated"}
                    />
                </Item>

                <Item>
                    <InputLabel
                        name={"settings__restart-sub-file"}
                        labelText={"restart translate error subtitle"}
                    />
                </Item>
            </ul>
        </form>
    );
}
export default FormSettings;
