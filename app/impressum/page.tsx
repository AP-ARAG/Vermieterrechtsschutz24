import { SiteShell } from "../components";
import { operator } from "../legal-data";

export default function Impressum() {
  return (
    <SiteShell legalPage>
      <article className="legal-page">
        <h1>Impressum</h1>
        <div className="legal-card">
          <p className="legal-intro">Anbieter dieser Website und verantwortlich für ihren geschäftlichen Inhalt:</p>

          <h2>Anbieterangaben</h2>
          <p>{operator.name}<br />{operator.qualification}<br />{operator.businessName}<br />{operator.street}<br />{operator.city}<br />Deutschland</p>
          <p>Telefon: <a href={`tel:${operator.phoneHref}`}>{operator.phoneDisplay}</a><br />Telefax: {operator.faxDisplay}<br />E-Mail: <a href={`mailto:${operator.email}`}>{operator.email}</a></p>
          <p><a href={operator.profileUrl} target="_blank" rel="noreferrer">Offizielles Vermittlerprofil</a></p>

          <h2>Berufsrechtliche Angaben</h2>
          <p>Tätigkeitsart: gebundener Versicherungsvertreter nach § 34d Absatz 7 Satz 1 Nummer 1 GewO</p>
          <p>Eintragung im Versicherungsvermittlerregister:<br />Registrierungsnummer {operator.registerNumber}</p>
          <p>Das Register kann bei der gemeinsamen Registerstelle eingesehen werden:</p>
          <p>Deutsche Industrie- und Handelskammer (DIHK)<br />Breite Straße 29<br />10178 Berlin<br />Telefon: 0180 600 585 0<br /><a href="https://www.vermittlerregister.info/" target="_blank" rel="noreferrer">www.vermittlerregister.info</a></p>
          <p>Die Vermittlung erfolgt als selbstständiger Handelsvertreter für ARAG SE, ARAG Allgemeine Versicherungs-AG, ARAG Krankenversicherungs-AG, ALTE LEIPZIGER und Helvetia. Für einen vermittelten Vertrag wird eine im Versicherungsbeitrag enthaltene Provision gezahlt.</p>
          <p>Maßgebliche berufsrechtliche Vorschriften sind insbesondere § 34d GewO, §§ 59 bis 68 VVG und die VersVermV. Die Vorschriften sind unter <a href="https://www.gesetze-im-internet.de/" target="_blank" rel="noreferrer">gesetze-im-internet.de</a> abrufbar.</p>

          <h2>Schlichtungsstellen</h2>
          <p>Versicherungsombudsmann e. V.<br />Postfach 08 06 32<br />10006 Berlin<br />Telefon: 0800 3696000<br /><a href="https://www.versicherungsombudsmann.de/" target="_blank" rel="noreferrer">www.versicherungsombudsmann.de</a></p>
          <p>Für Angelegenheiten der privaten Kranken- und Pflegeversicherung:<br />Ombudsmann Private Kranken- und Pflegeversicherung<br />Postfach 06 02 22<br />10052 Berlin<br />Telefon: 0800 2550444<br /><a href="https://www.pkv-ombudsmann.de/" target="_blank" rel="noreferrer">www.pkv-ombudsmann.de</a></p>

          <h2>Inhaltlich verantwortlich</h2>
          <p>{operator.name}<br />{operator.street}<br />{operator.city}</p>

          <h2>Hinweise zu Inhalten und Links</h2>
          <p>Die Informationen auf dieser Website dienen der Orientierung zu Versicherungsfragen. Sie sind keine Rechtsberatung und ersetzen weder die individuellen Versicherungsbedingungen noch eine Deckungszusage. Inhalte verlinkter externer Seiten verantworten deren jeweilige Anbieter. Werden uns rechtswidrige Inhalte bekannt, prüfen und entfernen wir den betreffenden Link.</p>

          <h2>Urheberrecht und Kennzeichen</h2>
          <p>Texte, Gestaltungselemente und Bildkompositionen dieser Website wurden für dieses Projekt neu erstellt. Eine Nutzung über die gesetzlichen Schranken hinaus bedarf der Zustimmung des jeweiligen Rechteinhabers. Genannte Unternehmens- und Produktnamen können geschützte Kennzeichen ihrer Inhaber sein; ihre Nennung erfolgt ausschließlich zur sachlichen Beschreibung der Vermittlertätigkeit.</p>

          <p className="legal-updated">Stand: 3. September 2026</p>
        </div>
      </article>
    </SiteShell>
  );
}
