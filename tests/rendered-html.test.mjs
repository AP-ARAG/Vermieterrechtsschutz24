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
  assert.match(bundledJavaScript, /Angebot anfragen/);
  assert.match(bundledJavaScript, /Schritt/);
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
  assert.match(bundledJavaScript, /hashchange/);
  assert.match(bundledJavaScript, /scrollIntoView/);
  assert.match(bundledJavaScript, /tel:\+491721597777/);
  assert.match(bundledJavaScript, /0172 1597777 anrufen/);
  assert.match(bundledJavaScript, /vermieter-hero-lead-submit/);
  assert.match(bundledJavaScript, /vermieter-bottom-lead-submit/);
  assert.match(bundledJavaScript, /insurance_lead_success/);
  assert.match(bundledJavaScript, /insurance:lead-success/);
  assert.match(bundledJavaScript, /utm_term/);
  assert.match(bundledJavaScript, /gclid/);
  for (const anchor of [
    "angebot", "vorteile", "berater", "leistungen", "tarife", "ablauf", "schritte",
    "hinweis", "bau", "fragen", "anfrage", "infos", "kontakt",
  ]) {
    assert.match(bundledJavaScript, new RegExp(anchor));
  }
  assert.match(bundledStyles, /scroll-margin-top:104px/);
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
  assert.doesNotMatch(bundledJavaScript, /home-5021372330\.app-ionos\.space|tiersafe\.de|home-5021386578\.app-ionos\.space/);
  assert.doesNotMatch(bundledJavaScript, /Buchenbergstr\. 3f|86420 Diedorf/);
  assert.match(bundledJavaScript, /rechtsschutzpartner24\.de\/contact\.php/);
  assert.match(bundledJavaScript, /form_type/);
  assert.match(bundledJavaScript, /answers_json/);
  assert.doesNotMatch(bundledJavaScript, /formsubmit\.co/);
  assert.match(bundledJavaScript, /Angaben gemäß § 5 DDG/);
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
  assert.match(bundledStyles, /answer-grid button\{[^}]*overflow-wrap:anywhere[^}]*hyphens:auto/);
  assert.match(bundledStyles, /hero-panel\{[^}]*width:min\(100%,730px\)/);
  assert.match(bundledStyles, /answer-grid button\{[^}]*width:203px[^}]*height:141px[^}]*background:#fff/);
  assert.match(bundledStyles, /answer-icon\{[^}]*stroke:currentColor/);
  assert.match(bundledStyles, /contact-fields\{[^}]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
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
  const htaccess = await readFile(new URL(".htaccess", dist), "utf8");
  assert.match(htaccess, /no-cache, no-store, must-revalidate/);
  assert.match(htaccess, /<FilesMatch "\^\\\.">[\s\S]*Require all denied/);
  assert.match(await readFile(new URL("robots.txt", dist), "utf8"), /Sitemap:/);
  assert.match(await readFile(new URL("sitemap.xml", dist), "utf8"), /erstinformation/);
  assert.match(await readFile(new URL("sitemap.xml", dist), "utf8"), /2026-09-24/);
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

test("delivers funnel leads through the shared secured mail endpoint", async () => {
  const endpoint = await readFile(new URL("../public/api/contact.php", import.meta.url), "utf8");
  const runtimeTemplate = await readFile(new URL("../.deploy-now/Vermieterrechtsschutz24/api/.env.template", import.meta.url), "utf8");
  const buildWorkflow = await readFile(new URL("../.github/workflows/Vermieterrechtsschutz24-build.yaml", import.meta.url), "utf8");
  assert.match(endpoint, /leads\.ap\.arag@gmail\.com/);
  assert.match(endpoint, /datenschutz_bestaetigt/);
  assert.match(endpoint, /erstinformation_digital/);
  assert.match(endpoint, /send_via_smtp/);
  assert.match(endpoint, /X-Funnel-Mailer: ionos-smtp-v1/);
  assert.match(endpoint, /UTM-Keyword/);
  assert.match(endpoint, /Google Click-ID/);
  assert.match(endpoint, /funnel_id/);
  assert.doesNotMatch(endpoint, /\bmail\s*\(/);
  assert.match(runtimeTemplate, /MAIL_HOST="\$IONOS_MAIL_HOST"/);
  assert.match(runtimeTemplate, /MAIL_PASSWORD="\$IONOS_MAIL_PASSWORD"/);
  assert.match(buildWorkflow, /intermediate-data-file: dist\/\.template-renderer-data/);
  const privacy = await readFile(new URL("../app/datenschutz/page.tsx", import.meta.url), "utf8");
  assert.match(privacy, /rechtsschutzpartner24\.de/);
  assert.match(privacy, /Gmail-Postfach/);
  assert.match(privacy, /UTM-Keyword/);
  assert.match(privacy, /26\. September 2026/);
});
