'use strict';

///
import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid';

const header = document.querySelector('.game__header');

const imgPoss = [];
const objectNumber = 10;
let maxX, maxY;

var allyCount;

// Timer

let seconds = 10;
let timerId;


///
const SPACESHIP_COUNT = 5;
const SPACESHIP_SIZE = 80;
const ALIEN_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameScore = document.querySelector('.game__score');
const gameTimer = document.querySelector('.game__timer');

const popUp = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const allySound = new Audio('sound/ally_pull.mp3');
const enemySound = new Audio('sound/enemy_pull.mp3');
const winSound = new Audio('sound/game_win.mp3');
const bgSound = new Audio('sound/bg.mp3');
const alertSound = new Audio('sound/alert.wav');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

field.addEventListener('click', (event) => onFieldClick(event));

popUpRefresh.addEventListener('click', ()=> {
  startGame();
  hidePopUp();
})

function startGame() {
  started = true;
  initGame();
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
    playSound(enemySound);
  }
  stopGameTimer();
  stopSound(bgSound);
  showPopUpWithText(win? 'WON!' : 'LOST ;)');
}

function onFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches('.spaceship')) {
    target.remove();
    score++;
    playSound(allySound);
    updateScoreBoard();
    if (score === SPACESHIP_COUNT) {
      finishGame(true);
    }
  } else if (target.matches('.alien')) {
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
  gameScore.innerText = SPACESHIP_COUNT - score;
}

function initGame() {
  score = 0;
  field.innerHTML = '';
  gameScore.innerText = SPACESHIP_COUNT;
  addItem('spaceship', SPACESHIP_COUNT, 'img/spaceship.png');
  addItem('alien', ALIEN_COUNT, 'img/alien.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - SPACESHIP_SIZE;
  const y2 = fieldRect.height - SPACESHIP_SIZE;
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
  const icon = gameBtn.querySelector('fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
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
      finishGame(SPACESHIP_COUNT === score);
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

function showPopUpWithText() {
  popUpMessage.innerText = text;
  popUp.classList.remove('pop-up--hide');
}

function stopGameTimer() {
  clearInterval(timer);
}


