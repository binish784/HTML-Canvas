class Turrent{
	constructor(x,y){
		this.x=x;
		this.y=y;
		this.ammo=5;
		this.width=25;
		this.height=25;
		this.GUN_WARM=5;
		this.total_ammo=5;
		this.kill_value=75;
		this.reloadTime=200;
		this.color="#f8f906";
		this.sound=undefined;
		this.direction=false;
		this.turrentShot=true;
		this.sprite=new Sprite("turrent",34,22);
		this.warm_counter=Math.floor(Math.random()*(Math.floor(300)-Math.ceil(30))+Math.ceil(30));
	}

	shootBullet(){
		if(this.warm_counter==0){
			if(this.direction){
				game.world.triggerBullet(this.x+this.width/2,this.y+(this.height/2),this.direction,this.turrentShot);
			}else{
				game.world.triggerBullet(this.x+this.width/2,this.y+(this.height/2),this.direction,this.turrentShot);
			}
			this.ammo--;
			if(this.ammo==0){
				this.warm_counter=this.reloadTime;
				this.ammo=this.total_ammo;
			}else{
				this.warm_counter=this.GUN_WARM;
				this.sound=sound.get("turrent").cloneNode();
				this.sound.volume=0.4;
				this.sound.play();
			}
		}
	}

	TickWarm(){
		if(this.warm_counter>0){
			this.warm_counter--;
		}
	}
}
