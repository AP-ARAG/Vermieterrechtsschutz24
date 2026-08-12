"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

export function scrollToOffer() {
  document.getElementById("angebot")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-link" aria-label="Zur Startseite">
        <img src="/arag-wordmark.jpg" alt="ARAG Hauptgeschäftsstelle Thomas Wirth & Team" />
      </Link>
      <button className="outline-button" type="button" onClick={scrollToOffer}>
        Jetzt Rückruf anfordern
      </button>
    </header>
  );
}

export function Footer({ legalPage = false }: { legalPage?: boolean }) {
  return (
    <>
      {!legalPage && (
        <section className="facts" aria-label="ARAG Fakten">
          <p>Weltweit <strong>größter<br />Rechtsschutzversicherer</strong></p>
          <p>über <strong>85 Jahre</strong> Erfahrung</p>
          <p><strong>Größtes</strong> deutsches<br />Versicherungsunternehmen<br />in Familienbesitz</p>
          <p>ARAG SE zählt zu den besten<br />drei Rechtsschutzversicherern</p>
        </section>
      )}
      <footer className="site-footer">
        <div>
          <strong>ARAG Hauptgeschäftsstelle<br />Nürnberg-Süd</strong>
          <p>Rothenburger Str. 245<br />90439 Nürnberg<br />Telefon: <a href="tel:015678562433">0156‒78562433</a><br />Telefax: 0911-47775025<br />E-Mail: <a href="mailto:info@sofortrechtsschutz.de">info@sofortrechtsschutz.de</a></p>
        </div>
        <nav aria-label="Rechtliche Seiten">
          {legalPage && <Link href="/">Home</Link>}
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <button type="button" onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}>Datenschutz-Einstellung</button>
        </nav>
      </footer>
    </>
  );
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [choices, setChoices] = useState({ analytics: false, ads: false, personalization: false });

  useEffect(() => {
    setOpen(!localStorage.getItem("sr-cookie-consent"));
    const show = () => { setSettings(true); setOpen(true); };
    window.addEventListener("open-cookie-settings", show);
    return () => window.removeEventListener("open-cookie-settings", show);
  }, []);

  const save = (value: string) => {
    localStorage.setItem("sr-cookie-consent", value);
    setOpen(false);
    setSettings(false);
  };

  if (!open) return null;

  return (
    <div className="cookie-backdrop" role="presentation">
      <section className="cookie-dialog" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
        {!settings ? (
          <>
            <h2 id="cookie-title">Wir nutzen Cookies und andere Technologien.</h2>
            <p>Diese Seite nutzt Dienste von Drittanbietern, die Informationen auf dem Endgerät eines Seitenbesuchers speichern oder abrufen, um ihre Dienste anzubieten, stetig zu verbessern und Werbung entsprechend den Interessen der Nutzer anzuzeigen. Sie können Ihre Auswahl jederzeit ändern.</p>
            <div className="cookie-actions">
              <button onClick={() => save("all")}>Alles akzeptieren</button>
              <button className="cookie-secondary" onClick={() => setSettings(true)}>Einstellungen</button>
              <button className="cookie-ghost" onClick={() => save("essential")}>Ablehnen</button>
            </div>
            <div className="cookie-links"><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutzerklärung</Link></div>
          </>
        ) : (
          <>
            <h2 id="cookie-title">Bitte wählen Sie zuzulassende Richtlinien aus</h2>
            <label className="cookie-toggle"><span>Technisch notwendig</span><input type="checkbox" checked disabled /></label>
            <label className="cookie-toggle"><span>Analyse / Statistiken</span><input type="checkbox" checked={choices.analytics} onChange={e => setChoices({ ...choices, analytics: e.target.checked })} /></label>
            <label className="cookie-toggle"><span>Anzeigen / Ads</span><input type="checkbox" checked={choices.ads} onChange={e => setChoices({ ...choices, ads: e.target.checked })} /></label>
            <label className="cookie-toggle"><span>Personalisierung</span><input type="checkbox" checked={choices.personalization} onChange={e => setChoices({ ...choices, personalization: e.target.checked })} /></label>
            <div className="cookie-actions">
              <button onClick={() => save(JSON.stringify(choices))}>Speichern</button>
              <button className="cookie-secondary" onClick={() => { setChoices({ analytics: true, ads: true, personalization: true }); save("all"); }}>Alle akzeptieren</button>
              <button className="cookie-ghost" onClick={() => setSettings(false)}>Abbrechen</button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

const questions = [
  "Haben Sie mehr als eine Wohnung oder Haus, das Sie versichern möchten?",
  "Benötigen Sie einen zusätzlichen Mietausfallschutz?",
  "Gibt es bereits einen Rechtsfall?",
];

export function OfferWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const choose = (answer: string) => {
    const next = [...answers];
    next[step] = answer;
    setAnswers(next);
    setStep(step + 1);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="wizard-card wizard-success" role="status">
        <div className="big-check">✓</div>
        <h2>Vielen Dank für Ihre Anfrage!</h2>
        <p>Ihre Angaben wurden erfasst. Wir melden uns schnellstmöglich bei Ihnen.</p>
        <button className="blue-button" onClick={() => { setSent(false); setStep(0); setAnswers([]); }}>Neue Anfrage</button>
      </div>
    );
  }

  if (step < 3) {
    return (
      <div className="wizard-card" role="group" aria-label={`Schritt ${step + 1} von 4`}>
        <h2>{questions[step]}</h2>
        <div className="answer-grid" role="radiogroup" aria-label={questions[step]}>
          <button type="button" onClick={() => choose("Ja")}><span className="answer-icon">✓</span><span>Ja</span></button>
          <button type="button" onClick={() => choose("Nein")}><span className="answer-icon">×</span><span>Nein</span></button>
        </div>
        <div className="wizard-nav">
          {step > 0 && <button type="button" className="back-button" onClick={() => setStep(step - 1)}>Zurück</button>}
          <span className="step-badge">Schritt {step + 1}/4</span>
        </div>
      </div>
    );
  }

  return (
    <form className="wizard-card contact-form" onSubmit={submit}>
      <h2>Bitte tragen Sie Ihre Kontaktdaten ein:</h2>
      <label>Name *<input name="name" autoComplete="name" required /></label>
      <label>E-Mail *<input type="email" name="email" autoComplete="email" required /></label>
      <label>Telefon<div className="phone-input"><span>🇩🇪 &nbsp; +49</span><input type="tel" name="phone" autoComplete="tel" aria-label="Telefonnummer" /></div></label>
      <p className="privacy-note">Wir verarbeiten Ihre Daten zum Zwecke der Bearbeitung Ihrer Anfrage. Bitte beachten Sie unsere <Link href="/datenschutz">Datenschutzerklärung</Link>.</p>
      <div className="wizard-nav">
        <button type="button" className="back-button" onClick={() => setStep(2)}>Zurück</button>
        <button type="submit" className="blue-button">Formular absenden</button>
      </div>
    </form>
  );
}

export function SiteShell({ children, legalPage = false }: { children: React.ReactNode; legalPage?: boolean }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer legalPage={legalPage} />
      <CookieConsent />
    </>
  );
}
