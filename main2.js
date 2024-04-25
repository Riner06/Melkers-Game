
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.imageSmoothingEnabled = false;
let characterWidth = 32;
let characterHeight = 32;
let characterRow = 2;
let characterColumn = 2;
let spriteX = 0;
let spriteY = 0;


const imgGround = new Image();
imgGround.src = "./Sprites/ground.png";

const imgSky = new Image();
imgSky.src = "./Sprites/sky.png";

const imgHero = new Image();
imgHero.src = "./Sprites/hero-sheet.png";

const tileSheet = new Image()
tileSheet.src = "./Sprites/tilesheet.png"


//GÖr om så att kolumnerna ej är nollbaserade
const map = {
  cols: 15,
  rows: 8,
  tileSize: 64,
  tiles: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 13, 6, 6],
    [0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 17, 6, 6],
    [0, 6, 13, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [0, 6, 17, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 20, 6, 6],
    [0, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11]  
  ],
  getTile(row, column) {
    return this.tiles[row][column];
  },
};

function getXAndYPosition(row, column){
  halfTileSize = map.tileSize / 2;
  const x = column * map.tileSize - halfTileSize;
  const y = row * map.tileSize - halfTileSize -26;
  return [x, y]
}
//
// function walkable(row,column){
//   return map.getTile(row, column) != 0;
  
// }

function walkable(row, column){
  let unwalkableTiles = [0,17,9,10,11,20]
  // Check if the tile is in the map
  if (row >= 0 && row < map.rows && column >= 0 && column < map.cols) {
    // Check if the tile is in the unwalkableTiles array
    return !unwalkableTiles.includes(map.getTile(row, column));
  }
  // If the tile is not in the map, it's not walkable
  return false;
}

function popUp(object){
  let text;
  let person = prompt("What's the name of a :", object);
  if(text == "Arból" | "Arbol" | "arbol"){
    prompt("Correct")
  }
  else{
    prompt("Try again")
  }
  // if (person == null || person == "") {
  //   popUp("User Cancelled")
  // } else {
  //   text = "Hello " + person + "! How are you today?";
  // }
  document.getElementById("demo").innerHTML = text;
}
function gameEvent(row,column){
  let eventTiles = [17,20]
  if (map.getTile(row,column) == 17) {
    console.log("TRÄD!")
    popUp("Träd")
  }
  else if(map.getTile(row,column) == 20) {
    console.log("HUS!")
    popUp("Hus")
  }
  if (row >= 0 && row < map.rows && column >= 0 && column < map.cols) {
    // Check if the tile is in the unwalkableTiles array
    return eventTiles.includes(map.getTile(row, column));
  }
}
//Hjälp av fader
function drawTileMap(){
  const tileSheetWidth = 64;
  const tileSheetHeight = 80;
  const numberOfColumns = 4; 
  const numberOfRows = 5; 
  const tileWidth = tileSheetWidth / numberOfColumns; 
  const tileHeight = tileSheetHeight / numberOfRows; 

  for(let rowIndex = 0; rowIndex < map.rows; rowIndex++) {
    for (let columnIndex = 0; columnIndex < map.cols; columnIndex++) { 
      const tile = map.getTile(rowIndex, columnIndex);
      if (tile !== 0) {
        //Replace tileIndex with row column acess of tileSheet
        const tileIndex = tile - 1; // assuming tiles are 1-indexed
        const tileX = (tileIndex % numberOfColumns) * tileWidth;
        const tileY = Math.floor(tileIndex / numberOfColumns) * tileHeight;
        const targetX = columnIndex * map.tileSize;
        const targetY = rowIndex * map.tileSize;
        // 0 => empty tile
        ctx.drawImage(
          tileSheet,
          tileX,
          tileY,
          tileWidth,
          tileHeight,
          targetX,
          targetY,
          map.tileSize, // target width
          map.tileSize, // target height
        );
      }
    }
  }
}
 

tileSheet.onload = drawBackground
function drawBackground() {
  if (tileSheet.complete) {
     ctx.drawImage(imgSky, 0, 0, canvas.width, canvas.height);
    // ctx.drawImage(imgGround, 0, 0, canvas.width, canvas.height);
    drawTileMap()
  }
}

function drawCharacter(){
if (imgHero.complete) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawBackground(); // Redraw the background
    drawTileMap(); // Redraw the tilemap
    const [x, y] = getXAndYPosition(characterRow, characterColumn)

  ctx.drawImage(imgHero, spriteX, spriteY, characterWidth, characterHeight, x, y, 128, 128);
}
}

document.addEventListener('keydown', walk, false);

let lastFrameTime = Date.now();
let currentFrameTime = Date.now();
let timeElapsed = 0;
const updateInterval = 900; // in ms


function walk(event) {
  // const speed = 5;
  currentFrameTime = Date.now();
  timeElapsed += currentFrameTime - lastFrameTime;
  lastFrameTime = currentFrameTime;
  firstTime = 300;
  secondTime = 600;
  thirdTime = 900;
  
  if (event.key === "w" || event.key === "ArrowUp") {
    console.log('w');
    // characterPosY -= speed;
    if(walkable( characterRow-1, characterColumn)){
      characterRow -= 1;
    }
    // if(gameEvent( characterRow-1, characterColumn)){
    //   console.log("träd")
    // }
    gameEvent(characterRow-1,characterColumn)

    if(timeElapsed === firstTime){
        spriteX = 32;
        spriteY = 64;
    }
    if(timeElapsed === secondTime){
        spriteX = 32;
        spriteY = 64;
    }
    if(timeElapsed ===thirdTime){
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
      timeElapsed = 0; // Reset the timer after the last sprite change
    }
  }
  if(event.key === "s" || event.key === "ArrowDown"){
    console.log('s');
    // characterPosY += speed;
    if(walkable(characterRow+1, characterColumn)){
      characterRow += 1;
    }
    // if(gameEvent( characterRow+1, characterColumn)){
    //   console.log("träd")
    // }
    gameEvent(characterRow+1,characterColumn)

    
    if (timeElapsed >= firstTime && timeElapsed < secondTime) {
        spriteX = 32;
        spriteY = 0;
    } else if (timeElapsed >= secondTime && timeElapsed < thirdTime) {
      
      spriteX = 0;
      spriteY = 0;
    } else if (timeElapsed >= thirdTime) {
      spriteX = 64;
      spriteY = 0;
      timeElapsed = 0; // Reset the timer after the last sprite change
    }
  }
  if(event.key === "a" || event.key === "ArrowLeft"){
    console.log('a');
    // characterPosX -= speed;
    if(walkable(characterRow, characterColumn-1)){
      characterColumn -= 1;
    }
    // if(gameEvent( characterRow, characterColumn-1)){
    //   console.log("träd")
    // }
    gameEvent(characterRow,characterColumn-1)

    if (timeElapsed >= firstTime && timeElapsed < secondTime) {
        spriteX = 32;
        spriteY = 96;
    } else if (timeElapsed >= secondTime && timeElapsed < thirdTime) {
      spriteX = 0;
      spriteY = 96;
    } else if (timeElapsed >= thirdTime) {
      spriteX = 64;
      spriteY = 96;
      timeElapsed = 0; // Reset the timer after the last sprite change
    }
  }
  if(event.key === "d" || event.key === "ArrowRight"){
    console.log('d');
    // characterPosX += speed;
    if(walkable(characterRow, characterColumn+1)){
      characterColumn += 1;
    }
    // if(gameEvent( characterRow, characterColumn+1)){
    //   console.log("träd")
    // }

    gameEvent(characterRow,characterColumn+1)

    if (timeElapsed >= firstTime && timeElapsed < secondTime) {
        spriteX = 32;
      spriteY = 32;
    } else if (timeElapsed >= secondTime && timeElapsed < thirdTime) {
      spriteX = 0;
      spriteY = 32;
    } else if (timeElapsed >= thirdTime) {
      spriteX = 64;
      spriteY = 32;
      timeElapsed = 0; // Reset the timer after the last sprite change
    }
  }
  // ... rest of your code for other keys
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
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the background and character again
  drawBackground();
  drawCharacter();
  // Call the draw function again
  window.requestAnimationFrame(draw);
} 

//Hjälp av fader med förklaring 
Promise.all([tileSheet,imgHero,imgSky].map(img => new Promise(resolve => img.onload = resolve))).then(() =>requestAnimationFrame(draw));
