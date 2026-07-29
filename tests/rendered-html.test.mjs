import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the personal knowledge portal", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Personal Knowledge Wiki<\/title>/i);
  assert.match(html, /把零散信息，长成知识。/);
  assert.match(html, /GPT-5\.6来了，而许多人还停留在石器时代/);
  assert.match(html, /关系图谱/);
  assert.match(html, /本地 Wiki 已同步/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/);
});

test("keeps generated Wiki data and sync scripts wired", async () => {
  const [data, packageJson, viteConfig] = await Promise.all([
    readFile(new URL("../app/wiki-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../vite.config.ts", import.meta.url), "utf8"),
  ]);

  assert.match(data, /Generated from the local Markdown Wiki/);
  assert.match(data, /"items": \[/);
  assert.match(packageJson, /"sync": "node scripts\/sync-wiki\.mjs"/);
  assert.match(packageJson, /"prebuild": "node scripts\/sync-wiki\.mjs"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(viteConfig, /personal-knowledge-wiki-sync/);
  assert.match(viteConfig, /server\.watcher\.add/);
});
