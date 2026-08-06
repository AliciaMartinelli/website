<?php
/**
 * allaboutdogs – Kontaktformular
 * Nimmt die Anfrage entgegen und schickt sie per E-Mail an Michela.
 * Läuft auf jedem Hosting mit PHP (z. B. Hostpoint).
 */

declare(strict_types=1);

// ---- Einstellungen -------------------------------------------------
$empfaenger  = 'michelaruch@gmail.com';
$absender    = 'website@allaboutdogs.life';   // muss zur eigenen Domain gehören!
$betreffBasis = 'Neue Anfrage über die Website';
// --------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');

function antwort(bool $ok, string $fehler = ''): void {
    echo json_encode(['ok' => $ok, 'fehler' => $fehler], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    antwort(false, 'Methode nicht erlaubt.');
}

// Spam-Falle: Bots füllen dieses versteckte Feld aus.
if (!empty($_POST['website'] ?? '')) {
    antwort(true);   // still tun, als wäre alles gut
}

$name      = trim((string)($_POST['name']      ?? ''));
$email     = trim((string)($_POST['email']     ?? ''));
$telefon   = trim((string)($_POST['telefon']   ?? ''));
$kurs      = trim((string)($_POST['kurs']      ?? ''));
$nachricht = trim((string)($_POST['nachricht'] ?? ''));

if ($name === '' || $email === '') {
    http_response_code(422);
    antwort(false, 'Bitte Name und E-Mail ausfüllen.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    antwort(false, 'Die E-Mail-Adresse ist ungültig.');
}
if (mb_strlen($nachricht) > 5000) {
    http_response_code(422);
    antwort(false, 'Die Nachricht ist zu lang.');
}

// Kopfzeilen-Einschleusung verhindern
foreach ([$name, $email, $telefon, $kurs] as $wert) {
    if (preg_match('/[\r\n]/', $wert)) {
        http_response_code(400);
        antwort(false, 'Ungültige Eingabe.');
    }
}

$betreff = $betreffBasis . ($kurs !== '' ? ' – ' . $kurs : '');

$text = "Neue Anfrage über allaboutdogs.life\n"
      . str_repeat('=', 40) . "\n\n"
      . "Name:      {$name}\n"
      . "E-Mail:    {$email}\n"
      . "Telefon:   " . ($telefon !== '' ? $telefon : '–') . "\n"
      . "Interesse: " . ($kurs !== ''    ? $kurs    : '–') . "\n\n"
      . "Nachricht:\n"
      . ($nachricht !== '' ? $nachricht : '(keine Nachricht)') . "\n\n"
      . str_repeat('-', 40) . "\n"
      . 'Gesendet am ' . date('d.m.Y \u\m H:i') . " Uhr\n";

$kopfzeilen = [
    'From: allaboutdogs Website <' . $absender . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$erfolg = mail(
    $empfaenger,
    '=?UTF-8?B?' . base64_encode($betreff) . '?=',
    $text,
    implode("\r\n", $kopfzeilen)
);

if (!$erfolg) {
    http_response_code(500);
    antwort(false, 'Die E-Mail konnte nicht versendet werden.');
}

antwort(true);
