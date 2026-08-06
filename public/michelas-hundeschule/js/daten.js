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
  coaching: '#8a5a86'
};

/* ---------- Angebote ---------- */
const ANGEBOTE = [
  {
    id: 'welpen',
    name: 'Welpen- & Junghundekurs',
    typ: 'Gruppe',
    zielgruppe: 'Welpen bis 6 Mt. & Junghunde',
    umfang: '8er-Block · 60 Min.',
    preis: 'CHF 320',
    preisEinheit: '/ Block',
    platzgebuehr: true,
    bild: 'angebot-welpen.png',
    kurz: 'Der perfekte Start: Sozialisierung, erste Signale und ein souveräner Umgang im Alltag — spielerisch und ohne Druck.',
    lang: 'In acht Lektionen à 60 Minuten legen wir gemeinsam das Fundament: Begegnungen mit anderen Hunden, Leinenführigkeit, Rückruf, Impulskontrolle und ein entspannter Alltag in der Stadt. Du lernst dabei, die Körpersprache deines Hundes zu lesen und richtig zu reagieren.'
  },
  {
    id: 'trick',
    name: 'Trickdog',
    typ: 'Gruppe',
    zielgruppe: 'Hunde jeden Alters',
    umfang: '6er-Block · 60 Min.',
    preis: 'CHF 240',
    preisEinheit: '/ Block',
    platzgebuehr: false,
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
    platzgebuehr: false,
    bild: 'angebot-seminar.png',
    kurz: 'Themenseminare rund um Hundeverhalten, Körpersprache und Alltagstraining — kompakt an einem Tag.',
    lang: 'Ob Körpersprache, Ernährung, Beschäftigung oder Leinenaggression: Ich stelle Seminare zu deinem Wunschthema zusammen — für Einzelpersonen, Gruppen oder Vereine. Inhalt, Dauer und Ort besprechen wir individuell; das Angebot erhältst du auf Anfrage.'
  },
  {
    id: 'frisbee',
    name: 'Frisbee & Discdog',
    typ: 'Einzeln',
    zielgruppe: 'Sportbegeisterte Teams',
    umfang: 'pro Stunde',
    preis: 'CHF 90',
    preisEinheit: '/ Std.',
    platzgebuehr: false,
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
    bild: 'angebot-coaching.png',
    kurz: 'Gezielte Hilfe bei Leinenführigkeit, Rückruf, Alltagsthemen oder Unsicherheiten — massgeschneidert für euch.',
    lang: 'Im Einzelcoaching schauen wir uns genau eure Situation an — zu Hause, auf dem Spaziergang oder auf dem Trainingsplatz. Wir analysieren das Verhalten, finden die Ursache und erarbeiten einen konkreten Trainingsplan, den du im Alltag umsetzen kannst.'
  },
  {
    id: 'spazier',
    name: 'Spazierdienst',
    typ: 'Service',
    zielgruppe: 'Berufstätige Hundehalter:innen',
    umfang: 'pro Gang · ca. 60 Min.',
    preis: 'CHF 30',
    preisEinheit: '/ Gang',
    platzgebuehr: false,
    bild: 'angebot-spazierdienst.png',
    kurz: 'Wenn der Alltag keine Zeit lässt: Dein Hund wird liebevoll abgeholt, ausgeführt und wieder heimgebracht.',
    lang: 'Ich hole deinen Hund zu Hause ab und bringe ihn nach rund einer Stunde ausgelastet und zufrieden zurück. Spaziert wird in kleinen, passenden Gruppen oder allein — je nachdem, was deinem Hund guttut. Bei regelmässigen Gängen gibt es vergünstigte Abos.'
  }
];

/* ---------- Banner-Slider ---------- */
const SLIDER_BILDER = [
  'slider-1.png',
  'slider-2.png',
  'slider-3.png',
  'slider-4.png'
];

/* ---------- Galerie ---------- */
const GALERIE = [
  { titel: 'Hund beim Frisbee',        datei: 'galerie-1-frisbee.png' },
  { titel: 'Portrait eines Hundes',    datei: 'galerie-2-portrait.png' },
  { titel: 'Training mit Michela',     datei: 'galerie-3-training.png' },
  { titel: 'Gemeinsamer Spaziergang',  datei: 'galerie-4-spaziergang.png' },
  { titel: 'Hund in der Hundeschule',  datei: 'galerie-5-hund.png' },
  { titel: 'Spass beim Training',      datei: 'galerie-6-spass.png' },
  { titel: 'Gruppe von Hunden',        datei: 'galerie-7-gruppe.png' },
  { titel: 'Einzelcoaching',           datei: 'galerie-8-coaching.png' }
];

/* ---------- Wochenplan ---------- */
const PLAN_TAGE = ['Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

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
  'Hundefrisbee':         'Frisbee & Discdog',
  'Welpen':               'Welpen- & Junghundekurs',
  'Junghunde':            'Welpen- & Junghundekurs',
  'Welpen/Junghundekurs': 'Welpen- & Junghundekurs'
};

/* Kurse, die es nur im Wochenplan gibt */
const WEITERE_KURSE = ['Social Walk', 'Creative', 'Spass & Sport'];

const WOCHENPLAN = [
  { zeit: '09:30', Dienstag: 'Spazierdienst', Donnerstag: 'Spazierdienst', Samstag: 'Social Walk' },
  { zeit: '10:00', Mittwoch: 'Social Walk' },
  { zeit: '11:00', Freitag: 'Creative' },
  { zeit: '12:00', Freitag: 'Hundefrisbee', Samstag: 'Junghunde' },
  { zeit: '12:30', Freitag: 'Hundefrisbee' },
  { zeit: '13:15', Samstag: 'Welpen' },
  { zeit: '14:00', Dienstag: 'Welpen/Junghundekurs', Freitag: 'Trickdog' },
  { zeit: '14:45', Samstag: 'Spass & Sport' },
  { zeit: '15:00', Freitag: 'Hundefrisbee' },
  { zeit: '15:30', Mittwoch: 'Spass & Sport', Freitag: 'Hundefrisbee' },
  { zeit: '16:00', Freitag: 'Hundefrisbee' }
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
