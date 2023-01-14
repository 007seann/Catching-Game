'use strict';

///
import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid';

///
const ALLY_COUNT = 20;
const ALLY_SIZE = 80;
const ENEMY_COUNT = 20;
const GAME_DURATION_SEC = 10;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameScore = document.querySelector('.game__score');
const gameTimer = document.querySelector('.game__timer');
const gameExplanation = document.querySelector('.game__explanation');
const gameMessage = document.querySelector('.game__message');
const gameTitle = document.querySelector('.game__title');
const gameSubTitle = document.querySelector('.game__subtitle');

const popUp = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const allySound = new Audio('sound/ally_pull.mp3');
const explodSound = new Audio('sound/Explode_Sound.mp3')
const gunSound = new Audio('sound/Rifle_Firing_Sound.mp3');
const enemySound = new Audio('sound/Weew_Sound.mp3');
const winSound = new Audio('sound/game_win.mp3');
// const bgSound = new Audio('sound/bg.mp3');
const bgSound = new Audio('sound/Star_Wars_Main_Theme.mp3')
const alertSound = new Audio('sound/alert.wav');

let started = false;
let score = 0;
let timer = undefined;

gameTitle.setAttribute('src', 'img/Star-Wars_logo.png')
gameSubTitle.innerHTML = "How to Play ?"
gameMessage.innerHTML = " Destory All Aliens Within the Time Limit <br>    "

// playSound(bgSound);
gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

field.addEventListener('click', (event) => onFieldClick(event));

popUpRefresh.addEventListener('click', () => {
  startGame();
  hidePopUp();
})

function startGame() {
  started = true;
  initGame();
  hideGameExplanation();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUpWithText('Yo, Replay?');
  stopSound(bgSound);
  playSound(alertSound);
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if(win) {
    playSound(winSound);
  } else {
    playSound(explodSound);
  }
  stopGameTimer();
  stopSound(bgSound);
  showPopUpWithText(win? 'WON!' : 'LOST ;)');
}

function onFieldClick(event) {
  playSound(gunSound);
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches('.enemy')) {
    target.remove();
    score++;
    playSound(enemySound);
    updateScoreBoard();
    if (score === ENEMY_COUNT) {
      finishGame(true);
    }
  } else if (target.matches('.ally')) {
    finishGame(false);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.innerText = ALLY_COUNT - score;
}

function initGame() {
  score = 0;
  field.innerHTML = '';
  gameScore.innerText = ALLY_COUNT;
  addItem('ally', ALLY_COUNT, 'img/spaceship.png');
  addItem('enemy', ENEMY_COUNT, 'img/alien.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - ALLY_SIZE;
  const y2 = fieldRect.height - ALLY_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('.fa-play');
  gameBtn.style.visibility = 'visible';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval( () => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(ALLY_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerHTML = `${minutes}:${seconds}`
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}

function hideGameExplanation() {
  gameExplanation.classList.add('game__explanation--hide')
}

function showPopUpWithText(text) {
  popUpMessage.innerText = text;
  popUp.classList.remove('pop-up--hide');
}

function stopGameTimer() {
  clearInterval(timer);
}

function hidePopUp() {
  popUp.classList.add('pop-up--hide');
}


