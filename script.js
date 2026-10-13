'use strict';

/* ===============================================================
   EDIT YOUR INVITATION HERE
   Change the time, restaurant or photos later using this section.
   No server, emails, tracking, attendance list or database is involved.
   The button simply shows a celebratory message on this page.
   =============================================================== */
const INVITATION = {
  day: 'Saturday',
  date: 'October 24, 2026',
  time: '6:00 PM',
  venue: 'Royal Cuisine',
  address: '259 Grange Rd, Guelph, ON N1E 6R5',
  gallery: [
    {
      src: 'parents-together-original.jpg',
      alt: 'Mohammad Muhsen Maulawizada and Maliha Adil smiling together',
      caption: 'A precious moment together',
      shape: 'landscape'
    },
    {
      src: 'mohammad-muhsen-madinah.jpg',
      alt: 'Mohammad Muhsen Maulawizada standing at Al-Masjid an-Nabawi in Madinah',
      caption: 'A blessed moment in Madinah',
      shape: 'portrait'
    },
    {
      src: 'maliha-kaaba-refined.webp',
      alt: 'Maliha Adil standing before the Kaaba in Makkah',
      caption: 'A moment from the holy city of Makkah',
      shape: 'portrait'
    }

    // ADD MORE PHOTOS LATER, for example:
    // ,{src:'new-photo.jpg', alt:'Family moment', caption:'Another beautiful memory', shape:'landscape'}
  ]
};

const $ = id => document.getElementById(id);
const scenes = Array.from(document.querySelectorAll('.scene'));
const names = ['THE INVITATION', 'GRATITUDE', 'BLESSED JOURNEY', 'OUR MEMORIES', 'DINNER DETAILS'];
const prefersLessMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let sceneIndex = 0;
let galleryIndex = 0;
let envelopeOpening = false;
let lanternLit = false;

function announce(message) { $('srAnnouncer').textContent = message; }

function showScene(index, focusHeading = true) {
  index = Math.max(0, Math.min(index, scenes.length - 1));
  sceneIndex = index;
  scenes.forEach((scene, i) => {
    const active = i === index;
    scene.hidden = !active;
    scene.classList.toggle('is-active', active);
    scene.setAttribute('aria-hidden', String(!active));
  });
  const digits = String(index + 1).padStart(2, '0');
  $('progressLabel').innerHTML = `${digits} <span aria-hidden="true">/</span> 05`;
  $('progressName').textContent = names[index];
  Array.from($('progressDots').children).forEach((dot, i) => dot.classList.toggle('on', i === index));
  $('skipToInvite').hidden = index === 4;
  window.scrollTo({top: 0, behavior: 'instant'});
  if (focusHeading) {
    const heading = scenes[index].querySelector('h1,h2');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({preventScroll:true});
    }
  }
  announce(index === 4 ? 'The dinner invitation is revealed.' : `Scene ${index + 1}: ${names[index].toLowerCase()}`);
}

function makeStars() {
  const root = $('backgroundStars');
  for (let i = 0; i < 47; i++) {
    const star = document.createElement('span');
    star.className = `star${i % 8 === 0 ? ' cross' : ''}`;
    // A repeatable pattern, not a network request or dynamic external data.
    const x = (i * 61.8034 + i * i * .7) % 100;
    const y = (i * 37.7193 + i * 11) % 99;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.setProperty('--delay', `${(i * .43) % 5}s`);
    star.style.setProperty('--speed', `${3.4 + (i % 7) * .7}s`);
    root.appendChild(star);
  }
}

function configureDetails() {
  $('eventDay').textContent = INVITATION.day;
  $('eventDate').textContent = INVITATION.date;
  $('eventTime').textContent = INVITATION.time;
  $('venueName').textContent = INVITATION.venue;
  $('venueAddress').textContent = INVITATION.address;
  $('directionsLink').href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(INVITATION.venue + ', ' + INVITATION.address);

}

function renderGallery() {
  const track = $('carouselTrack');
  const indicators = $('galleryIndicators');
  track.replaceChildren();
  indicators.replaceChildren();
  INVITATION.gallery.forEach((photo, i) => {
    const figure = document.createElement('figure');
    figure.className = `gallery-slide ${photo.shape === 'portrait' ? 'portrait' : 'landscape'}`;
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    const caption = document.createElement('figcaption');
    caption.textContent = photo.caption;
    figure.append(img, caption);
    track.appendChild(figure);

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show photo ${i + 1}`);
    dot.addEventListener('click', () => moveGallery(i));
    indicators.appendChild(dot);
  });
  moveGallery(0);
}

function moveGallery(index) {
  if (!INVITATION.gallery.length) return;
  galleryIndex = Math.max(0, Math.min(index, INVITATION.gallery.length - 1));
  $('carouselTrack').style.transform = `translateX(-${galleryIndex * 100}%)`;
  $('galleryCounter').textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(INVITATION.gallery.length).padStart(2, '0')}`;
  Array.from($('galleryIndicators').children).forEach((dot, i) => {
    dot.classList.toggle('active', i === galleryIndex);
    dot.setAttribute('aria-current', String(i === galleryIndex));
  });
  $('galleryPrev').disabled = galleryIndex === 0;
  $('galleryNext').disabled = galleryIndex === INVITATION.gallery.length - 1;
}

function setupGallerySwipe() {
  let startX = null;
  const viewport = document.querySelector('.carousel-window');
  viewport.addEventListener('touchstart', event => {
    startX = event.changedTouches[0].screenX;
  }, {passive:true});
  viewport.addEventListener('touchend', event => {
    if (startX === null) return;
    const delta = event.changedTouches[0].screenX - startX;
    startX = null;
    if (Math.abs(delta) > 37) moveGallery(galleryIndex + (delta < 0 ? 1 : -1));
  }, {passive:true});
  $('galleryPrev').addEventListener('click', () => moveGallery(galleryIndex - 1));
  $('galleryNext').addEventListener('click', () => moveGallery(galleryIndex + 1));
  document.addEventListener('keydown', event => {
    if (sceneIndex === 3 && event.key === 'ArrowRight') moveGallery(galleryIndex + 1);
    if (sceneIndex === 3 && event.key === 'ArrowLeft') moveGallery(galleryIndex - 1);
  });
}

function openEnvelope() {
  if (envelopeOpening) return;
  envelopeOpening = true;
  $('openEnvelope').classList.add('is-open');
  $('openEnvelope').disabled = true;
  announce('Your invitation is opening.');
  window.setTimeout(() => showScene(1), prefersLessMotion ? 80 : 1250);
}

function lightLantern() {
  if (lanternLit) return;
  lanternLit = true;
  $('lanternTrigger').classList.add('is-lit');
  $('lanternTrigger').setAttribute('aria-pressed', 'true');
  $('lanternInstruction').textContent = 'A beautiful reminder of gratitude';
  $('lanternTapLabel').textContent = 'ALHAMDULILLAH ✦';
  window.setTimeout(() => {
    $('verseCard').classList.add('is-visible');
    $('gratitudeNext').disabled = false;
    announce('The Quranic verse from Surah Ibrahim, 14:7, has appeared.');
  }, prefersLessMotion ? 0 : 450);
}

function popSparkles() {
  if (prefersLessMotion) return;
  const host = $('rsvpArea');
  for (let i = 0; i < 22; i++) {
    const el = document.createElement('span');
    el.className = 'celebration-spark';
    el.textContent = i % 3 === 0 ? '♥' : (i % 2 ? '✦' : '✧');
    const angle = 2 * Math.PI * (i / 22);
    const radius = 62 + (i % 5) * 25;
    el.style.setProperty('--dx', `${Math.cos(angle) * radius}px`);
    el.style.setProperty('--dy', `${Math.sin(angle) * radius}px`);
    el.style.animationDelay = `${(i % 4) * 35}ms`;
    host.appendChild(el);
    el.addEventListener('animationend', () => el.remove(), {once:true});
  }
}

function celebrateAttendance() {
  // Purely decorative confirmation: no email, request, saved response, or RSVP tracking.
  $('rsvpResult').hidden = false;
  $('rsvpButton').setAttribute('aria-expanded', 'true');
  popSparkles();
  announce('JazakAllah Khair! May Allah bless our time together. We look forward to seeing you, Insha’Allah!');
}

async function shareInvitation() {
  const url = window.location.href.split('#')[0];
  const share = { title: 'A Blessed Homecoming | Umrah Dinner Invitation', text: 'With grateful hearts, we invite you to celebrate with us! ✨', url };
  if (navigator.share) {
    try { await navigator.share(share); return; } catch (error) {
      if (error.name === 'AbortError') return;
    }
  }
  try {
    await navigator.clipboard.writeText(url);
    $('shareButton').textContent = '✓ Link copied!';
    announce('Invitation link copied to clipboard.');
    window.setTimeout(() => $('shareButton').innerHTML = '<span aria-hidden="true">↗</span> Share invitation', 2200);
  } catch (error) {
    window.prompt('Copy your invitation link:', url);
  }
}

function resetStory() {
  envelopeOpening = false;
  lanternLit = false;
  $('openEnvelope').classList.remove('is-open');
  $('openEnvelope').disabled = false;
  $('lanternTrigger').classList.remove('is-lit');
  $('lanternTrigger').setAttribute('aria-pressed', 'false');
  $('lanternTapLabel').textContent = 'TOUCH TO LIGHT ✦';
  $('lanternInstruction').textContent = 'Tap the lantern to illuminate a blessing';
  $('verseCard').classList.remove('is-visible');
  $('gratitudeNext').disabled = true;
  $('rsvpResult').hidden = true;
  $('rsvpButton').setAttribute('aria-expanded', 'false');
  $('rsvpArea').querySelectorAll('.celebration-spark').forEach(el => el.remove());
  moveGallery(0);
  showScene(0);
}

function initialize() {
  makeStars();
  configureDetails();
  renderGallery();
  setupGallerySwipe();
  $('openEnvelope').addEventListener('click', openEnvelope);
  $('lanternTrigger').addEventListener('click', lightLantern);
  $('gratitudeNext').addEventListener('click', () => showScene(2));
  $('journeyNext').addEventListener('click', () => showScene(3));
  $('galleryNextScene').addEventListener('click', () => showScene(4));
  $('skipToInvite').addEventListener('click', () => showScene(4));
  $('rsvpButton').addEventListener('click', celebrateAttendance);
  $('shareButton').addEventListener('click', shareInvitation);
  $('startOver').addEventListener('click', resetStory);
  $('brandHome').addEventListener('click', event => { event.preventDefault(); resetStory(); });
  showScene(window.location.hash === '#invitation' ? 4 : 0, false);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
else initialize();
