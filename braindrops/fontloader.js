
function FontLoader() {
	this.wordFont;
	this.scoreFont = new PIXI.Text("",{font:"18px SansSerif", fill:"white"});
}

FontLoader.prototype.loadScoreFont = function() {
	return this.scoreFont;
}

FontLoader.prototype.loadWordFont = function() {
	this.wordFont = new PIXI.Text("", {font:"18px SansSerif", fill:"white"});
	return this.wordFont;
}