class Sound{
	constructor(){
		this.enemy_gun=new Audio('resources/sounds/gun.wav');
		this.player_gun=new Audio('resources/sounds/player-gun.wav');
		this.turrent_gun=new Audio('resources/sounds/explosion.wav');
		this.sniper_gun=new Audio('resources/sounds/sniper.wav');
		this.kamikazeCollision=new Audio('resources/sounds/kamikaze-collision.wav');
	}
	get(effect){
		switch(effect){
			case "player":
				return(this.player_gun);
				break;
			case "enemy":
				return(this.enemy_gun);
				break;
			case "turrent":
				return(this.turrent_gun);
				break;
			case "sniper":
				return(this.sniper_gun);
				break;
			case "kamikaze-collision":
				return(this.kamikazeCollision);
				break;
		}
	}

}
