
class Player extends Moveable{
	constructor(x,y){
		super(x,y);
		this.IDLE_Width=32;
		this.IDLE_Height=32;
		this.hit=false;
		this.armor=	0;
		this.health=100;
		this.GUN_WARM=5;
		this.player=true;
		this.hitCounter=0;
		this.warm_counter=0;
		this.NUM_OF_BOMBS=5;
		this.leftMove=false;
		this.color="#45ff01";
		this.sound=undefined;
		this.turrentShot=false;
		this.armor_enable=false;
		this.doubleBulletTimer=0;
		this.doubleDamageTimer=0;
		this.SNIPER_GUN_WARM=500;
		this.sniper_enable=false;
		this.sniper_warm_counter=0;
		this.width=this.IDLE_Width;
		this.armor_color="#d0ffd0";
		this.height=this.IDLE_Height;
		this.doubleDamageEnable=false;
		this.doubleBulletEnable=false;
		this.sprite=new animatedSprite("Player",32,32);
	}

	doubleDamage(){
		this.doubleDamageEnable=true;
		this.doubleDamageTimer+=1000;
		this.hit=true;
		this.hitCounter=10;
		this.color="#63acff";
	}

	doubleBullet(){
		this.doubleBulletEnable=true;
		this.doubleBulletTimer+=1000;
		this.hit=true;
		this.hitCounter=10;
		this.color="#b050ff";
	}

	shootBullet(){
		if(this.warm_counter==0){
			if(this.doubleBulletEnable){
				game.world.triggerBullet(this.x+this.width/4,this.y-5,this.player,this.turrentShot,this.doubleDamageEnable);
				game.world.triggerBullet(this.x+this.width/2+this.width/4,this.y-5,this.player,this.turrentShot,this.doubleDamageEnable);
			}else{
				game.world.triggerBullet(this.x+this.width/2,this.y-5,this.player,this.turrentShot,this.doubleDamageEnable);
			}
			this.warm_counter=this.GUN_WARM;
			this.sound=sound.get("player").cloneNode();
			this.sound.volume=0.1;
			this.sound.play();
		}
	}

	plantBomb(){
		if(this.NUM_OF_BOMBS>0){
			game.world.plantBomb(this.x,this.y);
			this.NUM_OF_BOMBS--;
		}
	}

	sniperShot(){
		if(this.sniper_warm_counter==0 && this.sniper_enable){
			game.world.triggerBullet(this.x+this.width/2,this.y-5,this.player,this.turrentShot,false,this.sniper_enable);
			this.sniper_warm_counter=this.SNIPER_GUN_WARM;
			this.sound=sound.get("sniper").cloneNode();
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
		if(this.sniper_warm_counter>0 && this.sniper_enable){
			this.sniper_warm_counter--;
		}
		if(this.hit){
			if(this.hitCounter>0){
				this.hitCounter--;
			}
			if(this.hitCounter==0){
				this.hit=false;
				this.color="#45ff01";
				this.armor_color="#d0ffd0";
			}
		}
	}

	kamikazeDamage(){
		this.health-=50;
		this.hit=true;
		this.hitCounter=35;
		this.color="orange";
		if(this.health<0){
			this.sound=sound.get("kamikaze-collision").cloneNode();
			this.sound.volume=1;
			this.sound.play();
		}
	}

	bulletDamage(){
		if(this.armor>0){
			this.armor_color="#ff4646";
			this.armor-=10;
		}else{
			this.health-=10;
			this.color="#DDEE11";
		}
		this.hit=true;
		this.hitCounter=3;
	}

	healthPower(){
		this.hit=true;
		this.hitCounter=10;
		this.color="#ffdbdb";
		this.health=100;
	}

}
