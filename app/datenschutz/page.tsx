import { SiteShell } from "../components";
import { operator } from "../legal-data";

export default function Datenschutz() {
  return (
    <SiteShell legalPage>
      <article className="legal-page">
        <h1>Datenschutz</h1>
        <div className="legal-card">
          <p className="legal-intro">Hier erfahren Sie, welche personenbezogenen Daten beim Besuch dieser Website und bei einer Anfrage verarbeitet werden.</p>

          <h2>1. Verantwortlicher</h2>
          <p>{operator.brandName}<br />Inhaber: {operator.name}<br />{operator.street}<br />{operator.city}<br />Deutschland</p>
          <p>Vermittlungsorganisation: {operator.businessName}</p>
          <p>Telefon: <a href={`tel:${operator.phoneHref}`}>{operator.phoneDisplay}</a><br />E-Mail des Vermittlers: <a href={`mailto:${operator.directEmail}`}>{operator.directEmail}</a><br />E-Mail für Website-Anfragen: <a href={`mailto:${operator.email}`}>{operator.email}</a></p>

          <h2>2. Bereitstellung der Website</h2>
          <p>Die Website wird bei IONOS SE, Elgendorfer Straße 57, 56410 Montabaur, gehostet. Beim Aufruf verarbeitet der Hostingdienst technische Zugriffsdaten, damit die Seite ausgeliefert sowie sicher und stabil betrieben werden kann. Dazu können die angeforderte Seite oder Datei, Referrer, Browser, Betriebssystem, Gerätetyp und Zugriffszeit gehören.</p>
          <p>Nach den Informationen von IONOS wird die IP-Adresse in diesem Webhosting-Produkt unmittelbar anonymisiert; Besuchsdaten werden bis zu acht Wochen vorgehalten. Rechtsgrundlage für die technische Bereitstellung und Absicherung ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in einem zuverlässigen und sicheren Internetangebot.</p>

          <h2>3. Kontaktformular und Rückrufanfrage</h2>
          <p>Wenn Sie das Formular verwenden, verarbeiten wir Ihren Namen, Ihre E-Mail-Adresse, eine freiwillig angegebene Telefonnummer, die Antworten zu Ihrer Vermietsituation sowie die Adresse der aufgerufenen Seite. Diese Angaben werden benötigt, um Ihre Anfrage zuzuordnen, vorzubereiten und zu beantworten.</p>
          <p>Der PHP-Endpunkt auf unserem Hosting wandelt die Angaben in eine E-Mail um. Die Website legt dafür keine eigene Kundendatenbank an. Bei der Übertragung und Zustellung verarbeiten die eingesetzten Hosting- und E-Mail-Dienstleister die technisch erforderlichen Daten.</p>
          <p>Die Verarbeitung erfolgt für vorvertragliche Maßnahmen auf Ihre Anfrage hin nach Art. 6 Abs. 1 lit. b DSGVO. Soweit es um die geordnete Bearbeitung und Abwehr missbräuchlicher Anfragen geht, stützen wir sie ergänzend auf Art. 6 Abs. 1 lit. f DSGVO.</p>
          <p>Die gesonderte Zustimmung zur Bereitstellung der Erstinformation über diese Website dient der Dokumentation nach § 16 Abs. 2 VersVermV. Die Erstinformation kann gespeichert oder ausgedruckt und auf Wunsch vor dem ersten Geschäftskontakt kostenlos auf Papier angefordert werden.</p>

          <h2>4. Empfänger</h2>
          <p>Zugriff erhalten nur Personen und Dienstleister, die ihn für Hosting, E-Mail-Zustellung oder die Bearbeitung Ihrer Anfrage benötigen. Angaben werden an einen Versicherer nur übermittelt, soweit dies zur gewünschten Beratung oder Angebotserstellung erforderlich ist und mit Ihnen abgestimmt wurde. Eine Nutzung zum Verkauf von Adressdaten findet nicht statt.</p>

          <h2>5. Speicherdauer</h2>
          <p>Anfragen werden gelöscht, sobald ihre Bearbeitung beendet ist und keine gesetzlichen Aufbewahrungspflichten oder berechtigten Gründe für eine weitere Speicherung bestehen. Kommt ein Vertragsverhältnis zustande, können handels-, steuer- oder versicherungsrechtliche Aufbewahrungsfristen gelten. Die technischen Besuchsdaten des Hosters werden nach dessen Angaben nach acht Wochen gelöscht.</p>

          <h2>6. Cookies, Analyse und externe Inhalte</h2>
          <p>Diese Website setzt selbst keine Cookies, speichert keine Auswahl im lokalen Browserspeicher und bindet keine Werbe-, Tracking- oder Social-Media-Dienste ein. Schriften werden vom jeweiligen Endgerät geladen. Die sichtbaren Bilder und Grafiken liegen auf demselben Webserver. Deshalb ist für diese Website derzeit kein Einwilligungsbanner erforderlich.</p>
          <p>IONOS kann im Rahmen des Hostingprodukts anonymisierte Reichweiteninformationen bereitstellen. Wir setzen darüber hinaus kein eigenes Analysewerkzeug ein und erstellen keine personenbezogenen Nutzungsprofile.</p>

          <h2>7. Ihre Rechte</h2>
          <p>Nach Maßgabe der DSGVO haben Sie insbesondere Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit. Einer Verarbeitung auf Grundlage berechtigter Interessen können Sie aus Gründen Ihrer besonderen Situation widersprechen. Eine erteilte Einwilligung kann mit Wirkung für die Zukunft widerrufen werden.</p>
          <p>Zur Ausübung Ihrer Rechte genügt eine Nachricht an <a href={`mailto:${operator.email}`}>{operator.email}</a>. Sie können sich außerdem bei einer Datenschutzaufsichtsbehörde beschweren, insbesondere beim <a href="https://www.lda.bayern.de/" target="_blank" rel="noreferrer">Bayerischen Landesamt für Datenschutzaufsicht</a>.</p>

          <h2>8. Pflicht zur Bereitstellung und automatisierte Entscheidungen</h2>
          <p>Sie sind nicht verpflichtet, das Kontaktformular zu verwenden und können uns auch telefonisch erreichen. Ohne Name und erreichbare E-Mail-Adresse lässt sich eine Formularanfrage jedoch nicht bearbeiten. Über die Website findet keine ausschließlich automatisierte Entscheidung mit rechtlicher oder vergleichbar erheblicher Wirkung statt.</p>

          <h2>9. Sicherheit und Aktualisierung</h2>
          <p>Die Übertragung erfolgt verschlüsselt per HTTPS. Kein Übertragungsweg ist vollständig risikofrei; senden Sie daher keine vertraulichen Unterlagen oder Angaben zu einem Rechtsfall über das kurze Anfrageformular. Wir passen diese Hinweise an, wenn sich die eingesetzten Dienste oder gesetzlichen Anforderungen ändern.</p>

          <p className="legal-updated">Stand: 7. September 2026</p>
        </div>
      </article>
    </SiteShell>
  );
}
