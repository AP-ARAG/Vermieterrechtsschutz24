# Sofortrechtsschutz Nürnberg

React/Vite-Website mit eigenem PHP-Formularendpunkt für den ARAG Immobilien-Rechtsschutz für Vermieter.

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
- `/datenschutz/`

## IONOS Deploy Now (PHP)

- Projektpaket: **PHP**
- Workflow-Vorlage: **Vite/Node.js mit PHP-Ausgabe**
- Installations- und Build-Befehl: `npm ci && npm run build`
- Veröffentlichungsordner: `dist`
- Produktionsbranch: `main`

## Kontaktformular

Das Formular sendet per AJAX an `dist/api/contact.php`. Der PHP-Endpunkt validiert die Angaben, verwendet ein Honeypot-Feld gegen einfache Bots und leitet Anfragen per E-Mail an `info@sofortrechtsschutz.de` weiter.

Alternativ kann beim Build über `VITE_FORM_ENDPOINT` ein anderer kompatibler JSON-Endpunkt gesetzt werden.
