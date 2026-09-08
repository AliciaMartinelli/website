/* =========================================================
   allaboutdogs – Inhalte der Website
   Hier können Kurse, Preise, Wochenplan und FAQ gepflegt
   werden, ohne HTML anfassen zu müssen.
   ========================================================= */

/* Alle Fotos liegen lokal im Ordner "bilder/".
   Neues Bild einbinden: Datei dort ablegen und den
   Dateinamen unten eintragen. */
const BILD_BASIS = 'bilder/';

function bild(datei) {
  return BILD_BASIS + datei;
}

/* ---------- Farben pro Kurskategorie ---------- */
const KATEGORIE_FARBEN = {
  welpen:   '#6f9c3e',
  trick:    '#c06a44',
  spazier:  '#5a7d9a',
  seminar:  '#b0863e',
  frisbee:  '#a8503f',
  coaching: '#8a5a86',
  'social-walk': '#5f8f4e'
};

/* ---------- Angebote ----------
   Achtung: Angebote und Wochenplan werden live aus daten.json
   geladen (Pflege über /admin/). Die Werte hier sind nur der
   Fallback, falls daten.json nicht erreichbar ist. */
let ANGEBOTE = [
  {
    id: 'welpen',
    name: 'Welpen- & Junghundekurs',
    typ: 'Gruppe',
    zielgruppe: 'Welpen bis 6 Mt. & Junghunde',
    umfang: '10er-Block · 60 Min.',
    preis: 'CHF 400',
    preisEinheit: '/ Block',
    platzgebuehr: true,
    bild: 'angebot-welpen.png',
    kurz: 'Der perfekte Start: Sozialisierung, erste Signale und ein souveräner Umgang im Alltag — spielerisch und ohne Druck.',
    lang: 'In zehn Lektionen à 60 Minuten legen wir gemeinsam das Fundament: Begegnungen mit anderen Hunden, Leinenführigkeit, Rückruf, Impulskontrolle und ein entspannter Alltag in der Stadt. Du lernst dabei, die Körpersprache deines Hundes zu lesen und richtig zu reagieren.'
  },
  {
    id: 'trick',
    name: 'Trickdog',
    typ: 'Gruppe',
    zielgruppe: 'Hunde jeden Alters',
    umfang: '10er-Block · 60 Min.',
    preis: 'CHF 360',
    preisEinheit: '/ Block',
    platzgebuehr: true,
    bild: 'angebot-trickdog.png',
    kurz: 'Tricks fördern Konzentration, Körpergefühl und die Bindung. Von „Pfötchen“ bis zu kleinen Kunststücken.',
    lang: 'Trickdog ist mehr als Spielerei: Über Shaping und Clickertraining bauen wir Schritt für Schritt Tricks auf — vom Slalom durch die Beine bis zur Verbeugung. Das schult Köpfchen und Körper und macht Mensch und Hund zum eingespielten Team.'
  },
  {
    id: 'seminar',
    name: 'Seminar',
    typ: 'Seminar',
    zielgruppe: 'Hundehalter:innen & interessierte Teams',
    umfang: 'Halb- oder Ganztag',
    preis: 'Auf Anfrage',
    preisEinheit: '',
    platzgebuehr: true,
    bild: 'angebot-seminar.png',
    kurz: 'Themenseminare rund um Hundeverhalten, Körpersprache und Alltagstraining — kompakt an einem Tag.',
    lang: 'Ob Körpersprache, Beschäftigung oder Leinenaggression: Ich stelle Seminare zu deinem Wunschthema zusammen — für Gruppen oder Vereine. Inhalt, Dauer und Ort besprechen wir individuell; das Angebot erhältst du auf Anfrage.'
  },
  {
    id: 'frisbee',
    name: 'Hunde Frisbee, Discdog',
    typ: 'Einzeln',
    zielgruppe: 'Sportbegeisterte Teams',
    umfang: 'pro 30min.',
    preis: 'CHF 40',
    preisEinheit: '/ Std.',
    platzgebuehr: true,
    bild: 'angebot-frisbee.png',
    kurz: 'Discdog von Grund auf: sauberes Fangen, sichere Sprünge und die richtige Wurftechnik — hundeschonend aufgebaut.',
    lang: 'Wir starten bei der Grundlagenarbeit: Motivation, Fangtechnik und ein gelenkschonender Absprung. Danach kommen Wurftechniken, Distanzwürfe und erste kleine Freestyle-Sequenzen dazu. Discdog ist mein Herzenssport — hier hole ich dich genau dort ab, wo du stehst.'
  },
  {
    id: 'coaching',
    name: 'Individuelles Einzelcoaching',
    typ: 'Einzeln',
    zielgruppe: 'Individuelle Themen',
    umfang: 'pro Stunde',
    preis: 'CHF 120',
    preisEinheit: '/ Std.',
    platzgebuehr: false,
    bild: 'angebot-coaching.jpg',
    kurz: 'Voller Fokus auf dich und dein Hund',
    lang: 'Im Einzelcoaching schauen wir uns genau eure Situation an — zu Hause, auf dem Spaziergang oder auf dem Trainingsplatz. Wir analysieren das Verhalten, finden die Ursache und erarbeiten einen konkreten Trainingsplan, den du im Alltag umsetzen kannst.'
  },
  {
    id: 'spazier',
    name: 'Gruppenspaziergang – mit Herz, Struktur und echten Freundschaften',
    typ: 'Service',
    zielgruppe: 'Für alle die Unterstützung benötigen',
    umfang: '120min.',
    preis: 'CHF 65',
    preisEinheit: '/ Gang',
    platzgebuehr: false,
    bild: 'angebot-spazierdienst.png',
    kurz: 'Wenn der Alltag keine Zeit lässt: Dein Hund wird liebevoll abgeholt, ausgeführt und wieder heimgebracht.',
    lang: 'Ich hole deinen Hund zu Hause ab und wir gehen gemeinsam in der Hundegruppe rund zwei Stunden spazieren. In dieser Zeit bekommt er nicht nur Bewegung, sondern auch wertvollen Sozialkontakt, Orientierung und kleine Erziehungseinheiten genau dort, wo sie im Moment guttun. Die Hunde dürfen sich lösen, spielen, lernen und einfach Hund sein – in einer sicheren, liebevoll begleiteten Gruppe.'
  },
  {
    id: 'social-walk',
    name: 'Social Walk',
    typ: 'Gruppe',
    zielgruppe: '',
    umfang: 'einzeln / 90min.',
    preis: 'CHF 45',
    preisEinheit: '',
    platzgebuehr: false,
    bild: 'angebot-socialwalk.jpg',
    kurz: 'gemeinsam lernen, sicher wachsen',
    lang: 'Im Social Walk ist mir wichtig, dass sich alle wohlfühlen – Hunde wie Menschen. Fehler machen gehört dazu, denn nur so können wir gemeinsam lernen. In der Gruppe gibt es kein Mobbing und keinen Druck: Von jung bis alt, von unsicher bis souverän, alle sind willkommen.\n\nWir üben alltagsnahe Situationen wie Begegnungen, Leinenführung, kleine Erziehungseinheiten, Restauranttraining und ruhiges Ankommen. Dabei steht immer im Mittelpunkt, die Körpersprache der Hunde zu lesen und zu verstehen. So werden Mensch und Hund zu einem starken Team, das entspannt und sicher durch alle Alltagssituationen geht.'
  }
];

/* ---------- Banner-Slider ---------- */
const SLIDER_BILDER = [
  'slider-1.png',
  'slider-2.png',
  'slider-3.png',
  'slider-4.png',
  'slider-5-socialwalk.jpg'
];

/* ---------- Galerie ---------- */
const GALERIE = [
  { titel: 'Hund beim Frisbee',                 datei: 'galerie-1-frisbee.png', form: 'gross' },
  { titel: 'Gruppe auf dem Weg',                datei: 'galerie-14-gruppe-weg.jpg', form: 'hoch' },
  { titel: 'Portrait eines Hundes',             datei: 'galerie-2-portrait.png' },
  { titel: 'Hunde warten beim Training',        datei: 'galerie-13-warten.jpg', form: 'breit' },
  { titel: 'Spaziergang mit Hunden',            datei: 'galerie-18-spaziergang.jpg', form: 'hoch' },
  { titel: 'Social Walk in der Gruppe',         datei: 'galerie-15-socialwalk.jpg', form: 'gross' },
  { titel: 'Training mit Michela',              datei: 'galerie-3-training.png' },
  { titel: 'Langhaardackel beim Social Walk',   datei: 'galerie-9-dackel.jpg' },
  { titel: 'Begleitung auf dem Weg',            datei: 'galerie-19-begleitung.jpg', form: 'hoch' },
  { titel: 'Training auf der Wiese',            datei: 'galerie-11-wiese.jpg', form: 'breit' },
  { titel: 'Gemeinsamer Spaziergang',           datei: 'galerie-4-spaziergang.png' },
  { titel: 'Übung auf dem Weg',                 datei: 'galerie-22-uebung.jpg', form: 'hoch' },
  { titel: 'Gruppenbild beim Social Walk',      datei: 'galerie-16-gruppenbild.jpg', form: 'gross' },
  { titel: 'Hund in der Hundeschule',           datei: 'galerie-5-hund.png' },
  { titel: 'Auf dem Waldpfad',                  datei: 'galerie-23-waldpfad.jpg', form: 'hoch' },
  { titel: 'Vertrauensmoment beim Social Walk', datei: 'galerie-10-streicheln.jpg' },
  { titel: 'Unterwegs mit der Gruppe',          datei: 'galerie-20-unterwegs.jpg', form: 'hoch' },
  { titel: 'Unterwegs auf dem Waldweg',         datei: 'galerie-12-waldweg.jpg', form: 'breit' },
  { titel: 'Training in der Gruppe',            datei: 'galerie-24-training.jpg', form: 'hoch' },
  { titel: 'Spass beim Training',               datei: 'galerie-6-spass.png' },
  { titel: 'Am Brunnen',                        datei: 'galerie-25-brunnen.jpg', form: 'hoch' },
  { titel: 'Gruppe von Hunden',                 datei: 'galerie-7-gruppe.png' },
  { titel: 'Hund im Gras',                      datei: 'galerie-21-im-gras.jpg' },
  { titel: 'Einzelcoaching',                    datei: 'galerie-8-coaching.png' },
  { titel: 'Kleiner Hund unterwegs',            datei: 'galerie-17-kleiner-hund.jpg' }
];

/* ---------- Wochenplan ---------- */
const PLAN_TAGE = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

const PLAN_FARBEN = {
  'Spazierdienst':        '#bcdcee',
  'Social Walk':          '#cfe39a',
  'Creative':             '#d8c7e6',
  'Hundefrisbee':         '#f6bd8c',
  'Junghunde':            '#f9c8db',
  'Welpen':               '#f9c8db',
  'Welpen/Junghundekurs': '#f9c8db',
  'Trickdog':             '#f7dc86',
  'Spass & Sport':        '#c2d62f'
};

/* Kurzname im Plan -> Name im Anfrage-Dropdown */
const PLAN_ZU_ANGEBOT = {
  'Hundefrisbee':         'Hunde Frisbee, Discdog',
  'Spazierdienst':        'Gruppenspaziergang – mit Herz, Struktur und echten Freundschaften',
  'Welpen':               'Welpen- & Junghundekurs',
  'Junghunde':            'Welpen- & Junghundekurs',
  'Welpen/Junghundekurs': 'Welpen- & Junghundekurs'
};

/* Kurse, die es nur im Wochenplan gibt */
const WEITERE_KURSE = [];

let WOCHENPLAN = [
  { zeit: '08:00', Montag: 'Spazierdienst', Dienstag: 'Spazierdienst', Mittwoch: 'Spazierdienst', Donnerstag: 'Spazierdienst', Freitag: 'Spazierdienst' },
  { zeit: '09:30', Samstag: 'Social Walk' },
  { zeit: '12:00', Freitag: 'Hundefrisbee' },
  { zeit: '12:30', Freitag: 'Hundefrisbee' },
  { zeit: '13:15', Freitag: 'Hundefrisbee' },
  { zeit: '14:00', Freitag: 'Trickdog' },
  { zeit: '14:45', Freitag: 'Hundefrisbee' },
  { zeit: '15:00', Freitag: 'Hundefrisbee' },
  { zeit: '15:30', Freitag: 'Hundefrisbee' },
  { zeit: '16:00', Freitag: 'Hundefrisbee' },
  { zeit: '18:00', Montag: 'Social Walk', Donnerstag: 'Welpen/Junghundekurs' }
];

/* ---------- Ablauf ---------- */
const ABLAUF = [
  { farbe: '#c2d62f', titel: 'Anfrage senden',                 meta: 'Sofort · unverbindlich', text: 'Schreib mir über das Kontaktformular oder direkt per E-Mail, welches Angebot dich interessiert und was du dir wünschst.' },
  { farbe: '#f7dc86', titel: 'Telefonat & Bedürfnisse klären', meta: 'Innert 2–3 Tagen',       text: 'Wir telefonieren in Ruhe: Ich lerne dich und deinen Hund kennen, wir klären eure Ziele — und ich nenne dir die passende Platzgebühr.' },
  { farbe: '#f6bd8c', titel: 'Schnupperstunde',                meta: 'Nach Vereinbarung',      text: 'Ihr kommt unverbindlich zum Schnuppern vorbei. So spürt ihr, ob die Chemie stimmt und der Kurs zu euch passt.' },
  { farbe: '#f9c8db', titel: 'Gemeinsam im Kurs lernen',       meta: 'Kursstart',              text: 'Ab jetzt trainieren wir zusammen — in kleinen Gruppen, mit positiver Verstärkung und viel Freude an der Sache.' },
  { farbe: '#bcdcee', titel: 'Dranbleiben & wachsen',          meta: 'Auch danach',            text: 'Nach dem Kurs bleibe ich für Fragen da: Auffrischung, Anschlusskurse oder ein Einzelcoaching, wann immer ihr es braucht.' }
];

/* ---------- FAQ ---------- */
const FAQ = [
  { frage: 'Für welche Hunde sind die Kurse geeignet?', antwort: 'Grundsätzlich für alle Rassen und Altersstufen. Für Welpen und Junghunde gibt es eigene Kurse, ansonsten schauen wir gemeinsam, welches Angebot am besten passt.' },
  { frage: 'Arbeitest du mit positiver Verstärkung?',   antwort: 'Ja, das ist mein wichtigster Grundsatz. Ich zeige dir, wie du erwünschtes Verhalten belohnst und über die Körpersprache mit deinem Hund kommunizierst — fair, gewaltfrei und mit viel Freude.' },
  { frage: 'Wie setzt sich der Preis zusammen?',        antwort: 'Jedes Angebot hat einen Fixpreis für das Training. Beim Welpen- & Junghundekurs kommt zusätzlich eine Platzgebühr dazu, die je nach Trainingsplatz unterschiedlich ausfällt — diese gebe ich dir bei der Beantwortung deiner Anfrage transparent bekannt.' },
  { frage: 'Muss mein Hund geimpft sein?',              antwort: 'Für die Teilnahme an Gruppenkursen benötigt dein Hund einen aktuellen Impf- bzw. Gesundheitsschutz. Details bespreche ich gerne bei der Anmeldung mit dir.' },
  { frage: 'Bietest du Schnupperstunden an?',           antwort: 'Ja! Gerade beim Einzelcoaching und den Sportangeboten ist eine Schnupperstunde möglich, damit du und dein Hund unverbindlich reinschnuppern könnt.' }
];
