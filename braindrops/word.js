
function Word() {
	
	this.word = "";
	
	this.positiveWords = [
		"able", "accept", "acceptance", "action",
				"activate", "active", "add", "addition", "admire", "adore",
				"advantage", "affirm", "ageless", "agree", "agreeable", "aid",
				"aim", "abundance", "accountable", "accomplish", "accuracy",
				"achieve", "acknowledge", "adapt", "adventure", "agile",
				"alert", "ambitious", "anticipate", "appreciate", "assert",
				"attentive", "audacity", "aware", "authentic", "attract",
				"allow", "altruism", "astonish", "ample", "alive",
				"accessible", "absolute", "amuse", "benefit", "best",
				"benevolent", "bliss", "bloom", "blossom", "balance", "beauty",
				"beautiful", "belong", "bold", "brave", "brilliant", "bright",
				"bubbling", "care", "calm", "creative", "capable", "celebrate",
				"certain", "charity", "change", "charm", "choice", "clean",
				"community", "challenge", "communication", "cooperate",
				"allow", "considerate", "cool", "connect", "cute", "collect",
				"cheerful", "direction", "decent", "desirable", "dynamic",
				"diverse", "devote", "drive", "dependable", "delight",
				"empathy", "equality", "empower", "excite", "engross",
				"enthusiastic", "elevate", "extra", "equal", "easy", "eager",
				"electric", "exceptional", "fantastic", "flow", "fabulous",
				"fame", "favorite", "family", "flexible", "focus", "flourish",
				"free", "friendship", "fascinate", "fine", "flawless", "glow",
				"generous", "genius", "gift", "good", "giving", "grace",
				"gratitude", "growth", "guide", "glory", "glamor", "grand",
				"hope", "happy", "harmony", "health", "heart", "help",
				"honest", "human", "humor", "hero", "honor", "humble",
				"heartfelt", "heartwarming", "imagination", "inspire", "idea",
				"incredible", "innovate", "interesting", "improve",
				"independent", "insight", "influence", "integrity", "include",
				"infinity", "intimate", "invest", "involve", "intrigue", "joy",
				"joyful", "justice", "kind", "kindly", "like", "laugh",
				"learn", "luxury", "longevity", "loyal", "liberty", "logic",
				"lucky", "lively", "meaning", "more", "miracle", "magic",
				"maturity", "meaning", "merit", "mindful", "modest", "mercy",
				"mellow", "mutual", "noble", "nurture", "new", "nice", "noble",
				"nature", "nourish", "optimist", "open", "opportunity",
				"order", "obedient", "outgoing", "outcome", "perfect",
				"positive", "peace", "paradise", "passion", "please", "pure",
				"peace", "perceptive", "persevere", "persist", "pleasure",
				"power", "practical", "proactive", "polite", "purpose", "play",
				"presence", "patience", "quality", "quiet", "quick", "respect",
				"radiant", "ready", "reason", "real", "relax", "relief",
				"rational", "resourceful", "responsible", "romance", "revive",
				"restore", "rest", "renew", "resilient", "ripe", "smile",
				"sacred", "safe", "secure", "sustain", "save", "simple",
				"service", "simplicity", "skill", "sincere", "serene",
				"stable", "strength", "style", "stimulate", "start", "sweet",
				"vital", "yes", "victory", "vulnerable", "virtue", "win",
				"wisdom", "won", "youth", "yes", "zest", "zeal", "whole",
				"welcome", "worthy", "wonder", "wellness", "value",
				"understand", "do", "go", "make", "objective", "important",
				"commitment", "enthusiasm", "eager", "motivation", "passion",
				"masterpiece", "sense", "above", "collaborate", "smart"
	];
	
	this.negativeWords = [
		"disgust", "shame", "guilt", "boring",
				"shame", "sick", "stubborn", "negative", "can't", "rude",
				"unfair", "unjust", "impossible", "fall apart", "broken",
				"lazy", "ridiculue", "anguish", "stressful", "discomfort",
				"death", "nonsense", "despicable", "ugly", "danger", "abusive"
	];
	
	var r = Math.round( Math.random() * 5 + 1);
	
	if(r > 1 ) { 
		this.positive = true;
		this.word = this.positiveWords[Math.round((Math.random() * this.positiveWords.length))];
	}else {
		this.positive = false;
		this.word = this.negativeWords[Math.round((Math.random() * this.negativeWords.length))];
	}
	
}

Word.prototype.isPositive = function() {
	return this.positive;
}

Word.prototype.getWord = function() {
	return this.word;
}
