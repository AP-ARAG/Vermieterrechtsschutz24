import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

const dist = new URL("../dist/", import.meta.url);

test("builds a deployable PHP-backed multi-page website", async () => {
  const [home, impressum, erstinformation, datenschutz] = await Promise.all([
    readFile(new URL("index.html", dist), "utf8"),
    readFile(new URL("impressum/index.html", dist), "utf8"),
    readFile(new URL("erstinformation/index.html", dist), "utf8"),
    readFile(new URL("datenschutz/index.html", dist), "utf8"),
  ]);

  assert.match(home, /Vermieterrechtsschutz24/);
  assert.match(home, /<div id="root"><\/div>/);
  assert.match(impressum, /Impressum \| Vermieterrechtsschutz24/);
  assert.match(erstinformation, /Erstinformation \| Vermieterrechtsschutz24/);
  assert.match(datenschutz, /Datenschutz \| Vermieterrechtsschutz24/);
  assert.doesNotMatch(home, /codex-preview|react-loading-skeleton/);
});

test("bundles the funnel, legal content and public assets", async () => {
  const assetNames = await readdir(new URL("assets/", dist));
  const scripts = assetNames.filter((name) => name.endsWith(".js"));
  const styles = assetNames.filter((name) => name.endsWith(".css"));
  const bundledJavaScript = (await Promise.all(
    scripts.map((name) => readFile(new URL(`assets/${name}`, dist), "utf8")),
  )).join("\n");
  const bundledStyles = (await Promise.all(
    styles.map((name) => readFile(new URL(`assets/${name}`, dist), "utf8")),
  )).join("\n");

  assert.match(bundledJavaScript, /Fragen vor der Anfrage/);
  assert.match(bundledJavaScript, /Formular absenden/);
  assert.match(bundledJavaScript, /Erstinformation nach § 15 VersVermV/);
  assert.match(bundledJavaScript, /api\/contact\.php/);
  assert.doesNotMatch(bundledJavaScript, /formsubmit\.co/);
  assert.match(bundledJavaScript, /Anbieterangaben/);
  assert.match(bundledJavaScript, /Ihre Rechte/);
  assert.doesNotMatch(bundledJavaScript, /TOP-PRODUKT|Testsieger|weltweit.größter|ab € 6,90/iu);
  assert.doesNotMatch(bundledJavaScript, /arag-wordmark|awards\.png|hero-office|bauherren\.jpg/);
  assert.match(bundledStyles, /#fff100/);
  assert.match(bundledStyles, /#f8f0dd/);
  assert.match(bundledStyles, /#fcf9f4/);
  assert.match(bundledStyles, /#f1e5c7/);
  assert.match(bundledStyles, /consent-field/);
  assert.ok((await stat(new URL("hero-home.jpg", dist))).size > 0);
  assert.ok((await stat(new URL("home-renovation.jpg", dist))).size > 0);
  assert.ok((await stat(new URL("favicon.svg", dist))).size > 0);
  assert.match(await readFile(new URL("favicon.svg", dist), "utf8"), />VR<\/text>/);
  assert.ok((await stat(new URL("api/contact.php", dist))).size > 0);
});
