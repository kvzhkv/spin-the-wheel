import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import { Normalize } from "styled-normalize";
import GlobalStyles from "./components/GlobalStyles.ts";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Normalize />
            <GlobalStyles />
            <App />
        </BrowserRouter>
    </React.StrictMode>,
);
