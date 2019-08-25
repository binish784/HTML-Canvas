
class Player extends Moveable{
	constructor(x,y){
		super(x,y);
		this.width=30;
		this.height=40;
		this.hit=false;
		this.health=100;
		this.GUN_WARM=5;
		this.hitCounter=0;
		this.warm_counter=0;
		this.color="#45ff01";
		this.sound=undefined;

		this.doubleDamageEnable=false;
		this.doubleDamageTimer=0;

		this.doubleBulletEnable=false;
		this.doubleBulletTimer=0;

		this.kamikazeCollideSound=new Audio('resources/sounds/kamikaze-collision.wav');
	}

	doubleDamage(){
		this.doubleDamageEnable=true;
		this.doubleDamageTimer+=600;

		this.hit=true;
		this.hitCounter=10;
		this.color="#63acff";

	}
	
	doubleBullet(){
		this.doubleBulletEnable=true;
		this.doubleBulletTimer+=600;

		this.hit=true;
		this.hitCounter=10;
		this.color="#b050ff";
	}

	shootBullet(){
		if(this.warm_counter==0){
			if(this.doubleBulletEnable){
				game.world.triggerBullet(this.x+this.width/4,this.y-5,true,false,this.doubleDamageEnable);
				game.world.triggerBullet(this.x+this.width/2+this.width/4,this.y-5,true,false,this.doubleDamageEnable);
			}else{
				game.world.triggerBullet(this.x+this.width/2,this.y-5,true,false,this.doubleDamageEnable);
			}
			this.warm_counter=this.GUN_WARM;	
			this.sound=sound.get("player").cloneNode();
			this.sound.volume=0.1;
			this.sound.play();
		}
	}

	TickWarm(){
		if(this.doubleDamageEnable && (this.doubleDamageTimer>0)){
			this.doubleDamageTimer--;
		}else{
			this.doubleDamageEnable=false;
		}
		
		if(this.doubleBulletEnable && (this.doubleBulletTimer>0)){
			this.doubleBulletTimer--;
		}else{
			this.doubleBulletEnable=false;
		}

		if(this.warm_counter>0){
			this.warm_counter--;
		}
		if(this.hit){
			if(this.hitCounter>0){
				this.hitCounter--;
			}
			if(this.hitCounter==0){
				this.hit=false;
				this.color="#45ff01";
			} 
		}
	}
	
	kamikazeDamage(){
		this.health-=50;
		this.hit=true;
		this.hitCounter=35;
		this.color="orange";
		if(this.health<0){
			this.sound=this.kamikazeCollideSound.cloneNode();
			this.sound.volume=1;
			this.sound.play();
		}
	}
	
	bulletDamage(){
		this.hit=true;
		this.hitCounter=3;
		this.color="#DDEE11";
	}

	healthPower(){
		this.hit=true;
		this.hitCounter=10;
		this.color="#ffdbdb";
		this.health=100;
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