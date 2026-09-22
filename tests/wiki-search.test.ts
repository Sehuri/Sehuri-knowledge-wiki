import assert from "node:assert/strict";
import test from "node:test";

import { matchesWikiQuery, type SearchableWikiItem } from "../app/wiki-search.ts";

const item: SearchableWikiItem = {
  title: "年轻时去瑞士旅行",
  author: "示例作者",
  platform: "web",
  content_type: "article",
  summary: "作者分享第一次出国和后来重返欧洲的经历。",
  topics: ["出境旅行"],
  people: ["示例作者"],
  concepts: ["瑞士", "旅行节奏"],
  keyPoints: ["旅游不必只追求密集打卡。"],
  related: ["国外目的地选择"],
};

test("searches summaries, concepts, key points and related titles", () => {
  assert.equal(matchesWikiQuery(item, "国外"), true);
  assert.equal(matchesWikiQuery(item, "瑞士"), true);
  assert.equal(matchesWikiQuery(item, "旅游"), true);
  assert.equal(matchesWikiQuery(item, "欧洲"), true);
});

test("normalizes punctuation, case and multi-term queries", () => {
  assert.equal(matchesWikiQuery(item, "出境 瑞士"), true);
  assert.equal(matchesWikiQuery(item, "WEB", "网页"), true);
  assert.equal(matchesWikiQuery(item, "旅行-节奏"), true);
  assert.equal(matchesWikiQuery(item, "日本"), false);
});
