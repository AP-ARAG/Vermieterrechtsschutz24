import { SiteShell } from "../components";
import { operator } from "../legal-data";

export default function Erstinformation() {
  return (
    <SiteShell legalPage>
      <article className="legal-page">
        <h1>Erstinformation</h1>
        <div className="legal-card">
          <p className="legal-intro">Information gemäß § 15 Versicherungsvermittlungsverordnung (VersVermV) beim ersten Geschäftskontakt.</p>

          <h2>Vermittler und betriebliche Anschrift</h2>
          <p>{operator.brandName}<br />Inhaber und Vermittler: {operator.name}<br />{operator.qualification}<br />{operator.street}<br />{operator.city}<br />Deutschland</p>
          <p>Vermittlungsorganisation: {operator.businessName}</p>
          <p>Telefon: <a href={`tel:${operator.phoneHref}`}>{operator.phoneDisplay}</a><br />E-Mail des Vermittlers: <a href={`mailto:${operator.directEmail}`}>{operator.directEmail}</a><br />E-Mail für Website-Anfragen: <a href={`mailto:${operator.email}`}>{operator.email}</a></p>
          <p><a href={operator.profileUrl} target="_blank" rel="noreferrer">Offizielles Vermittlerprofil</a></p>

          <h2>Vermittlerstatus und Register</h2>
          <p>Gebundener Versicherungsvertreter nach § 34d Abs. 7 Satz 1 Nr. 1 GewO.<br />Registrierungsnummer: <strong>{operator.registerNumber}</strong></p>
          <p>Überprüfung im öffentlichen <a href="https://www.vermittlerregister.info/recherche" target="_blank" rel="noreferrer">Vermittlerregister</a>.<br />Gemeinsame Registerstelle: Deutsche Industrie- und Handelskammer, Breite Straße 29, 10178 Berlin, Telefon 0180 6005850 (0,20 Euro je Anruf), E-Mail vr@dihk.de.</p>

          <h2>Beratung, Produktangebot und Vergütung</h2>
          <p>Es wird Beratung zu den vermittelten Versicherungsprodukten angeboten. Die Vermittlung erfolgt als gebundener Versicherungsvertreter im Auftrag der ARAG Versicherungsgruppe und damit nicht auf Grundlage einer ausgewogenen Untersuchung einer hinreichenden Zahl am Markt angebotener Versicherungsverträge.</p>
          <p>Die Vergütung für die Vermittlung besteht aus einer Provision, die in der Versicherungsprämie enthalten ist. Eine unmittelbar vom Kunden zu zahlende Vergütung wird für diese Vermittlung nicht erhoben.</p>

          <h2>Beteiligungsverhältnisse</h2>
          <p>Nach den dem Vermittler vorliegenden Angaben hält er keine unmittelbare oder mittelbare Beteiligung von zehn Prozent oder mehr an den Stimmrechten oder am Kapital eines Versicherungsunternehmens. Ebenso hält danach kein Versicherungsunternehmen oder Mutterunternehmen eines Versicherungsunternehmens eine unmittelbare oder mittelbare Beteiligung von zehn Prozent oder mehr am Vermittler.</p>

          <h2>Schlichtungsstelle</h2>
          <p>Versicherungsombudsmann e. V.<br />Postfach 08 06 32<br />10006 Berlin<br />Telefon: 0800 3696000<br />E-Mail: beschwerde@versicherungsombudsmann.de<br /><a href="https://www.versicherungsombudsmann.de" target="_blank" rel="noreferrer">versicherungsombudsmann.de</a></p>

          <h2>Bereitstellung dieser Information</h2>
          <p>Diese Information kann gespeichert oder über die Druckfunktion des Browsers ausgedruckt werden. Auf Wunsch wird sie vor dem ersten Geschäftskontakt kostenlos auf Papier bereitgestellt.</p>
          <p className="legal-updated">Stand: 7. September 2026</p>
        </div>
      </article>
    </SiteShell>
  );
}
