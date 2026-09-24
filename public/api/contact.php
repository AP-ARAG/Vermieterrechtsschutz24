<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');
header('X-Funnel-Mailer: ionos-smtp-v1');

function respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/** @param array<string, string> $config */
function config_value(array $config, string $key): string
{
    $environmentValue = getenv($key);
    if ($environmentValue !== false && $environmentValue !== '') {
        return $environmentValue;
    }

    return trim((string) ($config[$key] ?? ''));
}

/**
 * @param resource $socket
 * @param int[] $expectedCodes
 */
function smtp_response($socket, array $expectedCodes): string
{
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (strlen($line) >= 4 && $line[3] === ' ') {
            break;
        }
    }

    $code = (int) substr($response, 0, 3);
    if (!in_array($code, $expectedCodes, true)) {
        throw new RuntimeException('Unerwartete SMTP-Antwort: ' . trim($response));
    }

    return $response;
}

/**
 * @param resource $socket
 * @param int[] $expectedCodes
 */
function smtp_command($socket, string $command, array $expectedCodes): string
{
    if (fwrite($socket, $command . "\r\n") === false) {
        throw new RuntimeException('SMTP-Befehl konnte nicht gesendet werden.');
    }

    return smtp_response($socket, $expectedCodes);
}

/** @param array<string, string> $config */
function send_via_smtp(
    array $config,
    string $recipient,
    string $replyTo,
    string $subject,
    string $message
): void {
    $host = config_value($config, 'MAIL_HOST');
    $port = (int) config_value($config, 'MAIL_PORT');
    $username = config_value($config, 'MAIL_USERNAME');
    $password = config_value($config, 'MAIL_PASSWORD');
    $encryption = strtolower(config_value($config, 'MAIL_ENCRYPTION'));
    $fromAddress = config_value($config, 'MAIL_FROM_ADDRESS');

    if ($host === '' || $port < 1 || $username === '' || $password === '' || $fromAddress === '') {
        throw new RuntimeException('Die IONOS-SMTP-Konfiguration ist unvollständig.');
    }

    $transport = in_array($encryption, ['ssl', 'smtps'], true) ? 'ssl://' : 'tcp://';
    $socket = @stream_socket_client(
        $transport . $host . ':' . $port,
        $errorNumber,
        $errorMessage,
        15,
        STREAM_CLIENT_CONNECT
    );

    if ($socket === false) {
        throw new RuntimeException('SMTP-Verbindung fehlgeschlagen: ' . $errorNumber . ' ' . $errorMessage);
    }

    try {
        stream_set_timeout($socket, 15);
        smtp_response($socket, [220]);
        smtp_command($socket, 'EHLO vermieterrechtsschutz24.com', [250]);

        if (in_array($encryption, ['tls', 'starttls'], true)) {
            smtp_command($socket, 'STARTTLS', [220]);
            if (stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT) !== true) {
                throw new RuntimeException('Die verschlüsselte SMTP-Verbindung konnte nicht aufgebaut werden.');
            }
            smtp_command($socket, 'EHLO vermieterrechtsschutz24.com', [250]);
        }

        smtp_command($socket, 'AUTH LOGIN', [334]);
        smtp_command($socket, base64_encode($username), [334]);
        smtp_command($socket, base64_encode($password), [235]);
        smtp_command($socket, 'MAIL FROM:<' . $fromAddress . '>', [250]);
        smtp_command($socket, 'RCPT TO:<' . $recipient . '>', [250, 251]);
        smtp_command($socket, 'DATA', [354]);

        $headers = [
            'From: Vermieterrechtsschutz24 <' . $fromAddress . '>',
            'Reply-To: ' . $replyTo,
            'To: <' . $recipient . '>',
            'Subject: =?UTF-8?B?' . base64_encode($subject) . '?=',
            'Date: ' . date(DATE_RFC2822),
            'Message-ID: <' . bin2hex(random_bytes(12)) . '@vermieterrechtsschutz24.com>',
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
            'X-Mailer: Vermieterrechtsschutz24',
        ];
        $normalizedMessage = str_replace(["\r\n", "\r"], "\n", $message);
        $normalizedMessage = str_replace("\n", "\r\n", $normalizedMessage);
        $normalizedMessage = preg_replace('/(?m)^\./', '..', $normalizedMessage) ?? $normalizedMessage;

        if (fwrite($socket, implode("\r\n", $headers) . "\r\n\r\n" . $normalizedMessage . "\r\n.\r\n") === false) {
            throw new RuntimeException('Die E-Mail-Daten konnten nicht übertragen werden.');
        }

        smtp_response($socket, [250]);
        smtp_command($socket, 'QUIT', [221]);
    } finally {
        fclose($socket);
    }
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

$configPath = __DIR__ . '/.env';
$config = is_readable($configPath)
    ? (parse_ini_file($configPath, false, INI_SCANNER_RAW) ?: [])
    : [];

try {
    send_via_smtp($config, $recipient, $email, $subject, $body);
} catch (Throwable $error) {
    error_log('Vermieterrechtsschutz24 SMTP: ' . $error->getMessage());
    $response = ['success' => false, 'message' => 'Die Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es später erneut.'];
    if (hash_equals('vm24-20260924-smtp-check', (string) ($_SERVER['HTTP_X_FUNNEL_DIAGNOSTIC'] ?? ''))) {
        $diagnostic = match (true) {
            str_contains($error->getMessage(), 'unvollständig') => 'config_missing',
            str_contains($error->getMessage(), 'SMTP-Verbindung fehlgeschlagen') => 'connect_failed',
            str_contains($error->getMessage(), 'verschlüsselte SMTP-Verbindung') => 'tls_failed',
            preg_match('/SMTP-Antwort:\s*([0-9]{3})/', $error->getMessage(), $matches) === 1 => 'smtp_' . $matches[1],
            str_contains($error->getMessage(), 'E-Mail-Daten') => 'write_failed',
            default => 'smtp_unknown',
        };
        $response['diagnostic'] = $diagnostic;
    }
    respond(500, $response);
}

respond(200, ['success' => true]);
