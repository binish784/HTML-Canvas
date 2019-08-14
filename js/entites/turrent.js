class turrent{
	constructor(x,y){
		this.x=x;
		this.y=y;
		this.color="#ff8c08";
		this.height=25;
		this.width=25;
		this.warm_counter=0;
		this.GUN_WARM=5;
		this.ammo=5;
		if(this.x>(300/2)){//fix this 
			this.direction=false;
		}else{
			this.direction=true;
		}
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
				this.warm_counter=30;		
				this.ammo=5;
			}else{
				this.warm_counter=this.GUN_WARM;	
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


