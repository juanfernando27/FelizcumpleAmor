'use strict';
const $ = (selector) => document.querySelector(selector);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// The letter opens in place, so reading never depends on a modal.
const letter = $('#letter');
const envelope = $('#open-letter');
envelope.addEventListener('click', () => {
  envelope.hidden = true;
  envelope.setAttribute('aria-expanded', 'true');
  letter.hidden = false;
  letter.focus({ preventScroll: true });
  letter.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
});
$('#close-letter').addEventListener('click', () => {
  letter.hidden = true;
  envelope.hidden = false;
  envelope.setAttribute('aria-expanded', 'false');
  envelope.focus({ preventScroll: true });
  envelope.scrollIntoView({ block: 'center', behavior: 'instant' });
});
$('#save-letter').addEventListener('click', () => {
  const text = 'Para mi amor, en sus 19 años\n24 de noviembre de 2026\n\nMi amor:\n\n' + $('#letter-content').innerText + '\n\nTuyo, Juan Fernando';
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url; link.download = 'Una-carta-para-mi-amor.txt';
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

const photos = [
  ['mi-amor', 'Mi persona favorita.'],
  ['un-besito', 'Un besito y mil más.'],
  ['nuestros-colores', 'Todos nuestros colores.'],
  ['a-tu-lado', 'Mi equipo favorito somos nosotros.'],
  ['nuestras-locuras', 'La que se ríe sin motivo.'],
  ['mis-superheroes', 'Tú, mi superpoder favorito.']
];
const dialog = $('#photo-dialog');
let photoIndex = 0;
function showPhoto(index) {
  photoIndex = (index + photos.length) % photos.length;
  const [file, caption] = photos[photoIndex];
  $('#viewer-image').src = `assets/${file}.webp`;
  $('#viewer-image').alt = caption;
  $('#viewer-caption').textContent = `${caption} (${photoIndex + 1} de ${photos.length})`;
}
document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => {
  showPhoto(Number(button.dataset.photo)); dialog.showModal();
}));
$('#close-photo').addEventListener('click', () => dialog.close());
$('#previous-photo').addEventListener('click', () => showPhoto(photoIndex - 1));
$('#next-photo').addEventListener('click', () => showPhoto(photoIndex + 1));
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(photoIndex + 1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(photoIndex - 1); }
});

const reasons = [...document.querySelectorAll('#reasons-list li')].map(li => li.textContent);
let reasonIndex = 0;
$('#next-reason').addEventListener('click', () => {
  reasonIndex = (reasonIndex + 1) % reasons.length;
  $('#reason-count').textContent = `${reasonIndex + 1} de ${reasons.length}`;
  $('#reason-text').textContent = reasons[reasonIndex];
});

const candles = $('#candles');
for (let i = 0; i < 19; i++) {
  const candle = document.createElement('span'); candle.className = 'candle'; candle.setAttribute('aria-hidden', 'true');
  const flame = document.createElement('span'); flame.className = 'flame'; candle.append(flame); candles.append(candle);
}
function celebrate() {
  if (reducedMotion.matches) return;
  const stage = $('#celebration');
  stage.replaceChildren();
  for (let i = 0; i < 65; i++) {
    const piece = document.createElement('i'); piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = ['#f4b8c9', '#efc896', '#fff4f2', '#c87996'][i % 4];
    stage.append(piece);
    const animation = piece.animate([
      { transform: `translateY(-20px) rotate(${i * 9}deg)`, opacity: 1 },
      { transform: `translate(${Math.random() * 180 - 90}px, ${window.innerHeight + 40}px) rotate(${i * 9 + 500}deg)`, opacity: 0 }
    ], { duration: 2200 + Math.random() * 1400, delay: Math.random() * 300, easing: 'ease-out' });
    animation.onfinish = () => piece.remove();
  }
}
$('#blow-candles').addEventListener('click', () => {
  const out = candles.classList.toggle('is-out');
  candles.setAttribute('aria-label', out ? '19 velitas apagadas. ¡Feliz cumpleaños!' : '19 velitas encendidas');
  $('#blow-candles').textContent = out ? 'Volver a encender' : 'Soplar las velitas';
  $('#wish-message').textContent = out ? '¡Felices 19, mi amor! Que la vida te abrace tan bonito como tú me abrazas.' : 'Yo ya tengo el mío: seguir celebrándote.';
  if (out) celebrate();
});

// A quiet original instrumental, synthesized locally. Sound starts only on a tap.
let audioContext, master, timer, playing = false, step = 0, nextNote = 0;
const melody = [64,67,71,67,62,67,69,67,60,64,67,64,59,62,67,62,60,64,69,67,62,65,69,65,59,62,67,66,67,62,59,62];
const bass = [48,43,45,47,48,50,43,47];
function note(midi, time, volume, duration) {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = 'triangle'; osc.frequency.value = 440 * 2 ** ((midi - 69) / 12);
  gain.gain.setValueAtTime(0, time); gain.gain.linearRampToValueAtTime(volume, time + .012);
  gain.gain.exponentialRampToValueAtTime(.0001, time + duration);
  osc.connect(gain).connect(master); osc.start(time); osc.stop(time + duration + .05);
}
function schedule() {
  while (nextNote < audioContext.currentTime + .2) {
    note(melody[step % melody.length], nextNote, .12, 1.6);
    if (step % 4 === 0) note(bass[(step / 4) % bass.length], nextNote, .15, 2.7);
    nextNote += .62; step++;
  }
}
async function toggleMusic() {
  const button = $('#music');
  try {
    if (!audioContext) {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) throw new Error('Audio unavailable');
      audioContext = new Audio(); master = audioContext.createGain(); master.gain.value = .4; master.connect(audioContext.destination);
    }
    if (playing) {
      clearInterval(timer); await audioContext.suspend(); playing = false;
    } else {
      await audioContext.resume(); nextNote = audioContext.currentTime + .05; schedule(); timer = setInterval(schedule, 100); playing = true;
    }
    button.setAttribute('aria-pressed', String(playing));
    button.querySelector('span').textContent = playing ? 'Pausar piano' : 'Piano para ti';
  } catch {
    $('#audio-status').textContent = 'No se pudo reproducir el piano en este navegador. Puedes seguir disfrutando tu regalo.';
  }
}
$('#music').addEventListener('click', toggleMusic);
document.addEventListener('visibilitychange', () => { if (document.hidden && playing) void toggleMusic(); });
