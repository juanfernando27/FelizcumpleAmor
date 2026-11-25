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
/* Birthday sequence lives in birthday.js. */

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
bunnyDialog.classList.add('pet-game');
const cinema = $('.bunny-cinema');
const bunny = $('.bunny');
let pet = { food: 65, clean: 55, love: 75, carrots: 6, updated: Date.now() };
const petKey = 'messi-ronaldo-care-v1';
const clamp = value => Math.max(0, Math.min(100, value));
try {
  const saved = JSON.parse(localStorage.getItem(petKey));
  if (saved && ['food','clean','love','carrots','updated'].every(k => Number.isFinite(saved[k]))) {
    pet = { food:clamp(saved.food), clean:clamp(saved.clean), love:clamp(saved.love), carrots:Math.max(0,Math.min(6,Math.floor(saved.carrots))), updated:Math.min(Date.now(),saved.updated) };
  }
} catch { /* Care remains playable when storage is unavailable. */ }
let moving = !reducedMotion.matches;
let idleAnimations = [], actionAnimations = [], careTimer, refillTimer, effectTimer;
let roamAnimation;
let busy = false;
function savePet() { try { localStorage.setItem(petKey, JSON.stringify(pet)); } catch {} }
function agePet() {
  const minutes = Math.max(0, Math.min(480, (Date.now() - pet.updated) / 60000));
  pet.food = clamp(pet.food - minutes * .35);
  pet.clean = clamp(pet.clean - minutes * .22);
  pet.love = clamp(pet.love - minutes * .15);
  pet.carrots = Math.min(6, pet.carrots + Math.floor(minutes / 2));
  pet.updated = Date.now();
}
function paintPet() {
  for (const [key, label] of [['food','food'],['clean','clean'],['love','love']]) {
    const value = Math.round(pet[key]);
    $('#pet-' + key).value = value;
    $('#pet-' + key).textContent = value + ' de 100';
    $('#' + label + '-value').textContent = value + '%';
  }
  $('#carrot-count').textContent = pet.carrots ? `Canasta: ${pet.carrots} de 6` : 'Se llena en unos segundos';
  $('#pet-feed').disabled = busy || pet.carrots === 0;
  $('#pet-wash').disabled = busy;
  $('#pet-play').disabled = busy;
  $('.pet-dirt').style.opacity = String((100 - pet.clean) / 100);
  savePet();
}
function sayPet(message) { $('#pet-message').textContent = message; }
function stopIdle(resetRoute = false) {
  idleAnimations.forEach(a => a.cancel()); idleAnimations = [];
  if (roamAnimation) {
    roamAnimation.pause();
    if (resetRoute) { roamAnimation.cancel(); roamAnimation = null; }
  }
}
function startIdle() {
  stopIdle();
  $('#bunny-pause').setAttribute('aria-pressed', String(!moving));
  $('#bunny-pause').textContent = moving ? 'Pausar movimiento' : 'Activar movimiento';
  if (!moving || !bunnyDialog.open) return;
  if (!roamAnimation) {
    const room = $('.pet-playground').clientWidth;
    const reach = Math.max(18, (room - 190) / 2 - 10);
    const stops = [0, 1/3, 2/3, 1, 2/3, 1/3, 0, -1/3, -2/3, -1, -2/3, -1/3, 0];
    roamAnimation = $('.pet-roamer').animate(stops.map((x, i) => ({ transform: 'translateX(' + x * reach + 'px)', offset: i / 12 })), {duration:8400,iterations:Infinity,easing:'linear'});
  } else { roamAnimation.play(); }
  idleAnimations.push(bunny.animate([
    { transform: 'translateY(0) scale(1.03,.97) rotate(-3deg)', offset:0 },
    { transform: 'translateY(-35px) scale(.98,1.02) rotate(3deg)', offset:.46 },
    { transform: 'translateY(0) scale(1.04,.96) rotate(-3deg)', offset:.92 },
    { transform: 'translateY(0) scale(1.03,.97) rotate(-3deg)', offset:1 }
  ], { duration:700, iterations:Infinity, easing:'ease-in-out' }));
  idleAnimations.push($('.bunny-shadow').animate([{transform:'scale(1)',opacity:.5},{transform:'scale(.7)',opacity:.25},{transform:'scale(1)',opacity:.5}],{duration:700,iterations:Infinity,easing:'ease-in-out'}));
  idleAnimations.push($('.ear-left').animate([{transform:'rotate(-15deg)'},{transform:'rotate(-29deg)'},{transform:'rotate(-15deg)'}],{duration:2600,iterations:Infinity,easing:'ease-in-out'}));
  document.querySelectorAll('.eye').forEach(eye => idleAnimations.push(eye.animate([{transform:'scaleY(1)',offset:0},{transform:'scaleY(1)',offset:.92},{transform:'scaleY(.08)',offset:.96},{transform:'scaleY(1)',offset:1}],{duration:4200,iterations:Infinity})));
}
function clearAction() {
  actionAnimations.forEach(a => a.cancel()); actionAnimations = [];
  clearTimeout(effectTimer); $('.pet-effects').replaceChildren();
  cinema.classList.remove('pet-eating','pet-bathing','pet-playing');
  busy = false;
}
function petEffect(kind) {
  const stage = $('.pet-effects');
  for (let i=0; i < (kind === 'bubbles' ? 16 : 7); i++) {
    const item = document.createElement('i'); item.className = kind === 'bubbles' ? 'wash-bubble' : 'care-heart';
    item.style.left = `${25 + Math.random() * 50}%`; item.style.top = `${45 + Math.random() * 30}%`;
    stage.append(item);
    if (moving) actionAnimations.push(item.animate([{transform:'translateY(0) scale(.8)',opacity:.9},{transform:`translate(${Math.random()*60-30}px,-100px) scale(1.2)`,opacity:0}],{duration:1400+i*60,easing:'ease-out',fill:'forwards'}));
  }
}
function care(kind) {
  if (busy) return;
  if (kind === 'feed' && !pet.carrots) { sayPet('La canasta se está llenando. Mientras tanto, ¿jugamos?'); return; }
  busy = true;
  if (kind === 'feed') stopIdle();
  if (kind === 'feed') {
    pet.carrots--; pet.food=clamp(pet.food+18); pet.love=clamp(pet.love+4); pet.clean=clamp(pet.clean-3);
    cinema.classList.add('pet-eating'); sayPet('¡Ñam, ñam! Esa zanahoria sabe a amor.');
    const snack=document.createElement('i'); snack.className='carrot flying-carrot'; $('.pet-effects').append(snack);
    if(moving) actionAnimations.push(snack.animate([{transform:'translate(70px,80px) rotate(35deg)',opacity:1},{transform:'translate(0,-15px) rotate(-20deg)',opacity:1,offset:.7},{transform:'translate(0,-20px) scale(.3)',opacity:0}],{duration:1200,easing:'ease-out',fill:'forwards'}));
    if(!refillTimer) refillTimer=setTimeout(()=>{pet.carrots=6; refillTimer=undefined; paintPet();},20000);
  } else if (kind === 'wash') {
    pet.clean=clamp(pet.clean+28); pet.love=clamp(pet.love+6);
    cinema.classList.add('pet-bathing'); petEffect('bubbles'); sayPet('¡Burbujitas! Ya huelo rico y tengo las orejitas limpias.');
  } else if (kind === 'play') {
    pet.love=clamp(pet.love+18); pet.food=clamp(pet.food-5); pet.clean=clamp(pet.clean-4);
    cinema.classList.add('pet-playing'); petEffect('hearts'); sayPet('¡Mira mis saltitos! Qué feliz soy jugando contigo.');
  } else {
    pet.love=clamp(pet.love+8); petEffect('hearts'); sayPet('Mmm… tus caricias son mi lugar favorito.');
  }
  pet.updated=Date.now(); paintPet();
  if (moving && kind === 'feed') actionAnimations.push($('.bunny-mouth').animate([{transform:'scaleY(1)'},{transform:'scaleY(.45)'},{transform:'scaleY(1)'}],{duration:280,iterations:7,easing:'ease-in-out'}));
  effectTimer=setTimeout(()=>{clearAction();paintPet();startIdle();},moving?2100:900);
}
function replayBunny() {
  clearAction(); stopIdle(true); moving = !reducedMotion.matches;
  paintPet(); startIdle();
  if(moving) actionAnimations.push($('.bunny-traveler').animate([{transform:'translateX(-260px) rotate(-12deg)',opacity:0},{transform:'translateX(0) rotate(0)',opacity:1}],{duration:1200,easing:'cubic-bezier(.23,1,.32,1)'}));
}
yes.addEventListener('click', () => {
  bunnyDialog.showModal(); agePet(); replayBunny();
  if (pet.carrots < 6 && !refillTimer) refillTimer=setTimeout(()=>{pet.carrots=6;refillTimer=undefined;paintPet();},20000);
  sayPet(moving ? '¡Volviste! ¿Me das una zanahoria o un bañito?' : 'Te esperaba. Puedes activar mi movimiento con el botón de abajo.');
  careTimer=setInterval(()=>{agePet();paintPet();},15000);
  if (audio.paused) void playMusic();
});
$('#pet-feed').addEventListener('click',()=>care('feed'));
$('#pet-wash').addEventListener('click',()=>care('wash'));
$('#pet-play').addEventListener('click',()=>care('play'));
$('#pet-touch').addEventListener('click',()=>care('pet'));
$('#close-bunny').addEventListener('click',()=>bunnyDialog.close());
$('#bunny-replay').addEventListener('click',replayBunny);
$('#bunny-pause').addEventListener('click',()=>{moving=!moving;clearAction();paintPet();startIdle();});
bunnyDialog.addEventListener('close',()=>{stopIdle(true);clearAction();clearInterval(careTimer);savePet();});
reducedMotion.addEventListener('change',()=>{moving=!reducedMotion.matches;clearAction();paintPet();startIdle();});

new ResizeObserver(() => { if (bunnyDialog.open) { stopIdle(true); if (!cinema.classList.contains('pet-eating')) startIdle(); } }).observe($('.pet-playground'));
