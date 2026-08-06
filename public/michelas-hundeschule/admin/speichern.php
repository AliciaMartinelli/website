<?php
/**
 * allaboutdogs – Admin: Angebote & Wochenplan speichern
 * Nimmt die Daten aus der Admin-Oberfläche entgegen, prüft sie
 * und schreibt sie nach ../daten.json (mit Backup).
 * Läuft auf jedem Hosting mit PHP (z. B. Hostpoint).
 */

declare(strict_types=1);

// ---- Einstellungen -------------------------------------------------
// WICHTIG: Vor dem Livegang ein eigenes, gutes Passwort setzen!
$ADMIN_PASSWORT = 'bitte-aendern';
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

$roh = file_get_contents('php://input');
if ($roh === false || strlen($roh) > 300 * 1024) {
    http_response_code(413);
    antwort(false, 'Die Daten sind zu gross.');
}

$eingabe = json_decode($roh, true);
if (!is_array($eingabe)) {
    http_response_code(400);
    antwort(false, 'Ungültige Daten.');
}

// Sicherung: Mit dem Platzhalter-Passwort funktioniert das Speichern
// nur lokal (beim Testen) — nie auf einem echten Server.
// Der Platzhalter ist hier bewusst zusammengesetzt, damit ein
// automatisches Ersetzen beim Deploy diese Zeile nicht mitverändert.
$platzhalter = 'bitte-' . 'aendern';
$istLokal = in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1', '::1'], true);
if ($ADMIN_PASSWORT === $platzhalter && !$istLokal) {
    http_response_code(403);
    antwort(false, 'Das Admin-Passwort wurde noch nicht eingerichtet.');
}

$passwort = (string)($eingabe['passwort'] ?? '');
if ($passwort === '' || !hash_equals($ADMIN_PASSWORT, $passwort)) {
    // Kleine Bremse gegen Durchprobieren
    usleep(500 * 1000);
    http_response_code(403);
    antwort(false, 'Falsches Passwort.');
}

$angebote   = $eingabe['angebote']   ?? null;
$wochenplan = $eingabe['wochenplan'] ?? null;

if (!is_array($angebote) || count($angebote) === 0 || !is_array($wochenplan)) {
    http_response_code(422);
    antwort(false, 'Es müssen Angebote und ein Wochenplan übergeben werden.');
}

/** Text säubern: kein HTML, keine Steuerzeichen, begrenzte Länge. */
function text(mixed $wert, int $max = 1000): string {
    $t = trim(strip_tags((string)$wert));
    $t = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/u', '', $t) ?? '';
    return mb_substr($t, 0, $max);
}

// ---- Angebote prüfen und auf bekannte Felder reduzieren ------------
$angeboteSauber = [];
foreach ($angebote as $a) {
    if (!is_array($a)) {
        http_response_code(422);
        antwort(false, 'Ungültiges Angebot.');
    }
    $name = text($a['name'] ?? '', 120);
    if ($name === '') {
        http_response_code(422);
        antwort(false, 'Jedes Angebot braucht einen Namen.');
    }
    $id = text($a['id'] ?? '', 60);
    if ($id === '') {
        $id = strtolower(preg_replace('/[^a-z0-9]+/i', '-', $name) ?? 'angebot');
    }
    $angeboteSauber[] = [
        'id'           => $id,
        'name'         => $name,
        'typ'          => text($a['typ'] ?? '', 40),
        'zielgruppe'   => text($a['zielgruppe'] ?? '', 120),
        'umfang'       => text($a['umfang'] ?? '', 120),
        'preis'        => text($a['preis'] ?? '', 40),
        'preisEinheit' => text($a['preisEinheit'] ?? '', 40),
        'platzgebuehr' => (bool)($a['platzgebuehr'] ?? false),
        'bild'         => text($a['bild'] ?? '', 120),
        'kurz'         => text($a['kurz'] ?? '', 500),
        'lang'         => text($a['lang'] ?? '', 2000),
    ];
}
if (count($angeboteSauber) > 30) {
    http_response_code(422);
    antwort(false, 'Zu viele Angebote.');
}

// ---- Wochenplan prüfen ---------------------------------------------
$tage = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
$planSauber = [];
foreach ($wochenplan as $zeile) {
    if (!is_array($zeile)) {
        http_response_code(422);
        antwort(false, 'Ungültige Wochenplan-Zeile.');
    }
    $zeit = text($zeile['zeit'] ?? '', 5);
    if (!preg_match('/^\d{1,2}:\d{2}$/', $zeit)) {
        http_response_code(422);
        antwort(false, 'Ungültige Zeit im Wochenplan: „' . $zeit . '“. Bitte im Format 09:30 angeben.');
    }
    $neu = ['zeit' => $zeit];
    foreach ($tage as $tag) {
        $kurs = text($zeile[$tag] ?? '', 60);
        if ($kurs !== '') $neu[$tag] = $kurs;
    }
    if (count($neu) > 1) $planSauber[] = $neu;   // leere Zeilen weglassen
}
if (count($planSauber) > 50) {
    http_response_code(422);
    antwort(false, 'Zu viele Zeilen im Wochenplan.');
}
usort($planSauber, fn($a, $b) => strcmp(
    str_pad($a['zeit'], 5, '0', STR_PAD_LEFT),
    str_pad($b['zeit'], 5, '0', STR_PAD_LEFT)
));

// ---- Schreiben (Backup + atomar) ------------------------------------
$zielDatei = __DIR__ . '/../daten.json';
$json = json_encode(
    ['angebote' => $angeboteSauber, 'wochenplan' => $planSauber],
    JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT
);
if ($json === false) {
    http_response_code(500);
    antwort(false, 'Die Daten konnten nicht verarbeitet werden.');
}

if (is_file($zielDatei)) {
    @copy($zielDatei, __DIR__ . '/../daten.backup.json');
}

$tmp = $zielDatei . '.tmp';
if (file_put_contents($tmp, $json, LOCK_EX) === false || !rename($tmp, $zielDatei)) {
    @unlink($tmp);
    http_response_code(500);
    antwort(false, 'Die Datei konnte nicht gespeichert werden.');
}

antwort(true);
