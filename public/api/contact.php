<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['success' => false, 'message' => 'Methode nicht erlaubt.']);
}

$requestHost = strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
$requestHost = preg_replace('/:\\d+$/', '', $requestHost) ?? '';
$origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');

if ($origin !== '') {
    $originHost = strtolower((string) parse_url($origin, PHP_URL_HOST));
    if ($requestHost === '' || $originHost === '' || !hash_equals($requestHost, $originHost)) {
        respond(403, ['success' => false, 'message' => 'Ungültige Herkunft.']);
    }
}

$contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
if (str_contains($contentType, 'application/json')) {
    $rawBody = file_get_contents('php://input');
    $data = json_decode($rawBody === false ? '' : $rawBody, true);
    if (!is_array($data)) {
        respond(400, ['success' => false, 'message' => 'Ungültige Anfrage.']);
    }
} else {
    $data = $_POST;
}

$honeypot = trim((string) ($data['honeypot'] ?? $data['_honey'] ?? ''));
if ($honeypot !== '') {
    respond(200, ['success' => true]);
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$phone = trim((string) ($data['phone'] ?? ''));
$sourceUrl = trim((string) ($data['sourceUrl'] ?? ($_SERVER['HTTP_REFERER'] ?? '')));
$answers = is_array($data['answers'] ?? null) ? $data['answers'] : [];
$privacyConfirmed = (string) ($data['datenschutz_bestaetigt'] ?? '');
$firstInformationDigital = (string) ($data['erstinformation_digital'] ?? '');

$propertyCount = trim((string) ($answers['propertyCount'] ?? $data['property_count'] ?? 'Keine Angabe'));
$propertyType = trim((string) ($answers['propertyType'] ?? $data['property_type'] ?? 'Keine Angabe'));
$rentLossProtection = trim((string) ($answers['rentLossProtection'] ?? $data['rent_loss_protection'] ?? 'Keine Angabe'));
$existingLegalCase = trim((string) ($answers['existingLegalCase'] ?? $data['existing_legal_case'] ?? 'Keine Angabe'));
$desiredStart = trim((string) ($answers['desiredStart'] ?? $data['desired_start'] ?? 'Keine Angabe'));

if (strlen($name) < 2 || strlen($name) > 120) {
    respond(422, ['success' => false, 'message' => 'Bitte geben Sie einen gültigen Namen ein.']);
}

if (strlen($email) > 254 || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    respond(422, ['success' => false, 'message' => 'Bitte geben Sie eine gültige E-Mail-Adresse ein.']);
}

if (strlen($phone) > 50 || strlen($sourceUrl) > 500) {
    respond(422, ['success' => false, 'message' => 'Eine Eingabe ist zu lang.']);
}

if ($privacyConfirmed !== 'ja') {
    respond(422, ['success' => false, 'message' => 'Bitte bestätigen Sie die Kenntnisnahme der Datenschutzerklärung.']);
}

if ($firstInformationDigital !== 'ja') {
    respond(422, ['success' => false, 'message' => 'Bitte stimmen Sie der digitalen Bereitstellung der Erstinformation zu.']);
}

$allowedAnswers = [
    'propertyCount' => ['Eine Einheit', '2 bis 5 Einheiten', 'Mehr als 5 Einheiten', 'Keine Angabe'],
    'propertyType' => ['Wohnung', 'Haus', 'Gewerbe', 'Gemischter Bestand', 'Keine Angabe'],
    'rentLossProtection' => ['Ja', 'Nein', 'Bitte einordnen', 'Keine Angabe'],
    'existingLegalCase' => ['Nein', 'Ja', 'Nicht sicher', 'Keine Angabe'],
    'desiredStart' => ['Möglichst bald', 'In 1 bis 3 Monaten', 'Erst orientieren', 'Keine Angabe'],
];
$submittedAnswers = [
    'propertyCount' => $propertyCount,
    'propertyType' => $propertyType,
    'rentLossProtection' => $rentLossProtection,
    'existingLegalCase' => $existingLegalCase,
    'desiredStart' => $desiredStart,
];
foreach ($submittedAnswers as $key => $answer) {
    if (!in_array($answer, $allowedAnswers[$key], true)) {
        respond(422, ['success' => false, 'message' => 'Ungültige Formularantwort.']);
    }
}

$safeName = preg_replace('/[\\r\\n]+/', ' ', $name) ?? $name;
$safePhone = preg_replace('/[\\r\\n]+/', ' ', $phone) ?? $phone;
$safeSourceUrl = filter_var($sourceUrl, FILTER_VALIDATE_URL) !== false ? $sourceUrl : 'Nicht verfügbar';

$recipient = 'leads.ap.arag@gmail.com';
$subject = 'Neue Anfrage über Vermieterrechtsschutz24';
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$body = implode("\r\n", [
    'Neue Anfrage über die Website',
    '',
    'Name: ' . $safeName,
    'E-Mail: ' . $email,
    'Telefon: ' . ($safePhone !== '' ? $safePhone : 'Keine Angabe'),
    '',
    'Anzahl der Einheiten: ' . $propertyCount,
    'Art der Immobilie: ' . $propertyType,
    'Zusätzlicher Mietausfallschutz: ' . $rentLossProtection,
    'Bereits bestehender Rechtsfall: ' . $existingLegalCase,
    'Gewünschter Start: ' . $desiredStart,
    'Datenschutzerklärung: Kenntnisnahme bestätigt',
    'Erstinformation: digitaler Bereitstellung ausdrücklich zugestimmt',
    '',
    'Seite: ' . $safeSourceUrl,
    'Zeitpunkt: ' . gmdate('Y-m-d H:i:s') . ' UTC',
]);

$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: Vermieterrechtsschutz24 <info@rechtsschutzpartner24.de>',
    'Reply-To: ' . $email,
]);

if (!mail($recipient, $encodedSubject, $body, $headers)) {
    error_log('Vermieterrechtsschutz24: Kontaktformular konnte nicht versendet werden.');
    respond(500, ['success' => false, 'message' => 'Die Anfrage konnte gerade nicht gesendet werden.']);
}

respond(200, ['success' => true]);
