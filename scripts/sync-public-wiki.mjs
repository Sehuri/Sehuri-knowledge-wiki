import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(scriptDir, "..");
const wikiRoot = path.resolve(
  process.env.PERSONAL_KNOWLEDGE_WIKI ?? path.join(webRoot, ".."),
);
const indexPath = path.join(wikiRoot, "_meta", "index.json");
const outputPath = path.join(webRoot, "pages", "wiki-public-data.ts");

function section(markdown, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = markdown.match(
    new RegExp(`^## ${escaped}\\s*\\n([\\s\\S]*?)(?=^## |\\Z)`, "m"),
  );
  return match?.[1]?.trim() ?? "";
}

function cleanWikiLinks(value) {
  return value.replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_, target, label) =>
    label || target
  );
}

function bullets(markdown) {
  return markdown
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((line) => cleanWikiLinks(line.slice(2).trim()))
    .filter(Boolean);
}

function relatedTitles(markdown) {
  return [...section(markdown, "关联知识")
    .matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g)]
    .map((match) => match[1])
    .filter(Boolean);
}

function facetCounts(items, key) {
  const values = new Map();
  for (const item of items) {
    const raw = item[key] ?? [];
    const entries = Array.isArray(raw) ? raw : [raw];
    for (const value of entries) {
      values.set(value, (values.get(value) ?? 0) + 1);
    }
  }
  return [...values.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "zh-CN"));
}

async function syncPublicWiki() {
  const index = JSON.parse(await readFile(indexPath, "utf8"));
  const items = await Promise.all(
    index.items.map(async (item) => {
      const markdown = await readFile(path.join(wikiRoot, item.path), "utf8");
      return {
        id: item.id,
        title: item.title,
        platform: item.platform,
        content_type: item.content_type,
        source_url: item.source_url,
        author: item.author,
        published_at: item.published_at,
        captured_at: item.captured_at,
        completeness: item.completeness,
        topics: item.topics ?? [],
        people: item.people ?? [],
        concepts: item.concepts ?? [],
        summary: item.summary,
        keyPoints: bullets(section(markdown, "核心观点")),
        structure: "",
        thoughts: "",
        related: relatedTitles(markdown),
        extractionNotes: "",
      };
    }),
  );

  const payload = {
    updatedAt: index.updated_at,
    items,
    facets: {
      topics: facetCounts(items, "topics"),
      people: facetCounts(items, "people"),
      concepts: facetCounts(items, "concepts"),
      platforms: facetCounts(items, "platform"),
    },
  };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `// Generated public summary data. Do not edit manually.\nexport const publicWikiData = ${JSON.stringify(payload, null, 2)} as const;\n`,
    "utf8",
  );
  console.log(`Exported ${items.length} public Wiki summaries.`);
}

await syncPublicWiki();
