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

const audio = $('#love-audio');
const tracks = [
  ['gone-gone-gone.mp3', 'Phillip Phillips · Gone, Gone, Gone'],
  ['til-kingdom-come.mp3', 'Coldplay · Til Kingdom Come']
];
let trackIndex = 0;
audio.volume = .55;
function updateMusic() {
  $('#music').setAttribute('aria-pressed', String(!audio.paused));
  $('#music').querySelector('span').textContent = audio.paused ? 'Nuestra música' : 'Pausar música';
  $('#track-play').textContent = audio.paused ? 'Escuchar nuestras canciones' : 'Pausar canción';
}
async function playMusic() {
  try { await audio.play(); } catch { $('#audio-status').textContent = 'Toca Escuchar nuestras canciones para iniciar la música.'; }
  updateMusic();
}
function toggleMusic() { if (audio.paused) void playMusic(); else audio.pause(); }
function nextTrack() {
  trackIndex = (trackIndex + 1) % tracks.length;
  audio.src = `assets/music/${tracks[trackIndex][0]}`;
  $('#track-title').textContent = tracks[trackIndex][1];
  void playMusic();
}
audio.addEventListener('ended', nextTrack);
audio.addEventListener('play', updateMusic);
audio.addEventListener('pause', updateMusic);
audio.addEventListener('error', () => { $('#audio-status').textContent = 'No se pudo cargar la canción. Toca Siguiente canción para intentar con la otra.'; updateMusic(); });
$('#music').addEventListener('click', toggleMusic);
$('#track-play').addEventListener('click', toggleMusic);
$('#track-next').addEventListener('click', nextTrack);

const gift = $('#unwrap-gift');
gift.addEventListener('click', () => {
  gift.classList.add('unwrapped');
  gift.setAttribute('aria-expanded', 'true');
  $('#gift-instruction').textContent = 'Antes de abrirlo del todo…';
  $('#love-question').hidden = false;
  $('#love-yes').focus({ preventScroll: true });
  $('#love-question').scrollIntoView({ block: 'center', behavior: reducedMotion.matches ? 'instant' : 'smooth' });
});
let refusals = 0;
const no = $('#love-no');
const yes = $('#love-yes');
function dodgeNo(event) {
  event.preventDefault();
  refusals++;
  const arena = $('#love-arena');
  const scale = Math.max(.22, 1 - refusals * .12);
  const yesScale = Math.min(1.5, 1 + refusals * .08);
  yes.style.transform = `scale(${yesScale})`;
  no.style.transform = `scale(${scale})`;
  const width = arena.clientWidth;
  const positions = [[.82,.12],[.18,.78],[.79,.8],[.18,.12]];
  const [x,y] = positions[(refusals - 1) % positions.length];
  no.style.left = `${Math.min(width - 70, Math.max(4, width * x - 32))}px`;
  no.style.top = `${y * 145}px`;
  $('#love-tease').textContent = ['¿Segura, segurita?', 'Creo que querías tocar el otro…', 'El «Sí» tiene una sorpresa muy bonita.', 'Ese «No» no se deja atrapar.'][Math.min(refusals - 1, 3)];
}
no.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') dodgeNo(e); });
no.addEventListener('pointerdown', dodgeNo);
no.addEventListener('click', dodgeNo);
const bunnyDialog = $('#bunny-dialog');
function replayBunny() {
  const cinema = $('.bunny-cinema');
  cinema.classList.remove('is-playing');
  void cinema.offsetWidth;
  cinema.classList.add('is-playing');
}
yes.addEventListener('click', () => {
  bunnyDialog.showModal(); replayBunny(); celebrate();
  if (audio.paused) void playMusic();
});
$('#close-bunny').addEventListener('click', () => bunnyDialog.close());
$('#bunny-replay').addEventListener('click', replayBunny);
$('#bunny-pause').addEventListener('click', () => {
  const paused = $('.bunny-cinema').classList.toggle('motion-paused');
  $('#bunny-pause').setAttribute('aria-pressed', String(paused));
  $('#bunny-pause').textContent = paused ? 'Continuar movimiento' : 'Pausar movimiento';
});
bunnyDialog.addEventListener('close', () => $('.bunny-cinema').classList.remove('is-playing'));

