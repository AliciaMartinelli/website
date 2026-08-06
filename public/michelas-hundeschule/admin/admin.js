/* =========================================================
   allaboutdogs – Admin-Oberfläche
   Lädt daten.json, zeigt Formulare für Angebote & Wochenplan
   und speichert über speichern.php zurück.
   ========================================================= */
(function () {
  'use strict';

  const $ = (sel, wurzel) => (wurzel || document).querySelector(sel);

  const TAGE = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  const ANGEBOT_FELDER = [
    { schluessel: 'name',         label: 'Name des Angebots',        art: 'text',     breit: true },
    { schluessel: 'typ',          label: 'Art (z. B. Gruppe, Einzeln)', art: 'text' },
    { schluessel: 'zielgruppe',   label: 'Für wen?',                 art: 'text' },
    { schluessel: 'umfang',       label: 'Umfang (z. B. 8er-Block · 60 Min.)', art: 'text' },
    { schluessel: 'preis',        label: 'Preis (z. B. CHF 320)',    art: 'text' },
    { schluessel: 'preisEinheit', label: 'Preis-Zusatz (z. B. / Block)', art: 'text' },
    { schluessel: 'bild',         label: 'Bilddatei (im Ordner bilder/)', art: 'text' },
    { schluessel: 'platzgebuehr', label: 'Zusätzliche Platzgebühr?', art: 'haken' },
    { schluessel: 'kurz',         label: 'Kurzbeschreibung (auf der Karte)', art: 'lang', breit: true },
    { schluessel: 'lang',         label: 'Ausführliche Beschreibung (im „Mehr“-Fenster)', art: 'lang', breit: true }
  ];

  let daten = { angebote: [], wochenplan: [] };

  /* ---------- Laden ---------- */
  async function laden() {
    try {
      const antwort = await fetch('../daten.json', { cache: 'no-store' });
      if (!antwort.ok) throw new Error();
      daten = await antwort.json();
      if (!Array.isArray(daten.angebote))   daten.angebote = [];
      if (!Array.isArray(daten.wochenplan)) daten.wochenplan = [];
    } catch (_) {
      statusZeigen('Die Daten konnten nicht geladen werden. Bitte Seite neu laden.', false);
    }
    angeboteZeichnen();
    planZeichnen();
  }

  /* ---------- Angebote ---------- */
  function angeboteZeichnen() {
    const ziel = $('#angebote');
    ziel.innerHTML = '';

    daten.angebote.forEach((angebot, index) => {
      const box = document.createElement('div');
      box.className = 'angebot';

      const kopf = document.createElement('div');
      kopf.className = 'angebot__kopf';
      const titel = document.createElement('h3');
      titel.textContent = angebot.name || 'Neues Angebot';
      const loeschen = document.createElement('button');
      loeschen.type = 'button';
      loeschen.className = 'btn--loeschen';
      loeschen.textContent = '✕ Angebot löschen';
      loeschen.addEventListener('click', () => {
        if (!confirm('„' + (angebot.name || 'Neues Angebot') + '“ wirklich löschen?')) return;
        daten.angebote.splice(index, 1);
        angeboteZeichnen();
      });
      kopf.append(titel, loeschen);

      const raster = document.createElement('div');
      raster.className = 'raster';

      ANGEBOT_FELDER.forEach(feld => {
        const halter = document.createElement('div');
        halter.className = 'feld' + (feld.breit ? ' feld--breit' : '') +
                           (feld.art === 'haken' ? ' kontrollfeld' : '');
        const label = document.createElement('label');
        label.textContent = feld.label;

        let eingabe;
        if (feld.art === 'lang') {
          eingabe = document.createElement('textarea');
          eingabe.value = angebot[feld.schluessel] || '';
        } else if (feld.art === 'haken') {
          eingabe = document.createElement('input');
          eingabe.type = 'checkbox';
          eingabe.checked = Boolean(angebot[feld.schluessel]);
        } else {
          eingabe = document.createElement('input');
          eingabe.type = 'text';
          eingabe.value = angebot[feld.schluessel] || '';
        }

        eingabe.addEventListener('input', () => {
          angebot[feld.schluessel] = feld.art === 'haken' ? eingabe.checked : eingabe.value;
          if (feld.schluessel === 'name') titel.textContent = eingabe.value || 'Neues Angebot';
        });

        if (feld.art === 'haken') halter.append(eingabe, label);
        else halter.append(label, eingabe);
        raster.appendChild(halter);
      });

      box.append(kopf, raster);
      ziel.appendChild(box);
    });
  }

  $('#angebot-neu').addEventListener('click', () => {
    daten.angebote.push({
      id: '', name: '', typ: 'Gruppe', zielgruppe: '', umfang: '',
      preis: '', preisEinheit: '', platzgebuehr: false,
      bild: 'angebot-welpen.png', kurz: '', lang: ''
    });
    angeboteZeichnen();
    const boxen = document.querySelectorAll('.angebot');
    boxen[boxen.length - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  /* ---------- Wochenplan ---------- */
  function planZeichnen() {
    const kopf = $('#plan thead');
    const koerper = $('#plan tbody');
    kopf.innerHTML = '<tr><th>Zeit</th>' + TAGE.map(t => '<th>' + t + '</th>').join('') + '<th></th></tr>';
    koerper.innerHTML = '';

    daten.wochenplan.forEach((zeile, index) => {
      const tr = document.createElement('tr');

      const zeitZelle = document.createElement('td');
      zeitZelle.className = 'zeit';
      const zeit = document.createElement('input');
      zeit.type = 'text';
      zeit.placeholder = '09:30';
      zeit.value = zeile.zeit || '';
      zeit.addEventListener('input', () => { zeile.zeit = zeit.value; });
      zeitZelle.appendChild(zeit);
      tr.appendChild(zeitZelle);

      TAGE.forEach(tag => {
        const td = document.createElement('td');
        const eingabe = document.createElement('input');
        eingabe.type = 'text';
        eingabe.setAttribute('list', 'bekannte-kurse');
        eingabe.value = zeile[tag] || '';
        eingabe.addEventListener('input', () => {
          if (eingabe.value.trim()) zeile[tag] = eingabe.value;
          else delete zeile[tag];
        });
        td.appendChild(eingabe);
        tr.appendChild(td);
      });

      const aktion = document.createElement('td');
      const loeschen = document.createElement('button');
      loeschen.type = 'button';
      loeschen.className = 'btn--loeschen';
      loeschen.textContent = '✕';
      loeschen.title = 'Zeile löschen';
      loeschen.addEventListener('click', () => {
        daten.wochenplan.splice(index, 1);
        planZeichnen();
      });
      aktion.appendChild(loeschen);
      tr.appendChild(aktion);

      koerper.appendChild(tr);
    });
  }

  $('#zeile-neu').addEventListener('click', () => {
    daten.wochenplan.push({ zeit: '' });
    planZeichnen();
    const zeilen = document.querySelectorAll('#plan tbody tr');
    zeilen[zeilen.length - 1].querySelector('input').focus();
  });

  /* ---------- Speichern ---------- */
  function statusZeigen(text, ok) {
    const status = $('#status');
    status.textContent = text;
    status.className = 'status ' + (ok ? 'status--ok' : 'status--fehler');
    status.hidden = false;
  }

  $('#speichern').addEventListener('click', async () => {
    const passwort = $('#passwort').value;
    if (!passwort) { statusZeigen('Bitte zuerst das Passwort eingeben.', false); return; }

    const knopf = $('#speichern');
    knopf.disabled = true;
    knopf.textContent = 'Wird gespeichert…';

    try {
      const antwort = await fetch('speichern.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passwort: passwort,
          angebote: daten.angebote,
          wochenplan: daten.wochenplan
        })
      });
      const ergebnis = await antwort.json();
      if (ergebnis.ok) {
        statusZeigen('Gespeichert! Die Änderungen sind jetzt auf der Webseite sichtbar. ✔', true);
        await laden();   // sortierte/bereinigte Fassung vom Server übernehmen
      } else {
        statusZeigen(ergebnis.fehler || 'Speichern hat nicht geklappt.', false);
      }
    } catch (_) {
      statusZeigen('Speichern hat nicht geklappt. Bitte nochmals versuchen.', false);
    } finally {
      knopf.disabled = false;
      knopf.textContent = 'Änderungen veröffentlichen';
    }
  });

  laden();
})();
