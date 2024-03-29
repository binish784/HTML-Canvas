
class Boss extends Moveable{
	constructor(x,y,armor_enable){
		super(x,y);
		this.hit=false;
		this.width=80;
		this.height=64;
		this.armor=500;
		this.health=2990;
		this.hitCounter=3;
		this.kill_value=500;
		this.color="#FFFFFF";
		this.sound=undefined;
		this.RIFLE_GUN_WARM=40;
		this.SNIPER_GUN_WARM=546;
		this.TURRENT_GUN_WARM=200;
		this.total_turrent_ammo=6;
		this.armor_color="#e1e1e1";
		this.sniper_warm_counter=0;
		this.sniper_sound=undefined;
		this.sprite=new Sprite("boss",80,64);
		this.armor_enable=armor_enable || false;
		this.turrent_ammo=this.total_turrent_ammo;
		this.rifle_warm_counter=this.RIFLE_GUN_WARM;
		this.turrent_warm_counter=this.TURRENT_GUN_WARM;
	}

	shootBullet(){
		if(this.turrent_warm_counter==0){
			game.world.triggerBullet(this.x+this.width/2,this.y+this.height+2,false,true);
			this.turrent_ammo--;
			if(this.turrent_ammo==0){
				this.turrent_warm_counter=this.TURRENT_GUN_WARM;
				this.turrent_ammo=this.total_turrent_ammo;
			}else{
				this.turrent_warm_counter=5;
				this.sound=sound.get("turrent").cloneNode();
				this.sound.volume=0.4;
				this.sound.play();
			}
		}
		if(this.rifle_warm_counter==0){
			for(var i=0;i<game.world.player_count;i++){
				if((players[i].x+players[i].width)>this.x && (this.x+this.width)>players[i].x){
					game.world.triggerBullet(this.x+this.width/4,this.y+this.height+2,false,false,true);
					game.world.triggerBullet(this.x+this.width/4+this.width/2,this.y+this.height+2,false,false,true);
					this.sound=sound.get("player").cloneNode();
					this.sound.volume=0.05;
					this.sound.play();
					this.rifle_warm_counter=this.RIFLE_GUN_WARM;
				}
			}
		}
		if(this.sniper_warm_counter<50){
			this.color="#969696";
		}
		if(this.sniper_warm_counter==0){
			game.world.triggerBullet(this.x+this.width/2,this.y+this.height+2,false,true,false,true);
			this.sniper_sound=sound.get("sniper").cloneNode();
			this.sniper_sound.play();
			this.color="#ffffff";
			this.sniper_warm_counter=this.SNIPER_GUN_WARM;
		}
	}

	TickWarm(){
		if(this.turrent_warm_counter>0){
			this.turrent_warm_counter--;
		}
		if(this.rifle_warm_counter>0){
			this.rifle_warm_counter--;
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
				if(this.armor_enable){
					this.armor_color='#e1e1e1';
				}else{
					this.color='#ffffff';
				}
			}
		}
	}
	bulletDamage(){
		if(this.armor==0 && this.armor_enable){
			this.armor_enable=false;
		}
		if(this.armor>0 && this.armor_enable){
			this.armor-=10;
		}else{
			this.health-=10;
		}
		this.hit=true;
		this.hitCounter=3;
		if(this.armor_enable){
			this.armor_color="#ff4646";
		}else{
			this.color="#ff4646";
		}
	}
}
