import React from "react";
import ReactDOM from "react-dom/client";
import KnowledgeGarden from "../app/KnowledgeGarden";
import "../app/globals.css";
import { productManagerWikiData } from "./product-manager-wiki-data";
import { publicWikiData } from "./wiki-public-data";

if (typeof document !== "undefined") {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <KnowledgeGarden data={publicWikiData} productData={productManagerWikiData} />
    </React.StrictMode>,
  );
}

export default function PagesBuildEntry() {
  return null;
}
