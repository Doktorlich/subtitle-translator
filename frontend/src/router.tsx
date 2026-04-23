import { createBrowserRouter } from "react-router-dom";
import SettingsAiPage from "./pages/SettingAiPage/SettingsAiPage.tsx";
import HomePage from "./pages/HomePage/HomePage.tsx";
import RootLayout from "./layouts/RootLayout/RootLayout.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: "EMPTY",
        children: [
            { index: true, element: <HomePage /> },
            { path: "/settings-ai", element: <SettingsAiPage /> },
        ],
    },
]);
