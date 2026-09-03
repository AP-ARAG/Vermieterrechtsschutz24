# Vermieterrechtsschutz24 Augsburg

React/Vite-Website mit eigenem PHP-Formularendpunkt für die persönliche Beratung zum Immobilien-Rechtsschutz für Vermieter.

## Entwicklung

Voraussetzung: Node.js `>=22.13.0`

```bash
npm install
npm run dev
npm test
```

Der Produktions-Build liegt im Ordner `dist/` und enthält eigenständige Seiten für:

- `/`
- `/impressum/`
- `/erstinformation/`
- `/datenschutz/`

Beim IONOS-Build wird die kanonische Website-Adresse automatisch aus `SITE_URL` übernommen. Lokal wird ersatzweise `https://vermieterrechtsschutz24.de` verwendet.

## IONOS Deploy Now (PHP)

- Projektpaket: **PHP**
- Workflow-Vorlage: **Vite/Node.js mit PHP-Ausgabe**
- Installations- und Build-Befehl: `npm ci && npm run build`
- Veröffentlichungsordner: `dist`
- Produktionsbranch: `main`

## Kontaktformular

Das Formular sendet per AJAX an `dist/api/contact.php`. Der PHP-Endpunkt validiert die Angaben, verwendet ein Honeypot-Feld gegen einfache Bots und leitet Anfragen per E-Mail an `info@rechtsschutzpartner24.de` weiter.

Alternativ kann beim Build über `VITE_FORM_ENDPOINT` ein anderer kompatibler JSON-Endpunkt gesetzt werden.
