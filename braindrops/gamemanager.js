

function GameManager() {
	this.EVT_LOST_DROP = 1;
	this.EVT_WRONG_DROP = 2;
	this.EVT_CORRECT_DROP = 3;
	this.GEVT_LEVEL_UP = 4;
	this.MIN_DROP_SPEED = 0.55;
	this.MAX_BIG_DROPS =4;
	this.score = 0;
	this.level = 1;
	this.dropSpeed = this.MIN_DROP_SPEED;
	this.levelMax = 114;
	this.isRunning = true;
	this.STREAK = 0;
}

GameManager.prototype.processCode = function(code) {
	
	if(code === this.EVT_LOST_DROP) {
		this.score--;
		this.dropSpeed -= 0.1;
	}else if(code === this.EVT_CORRECT_DROP) {
		this.score++;
		//this.dropSpeed += (this.level * 0.05);
		this.dropSpeed += (this.level * 0.1);
		this.STREAK++;
	}		
	else if(code === this.EVT_WRONG_DROP) {
		this.score -= 2;
		this.dropSpeed -= (this.level * 0.04);
		this.STREAK = 0;
	}
	
	return this.normalizeScore();
}

GameManager.prototype.normalizeScore = function() {
	if (this.score < 0)
			this.score = 0;
		if (this.dropSpeed < this.MIN_DROP_SPEED)
			this.dropSpeed = this.MIN_DROP_SPEED;
		if (this.dropSpeed > 2.9)
			this.dropSpeed = 2.9;

		if (this.score > this.levelMax) {
			this.score = 0;
			this.level++;

			return this.GEVT_LEVEL_UP;
		}

		return 0;
}

GameManager.prototype.calculateStreak = function() {
	if(this.STREAK < 10 ) return 0;
	if(this.STREAK >= 10) return Math.round(Math.random() * 4) + 1;
}

GameManager.prototype.getDropSpeed = function() {
	return this.dropSpeed;
}

GameManager.prototype.getStreak = function() {
	return this.calculateStreak();
}

GameManager.prototype.setStreak = function(n) {
	this.STREAK = n;
}

GameManager.prototype.getScore = function() {
	return this.score;
}

GameManager.prototype.getLevelMax = function() {
  return 112 * this.level + 2;
}
