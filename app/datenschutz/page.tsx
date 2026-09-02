import { SiteShell } from "../components";

const rights = [
  ["a) Recht auf Bestätigung", "Sie können eine Bestätigung darüber verlangen, ob personenbezogene Daten verarbeitet werden."],
  ["b) Recht auf Auskunft", "Sie können unentgeltlich Auskunft über gespeicherte personenbezogene Daten, Zwecke, Kategorien, Empfänger, Speicherdauer, Herkunft und etwaige automatisierte Entscheidungen verlangen."],
  ["c) Recht auf Berichtigung", "Sie können die unverzügliche Berichtigung unrichtiger sowie die Vervollständigung unvollständiger Daten verlangen."],
  ["d) Recht auf Löschung", "Unter den gesetzlichen Voraussetzungen können Sie die unverzügliche Löschung Ihrer personenbezogenen Daten verlangen."],
  ["e) Recht auf Einschränkung der Verarbeitung", "Sie können die Einschränkung der Verarbeitung verlangen, etwa wenn die Richtigkeit bestritten wird oder die Daten zur Geltendmachung von Rechtsansprüchen benötigt werden."],
  ["f) Recht auf Datenübertragbarkeit", "Sie können bereitgestellte Daten in einem strukturierten, gängigen und maschinenlesbaren Format erhalten und – soweit technisch machbar – übertragen lassen."],
  ["g) Recht auf Widerspruch", "Sie können aus Gründen Ihrer besonderen Situation jederzeit der Verarbeitung auf Grundlage berechtigter Interessen widersprechen. Gegen Direktwerbung können Sie jederzeit widersprechen."],
  ["h) Automatisierte Entscheidungen", "Sie haben grundsätzlich das Recht, nicht ausschließlich einer automatisierten Entscheidung unterworfen zu werden, die rechtliche Wirkung entfaltet oder Sie erheblich beeinträchtigt."],
  ["i) Widerruf der Einwilligung", "Eine datenschutzrechtliche Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden."],
];

export default function Datenschutz() {
  return (
    <SiteShell legalPage>
      <article className="legal-page">
        <h1>Datenschutz</h1>
        <div className="legal-card">
          <p>Wir freuen uns über Ihr Interesse an unserem Unternehmen. Datenschutz hat für die ARAG Hauptgeschäftsstelle Thomas Wirth einen hohen Stellenwert. Die Nutzung dieser Internetseiten ist grundsätzlich ohne Angabe personenbezogener Daten möglich. Werden besondere Services genutzt, kann eine Verarbeitung personenbezogener Daten erforderlich werden.</p>
          <p>Die Verarbeitung von Namen, Anschriften, E-Mail-Adressen, Telefonnummern oder vergleichbaren Angaben erfolgt im Einklang mit der Datenschutz-Grundverordnung und den geltenden nationalen Datenschutzbestimmungen. Technische und organisatorische Maßnahmen schützen die über diese Internetseite verarbeiteten Daten. Internetbasierte Übertragungen können dennoch Sicherheitslücken aufweisen; Sie können uns daher auch telefonisch kontaktieren.</p>

          <h2>1. Begriffsbestimmungen</h2>
          <p>Diese Datenschutzerklärung verwendet die Begriffe der DS-GVO. Personenbezogene Daten sind Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen. Verarbeitung umfasst jeden Vorgang im Zusammenhang mit solchen Daten, etwa Erhebung, Speicherung, Veränderung, Verwendung, Übermittlung, Einschränkung oder Löschung.</p>
          <h3>Betroffene Person, Verantwortlicher und Auftragsverarbeiter</h3>
          <p>Betroffene Person ist die Person, deren Daten verarbeitet werden. Verantwortlicher ist die Stelle, die über Zwecke und Mittel der Verarbeitung entscheidet. Ein Auftragsverarbeiter verarbeitet personenbezogene Daten im Auftrag des Verantwortlichen.</p>
          <h3>Empfänger, Dritter und Einwilligung</h3>
          <p>Empfänger ist eine Stelle, der personenbezogene Daten offengelegt werden. Eine Einwilligung ist eine freiwillig, informiert und unmissverständlich abgegebene Willensbekundung für einen bestimmten Fall.</p>

          <h2>2. Name und Anschrift des Verantwortlichen</h2>
          <p>ARAG Hauptgeschäftsstelle Thomas Wirth<br />Rothenburger Str. 116<br />90439 Nürnberg<br />Deutschland<br />Tel.: 0911 / 4777500<br />E-Mail: <a href="mailto:info@sofortrechtsschutz.de">info@sofortrechtsschutz.de</a><br />Website: www.sofortrechtsschutz.de</p>

          <h2>3. Cookies</h2>
          <p>Diese Internetseiten verwenden Cookies. Cookies sind Textdateien, die im Browser gespeichert werden. Sie können eine Cookie-ID enthalten, über die ein Browser wiedererkannt werden kann. Cookies helfen dabei, Inhalte nutzerfreundlich bereitzustellen und Einstellungen zu speichern.</p>
          <p>Sie können Cookies in Ihrem Browser verhindern und bereits gesetzte Cookies löschen. Werden Cookies deaktiviert, sind unter Umständen nicht alle Funktionen vollumfänglich nutzbar. Ihre Auswahl können Sie jederzeit über „Datenschutz-Einstellung“ im Fußbereich ändern.</p>

          <h2>4. Verwendung von Webfonts</h2>
          <p>Zur einheitlichen Darstellung können Webfonts eingesetzt werden. Soweit externe Schriften geladen werden, kann der Anbieter insbesondere die IP-Adresse sowie die aufgerufene Seite erhalten. Nähere Informationen finden Sie in den Datenschutzhinweisen des jeweiligen Anbieters.</p>

          <h2>5. Erfassung allgemeiner Daten und Informationen</h2>
          <p>Bei jedem Aufruf können Browsertyp und -version, Betriebssystem, Referrer, aufgerufene Unterseiten, Datum und Uhrzeit, IP-Adresse, Internet-Service-Provider sowie ähnliche technische Informationen in Server-Logfiles verarbeitet werden. Diese Angaben dienen der korrekten Auslieferung, Sicherheit, Optimierung und dauerhaften Funktionsfähigkeit der Systeme sowie der Aufklärung möglicher Angriffe.</p>

          <h2>6. Kontaktmöglichkeit über die Internetseite</h2>
          <p>Wenn Sie per E-Mail oder Kontaktformular Kontakt aufnehmen, werden die freiwillig übermittelten personenbezogenen Daten zur Bearbeitung der Anfrage und zur Kontaktaufnahme gespeichert. Eine Weitergabe an Dritte erfolgt nur, soweit dafür eine Rechtsgrundlage besteht.</p>
          <p>Das Kontaktformular wird über einen eigenen PHP-Endpunkt auf dem Hosting dieser Website verarbeitet. Die eingegebenen Kontaktdaten und Antworten werden serverseitig in eine E-Mail umgewandelt und an uns übermittelt. Eine Formulardatenbank wird durch die Website nicht geführt. Für die Zustellung verarbeiten die beteiligten Hosting- und E-Mail-Dienstleister die technisch erforderlichen Daten.</p>

          <h2>7. Routinemäßige Löschung und Sperrung</h2>
          <p>Personenbezogene Daten werden nur so lange verarbeitet und gespeichert, wie dies für den Zweck erforderlich oder gesetzlich vorgeschrieben ist. Entfällt der Zweck oder endet eine Aufbewahrungsfrist, werden die Daten nach den gesetzlichen Vorschriften gelöscht oder gesperrt.</p>

          <h2>8. Rechte der betroffenen Person</h2>
          {rights.map(([title, text]) => <section key={title}><h3>{title}</h3><p>{text} Zur Ausübung können Sie sich jederzeit an einen Mitarbeiter der ARAG Hauptgeschäftsstelle Thomas Wirth wenden.</p></section>)}

          <h2>9. Rechtsgrundlage der Verarbeitung</h2>
          <p>Je nach Vorgang beruht die Verarbeitung insbesondere auf Einwilligung (Art. 6 Abs. 1 lit. a DS-GVO), Vertrag oder vorvertraglichen Maßnahmen (lit. b), rechtlicher Verpflichtung (lit. c), lebenswichtigen Interessen (lit. d) oder berechtigten Interessen (lit. f).</p>

          <h2>10. Berechtigte Interessen</h2>
          <p>Soweit Art. 6 Abs. 1 lit. f DS-GVO die Rechtsgrundlage ist, liegt das berechtigte Interesse insbesondere in der Durchführung unserer Geschäftstätigkeit, der sicheren Bereitstellung dieser Website und der Bearbeitung von Anfragen.</p>

          <h2>11. Speicherdauer</h2>
          <p>Maßgeblich sind die jeweiligen gesetzlichen Aufbewahrungsfristen. Nach deren Ablauf werden Daten gelöscht, sofern sie nicht mehr zur Vertragserfüllung oder Vertragsanbahnung erforderlich sind.</p>

          <h2>12. Bereitstellung personenbezogener Daten</h2>
          <p>Die Bereitstellung kann gesetzlich oder vertraglich vorgeschrieben oder für einen Vertragsabschluss erforderlich sein. Ohne erforderliche Angaben kann ein Vertrag oder die Bearbeitung einer Anfrage gegebenenfalls nicht erfolgen. Unsere Mitarbeiter informieren Sie im Einzelfall über die Notwendigkeit und mögliche Folgen einer Nichtbereitstellung.</p>

          <h2>13. Technologien</h2>
          <p>Die aktuell zugelassenen Kategorien und Ihre Auswahl sehen Sie über „Datenschutz-Einstellung“ im Fußbereich. Technisch notwendige Funktionen bleiben aktiv; optionale Kategorien werden erst entsprechend Ihrer Auswahl berücksichtigt.</p>
        </div>
      </article>
    </SiteShell>
  );
}
