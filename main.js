import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid';

const startButton = document.querySelector('.start-game');
const ground = document.querySelector('.ground');
const img = document.querySelectorAll('img');
const body = document.querySelector('body');
const imgPoss = [];
const objectNumber = 10;

let maxX, maxY;

function onAdd() {
  const carrot = createItem("carrot");
  const bug = createItem("bug");
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
  item.setAttribute('id', `${input}`)
  imgPoss.push({ x, y });
  return item;
}



startButton.addEventListener('click', () => {
  for (var i = 0; i < objectNumber; i++) {
    onAdd();
  }
});

ground.addEventListener('click', (event) => {
  const uuid = event.target.dataset.uuid;
  if (uuid) {
    const toBeDeleted = document.querySelector(`.item[data-uuid="${uuid}"]`);
    toBeDeleted.remove();
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

// function isOverlap(x, y) { // return true if overlapping
//   const img = {x: 128, y:160};

//   for(const imgPos of imgPoss) {
//       if( x>imgPos.x-img.x && x<imgPos.x+img.x &&
//           y>imgPos.y-img.y && y<imgPos.y+img.y ) return true;
//   }
//   return false;
// }
