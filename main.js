
window.onload=function(){
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.imageSmoothingEnabled = false;
  let characterWidth = 32;
  let characterHeight = 32;
  let characterPosX = 430;
  let characterPosY = 300
  

  function drawBackground() {
    const img = new Image();
    img.src = "./Sprites/ground.png";
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }
  
  function drawCharacter(){
    const imgHero = new Image();
    imgHero.src = "./Sprites/hero-sheet.png";
    imgHero.onload = () => {
      ctx.drawImage(imgHero,0,0,characterWidth,characterHeight,characterPosX,characterPosY,128,128);
    }
  }
  
  // document.addEventListener('keydown', walk, false);
  
  
  // function walk(event) {
  //   if(event.key === "w"){
  //     console.log('w');
  //     characterPosY --;
  //   }
  //   if(event.key === "s"){
  //     console.log('s');
  //     characterPosY ++;
  //   }
  //   if(event.key === "a"){
  //     console.log('a');
  //     characterPosX --;
  //   }
  //   if(event.key === "d"){
  //     console.log('d');
  //     characterPosX ++;
  //   }
  // }
  
  function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw the background and character again
    drawBackground();
    drawCharacter();
    // Call the draw function again
    window.requestAnimationFrame(draw);
  }
  
  // draw()
  // Start the animation
  window.requestAnimationFrame(draw);
  
  //  Promise.all([img, imgHero].map(img => new Promise(resolve => img.onload = resolve))).then(() => requestAnimationFrame(draw));
}
