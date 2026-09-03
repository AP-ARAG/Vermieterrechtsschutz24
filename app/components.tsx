"use client";

import { FormEvent, useState } from "react";
import Link from "./link";
import { operator } from "./legal-data";

const DEFAULT_FORM_ENDPOINT = "/api/contact.php";
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT?.trim() || DEFAULT_FORM_ENDPOINT;

export function scrollToOffer() {
  document.getElementById("angebot")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand-link" aria-label="Zur Startseite">
          <span className="brand-mark" aria-hidden="true">AP</span>
          <span className="brand-copy">
            <strong>Papadakis</strong>
            <small>Rechtsschutzberatung für Vermieter</small>
          </span>
        </Link>
        <Link className="outline-button" href="/#angebot">
          Jetzt Rückruf anfordern
        </Link>
      </div>
    </header>
  );
}

export function Footer({ legalPage = false }: { legalPage?: boolean }) {
  return (
    <>
      {!legalPage && (
        <section className="facts" aria-label="Hinweise zum Angebot">
          <div className="facts-grid">
            <p><strong>Für Vermieter</strong><br />Bedarf rund um vermietete Immobilien</p>
            <p><strong>Individuell</strong><br />Beitrag statt pauschalem Beispielpreis</p>
            <p><strong>Transparent</strong><br />Bedingungen vor dem Abschluss prüfen</p>
            <p><strong>Versicherungsvermittlung</strong><br />keine anwaltliche Rechtsberatung</p>
          </div>
        </section>
      )}
      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <strong>{operator.name}</strong>
            <p>{operator.name}<br />{operator.street}<br />{operator.city}<br />Telefon: <a href={`tel:${operator.phoneHref}`}>{operator.phoneDisplay}</a><br />E-Mail: <a href={`mailto:${operator.email}`}>{operator.email}</a></p>
          </div>
          <nav aria-label="Rechtliche Seiten">
            {legalPage && <Link href="/">Home</Link>}
            <Link href="/impressum">Impressum</Link>
            <Link href="/erstinformation">Erstinformation</Link>
            <Link href="/datenschutz">Datenschutz</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}

const questions = [
  "Möchten Sie mehr als eine Wohnung oder ein Haus berücksichtigen?",
  "Soll ein möglicher Mietausfall in der Beratung berücksichtigt werden?",
  "Ist bereits ein konkreter Streit oder Rechtsfall bekannt?",
];

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
    const payload = {
      honeypot: String(formData.get("_honey") ?? ""),
      erstinformation_digital: String(formData.get("erstinformation_digital") ?? ""),
      sourceUrl: window.location.href,
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      answers: {
        multipleProperties: answers[0] ?? "Keine Angabe",
        rentLossProtection: answers[1] ?? "Keine Angabe",
        existingLegalCase: answers[2] ?? "Keine Angabe",
      },
    };

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null) as { success?: boolean | string; message?: string } | null;
      if (!response.ok || (result?.success !== true && result?.success !== "true")) {
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

  if (step < 3) {
    return (
      <div className="wizard-card" role="group" aria-label={`Schritt ${step + 1} von 4`}>
        <div className="wizard-progress" aria-hidden="true">
          {[0, 1, 2, 3].map((item) => <span className={item <= step ? "is-active" : ""} key={item} />)}
        </div>
        <h2>{questions[step]}</h2>
        <div className="answer-grid" role="group" aria-label={questions[step]}>
          <button type="button" onClick={() => choose("Ja")}><span className="answer-icon">✓</span><span>Ja</span></button>
          <button type="button" onClick={() => choose("Nein")}><span className="answer-icon">×</span><span>Nein</span></button>
        </div>
        <div className="wizard-nav">
          {step > 0 && <button type="button" className="back-button" onClick={() => { setStep(step - 1); setStatus("idle"); setErrorMessage(""); }}>Zurück</button>}
          <span className="step-badge" aria-live="polite">Schritt {step + 1} von 4</span>
        </div>
      </div>
    );
  }

  return (
    <form className="wizard-card contact-form" action={FORM_ENDPOINT} method="POST" onSubmit={submit} aria-busy={status === "sending"}>
      <div className="wizard-progress" aria-hidden="true">
        {[0, 1, 2, 3].map((item) => <span className="is-active" key={item} />)}
      </div>
      <h2>Wie dürfen wir Sie erreichen?</h2>
      <p className="required-note">Mit * gekennzeichnete Felder sind Pflichtfelder.</p>
      <input type="hidden" name="multiple_properties" value={answers[0] ?? "Keine Angabe"} />
      <input type="hidden" name="rent_loss_protection" value={answers[1] ?? "Keine Angabe"} />
      <input type="hidden" name="existing_legal_case" value={answers[2] ?? "Keine Angabe"} />
      <label>Name *<input type="text" name="name" autoComplete="name" maxLength={120} required /></label>
      <label>E-Mail *<input type="email" name="email" autoComplete="email" maxLength={254} required /></label>
      <label>Telefon (optional)<input type="tel" name="phone" autoComplete="tel" maxLength={50} placeholder="z. B. +49 173 1234567" /></label>
      <label className="form-honeypot" aria-hidden="true">Bitte nicht ausfüllen<input name="_honey" tabIndex={-1} autoComplete="off" /></label>
      <p className="privacy-note">Mit dem Absenden bitten Sie uns, Ihre Angaben zur Bearbeitung der Anfrage und für den gewünschten Rückruf zu verwenden. Einzelheiten stehen in unserer <Link href="/datenschutz">Datenschutzerklärung</Link>.</p>
      <label className="privacy-note consent-field"><input type="checkbox" name="erstinformation_digital" value="ja" required /> <span>Ich stimme ausdrücklich zu, dass mir die <Link href="/erstinformation" target="_blank" rel="noreferrer">Erstinformation nach § 15 VersVermV</Link> über diese Website bereitgestellt wird. Ich kann sie speichern oder ausdrucken und vor dem ersten Geschäftskontakt kostenlos auf Papier anfordern.</span></label>
      {status === "error" && <p className="form-error" role="alert">{errorMessage} Bitte versuchen Sie es erneut oder schreiben Sie an <a href={`mailto:${operator.email}`}>{operator.email}</a>.</p>}
      <div className="wizard-nav">
        <button type="button" className="back-button" onClick={() => { setStep(2); setStatus("idle"); setErrorMessage(""); }} disabled={status === "sending"}>Zurück</button>
        <button type="submit" className="blue-button" disabled={status === "sending"}>{status === "sending" ? "Wird gesendet …" : "Formular absenden"}</button>
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
    </>
  );
}
