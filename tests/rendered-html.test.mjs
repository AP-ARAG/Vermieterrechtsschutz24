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

  assert.match(home, /Vermieterrechtsschutz24 \| Rechtsschutzberatung für Vermieter/);
  assert.match(home, /<div id="root"><\/div>/);
  assert.match(impressum, /Impressum \| Vermieterrechtsschutz24/);
  assert.match(erstinformation, /Erstinformation \| Vermieterrechtsschutz24/);
  assert.match(datenschutz, /Datenschutz \| Vermieterrechtsschutz24/);
  assert.match(home, /https:\/\/vermieterrechtsschutz24\.com\//);
  assert.match(impressum, /https:\/\/vermieterrechtsschutz24\.com\/impressum/);
  assert.match(erstinformation, /https:\/\/vermieterrechtsschutz24\.com\/erstinformation/);
  assert.match(datenschutz, /https:\/\/vermieterrechtsschutz24\.com\/datenschutz/);
  assert.doesNotMatch(
    [home, impressum, erstinformation, datenschutz].join("\n"),
    /mein-vermieterrechtsschutz24/i,
  );
  assert.match(home, /twitter:image/);
  assert.match(home, /og:image:width/);
  assert.match(home, /site-tools\.js\?v=20260922-a11y-ui-v4/);
  assert.match(home, /"@type":"InsuranceAgency"/);
  assert.match(home, /"@type":"FAQPage"/);
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
  assert.match(bundledJavaScript, /Passender Schutz für Ihre Immobilie\./);
  assert.doesNotMatch(bundledJavaScript, /Rechtsschutz für private Vermieter – passend zur Immobilie\./);
  assert.match(bundledJavaScript, /Anfrage senden/);
  assert.match(bundledJavaScript, /Mehr zu wichtigen Leistungen/);
  assert.match(bundledJavaScript, /ARAG JuraTel®/);
  assert.match(bundledJavaScript, /Anwalts- & Gerichtskosten/);
  assert.match(bundledJavaScript, /Wartezeiten & Beginn/);
  assert.match(bundledJavaScript, /Information schließen/);
  assert.match(bundledJavaScript, /datenschutz_bestaetigt/);
  assert.match(bundledJavaScript, /Erstinformation nach § 15 VersVermV/);
  assert.match(bundledJavaScript, /Persönlich beraten von/);
  assert.match(bundledJavaScript, /agapios-papadakis\.jpg/);
  assert.match(bundledJavaScript, /Optional übernehmen wir die Miete für wahlweise 6 oder 12 Monate/);
  assert.match(bundledJavaScript, /Wir vermitteln Ihnen einen erfahrenen Mediator und übernehmen die Kosten/);
  assert.match(bundledJavaScript, /Von der ersten Einordnung bis zum konkreten Angebot persönlich begleitet/);
  assert.match(bundledJavaScript, /Objektbezogene Aufnahme/);
  assert.doesNotMatch(bundledJavaScript, /Individuell kalkuliert/);
  assert.match(bundledJavaScript, /Tarife auf einen Blick/);
  assert.match(bundledJavaScript, /Grundabsicherung/);
  assert.match(bundledJavaScript, /Erweiterter Schutz/);
  assert.match(bundledJavaScript, /Bauherren-Rechtsschutz enthalten/);
  assert.match(bundledJavaScript, /Diese Übersicht ist eine verkürzte Orientierung/);
  assert.match(bundledJavaScript, /D-05V5-SZ9YK-16/);
  assert.match(bundledJavaScript, /Wankelstraße 2/);
  assert.match(bundledJavaScript, /86356 Neusäß/);
  assert.match(bundledJavaScript, /Vermieterrechtsschutz24/);
  assert.doesNotMatch(bundledJavaScript, /mein-vermieterrechtsschutz24/i);
  assert.match(bundledJavaScript, /Hauptgeschäftsstelle ARAG/);
  assert.doesNotMatch(bundledJavaScript, /brand-mark[^>]*>ARAG/);
  assert.doesNotMatch(bundledJavaScript, /ARAG Rechtsschutz für Vermieter persönlich beraten/);
  assert.match(bundledJavaScript, /Versicherungsnavigator24/);
  assert.match(bundledJavaScript, /home-5021372330\.app-ionos\.space/);
  assert.match(bundledJavaScript, /tiersafe\.de/);
  assert.match(bundledJavaScript, /home-5021386578\.app-ionos\.space/);
  assert.doesNotMatch(bundledJavaScript, /Buchenbergstr\. 3f|86420 Diedorf/);
  assert.match(bundledJavaScript, /api\/contact\.php/);
  assert.doesNotMatch(bundledJavaScript, /formsubmit\.co/);
  assert.match(bundledJavaScript, /Anbieterangaben/);
  assert.match(bundledJavaScript, /Ihre Rechte/);
  assert.doesNotMatch(bundledJavaScript, /TOP-PRODUKT|Testsieger|weltweit.größter|ab € 6,90/iu);
  assert.doesNotMatch(bundledJavaScript, /arag-wordmark|awards\.png|hero-office|bauherren\.jpg/);
  assert.match(bundledStyles, /#f8d32c/);
  assert.match(bundledStyles, /#000000/);
  assert.doesNotMatch(bundledStyles, /#1a1a1a|#050505|#264668|#172f4b|#07071a/);
  assert.match(bundledStyles, /highlights-grid/);
  assert.match(bundledStyles, /highlights-intro/);
  assert.doesNotMatch(bundledStyles, /trust-strip/);
  assert.match(bundledStyles, /max-width:1000px/);
  assert.match(bundledStyles, /minmax\(280px,390px\) minmax\(360px,1fr\)/);
  assert.match(bundledStyles, /footer-inner>\*\{min-width:0\}/);
  assert.match(bundledStyles, /tariff-meta/);
  assert.doesNotMatch(bundledStyles, /tariff-badge\{position:absolute/);
  assert.match(bundledStyles, /highlight-card h2\{min-height:56px/);
  assert.match(bundledStyles, /consent-field/);
  assert.match(bundledStyles, /network-bar/);
  assert.match(bundledStyles, /place-items:start center/);
  assert.ok((await stat(new URL("hero-home.jpg", dist))).size > 0);
  assert.ok((await stat(new URL("home-renovation.jpg", dist))).size > 0);
  assert.ok((await stat(new URL("agapios-papadakis.jpg", dist))).size > 0);
  assert.ok((await stat(new URL("favicon.svg", dist))).size > 0);
  assert.ok((await stat(new URL("og.png", dist))).size > 0);
  assert.ok((await stat(new URL("site-tools.js", dist))).size > 0);
  assert.match(await readFile(new URL("site-tools.js", dist), "utf8"), /Die Auswahl wird nicht gespeichert/);
  assert.match(await readFile(new URL("site-tools.js", dist), "utf8"), /aria-label="Barrierefreiheit"/);
  assert.match(await readFile(new URL("favicon.svg", dist), "utf8"), />M24<\/text>/);
  assert.ok((await stat(new URL("api/contact.php", dist))).size > 0);
  assert.match(await readFile(new URL(".htaccess", dist), "utf8"), /no-cache, no-store, must-revalidate/);
  assert.match(await readFile(new URL("robots.txt", dist), "utf8"), /Sitemap:/);
  assert.match(await readFile(new URL("sitemap.xml", dist), "utf8"), /erstinformation/);
  assert.match(await readFile(new URL("sitemap.xml", dist), "utf8"), /2026-09-18/);
  assert.match(bundledJavaScript, /data-exit-intent/);
  assert.match(bundledJavaScript, /Offizielle ARAG Produktinformationen/);
  assert.match(bundledStyles, /\.a11y-tools/);
  assert.match(bundledStyles, /\.a11y-panel\[hidden\]/);
  assert.match(bundledStyles, /safe-area-inset-bottom/);
  assert.match(bundledStyles, /a11y-trigger\{[^}]*width:52px/);
  assert.match(bundledStyles, /a11y-options button strong:after/);
  assert.doesNotMatch(bundledStyles, /a11y-high-contrast body\{[^}]*filter:/);
  assert.match(bundledStyles, /\.exit-intent/);
});
