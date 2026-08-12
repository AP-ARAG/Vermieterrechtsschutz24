# Sofortrechtsschutz Nürnberg

Statische React/Vite-Website für den ARAG Immobilien-Rechtsschutz für Vermieter.

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

## IONOS Deploy Now

- Projektpaket: **Static**
- Workflow-Vorlage: **React**
- Installations- und Build-Befehl: `npm ci && npm run build`
- Veröffentlichungsordner: `dist`
- Produktionsbranch: `main`

## Kontaktformular

Das Formular sendet standardmäßig per AJAX an FormSubmit und leitet Anfragen an `info@sofortrechtsschutz.de` weiter. Vor dem ersten Live-Einsatz muss die einmalig von FormSubmit gesendete Aktivierungs-E-Mail bestätigt werden.

Alternativ kann beim Build über `VITE_FORM_ENDPOINT` ein anderer kompatibler Formular-Endpunkt gesetzt werden.
