import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./style.scss";
import RoutesApps from "./routes/RoutesApps";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RoutesApps />
    </BrowserRouter>
  </StrictMode>
);
