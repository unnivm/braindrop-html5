
function BigDrop(stage, speed, reverse) {
	this.stage = stage;
	this.drop = new PIXI.Sprite.fromImage("rain.png");
	this.drop.width = 125;
	this.drop.height = 125;
	//this.drop.interactive = true;
	//this.drop.buttonMode = false;
	this.minx = 5;
	this.maxx = window.innerWidth - this.drop.width;
	this.y = 0;
	this.x = Math.round(Math.random() * this.maxx + this.minx);
	this.rect = new PIXI.Rectangle(this.x, this.y, this.drop.width, this.drop.height);
	this.reverse = reverse;
	this.flipYAxis(this.drop.height);
	this.speed = speed;
	this.visible = true;
	this.word = new Word();
	this.wordText = new PIXI.Text("", {font:"15px Arial", fill:"white"});

	//this.drop.tint = 0x4D94FF;
	this.drop.tint = Math.random() * 0xffffff;
    this.drop.visible = false;
    
    this.prevx = 0;
    this.prevy = 0;
} 

BigDrop.prototype.flipYAxis = function(h) {
	if(this.reverse) {
		this.y = 4 * h;
	}else 
	    this.y = -h;
}

BigDrop.prototype.getCenter = function(font) {
	var width  = font.width;
	var coords = {x: Math.round(this.x + (this.drop.width - width)/2), y: Math.round(this.y + (this.drop.height/2))};
	return coords;
}

BigDrop.prototype.setReverse = function(reverse) {
   this.reverse = reverse;
}

BigDrop.prototype.draw = function() {
	
	if(this.visible) {
		this.drop.x = this.x;
		this.drop.y = this.y;
					
		var coords = this.getCenter(this.wordText);
		if( coords ) {
			if(this.word.getWord()) {
			this.wordText.text = this.word.getWord().toString();
	    	this.wordText.x = coords.x;
	    	this.wordText.y = coords.y;
	    	}else {  // fix for toString error from framework
	    		this.stage.removeChild(this.wordText);
	    		this.stage.removeChild(this.drop);
	    	}
	    }
	}
}

BigDrop.prototype.update = function(lagOffset) {
	
	if(this.reverse) { 
		
		if( this.prevy )  this.y = (this.y - this.prevy) * lagOffset + this.prevy;
	
		this.y -= this.speed;
	}	
	else this.y += this.speed;

	//////// update AABB ////
	this.rect.x = this.x;
	this.rect.y = this.y;
	
	if(!this.reverse && this.y >  -this.drop.height) this.drop.visible = true;
	if(this.reverse && this.y <  500) this.drop.visible = true;
	
	this.draw();
}

BigDrop.prototype.remove = function() {
	this.stage.removeChild(this.drop);
	this.stage.removeChild(this.wordText);
}

BigDrop.prototype.isPositive = function() {
	return this.word.isPositive();
}
	
BigDrop.prototype.addToStage = function() {
	this.stage.addChild(this.drop);
	this.stage.addChild(this.wordText);
}
