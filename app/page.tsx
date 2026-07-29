import KnowledgeGarden from "./KnowledgeGarden";
import { wikiData } from "./wiki-data";

export default function Home() {
  return <KnowledgeGarden data={wikiData} />;
}
