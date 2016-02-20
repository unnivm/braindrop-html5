
	var g = new PIXI.Graphics();
	g.beginFill(0x4D94FF);
   	g.drawEllipse(0,0,10,10);
    g.endFill();


function Abc(container) {
	//this.container = container;
	//alert(this.container);
	//var r = new Rain();
}

function Rain() {
	this.s = new PIXI.Sprite(g.generateTexture());
	container.addChild(this.s);
}

Rain.prototype.draw = function(){
	this.s.x = 200;
	this.s.y = 100;
	
}