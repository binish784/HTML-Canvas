class Bullet{
	constructor(x,y,direction,isTurrent,angle,doubleDamage,sniper_shot){
		this.x=x;
		this.y=y;
		if(sniper_shot){
			this.speed=20;
		}else{
			this.speed=8;
		}
		if(sniper_shot){
			this.width=8;
		}else{
			this.width=3;
		}
		if(sniper_shot){
			this.height=8;
		}else if(isTurrent){
			this.height=5;
		}else{
			this.height=8;
		}
		this.angle=angle || 0;
		this.direction=direction;
		this.doubleDamage=doubleDamage;
		this.sniper_shot=sniper_shot || false;
		this.isTurrent=isTurrent || false;
		if(doubleDamage){
			this.color=	"#63acff";
		}else if(sniper_shot){
			this.color="red";
		}else{
			this.color="#FFFFFF";
		}
	}
	moveForward(){
		if(this.direction){
			this.y-=this.speed;
		}else{
			this.y+=this.speed;
		}
	}
	fromTurrent(){
		if(this.isTurrent){
			this.y += Math.sin(this.angle)*this.speed;
		    this.x += Math.cos(this.angle)*this.speed;
		}
	}
	damage(object){
		if(this.doubleDamage){
			object.health-=40;
		}else if(this.sniper_shot){
			if(this.direction){
				object.health-=100;
			}else{
				object.health-=80;
			}
		}else{
			if(object.player){
				object.health-=10;
			}else{
				object.health-=20;
			}
		}
	}
}
