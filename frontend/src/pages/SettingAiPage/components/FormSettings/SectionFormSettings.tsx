import FormSettings from "./FormSettings.tsx";
import classes from "./SectionFormSettings.module.css";

export default function SectionFormSettings() {
    return (
        <section className={classes.container}>
            <h2>Settings</h2>
            <FormSettings />
        </section>
    );
}
