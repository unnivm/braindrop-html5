
function Landscape() {
	this.sprarray = [];
}

Landscape.prototype.add = function(img) {
	var spr = new PIXI.Sprite.fromImage(img);
	spr.width  = window.innerWidth - 25;
    spr.height = window.innerHeight;
	stage.addChild(spr);
	this.sprarray.push(spr);
}

var count = 1;
var fadecnt = 0.010;
Landscape.prototype.fade = function(index){
  if(index >this.sprarray.length) return;
	
	 count -=fadecnt;
 	 this.sprarray[index-1].alpha = count;
 	 this.sprarray[index-2].alpha+=fadecnt;
 	 
 	 if(this.sprarray[index-2].alpha >=1) { 
 	 	 loadingLevel = false;
 		 this.sprarray[index-2].alpha = 1;
 	 }
}

Landscape.prototype.setAlpha = function(index){
	this.sprarray[index-2].alpha = 0;
}
