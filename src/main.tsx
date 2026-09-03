import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "../app/page";
import Datenschutz from "../app/datenschutz/page";
import Impressum from "../app/impressum/page";
import Erstinformation from "../app/erstinformation/page";
import "../app/globals.css";

const path = window.location.pathname.replace(/\/+$/, "") || "/";
const Page = path === "/impressum" ? Impressum : path === "/datenschutz" ? Datenschutz : path === "/erstinformation" ? Erstinformation : Home;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
