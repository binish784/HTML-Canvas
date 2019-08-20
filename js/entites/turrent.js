class Turrent{
	constructor(x,y){
		this.x=x;
		this.y=y;
		this.color="#ff8c08";
		this.height=25;
		this.width=25;
		this.warm_counter=Math.floor(Math.random()*(Math.floor(300)-Math.ceil(30))+Math.ceil(30));
		this.GUN_WARM=5;
		this.ammo=5;
		this.direction=false;
		this.gunSound=new Audio('resources/sounds/explosion.wav');
		this.sound=undefined;
	}

	shootBullet(){
		if(this.warm_counter==0){
			//gun ready to fire
			if(this.direction){
				//trigger gun left
				game.world.triggerBullet(this.x-2,this.y+(this.height/2),this.direction,true);
			}else{
				//trigger gun right
				game.world.triggerBullet(this.x+2,this.y+(this.height/2),this.direction,true);
			}
			this.ammo--;
			//reset counter
			if(this.ammo==0){
				this.warm_counter=300;		
				this.ammo=5;
			}else{
				this.warm_counter=this.GUN_WARM;	
				this.sound=this.gunSound.cloneNode();
				this.sound.volume=0.4;
				if(this.sound!==null){
					this.sound.play();
				}
			}
		}
	}

	TickWarm(){
		//tick the gun counter
		if(this.warm_counter>0){
			this.warm_counter--;
		}
	}
}


