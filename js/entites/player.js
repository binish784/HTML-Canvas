
class Player{
	constructor(x,y,color,direction){
		this.health=100;
		this.x=x;
		this.y=y;
		this.x_velocity=4;
		this.y_velocity=4;
		this.height=40;
		this.width=30;
		this.color=color;
		this.warm_counter=0;
		this.direction=direction;
		if(direction){
			this.GUN_WARM=5;
		}else{
			this.GUN_WARM=20;//30;
		}
	}
	
	shootBullet(){
		if(this.warm_counter==0){
			//gun ready to fire
			if(this.direction){
				//trigger gun up
				game.world.triggerBullet(this.x+this.width/2,this.y,this.direction,false);
			}else{
				//trigger gun down
				game.world.triggerBullet(this.x+this.width/2,this.y+this.height,this.direction,false);
			}
			//reset counter
			this.warm_counter=this.GUN_WARM;	
		}
	}

	TickWarm(){
		//tick the gun counter
		if(this.warm_counter>0){
			this.warm_counter--;
		}
	}
	bulletDamage(){
		this.health-=10;
	}
	moveLeft(){
		this.x+=-this.x_velocity;
	}
	moveRight(){
		this.x+=this.x_velocity;
	}
	moveUp(){
		this.y+=-this.y_velocity;
	}
	moveDown(){
		this.y+=this.y_velocity;
	}
}