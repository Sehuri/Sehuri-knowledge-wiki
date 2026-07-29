import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(scriptDir, "..");
const wikiRoot = path.resolve(webRoot, "..");
const indexPath = path.join(wikiRoot, "_meta", "index.json");
const outputPath = path.join(webRoot, "app", "wiki-data.ts");

function section(markdown, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = markdown.match(
    new RegExp(`^## ${escaped}\\s*\\n([\\s\\S]*?)(?=^## |\\Z)`, "m"),
  );
  return match?.[1]?.trim() ?? "";
}

function bullets(markdown) {
  return markdown
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim())
    .filter(Boolean);
}

function cleanWikiLinks(value) {
  return value.replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_, target, label) =>
    label || target
  );
}

function relatedTitles(markdown) {
  const related = section(markdown, "关联知识");
  return [...related.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g)]
    .map((match) => match[1])
    .filter(Boolean);
}

async function sync() {
  const index = JSON.parse(await readFile(indexPath, "utf8"));
  const items = await Promise.all(
    index.items.map(async (item) => {
      const markdown = await readFile(path.join(wikiRoot, item.path), "utf8");
      return {
        ...item,
        keyPoints: bullets(section(markdown, "核心观点")).map(cleanWikiLinks),
        structure: section(markdown, "内容结构"),
        thoughts: section(markdown, "我的想法"),
        related: relatedTitles(markdown),
        extractionNotes: section(markdown, "提取说明"),
      };
    }),
  );

  const counts = (key) => {
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
  };

  const payload = {
    updatedAt: index.updated_at,
    items,
    facets: {
      topics: counts("topics"),
      people: counts("people"),
      concepts: counts("concepts"),
      platforms: counts("platform"),
    },
  };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `// Generated from the local Markdown Wiki. Do not edit manually.\nexport const wikiData = ${JSON.stringify(payload, null, 2)} as const;\n`,
    "utf8",
  );
  console.log(`Synced ${items.length} Wiki entries.`);
}

await sync();
