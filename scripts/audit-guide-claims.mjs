/**
 * Pull every checkable claim out of the guides so they can be verified.
 *
 * The guides read well and are mostly right about ideas. What rots quietly is
 * the specific numbers — a stat card saying "1000+", a port, a service name, a
 * URL. Those are the parts a reader trusts most and the parts nobody re-reads.
 *
 * This does not judge anything. It extracts, so the next step can measure
 * against the live server instead of against memory. Judging without measuring
 * is how the guides got here.
 *
 * Usage:  node scripts/audit-guide-claims.mjs [--json]
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/data/agent-guides";
const files = readdirSync(DIR).filter((f) => f.endsWith(".ts") && f !== "index.ts");

const claims = [];
for (const file of files) {
  const src = readFileSync(join(DIR, file), "utf8");
  const slug = (src.match(/slug:\s*"([^"]+)"/) || [])[1] || file.replace(/\.ts$/, "");

  // Stat cards: the four numbers at the top of every guide, and the most
  // quoted thing on the page.
  const statsBlock = src.match(/stats:\s*\[([\s\S]*?)\n\s*\]/);
  if (statsBlock) {
    for (const m of statsBlock[1].matchAll(/label:\s*"([^"]*)",\s*value:\s*"([^"]*)"/g)) {
      claims.push({ slug, file, kind: "stat", label: m[1], value: m[2] });
    }
  }

  // Ports, which either listen or do not.
  for (const m of src.matchAll(/(?:localhost|127\.0\.0\.1|:)\s*:?(\d{4})\b/g)) {
    claims.push({ slug, file, kind: "port", value: m[1] });
  }

  // Hostnames the guide sends a reader to.
  for (const m of src.matchAll(/https:\/\/([a-z0-9.-]+\.[a-z]{2,})(\/[^\s"'`)]*)?/gi)) {
    claims.push({ slug, file, kind: "url", value: m[1] + (m[2] || "") });
  }

  // systemd unit names, which either exist or do not.
  for (const m of src.matchAll(/\b([a-z0-9-]+)\.service\b/g)) {
    claims.push({ slug, file, kind: "unit", value: m[1] + ".service" });
  }

  // Any address at all — the old server is meant to be gone everywhere.
  for (const m of src.matchAll(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g)) {
    claims.push({ slug, file, kind: "ip", value: m[0] });
  }
}

const dedup = (kind) => [...new Set(claims.filter((c) => c.kind === kind).map((c) => c.value))];

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ claims, files: files.length }, null, 1));
} else {
  console.log(`guides: ${files.length}  ·  claims extracted: ${claims.length}\n`);
  console.log("ports referenced:", dedup("port").sort().join(" "));
  console.log("units referenced:", dedup("unit").sort().join(" ") || "(none)");
  console.log("IPs referenced  :", dedup("ip").sort().join(" ") || "(none)");
  const hosts = [...new Set(dedup("url").map((u) => u.split("/")[0]))].sort();
  console.log("hosts referenced:", hosts.join(" "));
  console.log("\nstat cards (the numbers readers quote back):");
  for (const c of claims.filter((c) => c.kind === "stat")) {
    console.log(`  ${c.slug.padEnd(22)} ${String(c.label).slice(0, 26).padEnd(27)} ${c.value}`);
  }
}
