
//// http://jsperf.com/obj-create-vs-new/5 : TODO

 var mWind = 1.0;
 var mGravity = 9.81;
 var mdrops = 1000;

 var mDdropInitialVelocity = 20.0;
 var mRepaintTimeMS	= 18;
//var mRepaintTimeMS	= 8;

 var div = 200;
 
 	var g = new PIXI.Graphics();
	g.beginFill(0x4D94FF);
   	g.drawEllipse(0,0,1,1);
    g.endFill();

   	var g1 = new PIXI.Graphics();
	g1.lineStyle(1, 0x4D94FF);
	g1.moveTo(0,0);
	g1.lineTo(0,6);	
	
var textr = g1.generateTexture();

///// draw rounded drop
var bdg = new PIXI.Graphics();
bdg.beginFill(0x4D94FF);
bdg.drawEllipse(0,0,30,30);
bdg.endFill();
//////// 

var doc; 
var lastTime = Date.now(),
    timeSinceLastFrame = 0;
    
var cnt = 0;
var dcnt = 0;

function Universe(stage, container) {
 this.stage = stage;	
 this.container = container;
 this.rain  = [];
 this.drops = [];
 this.rdpool = [];
 setInterval(this.gc, 2000);
 this.tmprain  = [];
 for(var i = 0; i<mdrops; i++) {
	 this.tmprain.push(new Rain());
}
 
 this.tdrops = [];
 for(var i = 0; i<100; i++) {
 	 this.tdrops.push(new Drop(10, 10,1));
 }
 
}

Universe.prototype.draw = function(lagOffset) {
	var self = this;
	 ///// draw drops
	 for (var i = this.drops.length - 1; i >= 0; i--)  {
	 	  var drop = this.drops[i];
	 	  if(drop) {
	 		  drop.update();
			  drop.draw();
			  
			  if(drop.dropImg.y >= window.innerHeight) { 
			  	  stage.removeChild( drop.dropImg );
			  	  removeItem(this.drops, i);
			  }
	 	  }
	 }
	 
	////// draw rain
	for (var i = mdrops - 1; i >= 0; i--)  {
		 var r = this.rain[i];
		 if(r) {
		 r.update(0);
		 r.draw();
		 
		 if(r.y >= (.75 * window.innerHeight)) {
		 	 
		 	 var dropCount = 1 + Math.round(Math.random() * 4);
		 	 for(var j = 0; j<dropCount; j++) {
		 	 	 
		 	 	if(dcnt > 99) dcnt = 0;
		 	 	
		 	 	 var td = this.tdrops[dcnt];
		 	 	     td.reset(r.x, r.y, 1);
		 	 	 	 td.dropImg.visible = true;
		 	 	 	 stage.addChild(td.dropImg);
		 	 	 	 // this.drops.push(new Drop(r.x, r.y,1));
		 		 	this.drops.push(td);
		 		 	dcnt++;
	 	 	 }
             
	 	 	 
	 	 	 
		 	 this.rain.splice(i,1);
	 	      //removeItem(this.rain, i);
		 	 stage.removeChild(r.rainImg);
		 }
		 
		}
	}
	
	if(this.rain.length < mdrops) {
		var r = this.tmprain[cnt];
		r.x = r.tx;
		r.y = r.ty;
		r.rainImg.visible = true;
		stage.addChild(r.rainImg);
		this.rain.push(r);
		cnt++;
	}
	
	if( cnt >= mdrops ) {
	   cnt = 0;
	}
	
}


Universe.prototype.populateDrops = function(x,y) {
   var dropCount = 1 + Math.round(Math.random() * 4);	
   for(var i = 0; i<dropCount; i++) {
        var d = this.rdpool[i];
	    d.x = x;
        d.y = y;
        stage.addChild(d.dropImg);
	    this.drops.push(d);
   }
}



////// for rendering big rounded circle ///////////////
Universe.prototype.addDropAt = function(x,y,size) {
	var dropCount = 1 + Math.round(Math.random() * 4);
	for(var i = 0; i<dropCount; i++) {
		this.drops.push(new Drop(x,y,size));
	}
}

///////////// Rain class ////////////
		
function Rain() {
	this.x = Math.floor((Math.random() * window.innerWidth) + 1);
	this.y = 0;
	this.prevX = 0;
	this.prevY = 0;

	this.rainImg  = new PIXI.Sprite(textr);
//	stage.addChild(this.rainImg); 
	this.ty = 0;
	this.tx = this.x;
}

Rain.prototype.update = function(lagOffset) {
 this.prevX = this.x;
 this.prevY = this.y;
 
 this.x+= mWind;
 this.y+= mGravity;
 }

Rain.prototype.draw = function() {
	this.rainImg.x = this.x;
	this.rainImg.y = this.y;
 }

////////////// Rain ///////////

////////// Drop class //////////
function Drop(x,y,size) {
	this.x0 = x;
	this.y0 = y;
	this.size = size;
	this.v0 = mDdropInitialVelocity;
	this.angle  = toRad(Math.round(Math.random() * 1.98765 + 1)); // 1.9 will work, but will try diff value
	//angle  = toRad(Math.round(Math.random() * 180)); // 1.9 will work, but will try diff value
	this.t = 0.0;
	this.x = 0.0;
	this.y = 0.0;

	this.dropImg = new PIXI.Sprite(g.generateTexture());
	this.rndDropImg = new PIXI.Sprite(bdg.generateTexture());
	                
	this.rndDropImg.visible = false;
	
	if(size === 30) stage.addChild(this.rndDropImg);
	else
	stage.addChild(this.dropImg);

   ////////////  pre-caculating  sin and cos components
   this.cosv  = Math.cos(this.angle);
   this.sinv  = Math.sin(this.angle);
}

Drop.prototype.update = function() {
	if(this.size === 30 ) this.rndDropImg.visible = true;

	this.t+=mRepaintTimeMS/300;
//	this.t+=mRepaintTimeMS/100;

	//this.x = Number(this.x0 + this.v0 * this.t * Math.cos(angle));
    //this.y = Number(this.y0 - (this.v0 * this.t * Math.sin(angle) - mGravity * this.t * this.t / 2));
    
    this.x = this.x0 + this.v0 * this.t * this.cosv;
    this.y = this.y0 - (this.v0 * this.t * this.sinv - mGravity * this.t * this.t / 2);
}

Drop.prototype.reset = function(x,y,size) {
	this.x0 = x;
	this.y0 = y;
	this.size = size;
	this.v0 = mDdropInitialVelocity;
	this.angle  = toRad(Math.round(Math.random() * 1.98765 + 1)); // 1.9 will work, but will try diff value
	//angle  = toRad(Math.round(Math.random() * 180)); // 1.9 will work, but will try diff value
	this.t = 0.0;
	this.x = 0.0;
	this.y = 0.0;
	
	this.cosv  = Math.cos(this.angle);
   this.sinv  = Math.sin(this.angle);
}
	

Drop.prototype.draw = function() {
	if(this.size == 30) { 
		this.rndDropImg.x = this.x;
		this.rndDropImg.y = this.y;
	}else {
		this.dropImg.x = this.x;
		this.dropImg.y = this.y;
	}
}
////////// Drop ///////////////

 
function toRad(v) {
    return v * Math.PI / 180;
}

function removeItem(arr, i){
	if (i <= 0 || i >= arr.length) {
        return;
    }
    if (i < arr.length - 1) {
        arr[i] = arr[arr.length-1];
    }
    arr.length -= 1;
}

Universe.prototype.gc = function() {
	if( this.rain ) 
	for(var i = this.rain.length - 1; i>=0; i--) {
		var r = this.rain[i];
		
		if(r.rainImg.visible === false ) {
			stage.removeChild(r.rainImg);	
		}
	}
	
	if(this.drops ) 
	for(var i = this.drops.length - 1; i>=0; i--) {
		var d = this.drops[i];
		
		if(d.dropImg.visible === false ) {
			stage.removeChild(d.dropImg);	
		}
	}	
		
	
}
