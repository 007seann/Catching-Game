'use strict'

///
import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid';


const header = document.querySelector('.game__header');

const imgPoss = [];
const objectNumber = 10;
let maxX, maxY;

var allyCount;
const popUp = document.querySelector('.pop-up');
const message = document.querySelector('.pop-up__message');
// Timer
const gameTimer = document.querySelector('.game__timer');
let seconds = 10;
let timerId;

// Sound Effect
const allySound = document.querySelector('.game__ally_pull');
const enemySound = document.querySelector('.game__enemy_pull');
const bgSonud = document.querySelector('.game__bg');
const winSound = document.querySelector('.game__game_win')
const alertSound = document.querySelector('.game__alert');
///

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameScore = document.querySelector('.game__score');


const SPACESHIP_COUNT = 5;
const SPACESHIP_SIZE = 80;
const ALIEN_COUNT = 5;
const GAME_DURATION_SEC = 5;

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', (event) => onFieldClick(event));
gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
})

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound();
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUpWithText('Yo, Replay?');
  stopSound();
  playSound();
}

function initGame() {
  score = 0;
  field.innerHTML = '';
  gameScore.innerText = SPACESHIP_COUNT;
  addItem('spaceship', SPACESHIP_COUNT, 'img/spaceship.png');
  addItem('alien', ALIEN_COUNT, 'img/alien.png');
}

function onFieldClick(event) {

}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - SPACESHIP_SIZE;
  const y2 = fieldRect.height - SPACESHIP_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath)
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

gameBtn.addEventListener('click', () => {
  for (var i = 0; i < objectNumber; i++) {
    onAdd();
  }
  const count = field.querySelectorAll('#spaceship').length;
  allyCount = count;
  gameScore.innerHTML = allyCount;
  gameBtn.disabled = true;
  startTimer();
  showTime();
  gamTtimer.style.display = 'block';
});

window.onload = () => {
  gameBtn.disabled = false;
};

function onAdd() {
  const ally = createItem('spaceship');
  const enemy = createItem('alien');
  field.appendChild(ally);
  field.appendChild(enemy);
}

function createItem(input) {
  const { random: r } = Math;
  const x = r() * maxX;
  const y = r() * maxY;
  let uuid = uuidv4();

  console.log(y);

  const item = document.createElement('img');
  item.setAttribute('src', `img/${input}.png`);
  item.setAttribute('class', 'item');
  item.setAttribute('style', `position: absolute; left: ${x}px; top: ${y}px;`);
  item.setAttribute('data-uuid', uuid);
  item.setAttribute('id', `${input}`);
  imgPoss.push({ x, y });
  return item;
}

field.addEventListener('click', (event) => {
  const uuid = event.target.dataset.uuid;
  const value = event.target.attributes.id.value;

  if (uuid) {
    if (value === 'spaceship') {
      allySound.play();
      const toBeDeleted = document.querySelector(`.item[data-uuid="${uuid}"]`);
      toBeDeleted.remove();
      const count = field.querySelectorAll('#spaceship').length;
      allyCount = count;
      gameScore.innerHTML = allyCount;
      if (allyCount == 0) {
        winSound.play();
        bgSonud.pause();
        clearTimeout(timerId);
        popUp.style.display = 'block';
        message.innerHTML = 'WIN!';
        header.style.display = 'none';
      }
    }
    if (value === 'alien') {
      enemySound.play();
      bgSonud.pause();
      header.style.display = 'none';
      popUp.style.display = 'block';
      message.innerHTML = 'LOST!';
    }
  }
});

onload = function () {
  maxX = innerWidth - 128;
  maxY = innerHeight - 280;
  console.log(this.innerHeight);
  console.log(this.innerWidth);
};

onresize = function () {
  maxX = innerWidth - 128;
  maxY = innerHeight - 280;
};

function showTime() {
  timerId = setInterval(() => {
    seconds--;
    gamTtimer.innerHTML = seconds;
    if (seconds == 0) {
      clearInterval(timerId);
    }
  }, 1000);
}

function startTimer() {
  timerId = setTimeout(() => {
    console.log('COMplete');
    header.style.display = 'none';
    popUp.style.display = 'block';
    alertSound.play();
    if(message.innerHTML !== 'WIN!') {
      message.innerHTML = 'LOST!';
    }
  }, 10000);
}

