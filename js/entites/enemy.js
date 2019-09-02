
class Enemy extends Moveable{
	constructor(x,y,spreadShot){
		super(x,y);
		this.width=32;
		this.height=32;
		this.hit=false;
		this.health=100;
		if(spreadShot){
			this.GUN_WARM=50;
			this.color="#DDEE99";
		}else{
			this.GUN_WARM=10;
			this.color="#DDEE11";
		}
		this.hitCounter=3;
		this.warm_counter=0;
		this.sound=undefined;
		this.player=false;
		this.spreadShot=spreadShot || false;
		this.sprite=new Sprite("Enemy",32,32);
	}

	shootBullet(){
		if(this.warm_counter==0){
			if(this.spreadShot){
				game.world.triggerBullet(this.x+this.width/2,this.y+this.height+2,this.player,this.spreadShot);
			}else{
				game.world.triggerBullet(this.x+this.width/2,this.y+this.height+2,this.player,this.spreadShot);
			}
			this.warm_counter=this.GUN_WARM;
			this.sound=sound.get("enemy").cloneNode();
			this.sound.volume=0.05;
  		this.sound.play();
		}
	}

	TickWarm(){
		if(this.warm_counter>0){
			this.warm_counter--;
		}
		if(this.hit){
			if(this.hitCounter>0){
				this.hitCounter--;
			}
			if(this.hitCounter==0){
				this.hit=false;
				if(this.spreadShot){
					this.color='#DDEE99'
				}else{
					this.color="#DDEE11";
				}
			}
		}
	}
	bulletDamage(){
		this.health-=10;
		this.hit=true;
		this.hitCounter=3;
		this.color="#ff4646";
	}

		moveLeft(){
			this.sprite.update(-1);
			this.x+=-this.x_velocity;
		}
		moveRight(){
			this.sprite.update(1);
			this.x+=this.x_velocity;
		}
		moveUp(){
			this.y+=-this.y_velocity;
		}
		moveDown(){
			this.y+=this.y_velocity;
		}

}
