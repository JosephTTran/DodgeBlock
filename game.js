
var gameFont = "20px arial";
var gameOverFont = "40px arial";
var gameOverScreen = false;
var winScreen = false;

/* background image */
var imgB = new Image();
imgB.src = "images/back.jpg";

/*player variables */
var p1;
var pHeight = 50;
var pWidth = 50;
var playerHealth = 100;
var imgPlayer = new Image();
imgPlayer.src = "images/player.png";

/* stick variables */
var sticks = [];
var numStick = 100;
var stickSpeed = 2;
var sHeight = 50; /*sHeight is height of stick */ 

/* function return random number */
function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/* game over screen */
function gameOver(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = gameOverFont;
    ctx.fillStyle='#ffffff';    
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
    restartButton.draw();
};

/* win screen */
function win(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#8B008B';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = gameOverFont;
    ctx.fillStyle='#00BFFF';    
    ctx.textAlign = "center";
    ctx.fillText("You Win", canvas.width/2, canvas.height/2);
    restartButton.draw();
};

/*******************
 *  Event listener *
 *******************/

/* left arrow key move player left */
window.addEventListener('keydown', function(event) {
    if(gameStart && event.keyCode == 65){
       if((p1.x - 5) > 0) {
            p1.x -= 5;  
       }
        p1.sprite.src = "images/player1.png";   
    }
});
/* right arrow key move player right */
window.addEventListener('keydown', function(event) {
    if(gameStart && event.keyCode == 68){
        if((p1.x + pWidth + 5) < canvas.width) {
            p1.x += 5;  
        }
        p1.sprite.src = "images/player1.png";   
    }
});
/* up arrow key move player up */
window.addEventListener('keydown', function(event) {
    if(gameStart && event.keyCode == 87){
        if((p1.y - 5) > 0) {
            p1.y -= 5;  
        }
        p1.sprite.src = "images/player1.png";   
    }
});
/* down arrow key move player down */
window.addEventListener('keydown', function(event) {

    if(gameStart && event.keyCode == 83){
        if((p1.y + pHeight + 5) < canvas.height) {
            p1.y += 5;  
        }
        p1.sprite.src = "images/player1.png";
    } 
});
/* original player image on key up */
window.addEventListener('keyup', function(event) {
    p1.sprite.src = "images/player.png";
});

/* on click event for restart button, restart game */
canvas.addEventListener('click', function() {
    if(gameOverScreen == true && restartButton.isMouseOnButton()){
        gameStart = true; 
        gameOverScreen = false;      
        makeGame();     
        drawGame(); 
        gameOverScreen = false;               
    }
    if(winScreen == true && restartButton.isMouseOnButton()){
        gameStart = true;
        winScreen = false;       
        makeGame();     
        drawGame(); 
        gameOverScreen = false;               
    } 
});
canvas.addEventListener('mousemove', (e) => {
    if(winScreen == true || gameOverScreen == true){
      restartButton.draw();
    }
  }); 

/********************* 
* Player Object Type *
**********************/
var player = function(x, y, img){
    this.x = x;
    this.y = canvas.width/2;
    this.w = 50;
    this.h = 80;
    this.health = playerHealth;
    this.sprite = img;
};
/* Draw the player */
player.prototype.draw = function(){
    ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
};
/* Update player health */
player.prototype.loseHealth = function(stick){
    if ((stick.x >= this.x &&  stick.x <= (this.x + pWidth)) &&
        ((stick.y + sHeight/2) >= this.y && 
        (stick.y - sHeight/2) <= (this.y + pHeight))) {
            stick.y = -400;
            if(this.health != 0){
                this.health -= 10;
            } 
    }
};

/********************
* Stick Object Type *
*********************/
var stick = function(x, y){
    this.x = x;
    this.y = y;
};
/* draw the stick */
stick.prototype.draw = function(){
    ctx.fillStyle = '#9856ff';
    fillRectCentered(ctx, this.x, this.y, 8, sHeight);
};

/* Create restart button */
var restartButton = new button({
    x: canvas.width/2,
    y: canvas.width/2,
    width: 100,
    height: 40,
    label: "Restart"
});

/************ 
* Game Main *
*************/

/* Create player p1, Create array of sticks*/
function makeGame(){    
    p1 = new player(pWidth, pHeight, imgPlayer);
     
    sticks = [];
    numOfStick = numStick;
    for (var i = 0; i < numOfStick; i++) {  
        sticks[i] = new stick(i * 40 + 300, random(20, canvas.height));
    }
}

function drawGame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle='#77effc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(imgB, 0, 0, canvas.width, canvas.height);
    ctx.font = gameFont;
    ctx.fillStyle='#996699';   
    ctx.fillText("Health: " + p1.health, canvas.width / 2, 20);
    
    p1.draw();

    for(var i=0; i < sticks.length; i++){
        sticks[i].draw();
        p1.loseHealth(sticks[i]);        
        sticks[i].x -= stickSpeed;
        if(sticks[i].x < 0){
            sticks.shift();
        }
    }

    if(p1.health != 0 && sticks.length > 0){
        requestAnimationFrame(drawGame);
    }else if(p1.health != 0 && sticks.length == 0){
        cancelAnimationFrame(drawGame);
        gameStart = false;  
        winScreen = true;
        win();
    }else{
        cancelAnimationFrame(drawGame);
        gameStart = false; 
        gameOverScreen = true;
        gameOver();
    }
};

