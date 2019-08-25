class Moveable{
	constructor(x,y){
		this.x=x;
		this.y=y;
		this.x_velocity=4;
		this.y_velocity=4;
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