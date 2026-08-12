"use client";

import { OfferWizard, SiteShell, scrollToOffer } from "./components";

const services = [
  ["Bonitäts-Checks", <>Mit dem <strong>Bonitäts-Check</strong> können Sie bei der Auswahl zukünftiger Mieter vorsorgen. In der Premiumvariante begleitet ein durch uns bezahlter Dienstleister auf Wunsch den Ein- und Auszug. Er erstellt im Namen beider Vertragspartner ein <strong>Übergabeprotokoll.</strong></>],
  ["ARAG JuraTel.®", <>Ganz gleich wann Sie einen juristischen Rat brauchen – greifen Sie kurzerhand zum Telefon und sprechen Sie mit einem Anwalt. Das geht auch nachts, damit Sie beruhigt schlafen können.</>],
  ["Steuer- und Bauherrentelefon", <>In allen Bausituationen vermitteln wir Ihnen rund um die Uhr auf Wunsch einen auf Ihren Fall <strong>spezialisierten Anwalt.</strong> Schon weit vor dem ersten Spatenstich und lange nach dem Richtfest.</>],
  ["Mediation", <>Wir sind für Sie da mit der Konfliktlösung durch Mediation. Wir vermitteln und <strong>bezahlen einen Mediator</strong>, der telefonisch und persönlich hilft, einen Streit frühzeitig beizulegen.</>],
  ["Außergerichtliche Sachverständigen-Kosten", <>Soll ein außergerichtlich bestellter Sachverständiger mit dem Einverständnis beider Parteien Ihre Position stärken, tragen wir auch dafür die Kosten.</>],
  ["ARAG Online Rechts-Service", <>Wir stellen Ihnen rechtssichere Formulare und vorgefertigte Mietverträge zur Verfügung.</>],
  ["Mietausfallsschutz", <>Wenn der Vermieter kündigt und der Mieter seiner Mietzahlung daraufhin nicht mehr nachkommt, übernehmen wir die Miete für wahlweise 6 oder 12 Monate.</>],
  ["Forderungs-Management", <>Unser Inkasso-Partner kümmert sich für Sie um offene und rückständige Mieten.</>],
];

const comfort = ["Übernahme der Anwalts- und Prozesskosten (außergerichtlich und gerichtlich)", "Bonitäts-Check", "ARAG JuraTel.®", "Steuer- und Bauherrentelefon", "Mediation", "Außergerichtliche Sachverständigen-Kosten", "ARAG Online Rechts-Service", "Forderungsmanagement", "Optional: Mietausfallsschutz (mit 3 Monaten Wartezeit)"];
const premium = [...comfort.slice(0, 8), "Zusätzlich: Bauherren-Rechtsschutz", "Optional: Mietausfallsschutz (mit 3 Monaten Wartezeit)"];

const faqs = [
  ["Bauherren-Rechtsschutz", "Ihr Bauantrag wird nur mit diversen, zum Teil nicht nachvollziehbaren Auflagen genehmigt. Sie nehmen sich einen Anwalt und legen Widerspruch ein – auf unsere Kosten. Auf Wunsch vermitteln wir auch einen auf dem Gebiet spezialisierten Anwalt."],
  ["Wohnungs- und Grundstücks-Rechtsschutz", "Bei einem Mieter sind die Mietrückstände soweit aufgelaufen, dass Sie eine Räumungsklage erwägen. Ein Fachanwalt übernimmt für Sie die rechtlichen Schritte und erwirkt einen Räumungstitel. Wir tragen die Räumungskosten sowie die Einlagerung von Mieterinventar. Auch Mietausfall, Übergabeprotokolle und Eigenbedarf können abgesichert sein."],
  ["Mediation", "In Ihrem Mietshaus ist zwischen zwei Parteien ein Streit entbrannt, der Sie zum Handeln zwingt. Sie schalten zur Streitbeilegung einen durch die ARAG vermittelten Mediator ein."],
  ["Straf-Rechtsschutz", "Ein Bewohner des Nachbarhauses hat sich schwer verletzt. Die Staatsanwaltschaft leitet ein Ermittlungsverfahren gegen Sie ein. Sie nehmen sich auf unsere Kosten einen Anwalt, der die Einstellung des Verfahrens erreicht."],
  ["Ordnungswidrigkeiten-Rechtsschutz", "Ein Mieter wirft Ihnen vor, dass beim Ablesen der Heizung nicht geeichte Messgeräte zum Einsatz gekommen sind. Sie wollen sich gegen den Vorwurf wehren."],
  ["Steuer-Rechtsschutz", "Der Grundsteuer-Bescheid für Ihre Immobilie scheint zu hoch, Sie legen Einspruch ein. Oder es gibt Konflikte um die Höhe der laufenden Abwasser- oder Abfallgebühren."],
  ["Rechtsschutz im Vertrags- und Sachenrecht", "Es gibt Streitigkeiten mit Dienstleistern wie Hausmeister, Reinigungsfirma oder Gärtner, weil diese nicht ordnungsgemäß gearbeitet haben."],
  ["Verwaltungs-Rechtsschutz", "Ihnen wird vorgeworfen, Brandschutzvorschriften nicht eingehalten zu haben."],
  ["Rechtsschutz für Ihre Immobilie in Österreich", "Auch Ihre Immobilie in Österreich können Sie bei uns versichern."],
];

function TrustStrip({ mobile = false }: { mobile?: boolean }) {
  return (
    <section className={`trust-strip ${mobile ? "trust-mobile" : "trust-desktop"}`}>
      <p>Vertrauen Sie beim Immobilien-Rechtsschutz für Vermieter auf den <strong>mehrfachen Testsieger!</strong></p>
      <a href="https://www.arag.com/medien/pdf/presse/pm_deutscher_versicherungs-award.pdf" target="_blank" rel="noreferrer" aria-label="Deutscher Versicherungs-Award öffnen"><img src="/awards.png" alt="Testsiegel und Deutscher Versicherungs Award" /></a>
    </section>
  );
}

function CheckList({ items }: { items: string[] }) {
  return <ul>{items.map(item => <li key={item}><span>✓</span>{item}</li>)}</ul>;
}

export default function Home() {
  return (
    <SiteShell>
      <section className="hero" id="angebot">
        <div className="hero-panel">
          <div className="hero-copy">
            <h1>Immobilien-Rechtsschutz für Vermieter.</h1>
            <p>Bereits ab € 6,90 pro Monat.</p>
            <ul className="hero-benefits">
              <li>✓ <span>Sofortschutz ohne Wartezeit*</span></li>
              <li>✓ <span>24-Stunden Anwaltshotline</span></li>
              <li>✓ <span>Übernahme von Anwalts- und Gerichtskosten</span></li>
            </ul>
          </div>
          <OfferWizard />
        </div>
      </section>

      <TrustStrip />

      <section className="services-section">
        <h2>Profitieren Sie von diesen Leistungen der ARAG<br className="desktop-only" /> Immobilien-Rechtsschutz Versicherung</h2>
        <div className="services-grid">
          {services.map(([title, body]) => (
            <article className="service-card" key={title as string}>
              <div className="round-check">✓</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <TrustStrip mobile />

      <section className="plans-intro">
        <h2>Wie umfassend Sie sich gegen rechtliche Auseinandersetzungen ohne finanzielle Risiken rund um die Vermietung einer Immobilie absichern möchten, entscheiden Sie selbst!</h2>
      </section>
      <section className="plans-section">
        <div className="plans-grid">
          <article className="plan plan-basic">
            <div className="stars">★ ☆ ☆</div><h3>Basis-Paket<br />ab € 6,90</h3><p className="per-month">pro Monat</p><hr /><CheckList items={["Übernahme der Anwalts- und Prozesskosten (nur gerichtlich)"]} />
          </article>
          <article className="plan plan-comfort">
            <div className="stars">★ ★ ☆</div><h3>Komfort-Paket<br />ab € 15,90</h3><p className="per-month">pro Monat</p><span className="top-product">TOP-PRODUKT</span><hr /><CheckList items={comfort} />
          </article>
          <article className="plan plan-premium">
            <div className="stars">★ ★ ★</div><h3>Premium-Paket<br />ab € 27,90</h3><p className="per-month">pro Monat</p><hr /><CheckList items={premium} />
          </article>
        </div>
      </section>
      <section className="plan-footnote">
        <p>*Preise abhängig von der Anzahl der Wohnungen und der Jahresbruttomiete. Beim Rechtsschutz gilt für bestimmte Leistungen eine Wartezeit von drei Monaten.</p>
        <button className="blue-button" type="button" onClick={scrollToOffer}>Jetzt Angebot einholen</button>
      </section>

      <section className="builders-section">
        <div className="builders-inner">
          <h2>Exklusiv im Immobilien-Rechtsschutz Premium-Paket:<br /><strong>Der ARAG Bauherren-Rechtsschutz*</strong></h2>
          <p className="builders-note">*Beim Bauherrenrechtsschutz gilt eine Wartezeit von sechs Monaten.</p>
          <p className="builders-lead">Sie planen einen Um- oder sogar Neubau? Ein spannendes und ereignisreiches Unterfangen für Sie als Bauherr. Wir unterstützen Sie dabei mit vielen Leistungen und tragen dafür die Kosten.</p>
          <hr />
          <div className="builder-copy">
            <h3>Das gibt es so nur bei der ARAG: Der Bauherren-Rechtsschutz</h3>
            <p>Wir zahlen beim ARAG Bauherren-Rechtsschutz für die <strong>Anwaltsberatung</strong>, für notwendige Anwaltsschreiben und <strong>rechtliche Schritte</strong>, wenn Sie zum Beispiel mit der Bauantragsbehörde, dem Bauträger, einem Handwerker oder dem Architekten streiten. Und gehen Sie vor Gericht, <strong>übernehmen wir auch dafür die Kosten.</strong> Der Bauherren-Rechtsschutz ist eine <strong>Inklusivleistung der Premiumvariante.</strong></p>
          </div>
          <div className="builder-cards">
            <article><div className="round-check">✓</div><h3>Bauherrentelefon</h3><p>In allen Bausituationen vermitteln wir Ihnen rund um die Uhr einen auf Ihren Fall spezialisierten Anwalt.</p></article>
            <article><div className="round-check">✓</div><h3>Photovoltaikanlage:<br />Vorsicht Spannung</h3><p>Müssen Sie bei Erwerb, Installation oder Betrieb einer Photovoltaikanlage Ihr Recht durchsetzen, tragen wir dafür die Kosten.</p></article>
            <article><div className="round-check">✓</div><h3>ARAG Bauherren-Service</h3><p>Nutzen Sie Firmen- und Handwerker-Bonitäts-Checks. Bei Konflikten hilft auf Wunsch ein Mediator.</p></article>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <h2>Häufig gestellte Fragen<br />(FAQ)</h2>
        <div className="faq-box">
          {faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>⌄</span></summary><p>{answer}</p></details>)}
        </div>
      </section>
      <section className="bottom-cta"><button className="blue-button" type="button" onClick={scrollToOffer}>Jetzt Angebot einholen</button></section>
    </SiteShell>
  );
}
