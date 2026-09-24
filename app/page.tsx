"use client";

import { OfferInfoPoints, OfferWizard, SiteShell, scrollToOffer } from "./components";
import { operator } from "./legal-data";

const topics = [
  ["Mietverhältnisse", "Konflikte aus einem Mietverhältnis können schnell aufwendig werden. In der Beratung klären wir, welche versicherbaren Risiken für Ihre Situation relevant sind."],
  ["Wohnung und Grundstück", "Neben vermieteten Wohnungen können je nach Tarif auch zugehörige Grundstücke oder weitere Einheiten berücksichtigt werden."],
  ["Verträge rund ums Objekt", "Hausmeisterdienste, Handwerksbetriebe oder andere Vertragspartner bringen eigene Risiken mit. Wir schauen, welcher Schutz dazu passen kann."],
  ["Behörden und Abgaben", "Auch Auseinandersetzungen mit Behörden oder zu grundstücksbezogenen Abgaben können bei der Bedarfsermittlung eine Rolle spielen."],
  ["Bauen und Sanieren", "Bei geplanten Baumaßnahmen prüfen wir gemeinsam, ob ein zusätzlicher Baustein für die Bauphase sinnvoll und verfügbar ist."],
  ["Mietausfall", "Optional übernehmen wir die Miete für wahlweise 6 oder 12 Monate. Das ist der Fall, wenn der Vermieter den Mieter kündigt und dieser seiner Mietzahlung nicht mehr nachkommt."],
  ["Außergerichtliche Einigung", "Wir vermitteln Ihnen einen erfahrenen Mediator und übernehmen die Kosten. Telefonisch oder persönlich unterstützt er dabei, Streitigkeiten frühzeitig und einvernehmlich zu lösen."],
  ["Persönliche Orientierung", "Sie erhalten eine verständliche Einordnung von Leistungsumfang, Selbstbeteiligung, Wartezeiten und wichtigen Ausschlüssen."],
];

const highlights = [
  ["Objektbezogene Aufnahme", "Wohnung, Haus, Nutzung und Anzahl der Einheiten werden strukturiert erfasst."],
  ["Verständliche Einordnung", "Leistungsbereiche, Ausschlüsse und Selbstbeteiligung werden nachvollziehbar besprochen."],
  ["Wartezeiten im Blick", "Der gewünschte Versicherungsbeginn und mögliche Wartezeiten werden vorab geklärt."],
  ["Persönlicher Kontakt", "Sie sprechen direkt mit einem festen Ansprechpartner statt mit einem anonymen Vergleichsportal."],
];

const consultationSteps = [
  {
    number: "01",
    title: "Ausgangslage erfassen",
    text: "Wir halten fest, welche Immobilie Sie vermieten, wie viele Einheiten betroffen sind und ob bereits ein Konflikt bekannt ist.",
    items: ["Objekt und Nutzung", "Anzahl der Einheiten", "Bestehende Streitfälle"],
  },
  {
    number: "02",
    title: "Bedarf einordnen",
    text: "Gemeinsam priorisieren wir die Risiken, die für Ihre Vermietung besonders wichtig sind.",
    items: ["Gewünschter Schutzumfang", "Optionale Zusatzbausteine", "Passende Selbstbeteiligung"],
  },
  {
    number: "03",
    title: "Angebot in Ruhe prüfen",
    text: "Sie erhalten ein individuelles Angebot und können Bedingungen, Grenzen und Beitrag vor einer Entscheidung vergleichen.",
    items: ["Konkrete Tarifunterlagen", "Leistungen und Ausschlüsse", "Keine Online-Sofortbindung"],
  },
];

const tariffOptions = [
  {
    name: "Basis",
    eyebrow: "Grundabsicherung",
    description: "Klarer Grundschutz für die gerichtliche Durchsetzung Ihrer Interessen.",
    features: ["Anwalts- und Gerichtskosten vor Gericht", "ARAG JuraTel® und Mediation", "Unbegrenzte Versicherungssumme in Deutschland"],
  },
  {
    name: "Komfort",
    eyebrow: "Erweiterter Schutz",
    description: "Ergänzt den Grundschutz um wichtige außergerichtliche Leistungen.",
    features: ["Außergerichtliche Anwaltskosten", "Forderungsmanagement bei Mietrückständen", "Mietausfallschutz optional wählbar"],
    featured: true,
  },
  {
    name: "Premium",
    eyebrow: "Umfangreicher Schutz",
    description: "Mehr Leistungsumfang für Vermietung und ausgewählte Bauvorhaben.",
    features: ["Leistungen aus dem Komfort-Paket", "Bauherren-Rechtsschutz enthalten", "Schutz bei ausgewählten Handwerkerkonflikten"],
  },
];

const faqs = [
  ["Ist ein bereits laufender Streit versichert?", "Ein schon bekannter oder begonnener Konflikt ist regelmäßig nicht rückwirkend versicherbar. Ob eine Leistung möglich ist, entscheidet sich ausschließlich nach dem konkreten Vertrag und der Prüfung des Versicherers."],
  ["Gibt es eine Wartezeit?", "Das hängt vom gewählten Tarif und vom betroffenen Leistungsbereich ab. Im persönlichen Angebot weisen wir Wartezeiten ausdrücklich aus."],
  ["Kann ich mehrere Wohnungen berücksichtigen?", "Ja, mehrere Einheiten können bei der Bedarfsermittlung erfasst werden. Anzahl, Nutzung und Mieteinnahmen können den Beitrag und den angebotenen Schutz beeinflussen."],
  ["Welche Kosten können versichert sein?", "Je nach Vertrag können beispielsweise Anwalts-, Gerichts-, Mediations- oder Sachverständigenkosten umfasst sein. Maßgeblich sind immer Versicherungsschein und Versicherungsbedingungen."],
  ["Erhalte ich hier eine Rechtsberatung?", "Nein. Diese Website dient der Kontaktaufnahme für eine Versicherungsvermittlung. Eine rechtliche Beurteilung Ihres Einzelfalls leisten zugelassene Rechtsanwältinnen und Rechtsanwälte."],
  ["Was passiert nach meiner Anfrage?", "Ihre Angaben werden zur Vorbereitung des Rückrufs genutzt. Im Gespräch klären wir offene Punkte und erstellen nur dann ein Angebot, wenn der gewünschte Schutz grundsätzlich passt."],
  ["Werden meine Daten für Werbung verwendet?", "Die Anfrage wird zur Bearbeitung Ihres Anliegens genutzt. Details zu Empfängern, Speicherdauer und Ihren Rechten finden Sie in der Datenschutzerklärung."],
];

function CheckList({ items }: { items: string[] }) {
  return <ul>{items.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>;
}

export default function Home() {
  return (
    <SiteShell>
      <section className="hero" id="angebot">
        <div className="hero-panel">
          <div className="hero-copy">
            <p className="hero-eyebrow">Vermieterrechtsschutz</p>
            <h1>Passender Schutz für Ihre Immobilie.</h1>
            <p className="hero-summary">Persönlich. Unverbindlich. Klar.</p>
          </div>
          <OfferWizard />
          <OfferInfoPoints />
        </div>
      </section>

      <section className="highlights-section" id="vorteile" aria-labelledby="highlights-title">
        <div className="highlights-intro">
          <h2 id="highlights-title">Von der ersten Einordnung bis zum konkreten Angebot persönlich begleitet.</h2>
          <ul aria-label="Vorteile der persönlichen Beratung">
            <li><strong>Persönlich</strong><span>Ein direkter Ansprechpartner</span></li>
            <li><strong>Nachvollziehbar</strong><span>Bedingungen klar eingeordnet</span></li>
            <li><strong>Unverbindlich</strong><span>Erst prüfen, dann entscheiden</span></li>
          </ul>
        </div>
        <div className="highlights-grid">
          {highlights.map(([title, text]) => (
            <article className="highlight-card" key={title}>
              <div className="round-check" aria-hidden="true">✓</div>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="advisor-section" id="berater" aria-labelledby="advisor-title">
        <div className="advisor-card">
          <div className="advisor-portrait">
            <img src="/agapios-papadakis.jpg" alt={`Porträt von ${operator.name}`} width="1447" height="1087" loading="lazy" decoding="async" />
          </div>
          <div className="advisor-copy">
            <p className="eyebrow">Ihr Ansprechpartner</p>
            <h2 id="advisor-title">Persönlich beraten von {operator.name}</h2>
            <p>{operator.qualification} bei der {operator.businessName}. Im Gespräch werden Immobilie, gewünschter Schutzumfang und wichtige Vertragsdetails nachvollziehbar eingeordnet.</p>
            <div className="advisor-actions">
              <a className="blue-button" href={`tel:${operator.phoneHref}`}>Jetzt anrufen</a>
              <a className="text-link" href={operator.profileUrl} target="_blank" rel="noopener noreferrer">Offizielles Vermittlerprofil</a>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" id="leistungen">
        <p className="eyebrow section-eyebrow">Leistungsbereiche einordnen</p>
        <h2>Diese Themen können bei der Absicherung einer vermieteten Immobilie wichtig sein</h2>
        <p className="section-note">Die Übersicht beschreibt typische Beratungsfelder, aber keine zugesagten Versicherungsleistungen. Entscheidend sind immer das individuelle Angebot und die dazugehörigen Bedingungen.</p>
        <div className="services-grid">
          {topics.map(([title, body]) => (
            <article className="service-card" key={title}>
              <div className="round-check" aria-hidden="true">✓</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tariff-overview" id="tarife" aria-labelledby="tariff-title">
        <div className="tariff-intro">
          <p className="eyebrow">Tarife auf einen Blick</p>
          <h2 id="tariff-title">Basis, Komfort oder Premium</h2>
          <p>Drei Leistungsstufen – kompakt eingeordnet. Den konkreten Beitrag berechnen wir passend zu Ihrer Immobilie.</p>
        </div>
        <div className="tariff-grid">
          {tariffOptions.map((tariff) => (
            <article className={`tariff-card tariff-${tariff.name.toLowerCase()}${tariff.featured ? " is-featured" : ""}`} key={tariff.name}>
              <div className="tariff-meta">
                <p className="tariff-kicker">{tariff.eyebrow}</p>
                {tariff.featured && <span className="tariff-badge">Empfehlung</span>}
              </div>
              <h3>{tariff.name}-Paket</h3>
              <p className="tariff-description">{tariff.description}</p>
              <ul>
                {tariff.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <button className="tariff-button" type="button" onClick={scrollToOffer}>{tariff.name} anfragen</button>
            </article>
          ))}
        </div>
        <p className="tariff-disclaimer">Diese Übersicht ist eine verkürzte Orientierung. Maßgeblich sind das individuelle Angebot, der Versicherungsschein und die vereinbarten Versicherungsbedingungen. Leistungen, Ausschlüsse, Wartezeiten und Beitrag können abweichen. <a href="https://www.arag.de/rechtsschutzversicherung/vermieterrechtsschutz/" target="_blank" rel="noopener noreferrer">Offizielle ARAG Produktinformationen</a>.</p>
      </section>

      <section className="plans-intro" id="ablauf">
        <p className="eyebrow">Der Weg zum Angebot</p>
        <h2>Drei Schritte, damit Schutzumfang und Immobilie zusammenpassen</h2>
      </section>
      <section className="plans-section" id="schritte">
        <div className="plans-grid">
          {consultationSteps.map((step, index) => (
            <article className={`plan plan-${["basic", "comfort", "premium"][index]}`} key={step.number}>
              <div className="step-number" aria-hidden="true">{step.number}</div>
              <h3>{step.title}</h3>
              <p className="plan-copy">{step.text}</p>
              <hr />
              <CheckList items={step.items} />
            </article>
          ))}
        </div>
      </section>
      <section className="plan-footnote" id="hinweis">
        <p>Beiträge und Leistungen lassen sich erst anhand Ihrer Angaben und der aktuellen Versicherungsbedingungen verlässlich bestimmen. Diese Website stellt weder ein verbindliches Angebot noch eine Deckungszusage dar.</p>
        <button className="blue-button" type="button" onClick={scrollToOffer}>Rückruf anfordern</button>
      </section>

      <section className="builders-section" id="bau">
        <div className="builders-inner">
          <p className="eyebrow">Bauen und modernisieren</p>
          <h2>Zusatzschutz für ein Bauvorhaben frühzeitig mitdenken</h2>
          <p className="builders-lead">Ein Umbau, eine energetische Sanierung oder ein Neubau verändert die Risikolage. Deshalb sollte vor Projektbeginn geklärt werden, welche Konflikte versicherbar sind und ab wann der Schutz gelten kann.</p>
          <hr />
          <div className="builder-copy">
            <h3>Entscheidend ist der konkrete Vertrag</h3>
            <p>Versicherbarkeit, Wartezeit, Versicherungssumme und Ausschlüsse unterscheiden sich je nach Produkt. Wir erläutern Ihnen die Unterlagen, bevor Sie sich entscheiden.</p>
          </div>
          <div className="builder-cards">
            <article><div className="round-check" aria-hidden="true">1</div><h3>Projekt beschreiben</h3><p>Art, Umfang und geplanter Start der Maßnahme werden aufgenommen.</p></article>
            <article><div className="round-check" aria-hidden="true">2</div><h3>Risiken priorisieren</h3><p>Behörden, Planer, Bauträger und Handwerksbetriebe werden getrennt betrachtet.</p></article>
            <article><div className="round-check" aria-hidden="true">3</div><h3>Bedingungen prüfen</h3><p>Wir weisen auf Beginn, Grenzen und mögliche Wartezeiten des Schutzes hin.</p></article>
          </div>
        </div>
      </section>

      <section className="faq-section" id="fragen">
        <h2>Fragen vor der Anfrage</h2>
        <div className="faq-box">
          {faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">⌄</span></summary><p>{answer}</p></details>)}
        </div>
      </section>
      <section className="closing-funnel" id="anfrage" aria-labelledby="closing-funnel-title">
        <div className="closing-funnel-copy">
          <p className="eyebrow">Noch einmal vollständig prüfen</p>
          <h2 id="closing-funnel-title">Ihre Immobilie noch einmal vollständig einordnen.</h2>
          <p>Der gleiche ausführliche Bedarfscheck steht Ihnen auch hier am Seitenende zur Verfügung.</p>
          <ul>
            <li>Sechs verständliche Schritte</li>
            <li>Objekt, Schutzbedarf und Startzeitpunkt</li>
            <li>Unverbindliche persönliche Rückmeldung</li>
          </ul>
        </div>
        <div className="closing-funnel-panel"><OfferWizard /></div>
      </section>
    </SiteShell>
  );
}
