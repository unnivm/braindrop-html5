
function Menu(text, stage, callback) {
 this.x = window.innerWidth/2  - 175;
 //this.y = window.innerHeight/2 - 154;
 this.y = window.innerHeight/2 - 85;
 this.list = [];
 this.text = text;
 this.stage = stage;

 this.startText,this.hiscoreText, this.creditsText, this.quitText;
 
 this.upKey   = false;
 this.downKey = false;
 this.onmenuClick = callback;
 var menu = this;
}

Menu.prototype.init = function(){

 STARTGAME = "START GAME";
 HISCORES  = "HISCORES";
 CREDITS   = "CREDITS";
 QUIT      = "QUIT"; 

 var pos  = -1;

 //this.smallFnt = new PIXI.Text(STARTGAME, {font:"50px Arial", fill:"white"});
 //this.bigFont  = new PIXI.Text(STARTGAME, {font:"60px Arial", fill:"white"});
 
 var item = new MenuItem();
 item.setName(STARTGAME);       
 this.startText = new PIXI.Text(STARTGAME, {font:"50px Arial", fill:"white"});
 this.startText.interactive = true;
 this.startText.mousedown = function(mouseData) {
 	menuSelected("START GAME");
 };
 item.setText(this.startText);

 var r = new Rectangle(this.x, this.y, 280, 40); 
 item.setRectangle(r);

 this.list.push(item);
 this.y+=80;

 //item = new MenuItem();
 //item.setName(HISCORES);
 //this.hiscoreText = new PIXI.Text(HISCORES, {font:"50px Arial", fill:"white"});
 //item.setText(this.hiscoreText);
 //r = new Rectangle(this.x + 35, this.y,230,50); 
 //item.setRectangle(r);

 //this.list.push(item);
 //this.y+=80;

 item = new MenuItem();
 item.setName(CREDITS);
 this.creditsText = new PIXI.Text(CREDITS, {font:"50px Arial", fill:"white"});

 this.creditsText.interactive = true;
 this.creditsText.mousedown = function(mouseData) {
 	 menuSelected("CREDITS");
 };
 
 item.setText(this.creditsText);
 //r = new Rectangle(this.x + 55, this.y, 185, 50);
 r = new Rectangle(this.x + 35, this.y,230,50);
 item.setRectangle(r);

 this.list.push(item);
 //this.y+=80;

 //item = new MenuItem();
 //item.setName(QUIT);
 //this.quitText = new PIXI.Text(QUIT, {font:"50px Arial", fill:"white"});
 //item.setText(this.quitText);
 //r = new Rectangle(this.x + 95, this.y, 100, 50); 
 //item.setRectangle(r);

 this.list.push(item);
 
 function menuSelected(str) {
 	menu.onmenuClick(str);
 };
 
};

Menu.prototype.displayMenu = function() {
  for(var item in this.list) {
      if( this.list[item] ) {
      	 var text =  this.list[item].text;
         text.position.x = this.list[item].rectangle.x;
         text.position.y = this.list[item].rectangle.y; 
 		 text.text = this.list[item].name;
      }
  }
 }

Menu.prototype.enable = function() {
	this.stage.addChild(this.startText);
//	this.stage.addChild(this.hiscoreText);
	this.stage.addChild(this.creditsText);
	//this.stage.addChild(this.quitText);
}

Menu.prototype.disable = function() {
	this.stage.removeChild(this.startText);
//	this.stage.removeChild(this.hiscoreText);
	this.stage.removeChild(this.creditsText);
	//this.stage.removeChild(this.quitText);
}


function MenuItem() {
 this.name = "";
 this.text;	
 this.rectangle;
};

MenuItem.prototype.setName = function(name) {
	this.name = name;
};

MenuItem.prototype.setText = function(text) {
this.text = text;
}
MenuItem.prototype.getText = function() {
return this.text;		
};

MenuItem.prototype.setRectangle = function(rect) {
this.rectangle  = rect;
};

MenuItem.prototype.getRectangle = function() {
this.rectangle;
};

Menu.prototype.selectMenuItem = function(x,y) {
  
	for(var index in this.list) {
      var r = this.list[index].rectangle;
      if(r.contains(x,y)) {
      	 this.updateMenuItem(index, "big");
         if(this.upKey) this.resetMenuItems(item);
      }
      else {
      	  if(!this.downKey && !this.upKey) 
		  this.updateMenuItem(index, "small");
	    }		
    }
    
}

Menu.prototype.updateMenuItem = function(index, font) {
 var item = this.list[index];
 
 var currIndex = this.stage.getChildIndex(item.text);
  
 if(font === "big") {
 	 var style = {font:"60px Arial", fill:"white"};
 	 item.text.setStyle(style);
 }
 else { 
 	 var style = {font:"50px Arial", fill:"white"};
 	 item.text.setStyle(style);
 }
  
 this.stage.addChildAt(item.text, currIndex);
 
 this.updateMenuItemOnly(item, index);
 return item;
}

Menu.prototype.updateMenuItemOnly = function(item, index) {
	this.list[index] = item;
}

function Rectangle(x,y,w,h) {
 this.x = x;
 this.y = y
 this.width = w;
 this.height = h; 	
}

Rectangle.prototype.contains = function(x, y) {

  if( x > this.x  && x < this.x + this.width ) {
     if( y > this.y && y <this.y + this.height) return true;
  }	
  return false;
}

Rectangle.prototype.getX = function() {
	return this.x;
}

Rectangle.prototype.getY = function() {
	return this.y;
}

function hello(str) {
	alert(".... inside hello method...... ");
	menu.onmenuClick(" user clicked  " + str);
}