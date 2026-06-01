import { createHashRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { I18nProvider } from "./i18n/index";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import ColorTokens from "./pages/ColorTokens";
import TypographyTokens from "./pages/TypographyTokens";
import SpacingTokens from "./pages/SpacingTokens";
import AccessiblePage from "./pages/AccessiblePage";
import ExportPage from "./pages/ExportPage";

const router = createHashRouter([{
  path: "/",
  element: <App />,
  children: [
    { index: true, element: <Dashboard /> },
    { path: "colors", element: <ColorTokens /> },
    { path: "typography", element: <TypographyTokens /> },
    { path: "spacing", element: <SpacingTokens /> },
    { path: "accessible", element: <AccessiblePage /> },
    { path: "export", element: <ExportPage /> },
  ],
}]);

createRoot(document.getElementById("root")!).render(
  <I18nProvider><RouterProvider router={router} /></I18nProvider>
);
