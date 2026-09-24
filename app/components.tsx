"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "./link";
import { operator } from "./legal-data";

const DEFAULT_FORM_ENDPOINT = "https://rechtsschutzpartner24.de/contact.php";
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT?.trim() || DEFAULT_FORM_ENDPOINT;

function formText(data: FormData, name: string) {
  const value = data.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export function scrollToOffer() {
  document.getElementById("angebot")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  return (
    <>
      <aside className="network-bar" aria-label="Versicherungsnavigator24">
        <nav className="desktop-nav" aria-label="Zwischen Versicherungswelten wechseln">
          <a href="https://rechtsschutzpartner24.de">Rechtsschutz</a>
          <a className="is-current" href="/" aria-current="page">Vermieter</a>
        </nav>
        <details className="mobile-menu">
          <summary aria-label="Navigation öffnen">Menü</summary>
          <nav aria-label="Mobile Versicherungsbereiche">
            <a href="https://rechtsschutzpartner24.de">Rechtsschutz</a>
            <a href="/">Vermieter</a>
          </nav>
        </details>
      </aside>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand-link" aria-label="Zur Startseite">
            <span className="brand-copy">
              <strong>Hauptgeschäftsstelle ARAG</strong>
            </span>
          </Link>
          <Link className="outline-button" href="tel:+491721597777" aria-label="0172 1597777 anrufen">
            0172 1597777 anrufen
          </Link>
        </div>
      </header>
    </>
  );
}

export function Footer({ legalPage = false }: { legalPage?: boolean }) {
  return (
    <>
      {!legalPage && (
        <section className="facts" id="infos" aria-label="Hinweise zum Angebot">
          <div className="facts-grid">
            <article><span aria-hidden="true">01</span><p><strong>Für Vermieter</strong><br />Bedarf rund um vermietete Immobilien</p></article>
            <article><span aria-hidden="true">02</span><p><strong>Individuell</strong><br />Beitrag statt pauschalem Beispielpreis</p></article>
            <article><span aria-hidden="true">03</span><p><strong>Transparent</strong><br />Bedingungen vor dem Abschluss prüfen</p></article>
            <article><span aria-hidden="true">04</span><p><strong>Klare Einordnung</strong><br />Versicherungsvermittlung, keine Rechtsberatung</p></article>
          </div>
        </section>
      )}
      <footer className="site-footer" id="kontakt">
        <div className="footer-inner">
          <div className="footer-brand-column">
            <Link href="/" className="footer-brand" aria-label="Zur Startseite">
              <span className="footer-brand-mark" aria-hidden="true">M24</span>
              <span><strong>{operator.brandName}</strong><small>Rechtsschutzberatung für Vermieter</small></span>
            </Link>
            <p>Persönliche Versicherungsvermittlung für private Vermieter – verständlich eingeordnet und passend zur Immobilie.</p>
          </div>
          <div className="footer-contact">
            <p className="footer-label">Kontakt</p>
            <address>
              {operator.name}<br />
              {operator.street}<br />
              {operator.city}<br />
              <a href={`tel:${operator.phoneHref}`}>{operator.phoneDisplay}</a><br />
              <a href={`mailto:${operator.email}`}>{operator.email}</a>
            </address>
          </div>
          <nav aria-label="Rechtliche Seiten">
            <p className="footer-label">Informationen</p>
            {legalPage && <Link href="/">Home</Link>}
            <Link href="/impressum">Impressum</Link>
            <Link href="/erstinformation">Erstinformation</Link>
            <Link href="/datenschutz">Datenschutz</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 {operator.brandName}</span>
          <span>Versicherungsvermittlung · keine anwaltliche Rechtsberatung</span>
        </div>
      </footer>
    </>
  );
}

type AnswerIconName = "home" | "buildings" | "portfolio" | "apartment" | "business" | "mixed" | "check" | "minus" | "question" | "shield" | "case" | "fast" | "calendar" | "compass";

type AnswerOption = {
  label: string;
  icon: AnswerIconName;
};

const questions: { title: string; options: AnswerOption[] }[] = [
  { title: "Wie viele Einheiten möchten Sie absichern?", options: [
    { label: "Eine Einheit", icon: "home" },
    { label: "2 bis 5 Einheiten", icon: "buildings" },
    { label: "Mehr als 5 Einheiten", icon: "portfolio" },
  ] },
  { title: "Um welche Immobilien geht es?", options: [
    { label: "Wohnung", icon: "apartment" },
    { label: "Haus", icon: "home" },
    { label: "Gewerbe", icon: "business" },
    { label: "Gemischter Bestand", icon: "mixed" },
  ] },
  { title: "Mietausfallschutz mitprüfen?", options: [
    { label: "Ja", icon: "check" },
    { label: "Nein", icon: "minus" },
    { label: "Bitte einordnen", icon: "question" },
  ] },
  { title: "Besteht bereits ein Rechtsfall?", options: [
    { label: "Nein", icon: "shield" },
    { label: "Ja", icon: "case" },
    { label: "Nicht sicher", icon: "question" },
  ] },
  { title: "Wann soll der Schutz starten?", options: [
    { label: "Möglichst bald", icon: "fast" },
    { label: "In 1 bis 3 Monaten", icon: "calendar" },
    { label: "Erst orientieren", icon: "compass" },
  ] },
];

function AnswerIcon({ name }: { name: AnswerIconName }) {
  const paths: Record<AnswerIconName, React.ReactNode> = {
    home: <><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V21h13V10.5"/><path d="M9.5 21v-6h5v6"/></>,
    buildings: <><path d="M3 21V8h8v13"/><path d="M11 21V3h10v18"/><path d="M6 11h2M6 15h2M14 7h2M18 7h1M14 11h2M18 11h1M14 15h2M18 15h1"/></>,
    portfolio: <><path d="M3 21v-9h6v9M9 21V7h6v14M15 21V3h6v18"/><path d="M5.5 15h1M11.5 11h1M17.5 7h1"/></>,
    apartment: <><rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M14 7h2M9 11h2M14 11h2M9 15h2M14 15h2M11 21v-3h2v3"/></>,
    business: <><path d="M4 10h16l-2-6H6l-2 6Z"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
    mixed: <><rect x="3" y="4" width="8" height="8" rx="1"/><rect x="13" y="4" width="8" height="8" rx="1"/><rect x="3" y="14" width="8" height="7" rx="1"/><rect x="13" y="14" width="8" height="7" rx="1"/></>,
    check: <><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16.5 9"/></>,
    minus: <><circle cx="12" cy="12" r="9"/><path d="M8 12h8"/></>,
    question: <><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.4 2.4 0 1 1 3.5 2.15c-.85.45-1.3.95-1.3 1.85M12 16.8h.01"/></>,
    shield: <><path d="M12 3 5 6v5c0 4.6 2.8 8.2 7 10 4.2-1.8 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></>,
    case: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3M3 12h18M10 12v2h4v-2"/></>,
    fast: <><path d="M13 2 5 14h7l-1 8 8-12h-7l1-8Z"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M8 14h2M14 14h2M8 17h2"/></>,
    compass: <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z"/></>,
  };

  return <svg className="answer-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">{paths[name]}</svg>;
}

const infoItems = [
  {
    title: "ARAG JuraTel®",
    text: "Eine telefonische juristische Ersteinschätzung kann je nach Tarif enthalten sein. Umfang und Voraussetzungen ergeben sich aus dem konkreten Angebot und den Versicherungsbedingungen.",
  },
  {
    title: "Anwalts- & Gerichtskosten",
    text: "Je nach Leistungsvariante können Anwalts- und Gerichtskosten gerichtlich und teilweise außergerichtlich versichert sein. Maßgeblich sind der vereinbarte Tarif und die Bedingungen.",
  },
  {
    title: "Wartezeiten & Beginn",
    text: "Für einzelne Leistungsbereiche können Wartezeiten gelten. Versicherungsbeginn und bereits bekannte Rechtsfälle werden deshalb vor dem Abschluss ausdrücklich geprüft.",
  },
];

export function OfferInfoPoints() {
  const [activeInfo, setActiveInfo] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeInfo === null) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const close = () => setActiveInfo(null);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    document.body.classList.add("has-info-modal");
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.classList.remove("has-info-modal");
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [activeInfo]);

  const item = activeInfo === null ? null : infoItems[activeInfo];

  return (
    <>
      <ul className="offer-info-points" aria-label="Mehr zu wichtigen Leistungen">
        {infoItems.map((info, index) => (
          <li key={info.title}>
            <button type="button" aria-haspopup="dialog" onClick={() => setActiveInfo(index)}>
              <span className="offer-info-check" aria-hidden="true">✓</span>
              <span>{info.title}</span>
              <span className="offer-info-icon" aria-hidden="true">i</span>
            </button>
          </li>
        ))}
      </ul>

      {item && (
        <div className="offer-info-backdrop">
          <button className="offer-info-dismiss-layer" type="button" onClick={() => setActiveInfo(null)} aria-label="Information schließen" />
          <div
            ref={dialogRef}
            className="offer-info-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="offer-info-title"
            aria-describedby="offer-info-text"
          >
            <button ref={closeButtonRef} className="offer-info-close" type="button" onClick={() => setActiveInfo(null)} aria-label="Information schließen">×</button>
            <p className="offer-info-eyebrow">Kurz erklärt</p>
            <h2 id="offer-info-title">{item.title}</h2>
            <p id="offer-info-text">{item.text}</p>
            <p className="offer-info-note">Verbindlich sind ausschließlich Angebot, Versicherungsschein und Versicherungsbedingungen.</p>
          </div>
        </div>
      )}
    </>
  );
}

export function OfferWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const choose = (answer: string) => {
    const next = [...answers];
    next[step] = answer;
    setAnswers(next);
    setStep(step + 1);
    setStatus("idle");
    setErrorMessage("");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = new URLSearchParams({
      form_type: "vermieter",
      name: formText(formData, "name"),
      email: formText(formData, "email"),
      phone: formText(formData, "phone"),
      datenschutz_bestaetigt: formText(formData, "datenschutz_bestaetigt"),
      erstinformation_digital: formText(formData, "erstinformation_digital"),
      answers_json: JSON.stringify({
        Anzahl_Einheiten: answers[0] ?? "Keine Angabe",
        Immobilienart: answers[1] ?? "Keine Angabe",
        Mietausfallschutz: answers[2] ?? "Keine Angabe",
        Bestehender_Rechtsfall: answers[3] ?? "Keine Angabe",
        Gewuenschter_Start: answers[4] ?? "Keine Angabe",
      }),
      source_url: window.location.href,
      website: formText(formData, "_honey"),
    });

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8", Accept: "application/json" },
        body: payload.toString(),
      });
      const result = await response.json().catch(() => null) as { ok?: boolean; message?: string } | null;
      if (!response.ok || result?.ok !== true) {
        throw new Error(result?.message || "Die Anfrage konnte gerade nicht gesendet werden.");
      }
      setStatus("sent");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Die Anfrage konnte gerade nicht gesendet werden.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="wizard-card wizard-success" role="status">
        <div className="big-check">✓</div>
        <h2>Vielen Dank für Ihre Anfrage!</h2>
        <p>Ihre Angaben wurden erfasst. Wir melden uns schnellstmöglich bei Ihnen.</p>
        <button type="button" className="blue-button" onClick={() => { setStatus("idle"); setStep(0); setAnswers([]); setErrorMessage(""); }}>Neue Anfrage</button>
      </div>
    );
  }

  if (step < questions.length) {
    return (
      <div className="wizard-card" role="group" aria-label={`Schritt ${step + 1} von ${questions.length + 1}`}>
        <div className="wizard-intro">
          <h2>Angebot anfragen</h2>
          <p className="step-badge" aria-live="polite">Schritt {step + 1} von {questions.length + 1}</p>
        </div>
        <h3 className="wizard-question">{questions[step].title}</h3>
        <div className="answer-grid" role="group" aria-label={questions[step].title}>
          {questions[step].options.map((option) => (
            <button type="button" onClick={() => choose(option.label)} key={option.label}><AnswerIcon name={option.icon} /><span>{option.label}</span></button>
          ))}
        </div>
        <div className="wizard-nav">
          {step > 0 && <button type="button" className="back-button" onClick={() => { setStep(step - 1); setStatus("idle"); setErrorMessage(""); }}>Zurück</button>}
        </div>
      </div>
    );
  }

  return (
    <form className="wizard-card contact-form" action={FORM_ENDPOINT} method="POST" onSubmit={submit} aria-busy={status === "sending"}>
      <div className="wizard-intro">
        <h2>Angebot anfragen</h2>
        <p className="step-badge" aria-live="polite">Schritt {questions.length + 1} von {questions.length + 1}</p>
      </div>
      <h3 className="wizard-question">Kontaktdaten</h3>
      <input type="hidden" name="property_count" value={answers[0] ?? "Keine Angabe"} />
      <input type="hidden" name="property_type" value={answers[1] ?? "Keine Angabe"} />
      <input type="hidden" name="rent_loss_protection" value={answers[2] ?? "Keine Angabe"} />
      <input type="hidden" name="existing_legal_case" value={answers[3] ?? "Keine Angabe"} />
      <input type="hidden" name="desired_start" value={answers[4] ?? "Keine Angabe"} />
      <div className="contact-fields">
        <label className="contact-name"><span>Name</span><input type="text" name="name" autoComplete="name" maxLength={120} placeholder="Name" required /></label>
        <label><span>E-Mail</span><input type="email" name="email" autoComplete="email" maxLength={254} placeholder="E-Mail-Adresse" required /></label>
        <label><span>Telefon</span><input type="tel" name="phone" autoComplete="tel" maxLength={50} placeholder="Telefonnummer" required /></label>
      </div>
      <label className="form-honeypot" aria-hidden="true">Bitte nicht ausfüllen<input name="_honey" tabIndex={-1} autoComplete="off" /></label>
      <label className="privacy-note consent-field"><input type="checkbox" name="datenschutz_bestaetigt" value="ja" required /> <span><Link href="/datenschutz" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</Link> zur Kenntnis genommen.</span></label>
      <label className="privacy-note consent-field"><input type="checkbox" name="erstinformation_digital" value="ja" required /> <span>Digitaler <Link href="/erstinformation" target="_blank" rel="noopener noreferrer">Erstinformation</Link> ausdrücklich zugestimmt.</span></label>
      {status === "error" && <p className="form-error" role="alert">{errorMessage} Bitte versuchen Sie es erneut oder schreiben Sie an <a href={`mailto:${operator.email}`}>{operator.email}</a>.</p>}
      <div className="wizard-nav">
        <button type="button" className="back-button" onClick={() => { setStep(questions.length - 1); setStatus("idle"); setErrorMessage(""); }} disabled={status === "sending"}>Zurück</button>
        <button type="submit" className="blue-button" disabled={status === "sending"}>{status === "sending" ? "Wird gesendet …" : "Anfrage senden"}</button>
      </div>
    </form>
  );
}

export function SiteShell({ children, legalPage = false }: { children: React.ReactNode; legalPage?: boolean }) {
  useEffect(() => {
    let frame = 0;
    const scrollToCurrentAnchor = () => {
      const anchor = decodeURIComponent(window.location.hash.slice(1));
      if (!anchor) return;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        document.getElementById(anchor)?.scrollIntoView({ block: "start" });
      });
    };

    scrollToCurrentAnchor();
    window.addEventListener("load", scrollToCurrentAnchor);
    window.addEventListener("hashchange", scrollToCurrentAnchor);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("load", scrollToCurrentAnchor);
      window.removeEventListener("hashchange", scrollToCurrentAnchor);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer legalPage={legalPage} />
      {!legalPage && (
        <span
          hidden
          data-exit-intent
          data-exit-target="#angebot"
          data-exit-title="Noch eine Frage zu Ihrer Immobilie?"
          data-exit-copy="Ordnen Sie Ihren Bedarf in wenigen Schritten ein oder sprechen Sie direkt mit Ihrem persönlichen Ansprechpartner."
          data-exit-action="Bedarf jetzt einordnen"
        />
      )}
    </>
  );
}
