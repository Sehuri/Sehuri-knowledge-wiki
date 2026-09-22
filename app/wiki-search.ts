export type SearchableWikiItem = {
  title: string;
  author: string;
  platform: string;
  content_type: string;
  summary: string;
  topics: readonly string[];
  people: readonly string[];
  concepts: readonly string[];
  keyPoints: readonly string[];
  related: readonly string[];
};

function normalizeSearchText(value: string) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("zh-CN")
    .replace(/[\s\p{P}\p{S}]+/gu, "");
}

export function matchesWikiQuery(
  item: SearchableWikiItem,
  query: string,
  platformLabel = "",
) {
  const terms = query
    .trim()
    .split(/\s+/u)
    .map(normalizeSearchText)
    .filter(Boolean);

  if (!terms.length) return true;

  const haystack = normalizeSearchText([
    item.title,
    item.author,
    item.platform,
    platformLabel,
    item.content_type,
    item.summary,
    ...item.topics,
    ...item.people,
    ...item.concepts,
    ...item.keyPoints,
    ...item.related,
  ].join(" "));

  return terms.every((term) => haystack.includes(term));
}
