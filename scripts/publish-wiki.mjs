import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const expectedRemote = "https://github.com/Sehuri/Sehuri-knowledge-wiki.git";

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: root,
    encoding: "utf8",
    stdio: options.capture ? "pipe" : "inherit",
  });
}

const remote = run("git", ["remote", "get-url", "origin"], {
  capture: true,
}).trim();

if (remote !== expectedRemote) {
  throw new Error(
    `Refusing to publish to unexpected remote: ${remote || "(missing origin)"}`,
  );
}

run("npm", ["run", "sync:public"]);
run("npm", ["run", "build:pages"]);
run("git", ["add", "pages/wiki-public-data.ts"]);

const diff = spawnSync(
  "git",
  ["diff", "--cached", "--quiet", "--", "pages/wiki-public-data.ts"],
  { cwd: root, encoding: "utf8" },
);

if (diff.status === 0) {
  console.log("Public Wiki data is already up to date.");
  process.exit(0);
}

if (diff.status !== 1) {
  throw new Error(diff.stderr || "Unable to inspect staged Wiki data.");
}

const date = new Date().toISOString().slice(0, 10);
run("git", ["commit", "-m", `Update public Wiki ${date}`]);
run("git", ["push", "origin", "main"]);
