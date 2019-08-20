
class Kamikaze{
	constructor(x,y){
		this.health=30;
		this.x=x;
		this.y=y;
		this.y_velocity=6;
		this.height=40;
		this.width=30;
		this.color="red";
		this.warm_counter=0;
		this.GUN_WARM=30;
	}
	
	shootBullet(){
		if(this.warm_counter==0){
			game.world.triggerBullet(this.x+this.width/2,this.y+this.height+10,false,false);
			this.warm_counter=this.GUN_WARM;	
		}
	}

	TickWarm(){
		if(this.warm_counter>0){
			this.warm_counter--;
		}
	}
	bulletDamage(){
		this.health-=10;
	}
	move(){
		this.y+=this.y_velocity;
	}
}