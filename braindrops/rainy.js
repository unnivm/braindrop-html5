///// use DisplayObjectContainer 

////http://jsbin.com/hafove/1/edit?html,js,output
//http://www.html5gamedevs.com/topic/8716-game-loop-fixed-timestep-variable-rendering/
//// http://jsbin.com/janibo/1/edit?html,js,output

var fps = 60;
var frameDuration = 1000/fps;
var lag = 0;
var previous = 0;
var start = Date.now();

function Rainy(stage,renderer, playGameSound,container) {
 this.stage  = stage;	
 this.renderer = renderer;
 this.drops = [];
 this.dropCount = 4;
 this.bigDropsOnScreen = 0;
 this.gameManager = new GameManager();
 this.universe = new Universe(stage, container);
 this.dx = window.innerWidth /2 - 260;
 this.dy = window.innerHeight - 100;
 this.scoreImg;
 this.drawText = new PIXI.Text(STARTGAME, {font:"15px Arial", fill:"white"});
 this.scoreString = "";
 this.playGameSound = playGameSound;
 
 var rndG = new PIXI.Graphics();
 rndG.beginFill(0x4D94FF);
 rndG.drawRoundedRect(this.dx + 1, this.dy, 1, 50, 5);
 rndG.endFill();
 this.rndRectImg = new PIXI.Sprite(rndG.generateTexture());
 //this.stage.addChild(this.rndRectImg);
 
 this.gameScoreFiller = 0;
 this.level = 1;

}

Rainy.prototype.init = function() {
	this.drawScoreRect();
	this.stage.addChild(this.drawText);
	stage.addChild(this.rndRectImg);
	
}

Rainy.prototype.update = function(x,y,w,h) {
//	var current = Date.now();
//	var elapsed = current - start;
//	start = current;
//	lag+=elapsed;
//	while(lag >=frameDuration) {
		//capturePrevPosition(this.drops);
//		lag -= frameDuration;//
//	}
	//var lagOffset = lag/frameDuration;
	
	////// rain, rain,.... come again /////
	this.universe.draw(0);

	for (var i = this.drops.length - 1; i >= 0; i--)  {
		var bdrop = this.drops[i];
		
			bdrop.update(0);
	
			this.drawScore();
			if(bdrop.reverse === false && bdrop.y > window.innerHeight - 2 * bdrop.drop.height) {
				 
				if(bdrop.isPositive()) this.processGameScore(this.gameManager.processCode(this.gameManager.EVT_LOST_DROP));
				this.universe.addDropAt(bdrop.drop.x, bdrop.drop.y, 30);
				
				this.bigDropsOnScreen
				this.remove(i, bdrop);
				this.playPositive();
			}
			
			if( bdrop.reverse && bdrop.y < 0 ) {
   			    this.universe.addDropAt(bdrop.drop.x, bdrop.drop.y, 30);
   			    this.remove(i, bdrop);
   			    this.bigDropsOnScreen--;
			}

            var r = new Rectangle(x,y,w,h);
      		if(this.collide(bdrop.rect, r)) {
                
   				if(bdrop.isPositive()) { 
					this.processGameScore(this.gameManager.processCode(this.gameManager.EVT_CORRECT_DROP));
					this.playPositive();
				}else {
					this.processGameScore(this.gameManager.processCode(this.gameManager.EVT_WRONG_DROP));
					this.playNegative();
				}
				
				this.bigDropsOnScreen--;
			    this.remove(i, bdrop);
    		}

	}
	
	if( this.bigDropsOnScreen >=this.dropCount && this.drops.length == 0) { 
			this.bigDropsOnScreen = 0;
			this.addBigDrop(false);
		}
		
	if(this.bigDropsOnScreen < this.dropCount) {
		this.addBigDrop(false);
	}
		
	var streak = this.gameManager.getStreak();
	if (streak > 0) {
		this.addBigDrop(true);
		this.gameManager.setStreak(0);
	}
	
	this.scoreImg.x = this.dx;
	this.scoreImg.y = this.dy;
 }

Rainy.prototype.drawScoreRect = function() {
 this.g = new PIXI.Graphics();
 this.g.lineStyle(1, 0x4D94FF);
 this.g.drawRoundedRect(this.dx, this.dy, 500, 50, 5);
 this.scoreImg = new PIXI.Sprite(this.g.generateTexture());
 this.stage.addChild(this.scoreImg);
}

Rainy.prototype.drawScore = function() {
	
this.drawText.text = this.gameManager.getScore() + "/" + this.gameManager.getLevelMax();
this.drawText.x = (2 * this.dx + 500)/2 - 15;
this.drawText.y = (2 * this.dy + 50)/2 - 10;
	
var gameScoreFiller = (this.gameManager.getScore() / this.gameManager.getLevelMax()) * 500;
this.rndRectImg.x = this.dx + 1;
this.rndRectImg.y = this.dy + 1;
this.rndRectImg.width = gameScoreFiller;

}

Rainy.prototype.addBigDrop = function(reverse) {
	var drop = new BigDrop(this.stage, this.gameManager.getDropSpeed(), reverse);
	
	if(this.drops.length === 0) {
		this.drops.push(drop);
		drop.addToStage();
		this.bigDropsOnScreen++;
		return;
	}
	
	var status = false;
	
	for (var i = this.drops.length - 1; i >= 0; i--)  {
		var b = this.drops[i];
		
		if(this.collide(b.rect, drop.rect)) {
			status = false;
			break;
		}
		
		status = true;
	}
	
	if(status) { 
		this.drops.push(drop); 
		drop.addToStage();
	    this.bigDropsOnScreen++;
	}else {
		/////// remove the newly created drop from scene graph in case not added to drop list
		this.stage.removeChild(drop);
	}
	return ;
}

Rainy.prototype.playPositive = function() {
  this.playGameSound(1);	
}

Rainy.prototype.playNegative = function() {
	this.playGameSound(2);
}

Rainy.prototype.processGameScore = function(code) {
	if( code == 0 ) return;
	if(code == this.gameManager.GEVT_LEVEL_UP) this.prepareLevel();
}

Rainy.prototype.prepareLevel = function(){
	this.level++;
}

Rainy.prototype.getLevelIndex = function() {
	return this.level;
}

Rainy.prototype.remove = function(index, drop) {
	this.drops.splice(index, 1);
	this.stage.removeChild(drop.drop);
    this.stage.removeChild(drop.wordText);
}

Rainy.prototype.collide = function(r1, r2) {
	  //Define the variables we'll need to calculate
  var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }
  return hit;
}

Rainy.prototype.intersects = function(r1, r2){
	return !(r2.x > (r1.x + r1.width) || 
           (r2.x + r2.width) < r1.x || 
           r2.y > (r1.y + r1.height) ||
           (r2.y + r2.height) < r1.y);
}

/////// capture previous position of big drops //////////////
function capturePrevPosition(drops) {
	for (var i = drops.length - 1; i >= 0; i--)  {
	    var bdrop = drops[i];
		bdrop.drop.prevx = bdrop.drop.x;
		bdrop.drop.prevy = bdrop.drop.y;
	}
}