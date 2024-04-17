
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

function drawBackground() {
  if (imgGround.complete) {
    ctx.drawImage(imgSky, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgGround, 0, 0, canvas.width, canvas.height);
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
  window.requestAnimationFrame(draw);

  // draw()

  
  //  Promise.all([img, imgHero].map(img => new Promise(resolve => img.onload = resolve))).then(() => requestAnimationFrame(draw));
