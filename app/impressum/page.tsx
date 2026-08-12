import { SiteShell } from "../components";

export default function Impressum() {
  return (
    <SiteShell legalPage>
      <article className="legal-page">
        <h1>Impressum</h1>
        <div className="legal-card">
          <h2>Angaben gemäß § 5 Digitale-Dienste-Gesetz</h2>
          <p>Thomas Wirth<br />Versicherungsfachmann (IHK)<br />ARAG Hauptgeschäftsstelle Thomas Wirth<br />Rothenburger Str. 245<br />90439 Nürnberg</p>
          <p>Telefon: 0911 4777500<br />Mobil: 0151 27242724<br />Fax: 0911 47775025</p>
          <p>Mail: <a href="mailto:Thomas.Wirth@arag-partner.de">Thomas.Wirth@arag‒partner.de</a><br />Web: <a href="https://www.arag-partner.de/gst-nuernberg-sued/" target="_blank" rel="noreferrer">www.arag‒nuernberg.de</a></p>

          <h2>Vermittlerregister</h2>
          <p>Deutsche Industrie- und Handelskammer (DIHK)<br />IHK-Register-Nr. D-LDKK-PB9YO-76</p>
          <p>Als selbstständiger Handelsvertreter vermittle ich Versicherungen für folgende Gesellschaften:</p>
          <ul><li>ARAG SE</li><li>ARAG Allgemeine Versicherungs-AG</li><li>ARAG Krankenversicherungs-AG</li><li>ALTE LEIPZIGER</li><li>Helvetia</li></ul>
          <p>Ich erhalte bei Abschluss eines Versicherungsvertrages eine Provision, die in dem Versicherungsbeitrag bereits enthalten ist. Ich bin tätig als gebundener Versicherungsvertreter nach § 34d Absatz 7 Satz 1 Nummer 1 GewO. Berufsrechtliche Regelungen finden sich in §§ 59–68 VVG sowie in der VersVermV.</p>

          <h2>Kontakt</h2>
          <p>Telefon: +49 (0) 911 4777500<br />Telefax: +49 (0) 911 47775025<br /><a href="mailto:info@sofortrechtsschutz.de">info@sofortrechtsschutz.de</a></p>

          <h2>Verantwortlich für journalistisch-redaktionelle Inhalte gemäß § 18 Abs. 2 MStV</h2>
          <p>Thomas Wirth<br />Rothenburger Str. 245<br />90439 Nürnberg</p>

          <h2>Haftung für Links</h2>
          <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für fremde Inhalte keine Gewähr übernehmen. Für die Inhalte verlinkter Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>

          <h2>Urheberrecht</h2>
          <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors oder Erstellers. Downloads und Kopien sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
          <p>Soweit Inhalte nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Sollten Sie auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis.</p>
        </div>
      </article>
    </SiteShell>
  );
}
