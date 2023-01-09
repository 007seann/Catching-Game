import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid';

const startButton = document.querySelector('.start-game');
const ground = document.querySelector('.ground');
const img = document.querySelectorAll('img')
const body = document.querySelector('body');
const imgPoss = [];
const objectNumber = 10;
let maxX, maxY;
const counting = document.querySelector('.counting');
var carrotCount;







startButton.addEventListener('click', () => {
  for (var i = 0; i < objectNumber; i++) {
    onAdd();
  }
  const count = ground.querySelectorAll('#carrot').length;
  carrotCount = count;
  counting.innerHTML = carrotCount;
  console.log(carrotCount)

});

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
    if (value === "carrot") {
      const toBeDeleted = document.querySelector(`.item[data-uuid="${uuid}"]`);
      toBeDeleted.remove();
      const count = ground.querySelectorAll('#carrot').length;
      carrotCount = count;
      counting.innerHTML = carrotCount;
      if(carrotCount == 0) {
        console.log("win!")
      }
    }
    if (value === "bug") {
      console.log("lose:(")
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

// function isOverlap(x, y) { // return true if overlapping
//   const img = {x: 128, y:160};

//   for(const imgPos of imgPoss) {
//       if( x>imgPos.x-img.x && x<imgPos.x+img.x &&
//           y>imgPos.y-img.y && y<imgPos.y+img.y ) return true;
//   }
//   return false;
// }
