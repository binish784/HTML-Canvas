
class Bomb{
	constructor(x,y){
		this.x=x+5;
		this.y=y+10;
		this.width=20;
		this.height=20;
		this.timer=120;
		this.flag=true;
		this.sprite_frames=9;
		this.sprite=new animatedSprite("bomb",19,73,0,this.sprite_frames,20,5);
	}

	bombTick(){
		if(this.timer%10==0){
			if(this.flag){
				this.height=25;
				this.width=25;
				this.flag=false;
			}else{
				this.flag=true;
			}
		}
		this.sprite.update(1);
		this.timer--;
	}
}

class Fire{
	constructor(x,y){
		this.width=100;
		this.height=90;
		this.x=x-(this.width/2);
		this.y=y-(this.height/2);
		this.timer=100;
		this.fire_frames=10;
		this.color="#111199";
		this.sound=new Sound();
		this.sound=this.sound.get("bomb-explosion").cloneNode();
		this.sprite=new animatedSprite("explosion",this.width,this.height,0,this.fire_frames);
	}
	fireTick(){
		this.sprite.update(1);
		this.timer--;
	}
}
