
class Kamikaze{
	constructor(x,y){
		this.x=x;
		this.y=y;
		this.width=32;
		this.height=32;
		this.health=30;
		this.GUN_WARM=30;
		this.color="red";
		this.y_velocity=6;
		this.kill_value=75;
		this.warm_counter=0;
		this.sprite=new Sprite("kamikaze",32,32);
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
