class powerUps{
	constructor(x,y){
		this.x=x;
		this.y=y;
		this.life=500;
		this.width=20;
		this.height=20;
		this.consumed=false;
		this.color=undefined;
		this.x_velocity=(Math.random()<0.5) ? -4 : 4;
		this.y_velocity=(Math.random()>0.5) ? -2 : 2;
	}

	tickLife(){
		this.life--;
	}

	checkCollision(height,width){
		if(this.y<=0 || (this.y+this.height)>=height){
			this.y_velocity=-(this.y_velocity);
		}
		if((this.x+this.width)>=width || this.x<=0){
			this.x_velocity=-(this.x_velocity);
		}
		this.x+=this.x_velocity;
		this.y-=this.y_velocity;
		this.tickLife();
	}
}

class doubleDamage extends powerUps{
	constructor(x,y){
		super(x,y);
		this.color="red";
	}
	consume(playerObj){
		this.consumed=true;
		playerObj.doubleDamage();
	}
}

class healthPower extends powerUps{
	constructor(x,y){
		super(x,y);
		this.color="#ffdbdb";
	}

	consume(playerObj){
		this.consumed=true;
		playerObj.healthPower();
	}
}

class doubleBullet extends powerUps{
	constructor(x,y){
		super(x,y);
		this.color="#b050ff";
	}
	consume(playerObj){
		this.consumed=true;
		playerObj.doubleBullet();
	}
}
