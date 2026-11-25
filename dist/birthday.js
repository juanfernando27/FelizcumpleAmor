'use strict';

// The poses share one transparent sprite sheet. The sequence owns its timers so
// repeating, changing motion settings or leaving the page never strands a pose.
const birthdayStage = document.querySelector('#birthday-stage');
const birthdayButton = document.querySelector('#blow-candles');
const birthdayReplay = document.querySelector('#birthday-replay');
const birthdayMessage = document.querySelector('#wish-message');
const birthdayCandles = [...document.querySelectorAll('#candles .candle')];
let birthdayPhase = 'ready';
let birthdayTimers = [];
let birthdayAnimations = [];

birthdayCandles.forEach(candle => {
  const smoke = document.createElement('span');
  smoke.className = 'candle-smoke';
  candle.append(smoke);
});
function birthdayAfter(delay, callback) {
  birthdayTimers.push(setTimeout(callback, delay));
}
function clearBirthdaySequence() {
  birthdayTimers.forEach(clearTimeout); birthdayTimers = [];
  birthdayAnimations.forEach(animation => animation.cancel()); birthdayAnimations = [];
}
function readyBirthday() {
  clearBirthdaySequence();
  birthdayPhase = 'ready';
  birthdayStage.dataset.phase = 'ready';
  birthdayStage.setAttribute('aria-label', 'Una caricatura de mi amor junto a su pastel con 19 velitas encendidas');
  birthdayCandles.forEach(candle => candle.classList.remove('is-out'));
  candles.classList.remove('is-out');
  candles.setAttribute('aria-label', '19 velitas encendidas');
  birthdayButton.disabled = false;
  birthdayButton.textContent = 'Soplar las velitas';
  birthdayReplay.hidden = true;
  birthdayMessage.textContent = 'Yo ya tengo el mío: seguir celebrándote.';
}
function finishBirthday() {
  birthdayPhase = 'celebrated';
  birthdayStage.dataset.phase = 'celebrated';
  birthdayStage.setAttribute('aria-label', 'La cumpleañera sonríe junto a su pastel con las 19 velitas apagadas. ¡Felices 19!');
  birthdayCandles.forEach(candle => candle.classList.add('is-out'));
  candles.classList.add('is-out');
  candles.setAttribute('aria-label', '19 velitas apagadas. ¡Feliz cumpleaños!');
  birthdayButton.disabled = false;
  birthdayButton.textContent = 'Volver a encender';
  birthdayReplay.hidden = false;
  birthdayMessage.textContent = '¡Felices 19, mi amor! Que se cumpla todo lo bonito que sueñas.';
  celebrate();
}
function blowBirthday() {
  if (birthdayPhase === 'inhaling' || birthdayPhase === 'blowing') return;
  readyBirthday();
  birthdayPhase = 'inhaling';
  birthdayStage.dataset.phase = 'inhaling';
  birthdayButton.disabled = true;
  birthdayButton.textContent = 'Pide tu deseo…';
  birthdayMessage.textContent = 'Un deseo guardado, una respiración profunda…';
  const gentle = reducedMotion.matches;
  const inhaleTime = gentle ? 300 : 1400;
  const candleGap = gentle ? 0 : 65;
  if (!gentle) {
    birthdayAnimations.push(document.querySelector('.birthday-character').animate([
      { transform: 'translateY(0) rotate(0)' },
      { transform: 'translateY(-6px) rotate(-2deg)' }
    ], { duration: inhaleTime, easing: 'ease-in-out', fill: 'forwards' }));
  }
  birthdayAfter(inhaleTime, () => {
    birthdayPhase = 'blowing'; birthdayStage.dataset.phase = 'blowing';
    birthdayButton.textContent = 'Soplando las velitas…';
    birthdayMessage.textContent = 'Ahora sí… ¡a soplar!';
    birthdayStage.setAttribute('aria-label', 'La caricatura de ella sopla las velitas del pastel');
    birthdayAnimations.forEach(animation => animation.cancel());
    if (!gentle) birthdayAnimations.push(document.querySelector('.birthday-character').animate([
      { transform: 'translateX(0) rotate(0)' },
      { transform: 'translateX(10px) rotate(3deg)' }
    ], { duration:500, easing:'cubic-bezier(.23,1,.32,1)', fill:'forwards' }));
    birthdayCandles.forEach((candle, index) => birthdayAfter(350 + index * candleGap, () => {
      candle.classList.add('is-out');
      if (!gentle) birthdayAnimations.push(candle.querySelector('.candle-smoke').animate([
        { transform:'translateY(0) scale(.7)', opacity:0 },
        { transform:'translate(4px,-10px) scale(1)', opacity:.6, offset:.25 },
        { transform:'translate(10px,-40px) scale(1.7)', opacity:0 }
      ], {duration:1500,easing:'ease-out',fill:'forwards'}));
    }));
    birthdayAfter(gentle ? 650 : 2600, () => {
      clearBirthdaySequence(); finishBirthday();
    });
  });
}
birthdayButton.addEventListener('click', () => {
  if (birthdayPhase === 'celebrated') readyBirthday();
  else blowBirthday();
});
birthdayReplay.addEventListener('click', blowBirthday);
reducedMotion.addEventListener('change', () => {
  if (birthdayPhase === 'inhaling' || birthdayPhase === 'blowing') {
    clearBirthdaySequence(); finishBirthday();
  }
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden && (birthdayPhase === 'inhaling' || birthdayPhase === 'blowing')) {
    clearBirthdaySequence(); finishBirthday();
  }
});
birthdayStage.dataset.phase = 'ready';
