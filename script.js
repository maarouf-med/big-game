'use strict';

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');

const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const dice = document.querySelector('.dice');

const rollDice = document.querySelector('.btn--roll');
const holdDice = document.querySelector('.btn--hold');
const newDice = document.querySelector('.btn--new');

let currentScore, activePlayer, scores, playing;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  dice.classList.add('hidden');
  // set scores to 0
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  // set to starting player
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
  //remove winner
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};

init();

const swichPlayer = function () {
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  currentScore = 0;
};

// roll dice
rollDice.addEventListener('click', function () {
  if (playing) {
    // generate random number between 1 - 6
    const randomDice = Math.floor(Math.random() * 6) + 1;
    // generate random dice role
    dice.src = `dice-${randomDice}.png`;
    // display dice role
    dice.classList.remove('hidden');

    if (randomDice !== 1) {
      currentScore += randomDice;
      // display score for active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // swich to next player
      swichPlayer();
    }
  }
});

// holde dice
holdDice.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // score0.textContent = scores[0];
    // score1.textContent = scores[1];
    // check if players score >= 100
    if (scores[activePlayer] >= 20) {
      // remove active
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      // add winner class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // remove dice
      dice.classList.add('hidden');
      // stop playing
      playing = false;
    } else {
      swichPlayer();
    }
  }
});

// new dice
newDice.addEventListener('click', init);
