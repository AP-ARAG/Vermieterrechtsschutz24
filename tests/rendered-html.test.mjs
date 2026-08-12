import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the Vermieterrechtsschutz landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /ARAG Vermieterrechtsschutz/);
  assert.match(html, /Immobilien-Rechtsschutz für Vermieter/);
  assert.match(html, /Häufig gestellte Fragen/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});

test("renders legal routes", async () => {
  const [impressum, datenschutz] = await Promise.all([render("/impressum"), render("/datenschutz")]);
  assert.equal(impressum.status, 200);
  assert.equal(datenschutz.status, 200);
  assert.match(await impressum.text(), /Angaben gemäß/);
  assert.match(await datenschutz.text(), /Rechte der betroffenen Person/);
});
