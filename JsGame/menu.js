var canvas = document.getElementById('can');
var ctx = canvas.getContext('2d');

var menu = true;
var gameStart = false;
var gameMenuFont = "40px sans serif";

/* function draw rectangle with x, y as center */
function fillRectCentered(context, x, y, width, height) {
  context.fillRect(x - width / 2, y - height / 2, width, height);
};

/* Load game if play button is clicked */
canvas.addEventListener('click', function(){
  if(menu == true && playButton.isMouseOnButton()){
    menu = false; 
    gameStart = true;    
    makeGame();    
    drawGame();     
    }
});

/********************* 
* Button Object Type * 
**********************/
function button(config){
     this.x = config.x || 0;
     this.y = config.y || 0;
     this.width = config.width || 20;
     this.height = config.height || 20;
     this.label = config.label || "button";
     this.color = config.color || "#0000FF";
};
/* Draw button */
button.prototype.draw = function(){

    ctx.fillStyle = this.color;  

    if(menu && this.isMouseOnButton()){
      ctx.fillStyle = "#0088FF";
    } 
    if(event && gameOverScreen == true && this.isMouseOnButton()){
      ctx.fillStyle = "red";
    }    
    if(event && winScreen == true && this.isMouseOnButton()){ 
      ctx.fillStyle = "green";
    } 

    fillRectCentered(ctx, this.x , this.y, this.width, this.height);

    var tOffset = 10;
    var tSize = this.height - tOffset;
    ctx.font = tSize + "px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle="cyan";      
    ctx.fillText(this.label, this.x, this.y + this.height/4);
     /* console.log(this.x, this.y, this.width, this.height); */
};

/* Check if mouse on button */
button.prototype.isMouseOnButton = function(){
    var mousePos = getMousePos();  
    return (mousePos.x > this.x - this.width/2
      && mousePos.x < this.x + this.width/2 
      && mousePos.y > this.y - this.height/2
      && mousePos.y < this.y + this.height/2);
};
/* Get mouse position */
function getMousePos(){
  return{
       x: event.clientX - ctx.canvas.offsetLeft + pageXOffset,
       y: event.clientY - ctx.canvas.offsetTop + pageYOffset
  };
};

/* Write mouse position */
canvas.addEventListener('mousemove', (e) => {
  var mousePos = getMousePos();   
  var mPos = document.getElementById("mouseCoord");
  mPos.innerHTML = "(" + mousePos.x +", "+ mousePos.y +")";
  if(menu == true){
    playButton.draw();
  }
}); 

/**************
* Menu screen *
***************/

/* Create play button */
var playButton = new button({
  x: canvas.width/2,
  y: canvas.height/2,
  width: 80,
  height: 40,
  label: "Play",
  color: "green"
});

/* Draw menu screen and play button */
function loadMenu(){
  ctx.fillStyle = '#CD853F';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle='#228B22'; 
  ctx.font = gameMenuFont;
  ctx.textAlign = "center";
  ctx.fillText("Game Menu ", canvas.width / 2, 50);
  playButton.draw();   
}


