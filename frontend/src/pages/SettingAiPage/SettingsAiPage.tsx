import { Fragment } from "react";
import SectionFormSettings from "./components/FormSettings/SectionFormSettings.tsx";

// interface SettingsAiPageProps {
//     children?: ReactNode;
// }

function SettingsAiPage() {
    return (
        <Fragment>
            <h1> Settings AI page </h1>
            <SectionFormSettings />
        </Fragment>
    );
}

export default SettingsAiPage;
