class Bullet{
	constructor(x,y,direction,isTurrent,angle,doubleDamage){
		this.x=x;
		this.y=y;
		this.speed=8;
		if(isTurrent){
			this.height=5;
		}else{
			this.height=8;
		}
		this.width=3;
		this.isTurrent=isTurrent || false;
		this.angle=angle || 0;
		this.color=(doubleDamage) ? "#63acff" : "#FFFFFF";
		this.direction=direction;
		this.doubleDamage=doubleDamage;
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
			console.log("Double damage");
			object.health-=20;
		}else{
			object.health-=10;
		}
	}
}

