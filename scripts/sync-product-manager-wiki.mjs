import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(scriptDir, "..");
const wikiRoot = path.resolve(
  process.env.PERSONAL_KNOWLEDGE_WIKI ?? path.join(webRoot, ".."),
);
const inputPath = path.join(wikiRoot, "product-manager", "_meta", "index.json");
const appOutput = path.join(webRoot, "app", "product-manager-wiki-data.ts");
const pagesOutput = path.join(webRoot, "pages", "product-manager-wiki-data.ts");

const payload = JSON.parse(await readFile(inputPath, "utf8"));
const source = `// Generated from product-manager/_meta/index.json. Do not edit manually.\nexport const productManagerWikiData = ${JSON.stringify(payload, null, 2)} as const;\n`;

await Promise.all([
  mkdir(path.dirname(appOutput), { recursive: true }),
  mkdir(path.dirname(pagesOutput), { recursive: true }),
]);
await Promise.all([
  writeFile(appOutput, source, "utf8"),
  writeFile(pagesOutput, source, "utf8"),
]);

console.log(`Synced ${payload.items.length} product manager Wiki entries.`);
