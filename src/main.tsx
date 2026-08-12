import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "../app/page";
import Datenschutz from "../app/datenschutz/page";
import Impressum from "../app/impressum/page";
import "../app/globals.css";

const path = window.location.pathname.replace(/\/+$/, "") || "/";
const Page = path === "/impressum" ? Impressum : path === "/datenschutz" ? Datenschutz : Home;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
