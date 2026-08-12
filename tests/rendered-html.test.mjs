import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

const dist = new URL("../dist/", import.meta.url);

test("builds a deployable static multi-page website", async () => {
  const [home, impressum, datenschutz] = await Promise.all([
    readFile(new URL("index.html", dist), "utf8"),
    readFile(new URL("impressum/index.html", dist), "utf8"),
    readFile(new URL("datenschutz/index.html", dist), "utf8"),
  ]);

  assert.match(home, /ARAG Vermieterrechtsschutz/);
  assert.match(home, /<div id="root"><\/div>/);
  assert.match(impressum, /Impressum \| ARAG/);
  assert.match(datenschutz, /Datenschutz \| ARAG/);
  assert.doesNotMatch(home, /codex-preview|react-loading-skeleton/);
});

test("bundles the funnel, legal content and public assets", async () => {
  const assetNames = await readdir(new URL("assets/", dist));
  const scripts = assetNames.filter((name) => name.endsWith(".js"));
  const bundledJavaScript = (await Promise.all(
    scripts.map((name) => readFile(new URL(`assets/${name}`, dist), "utf8")),
  )).join("\n");

  assert.match(bundledJavaScript, /Häufig gestellte Fragen/);
  assert.match(bundledJavaScript, /Formular absenden/);
  assert.match(bundledJavaScript, /formsubmit\.co\/ajax/);
  assert.match(bundledJavaScript, /Angaben gemäß/);
  assert.match(bundledJavaScript, /Rechte der betroffenen Person/);
  assert.ok((await stat(new URL("hero-office.jpg", dist))).size > 0);
  assert.ok((await stat(new URL("og.png", dist))).size > 0);
});
