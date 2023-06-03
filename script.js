'use strict';

let totalScors, currentScore, activePlayer, playing;

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const diceImg = document.querySelector('.dice');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// initial conditions
const initialCondition = function () {
  totalScors = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceImg.classList.add('hidden');
};

initialCondition();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6 + 1);
    console.log(diceNumber);
    diceImg.src = `dice-${diceNumber}.png`;
    diceImg.classList.remove('hidden');
    if (diceNumber !== 1) {
      currentScore += diceNumber;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    totalScors[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScors[activePlayer];
    diceImg.classList.add('hidden');
    if (totalScors[activePlayer] >= 100) {
      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      diceImg.classList.add('hidden');
      player0El.classList.remove('player--active');
      player1El.classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initialCondition);
