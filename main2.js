
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.imageSmoothingEnabled = false;
let characterWidth = 32;
let characterHeight = 32;
let characterPosX = 430;
let characterPosY = 200
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
  rows: 7,
  tileSize: 64,
  tiles: [
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

//Hjälp av fader
function tilemap(){
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
    tilemap()
  }
}

function drawCharacter(){
if (imgHero.complete) {
  ctx.drawImage(imgHero,spriteX,spriteY,characterWidth,characterHeight,characterPosX,characterPosY,128,128);
}
}

document.addEventListener('keydown', walk, false);

// function spriteManager(){
//     listHeroSheet = {
//         up: [spriteX = 16;
//             spriteY = 64;],
//             [ spriteX = 32;
//             spriteY = 64;],
//                 [spriteX = 48;
//                     spriteY = 64;]
//     }
//     if(event.key === "w" || event.key === "ArrowUp" ){
        
       
        
//     }
//     if(event.key === "s" || event.key === "ArrowDown"){
//         spriteX = 0;
//         spriteY = 0;
//     }
//     if(event.key === "a" || event.key === "ArrowLeft"){
//         spriteX = 32;
//         spriteY = 96;
//     }
//     if(event.key === "d" || event.key === "ArrowRight"){
//         spriteX = 32;
//         spriteY = 32;
//     }
// }    

function walk(event) {
  const speed = 50;
  
  if(event.key === "w" || event.key === "ArrowUp" ){
    console.log('w');
    characterPosY -= speed;
    spriteX = 32;
    spriteY = 64;
    // spriteManager()
  }
  if(event.key === "s" || event.key === "ArrowDown"){
    console.log('s');
    characterPosY += speed;
    spriteX = 0;
    spriteY = 0;
    // spriteManager()

  }
  if(event.key === "a" || event.key === "ArrowLeft"){
    console.log('a');
    characterPosX -= speed;
    spriteX = 32;
    spriteY = 96;
    // spriteManager()

  }
  if(event.key === "d" || event.key === "ArrowRight"){
    console.log('d');
    characterPosX += speed;
    spriteX = 32;
    spriteY = 32;
    // spriteManager()

  }

  
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
Promise.all([tileSheet].map(img => new Promise(resolve => img.onload = resolve))).then(() =>requestAnimationFrame(draw));
