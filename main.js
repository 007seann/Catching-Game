import {v4 as uuidv4} from 'uuid';

const startButton = document.querySelector('.start-game');
const ground = document.querySelector('.ground');
const img = document.querySelectorAll('img');
const body = document.querySelector('body');
const imgPoss = [];
const objectNumber = 10;
let maxX, maxY;
let myuuid = uuidv4();
console.log(myuuid);



function createCarrot(id) {
    const carrot = document.createElement('img');
    carrot.setAttribute('src', "img/carrot.png");
    carrot.setAttribute('class', "carrot-box")
    carrot.setAttribute('id', id);
    return carrot;
}


startButton.addEventListener('click', () => {
  for(var i = 0; i < objectNumber; i++) {  
    const carrot = placeCarrot()
    const bug = placeBug()
    ground.appendChild(carrot);
    ground.appendChild(bug);
}});

let id = 0;
function createItem() {
  const carrotItem = document.createElement('img');
  const bugItem = document.createElement('img');
  carrotItem.setAttribute('class', 'carrotItem');
  carrotItem.setAttribute('data-id', id);
  id++;
  bugItem.setAttribute('class', 'bugItem');
  bugItem.setAttribute('data-id', id);
  carrotItem

}

function placeCarrot() {
  const imgSrc = 'img/carrot.png';
  const {random: r} = Math;
  
  const x = r() * maxX;
  const y = r() * maxY;
  
  if(!isOverlap(x,y)) {
      var link = `<img class="carrot" style="left: ${x}px; top: ${y}px;" src="${imgSrc}" />`;  
      var bodyHtml = document.body.innerHTML;
      document.body.innerHTML = bodyHtml + link;

      imgPoss.push({x, y}); // record all img positions
  }
}

function placeBug() {
  const imgSrc2 = 'img/bug.png';
  const {random: r} = Math;

  const x = r() * maxX;
  const y = r() * maxY;
  
  if(!isOverlap(x,y)) {
      var link2 = `<img class="bug" style="left: ${x}px; top: ${y}px;" src="${imgSrc2}" />`;
      var bodyHtml = document.body.innerHTML;
      document.body.innerHTML = bodyHtml + link2;


      imgPoss.push({x, y}); // record all img positions
  }
}

function isOverlap(x, y) { // return true if overlapping
  const img = {x: 128, y:160};
  
  for(const imgPos of imgPoss) {
      if( x>imgPos.x-img.x && x<imgPos.x+img.x &&
          y>imgPos.y-img.y && y<imgPos.y+img.y ) return true;
  }
  return false;
}

onload = function() {
  maxX = innerWidth - 128;
  maxY = innerHeight - 160;
}

onresize = function() {
  maxX = innerWidth - 128;
  maxY = innerHeight - 160;
}
