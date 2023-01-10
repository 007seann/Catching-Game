import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid';

const startButton = document.querySelector('.start-game');
const ground = document.querySelector('.ground');
const img = document.querySelectorAll('img');
const body = document.querySelector('body');
const imgPoss = [];
const objectNumber = 10;
let maxX, maxY;
const counting = document.querySelector('.counting');
var carrotCount;
const footer = document.querySelector('.footer');
const message = document.querySelector('.message');
// Timer
const timer = document.querySelector('.timer');
let seconds = 10; // miliseconds
let timerId;
var time;

startButton.addEventListener('click', () => {
  for (var i = 0; i < objectNumber; i++) {
    onAdd();
  }
  const count = ground.querySelectorAll('#carrot').length;
  carrotCount = count;
  counting.innerHTML = carrotCount;
  startButton.disabled = true;
  startTimer();
  showTime();
  timer.style.display = 'block';
});

window.onload = () => {
  startButton.disabled = false;
};

function onAdd() {
  const carrot = createItem('carrot');
  const bug = createItem('bug');
  ground.appendChild(carrot);
  ground.appendChild(bug);
}

function createItem(input) {
  const { random: r } = Math;
  const x = r() * maxX;
  const y = r() * maxY;
  let uuid = uuidv4();

  const item = document.createElement('img');
  item.setAttribute('src', `img/${input}.png`);
  item.setAttribute('class', 'item');
  item.setAttribute('style', `left: ${x}px; top: ${y}px;`);
  item.setAttribute('data-uuid', uuid);
  item.setAttribute('id', `${input}`);
  imgPoss.push({ x, y });
  return item;
}

ground.addEventListener('click', (event) => {
  const uuid = event.target.dataset.uuid;
  const value = event.target.attributes.id.value;

  if (uuid) {
    if (value === 'carrot') {
      const toBeDeleted = document.querySelector(`.item[data-uuid="${uuid}"]`);
      toBeDeleted.remove();
      const count = ground.querySelectorAll('#carrot').length;
      carrotCount = count;
      counting.innerHTML = carrotCount;
      if (carrotCount == 0) {
        startButton.style.display = 'none';
        counting.style.display = 'none';
        footer.style.display = 'block';
        message.innerHTML = 'Win!';
      }
    }
    if (value === 'bug') {
      startButton.style.display = 'none';
      counting.style.display = 'none';
      footer.style.display = 'block';
      message.innerHTML = 'lose!';
    }
  }
});

onload = function () {
  maxX = innerWidth - 128;
  maxY = innerHeight - 160;
};

onresize = function () {
  maxX = innerWidth - 128;
  maxY = innerHeight - 160;
};

function showTime() {
  timerId = setInterval(() => {
    seconds--;
    timer.innerHTML = seconds;
    if (seconds == 0) {
      clearInterval(timerId);
    }
  }, 1000);
}

function startTimer() {
  timerId = setTimeout((event) => {
    console.log('COMplete');
    startButton.style.display = 'none';
    counting.style.display = 'none';
    footer.style.display = 'block';
    message.innerHTML = 'lose!';
  }, 10000);
}

function isTimeout() {
  if (timerId != null) {
    return true;
  }
  return false;
}

// function startTimer() {
//   timerId = setTimeout(() => {
//     console.log('timer')

//     // seconds--;
//     // timer.innerHTML = seconds;
//   }, seconds);
//   return seconds;
// }

// function isTimeout() {
//   if(timerId != null) {
//     return true;
//   }
//   return false;
// }
// function isTimeout2() {
//   return clearTimeout(timerId);
// }
// }

// function stopTimer() {
//   clearInterval(timerId);
// }
