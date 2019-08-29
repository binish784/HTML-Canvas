
class Player extends Moveable{
	constructor(x,y){
		super(x,y);
		this.width=30;
		this.height=40;
		this.hit=false;
		this.armor=100;
		this.health=100;
		this.GUN_WARM=5;
		this.player=true;
		this.hitCounter=0;
		this.warm_counter=0;
		this.NUM_OF_BOMBS=5;
		this.color="#45ff01";
		this.sound=undefined;
		this.turrentShot=false;
		this.armor_enable=true;
		this.SNIPER_GUN_WARM=500;
		this.sniper_enable=false;
		this.doubleDamageTimer=0;
		this.armor_color="#d0ffd0";
		this.sniper_warm_counter=0;
		this.doubleDamageEnable=false;

		this.doubleBulletEnable=false;
		this.doubleBulletTimer=0;

		this.kamikazeCollideSound=new Audio('resources/sounds/kamikaze-collision.wav');
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
			console.log("Sniper Shot");
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
		if(this.sniper_warm_counter>0){
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
			this.sound=this.kamikazeCollideSound.cloneNode();
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
