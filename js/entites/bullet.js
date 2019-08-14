
class Bullet{
	constructor(x,y,direction,isTurrent){
		this.x=x;
		this.y=y;
		this.x_velocity=8;
		this.y_velocity=8;
		if(isTurrent){
			this.height=5;
		}else{
			this.height=8;
		}
		this.width=3;
		this.isTurrent=isTurrent || false;
		this.color="#FFFFFF";
		this.direction=direction;
	}
	moveForward(){
		if(this.direction){
			this.y-=this.y_velocity;
		}else{
			this.y+=this.y_velocity;
		}
	}
	moveSide(){
		if(this.direction){
			// console.log("Bullet moving right");
			this.x+=this.x_velocity;
		}else{
			// console.log("Bullet moving left");
			this.x-=this.x_velocity;
		}
	}
}

