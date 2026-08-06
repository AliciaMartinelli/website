/* =========================================================
   allaboutdogs – Interaktion
   Slider · Angebote · Modal · Wochenplan · Galerie
   Ablauf · FAQ · Kontaktformular
   ========================================================= */
(function () {
  'use strict';

  const $  = (sel, wurzel) => (wurzel || document).querySelector(sel);
  const $$ = (sel, wurzel) => Array.from((wurzel || document).querySelectorAll(sel));

  /* -------------------------------------------------------
     1. Banner-Slider
     ------------------------------------------------------- */
  function sliderStarten() {
    const track = $('#slider-track');
    const dots  = $('#slider-dots');
    if (!track || !SLIDER_BILDER.length) return;

    let aktiv = 0;
    let timer = null;

    SLIDER_BILDER.forEach((datei, i) => {
      const folie = document.createElement('div');
      folie.className = 'slider__bild' + (i === 0 ? ' ist-aktiv' : '');
      folie.style.backgroundImage = 'url(' + bild(datei) + ')';
      folie.setAttribute('role', 'img');
      folie.setAttribute('aria-label', 'Foto ' + (i + 1) + ' von ' + SLIDER_BILDER.length);
      track.appendChild(folie);

      const punkt = document.createElement('button');
      punkt.type = 'button';
      punkt.className = i === 0 ? 'ist-aktiv' : '';
      punkt.setAttribute('aria-label', 'Zu Foto ' + (i + 1));
      punkt.addEventListener('click', () => zeige(i));
      dots.appendChild(punkt);
    });

    const folien = $$('.slider__bild', track);
    const punkte = $$('button', dots);

    function zeige(index) {
      aktiv = (index + folien.length) % folien.length;
      folien.forEach((f, i) => f.classList.toggle('ist-aktiv', i === aktiv));
      punkte.forEach((p, i) => p.classList.toggle('ist-aktiv', i === aktiv));
      neuStarten();
    }

    function neuStarten() {
      clearInterval(timer);
      timer = setInterval(() => zeige(aktiv + 1), 5200);
    }

    $$('[data-slide]').forEach(btn => {
      btn.addEventListener('click', () => {
        zeige(aktiv + (btn.dataset.slide === 'next' ? 1 : -1));
      });
    });

    /* Wischen auf dem Handy */
    let startX = null;
    const box = $('#slider');
    box.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', e => {
      if (startX === null) return;
      const weg = e.changedTouches[0].clientX - startX;
      if (Math.abs(weg) > 45) zeige(aktiv + (weg < 0 ? 1 : -1));
      startX = null;
    });

    neuStarten();
  }

  /* -------------------------------------------------------
     2. Angebote als Karten
     ------------------------------------------------------- */
  function angeboteAufbauen() {
    const ziel = $('#angebote-liste');
    if (!ziel) return;

    ANGEBOTE.forEach((a, index) => {
      const karte = document.createElement('article');
      karte.className = 'karte';
      karte.innerHTML =
        '<div class="karte__bild" style="background-image:url(' + bild(a.bild) + ')">' +
          '<span class="badge" style="background:' + (KATEGORIE_FARBEN[a.id] || '#5a7d9a') + '">' + a.typ + '</span>' +
        '</div>' +
        '<div class="karte__inhalt">' +
          '<h3>' + a.name + '</h3>' +
          '<div class="karte__meta">' +
            '<span>👥 ' + a.zielgruppe + '</span>' +
            '<span>⏱ ' + a.umfang + '</span>' +
          '</div>' +
          '<div class="karte__preis">' +
            '<b>' + a.preis + '</b><span> ' + a.preisEinheit + '</span>' +
            (a.platzgebuehr ? '<small>zzgl. Platzgebühr (bei Anfrage)</small>' : '') +
          '</div>' +
          '<div class="karte__aktionen">' +
            '<button class="btn btn--hell" type="button" data-mehr="' + index + '">Mehr</button>' +
            '<button class="btn" type="button" data-anfrage="' + a.name + '">Anfrage senden</button>' +
          '</div>' +
        '</div>';
      ziel.appendChild(karte);
    });
  }

  /* -------------------------------------------------------
     3. Modal mit Kursdetails
     ------------------------------------------------------- */
  const modal = $('#modal');
  let letzterFokus = null;

  function modalOeffnen(index) {
    const a = ANGEBOTE[index];
    if (!a) return;

    letzterFokus = document.activeElement;

    $('#modal-img').src        = bild(a.bild);
    $('#modal-img').alt        = a.name;
    $('#modal-typ').textContent = a.typ;
    $('#modal-typ').style.background = KATEGORIE_FARBEN[a.id] || '#5a7d9a';
    $('#modal-titel').textContent  = a.name;
    $('#modal-desc').textContent   = a.kurz;
    $('#modal-detail').textContent = a.lang;
    $('#modal-fuer').textContent   = a.zielgruppe;
    $('#modal-umfang').textContent = a.umfang;
    $('#modal-preis').textContent  = (a.preis + ' ' + a.preisEinheit).trim();
    $('#modal-gebuehr').hidden     = !a.platzgebuehr;
    $('#modal-anfrage').dataset.anfrage = a.name;

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    $('.modal__schliessen', modal).focus();
  }

  function modalSchliessen() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (letzterFokus) letzterFokus.focus();
  }

  /* -------------------------------------------------------
     4. Wochenplan
     ------------------------------------------------------- */
  function planAufbauen() {
    const tabelle = $('#plan');
    if (!tabelle) return;

    const kopf = document.createElement('thead');
    kopf.innerHTML =
      '<tr><th scope="col">Zeit</th>' +
      PLAN_TAGE.map(t => '<th scope="col">' + t + '</th>').join('') +
      '</tr>';
    tabelle.appendChild(kopf);

    const koerper = document.createElement('tbody');
    WOCHENPLAN.forEach(zeile => {
      const tr = document.createElement('tr');
      tr.innerHTML = '<th scope="row" class="plan__zeit">' + zeile.zeit + '</th>' +
        PLAN_TAGE.map(tag => {
          const kurs = zeile[tag];
          if (!kurs) return '<td></td>';
          const farbe  = PLAN_FARBEN[kurs] || '#bcdcee';
          const ziel   = PLAN_ZU_ANGEBOT[kurs] || kurs;
          return '<td><button class="plan__kurs" type="button" style="background:' + farbe +
                 '" data-anfrage="' + ziel + '">' + kurs + '</button></td>';
        }).join('');
      koerper.appendChild(tr);
    });
    tabelle.appendChild(koerper);
  }

  /* -------------------------------------------------------
     5. Galerie
     ------------------------------------------------------- */
  function galerieAufbauen() {
    const ziel = $('#galerie-liste');
    if (!ziel) return;

    GALERIE.forEach((g, i) => {
      const gross   = i % 5 === 0;
      const quadrat = i % 3 === 0;
      const kachel  = document.createElement('div');
      kachel.className = 'galerie__bild' +
        (gross ? ' galerie__bild--gross' : '') +
        (quadrat ? ' galerie__bild--quadrat' : '');
      kachel.style.backgroundImage = 'url(' + bild(g.datei) + ')';
      kachel.setAttribute('role', 'img');
      kachel.setAttribute('aria-label', g.titel);
      ziel.appendChild(kachel);
    });
  }

  /* -------------------------------------------------------
     6. Ablauf / Timeline
     ------------------------------------------------------- */
  function ablaufAufbauen() {
    const ziel = $('#timeline');
    if (!ziel) return;

    ABLAUF.forEach((s, i) => {
      const li = document.createElement('li');
      li.className = 'timeline__schritt';
      li.innerHTML =
        '<div class="timeline__nummer" style="background:' + s.farbe + '">' + (i + 1) + '</div>' +
        '<div class="timeline__karte">' +
          '<div class="timeline__kopf"><h3>' + s.titel + '</h3>' +
          '<span class="timeline__meta">' + s.meta + '</span></div>' +
          '<p>' + s.text + '</p>' +
        '</div>';
      ziel.appendChild(li);
    });
  }

  /* -------------------------------------------------------
     7. FAQ – Ziehharmonika
     ------------------------------------------------------- */
  function faqAufbauen() {
    const ziel = $('#faq-liste');
    if (!ziel) return;

    FAQ.forEach((f, i) => {
      const id = 'faq-antwort-' + i;
      const box = document.createElement('div');
      box.className = 'faq__eintrag';
      box.innerHTML =
        '<button class="faq__frage" type="button" aria-expanded="false" aria-controls="' + id + '">' +
          '<span>' + f.frage + '</span>' +
        '</button>' +
        '<div class="faq__antwort" id="' + id + '" hidden>' + f.antwort + '</div>';
      ziel.appendChild(box);
    });

    ziel.addEventListener('click', e => {
      const knopf = e.target.closest('.faq__frage');
      if (!knopf) return;
      const offen = knopf.getAttribute('aria-expanded') === 'true';
      knopf.setAttribute('aria-expanded', String(!offen));
      $('#' + knopf.getAttribute('aria-controls')).hidden = offen;
    });
  }

  /* -------------------------------------------------------
     8. Kontaktformular
     ------------------------------------------------------- */
  function formularVorbereiten() {
    const auswahl = $('#kurs');
    if (!auswahl) return;

    const optionen = ['Bitte wählen…']
      .concat(ANGEBOTE.map(a => a.name))
      .concat(WEITERE_KURSE)
      .concat(['Allgemeine Frage']);

    optionen.forEach(text => {
      const o = document.createElement('option');
      o.value = text === 'Bitte wählen…' ? '' : text;
      o.textContent = text;
      auswahl.appendChild(o);
    });
  }

  function anfrageStarten(kursName) {
    const auswahl = $('#kurs');
    const hinweis = $('#vorauswahl');

    if (auswahl) {
      const treffer = Array.from(auswahl.options).find(o => o.value === kursName);
      auswahl.value = treffer ? kursName : '';
    }
    if (hinweis) {
      hinweis.textContent = 'Anfrage für: ' + kursName;
      hinweis.hidden = false;
    }

    if (!modal.hidden) modalSchliessen();

    const ziel = $('#kontakt');
    if (ziel) {
      window.scrollTo({
        top: ziel.getBoundingClientRect().top + window.pageYOffset - 20,
        behavior: 'smooth'
      });
    }
    setTimeout(() => { const n = $('#name'); if (n) n.focus({ preventScroll: true }); }, 500);
  }

  function formularAbsenden() {
    const formular = $('#anfrage-formular');
    if (!formular) return;

    formular.addEventListener('submit', async e => {
      e.preventDefault();

      const fehler = $('#formular-fehler');
      fehler.hidden = true;

      const name  = $('#name').value.trim();
      const mail  = $('#email').value.trim();

      if (!name || !mail) {
        fehler.textContent = 'Bitte fülle Name und E-Mail aus.';
        fehler.hidden = false;
        return;
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) {
        fehler.textContent = 'Bitte gib eine gültige E-Mail-Adresse an.';
        fehler.hidden = false;
        return;
      }

      const knopf = $('button[type="submit"]', formular);
      const alterText = knopf.textContent;
      knopf.disabled = true;
      knopf.textContent = 'Wird gesendet…';

      try {
        const antwort = await fetch(formular.action, {
          method: 'POST',
          body: new FormData(formular),
          headers: { 'X-Requested-With': 'fetch' }
        });
        const ergebnis = await antwort.json();

        if (ergebnis.ok) {
          formular.hidden = true;
          $('#formular-danke').hidden = false;
        } else {
          throw new Error(ergebnis.fehler || 'Unbekannter Fehler');
        }
      } catch (err) {
        fehler.textContent =
          'Das Senden hat leider nicht geklappt. Bitte schreib mir direkt an michelaruch@gmail.com.';
        fehler.hidden = false;
      } finally {
        knopf.disabled = false;
        knopf.textContent = alterText;
      }
    });
  }

  /* -------------------------------------------------------
     9. Globale Klicks & Tasten
     ------------------------------------------------------- */
  function ereignisseBinden() {
    document.addEventListener('click', e => {
      const mehr = e.target.closest('[data-mehr]');
      if (mehr) { modalOeffnen(Number(mehr.dataset.mehr)); return; }

      const anfrage = e.target.closest('[data-anfrage]');
      if (anfrage) { anfrageStarten(anfrage.dataset.anfrage); return; }

      if (e.target.closest('[data-close]')) modalSchliessen();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !modal.hidden) modalSchliessen();
    });
  }

  /* -------------------------------------------------------
     Daten aus daten.json laden (Pflege über /admin/).
     Schlägt das fehl, gelten die Fallback-Werte aus daten.js.
     ------------------------------------------------------- */
  async function datenLaden() {
    try {
      const antwort = await fetch('daten.json', { cache: 'no-store' });
      if (!antwort.ok) return;
      const daten = await antwort.json();
      if (Array.isArray(daten.angebote) && daten.angebote.length) ANGEBOTE = daten.angebote;
      if (Array.isArray(daten.wochenplan) && daten.wochenplan.length) WOCHENPLAN = daten.wochenplan;
    } catch (_) { /* Fallback aus daten.js verwenden */ }
  }

  /* -------------------------------------------------------
     Start
     ------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', async () => {
    await datenLaden();
    sliderStarten();
    angeboteAufbauen();
    planAufbauen();
    galerieAufbauen();
    ablaufAufbauen();
    faqAufbauen();
    formularVorbereiten();
    formularAbsenden();
    ereignisseBinden();

    const jahr = document.getElementById('jahr');
    if (jahr) jahr.textContent = new Date().getFullYear();
  });
})();
