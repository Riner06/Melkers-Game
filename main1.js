
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.imageSmoothingEnabled = false;
let characterWidth = 32;
let characterHeight = 32;
let characterPosX = 430;
let characterPosY = 300
let spriteX = 0;
let spriteY = 0;


const imgGround = new Image();
imgGround.src = "./Sprites/ground.png";

const imgSky = new Image();
imgSky.src = "./Sprites/sky.png";

const imgHero = new Image();
imgHero.src = "./Sprites/hero-sheet.png";

const tileSheet = new Image()
tileSheet.src = "./Sprites/spritesheet.png"
//GÖr om så att kolumnerna ej är nollbaserade
const map = {
  cols: 15,
  rows: 7,
  tileSize: 64,
  tiles: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 13, 6, 6,
    0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 17, 6, 6,
    0, 6, 13, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    0, 6, 17, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 20, 6, 6,
    0, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11,
   
    
    
  ],
  getTile(col, row) {
    const index = row * map.cols + col;
    return this.tiles[index];
  },
};

//Hjälp av fader
function tilemap(){
  const tileAtlasWidth = 64;
  const tileAtlasHeight = 80;
  const numCols = 4; // The number of columns in your sprite sheet
  const numRows = 5; // The number of rows in your sprite sheet
  const tileWidth = tileAtlasWidth / numCols; // The actual width of a tile in the sprite sheet
  const tileHeight = tileAtlasHeight / numRows; // The actual height of a tile in the sprite sheet

  for (let c = 0; c < map.cols; c++) {
    for (let r = 0; r < map.rows; r++) {
      const tile = map.getTile(c, r);
      if (tile !== 0) {
        
        const tileIndex = tile - 1; // assuming tiles are 1-indexed
        const sourceX = (tileIndex % numCols) * tileWidth;
        const sourceY = Math.floor(tileIndex / numCols) * tileHeight;
        // 0 => empty tile
        ctx.drawImage(
          
          tileSheet, // image
          sourceX,
          sourceY,// (tile - 1) * map.tsize, // source x
          // 0, // source y
          tileWidth, // source width
          tileHeight, // source height
          c * map.tileSize, // target x
          r * map.tileSize, // target y
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


function walk(event) {
  const speed = 50; // Change this to change the speed of the character
  
  if(event.key === "w"){
    console.log('w');
    characterPosY -= speed;
    spriteX = 32;
    spriteY = 64;
  }
  if(event.key === "s"){
    console.log('s');
    characterPosY += speed;
    spriteX = 0;
    spriteY = 0;
  }
  if(event.key === "a"){
    console.log('a');
    characterPosX -= speed;
    spriteX = 32;
    spriteY = 96;
  }
  if(event.key === "d"){
    console.log('d');
    characterPosX += speed;
    spriteX = 32;
    spriteY = 32;
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

//Hjälp av fader
Promise.all([tileSheet].map(img => new Promise(resolve => img.onload = resolve))).then(() =>requestAnimationFrame(draw));
