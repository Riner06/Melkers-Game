
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.imageSmoothingEnabled = false;
const characterWidth = 32;
const characterHeight = 32;
let characterRow = 2;
let characterColumn = 2;
let spriteX = 0;
let spriteY = 0;

const tileSheetWidth = 64;
const tileSheetHeight = 80;
const numberOfColumns = 4; 
const numberOfRows = 5; 
const tileWidth = tileSheetWidth / numberOfColumns; 
const tileHeight = tileSheetHeight / numberOfRows; 

let points = 1;
const moneyBag = "💰";
const death = "You died! 💣💀";

const question = "What is the Spanish word for ";

const interactableObjects = [
  {
    "tileSheetIndex": 19,
    "englishWord": "stone",
    "spanishWord": "piedra",
    "emojii": "🪨"
  },
  {
    "tileSheetIndex": 17,
    "englishWord": "tree",
    "spanishWord": "arbol",
    "emojii": "🌲"
  },
  {
    "tileSheetIndex": 18,
    "englishWord": "bush",
    "spanishWord": "arbusto",
    "emojii": "🌳"
  },
  {
    "tileSheetIndex": 20,
    "englishWord": "house",
    "spanishWord": "casa",
    "emojii": "🏡"
  }
]

const imgGround = new Image();
imgGround.src = "../images/ground.png";

const imgSky = new Image();
imgSky.src = "../images/sky.png";

const imgHero = new Image();
imgHero.src = "../images/hero-sheet.png";

const imgShadow = new Image();
imgShadow.src = "../images/shadow.png";

const tilesheet = new Image()
tilesheet.src = "../images/tilesheet.png"

const shadowBehindStuff = new Image()
shadowBehindStuff.src = "../images/shadowBehindStuff.png"
//GÖr om så att kolumnerna ej är nollbaserade
// if(tileSheetIndex == "sky"){

// }
const map = {
  numberOfColumns: 15,
  numberOfRows: 8,
  tileSize: 64,
  tiles: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 13, 6, 6],
    [0, 6, 6, 18, 6, 6, 6, 6, 6, 6, 6, 6, 17, 6, 6],
    [0, 6, 13, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [0, 6, 17, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [0, 6, 6, 6, 6, 6, 6, 19 , 6, 6, 6, 6, 20, 6, 6],
    [0, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11]  
    
  ],
  getTile(row, column) {
    return this.tiles[row][column];
  },
};

function getXAndYPosition(row, column){
  const tileOffset = 26;
  halfTileSize = map.tileSize / 2;
  const x = column * map.tileSize - halfTileSize;
  const y = row * map.tileSize - halfTileSize - tileOffset;
  return [x, y]
}

function walkable(row, column){
  const unwalkableTiles = [0,17,9,10,11,20,18,19]
  if (!tileInMap(row, column)) {
    return false;
  }

  return !unwalkableTiles.includes(map.getTile(row, column));
}

function tileInMap(row, column) {
  return row >= 0 && row < map.numberOfRows && column >= 0 && column < map.numberOfColumns;
}

function popUp(object){

  let answer = prompt(question+object["englishWord"] + "?" + object["emojii"]).toLowerCase( )
  if(answer == object.spanishWord){
    alert("Correct")
    document.getElementById("points").innerHTML = points++ + moneyBag;
  }
  else{
    // Reseting points
    points=1;
    alert("Try again")
    document.getElementById("points").innerHTML = death;
  }
}


function quizUserEvent(row,column){
  let tileSheetIndex = map.getTile(row,column);
  let foundObjects = interactableObjects.filter(interactableObject => {
    return interactableObject.tileSheetIndex === tileSheetIndex
  })
  if (foundObjects.length !== 0){
    popUp(foundObjects[0])
  }
}

function drawTileMap(){
  for(let row = 0; row < map.numberOfRows; row++) {
    for (let column = 0; column < map.numberOfColumns; column++) { 
      const tile = map.getTile(row, column);
      if (tile !== 0) {
        //Replace tilegame with row column acess of tileSheet
        drawTile(row, column, tile);
      }
    }
  }
}


function drawTilesOverCharacter(){
  for(let row = 0; row < map.numberOfRows; row++) {
    for (let column = 0; column < map.numberOfColumns; column++) { 
      const tile = map.getTile(row, column);
      if (tile == 13) {
        drawTile(row, column, 14);
      }
    }
  }
}

function drawTile(row, column, tile) {
  const tilegame = tile - 1; // assuming tiles are 1-gameed
  const tileX = (tilegame % numberOfColumns) * tileWidth;
  const tileY = Math.floor(tilegame / numberOfColumns) * tileHeight;
  const targetX = column * map.tileSize;
  const targetY = row * map.tileSize;
  // 0 => empty tile
  ctx.drawImage(
    tilesheet,
    tileX,
    tileY,
    tileWidth,
    tileHeight,
    targetX,
    targetY,
    map.tileSize, // target width
    map.tileSize
  );
}

tilesheet.onload = drawBackground
function drawBackground() {
  if (tilesheet.complete) {
     ctx.drawImage(imgSky, 0, 0, canvas.width, canvas.height);
    drawTileMap()
  }
}

function drawCharacter(){
if (imgHero.complete) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawBackground(); // Redraw the background

    drawTileMap(); // Redraw the tilemap
    const [x, y] = getXAndYPosition(characterRow, characterColumn)
    ctx.drawImage(imgShadow,0,0,characterWidth,characterHeight,x,y,128,128)

  ctx.drawImage(imgHero, spriteX, spriteY, characterWidth, characterHeight, x, y, 128, 128);
  drawTilesOverCharacter()

}
}

document.addEventListener('keydown', walk, false);

let lastFrameTime = Date.now();
let currentFrameTime = Date.now();
let timeElapsed = 0;
const updateInterval = 900; // in ms

// function characterAnimation(){
//   currentFrameTime = Date.now();
//   timeElapsed += currentFrameTime - lastFrameTime;
//   lastFrameTime = currentFrameTime;
//   const timeFrames = [
//     "firstTime" = 300,
//     "secondTime" = 600,
//     "thirdTime" = 900
//   ]
//   timeFrames.forEach(element => {
//     spriteX
//   });
// }


function walk(event) {
  currentFrameTime = Date.now();
  timeElapsed += currentFrameTime - lastFrameTime;
  lastFrameTime = currentFrameTime;
  firstTime = 300;
  secondTime = 600;
  thirdTime = 900;
  
  if (event.key === "w" || event.key === "ArrowUp") {
    quizUserEvent(characterRow-1, characterColumn)
    if(walkable( characterRow-1, characterColumn)){
      characterRow -= 1;
    }
    animateWalkingUp();
  }

  if(event.key === "s" || event.key === "ArrowDown"){
    quizUserEvent(characterRow+1, characterColumn)
    if(walkable(characterRow+1, characterColumn)){
      characterRow += 1;
    }
    animateWalkingDown();
  }

  if(event.key === "a" || event.key === "ArrowLeft"){
    quizUserEvent(characterRow, characterColumn-1)
    if(walkable(characterRow, characterColumn-1)){
      characterColumn -= 1;
    }
    animateWalkingLeft();
  }

  if(event.key === "d" || event.key === "ArrowRight"){
    quizUserEvent(characterRow, characterColumn+1)
    if(walkable(characterRow, characterColumn+1)){
      characterColumn += 1;
    }
    animateWalkingRight();
  }
}
 
GameBox = function()
{
    this.lastFrameTime = Date.now();
    this.currentFrameTime = Date.now();
    this.timeElapsed = 0;
    this.updateInterval = 900;       //in ms
}

GameBox.prototype.gameLoop = function()
{
   window.requestAnimationFrame(this.gameLoop.bind(this));
   this.lastFrameTime = this.currentFrameTime;
   this.currentFrameTime = Date.now();
   this.timeElapsed +=  this.currentFrameTime - this.lastFrameTime ;
   if(this.timeElapsed >= this.updateInterval)
   {
      this.timeElapsed = 0;
      this.draw(); //modify data which is used to render
   }
   this.draw();
   this.lastFrameTime = this.currentFrameTime;
}

function animateWalkingUp() {
  if (timeElapsed === firstTime) {
    spriteX = 32;
    spriteY = 64;
  }
  if (timeElapsed === secondTime) {
    spriteX = 32;
    spriteY = 64;
  }
  if (timeElapsed === thirdTime) {
    spriteX = 32;
    spriteY = 64;
  }
  if (timeElapsed >= firstTime && timeElapsed < secondTime) {
    spriteX = 32;
    spriteY = 64;

  } else if (timeElapsed >= secondTime && timeElapsed < thirdTime) {
    spriteX = 0;
    spriteY = 64;
  } else if (timeElapsed >= thirdTime) {
    spriteX = 64;
    spriteY = 64;
    timeElapsed = 0;
  }
}

function animateWalkingDown() {
  if (timeElapsed >= firstTime && timeElapsed < secondTime) {
    spriteX = 32;
    spriteY = 0;
  } else if (timeElapsed >= secondTime && timeElapsed < thirdTime) {

    spriteX = 0;
    spriteY = 0;
  } else if (timeElapsed >= thirdTime) {
    spriteX = 64;
    spriteY = 0;
    timeElapsed = 0;
  }
}

function animateWalkingLeft() {
  if (timeElapsed >= firstTime && timeElapsed < secondTime) {
    spriteX = 32;
    spriteY = 96;
  } else if (timeElapsed >= secondTime && timeElapsed < thirdTime) {
    spriteX = 0;
    spriteY = 96;
  } else if (timeElapsed >= thirdTime) {
    spriteX = 64;
    spriteY = 96;
    timeElapsed = 0;
  }
}

function animateWalkingRight() {
  if (timeElapsed >= firstTime && timeElapsed < secondTime) {
    spriteX = 32;
    spriteY = 32;
  } else if (timeElapsed >= secondTime && timeElapsed < thirdTime) {
    spriteX = 0;
    spriteY = 32;
  } else if (timeElapsed >= thirdTime) {
    spriteX = 64;
    spriteY = 32;
    timeElapsed = 0;
  }
}






function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBackground();
  drawCharacter();
  // Call the draw function again
  window.requestAnimationFrame(draw);
} 

//Hjälp av fader med förklaring 
Promise.all([tilesheet,imgHero,imgSky].map(img => new Promise(resolve => img.onload = resolve))).then(() =>requestAnimationFrame(draw));
