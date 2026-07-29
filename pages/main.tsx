import React from "react";
import ReactDOM from "react-dom/client";
import KnowledgeGarden from "../app/KnowledgeGarden";
import "../app/globals.css";
import { publicWikiData } from "./wiki-public-data";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <KnowledgeGarden data={publicWikiData} />
  </React.StrictMode>,
);
