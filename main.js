import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid';

const startButton = document.querySelector('.game__button');
const header = document.querySelector('.game__header');
const ground = document.querySelector('.game__field');
const imgPoss = [];
const objectNumber = 10;
let maxX, maxY;
const counting = document.querySelector('.game__score');
var allyCount;
const footer = document.querySelector('.pop-up');
const message = document.querySelector('.pop-up__message');
// Timer
const timer = document.querySelector('.game__timer');
let seconds = 10;
let timerId;

startButton.addEventListener('click', () => {
  for (var i = 0; i < objectNumber; i++) {
    onAdd();
  }
  const count = ground.querySelectorAll('#spaceship').length;
  allyCount = count;
  counting.innerHTML = allyCount;
  startButton.disabled = true;
  startTimer();
  showTime();
  timer.style.display = 'block';
});

window.onload = () => {
  startButton.disabled = false;
};

function onAdd() {
  const ally = createItem('spaceship');
  const enemy = createItem('alien');
  ground.appendChild(ally);
  ground.appendChild(enemy);
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

ground.addEventListener('click', (event) => {
  const uuid = event.target.dataset.uuid;
  const value = event.target.attributes.id.value;

  if (uuid) {
    if (value === 'spaceship') {
      const toBeDeleted = document.querySelector(`.item[data-uuid="${uuid}"]`);
      toBeDeleted.remove();
      const count = ground.querySelectorAll('#spaceship').length;
      allyCount = count;
      counting.innerHTML = allyCount;
      if (allyCount == 0) {
        footer.style.display = 'block';
        message.innerHTML = 'WIN!';
        header.style.display = 'none';
      }
    }
    if (value === 'alien') {
      header.style.display = 'none';
      footer.style.display = 'block';
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
    timer.innerHTML = seconds;
    if (seconds == 0) {
      clearInterval(timerId);
    }
  }, 1000);
}

function startTimer() {
  timerId = setTimeout(() => {
    console.log('COMplete');
    header.style.display = 'none';
    footer.style.display = 'block';
    message.innerHTML = 'LOST!';
  }, 10000);
}

