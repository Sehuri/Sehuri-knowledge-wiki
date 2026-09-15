import KnowledgeGarden from "./KnowledgeGarden";
import { productManagerWikiData } from "./product-manager-wiki-data";
import { wikiData } from "./wiki-data";

export default function Home() {
  return <KnowledgeGarden data={wikiData} productData={productManagerWikiData} />;
}
