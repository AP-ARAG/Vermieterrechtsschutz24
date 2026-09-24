# Vermieterrechtsschutz24

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

Beim IONOS-Build wird die kanonische Website-Adresse automatisch aus `SITE_URL` übernommen. Lokal wird ersatzweise die bestehende IONOS-Adresse verwendet.

## IONOS Deploy Now (PHP)

- Projektpaket: **PHP**
- Workflow-Vorlage: **Vite/Node.js mit PHP-Ausgabe**
- Installations- und Build-Befehl: `npm ci && npm run build`
- Veröffentlichungsordner: `dist`
- Produktionsbranch: `main`

## Kontaktformular

Das Formular sendet per AJAX an `dist/api/contact.php`. Der PHP-Endpunkt validiert die Angaben, verwendet ein Honeypot-Feld gegen einfache Bots und übergibt Anfragen authentifiziert über den IONOS-SMTP-Account an `leads.ap.arag@gmail.com`. Die Runtime-Zugangsdaten werden beim Deployment aus `.deploy-now/Vermieterrechtsschutz24/api/.env.template` in `dist/api/.env` gerendert und nicht im Repository gespeichert.

Alternativ kann beim Build über `VITE_FORM_ENDPOINT` ein anderer kompatibler JSON-Endpunkt gesetzt werden.
