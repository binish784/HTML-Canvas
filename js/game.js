class Game{

	constructor(){
		this.world={
			background_color:"rgb(0,0,0)",
			height:150,
			width:300,
	
			player:new Player(15,15),
			bombs:new Array(),
	
			collideObject:function(object){
				if(object.x<0){
					object.x=0;
					object.x_velocity=0;
				}else if(object.x+object.width>this.width){
					object.x=this.width-object.width;
					object.x_velocity=0;
				}
				if(object.y<0){
					object.y=0;
					object.y_velocity=0;
				}else if(object.y+object.height>this.height){
					object.y=this.height-object.height;
					object.y_velocity=0;
				}
			},


			plantBomb:function(x,y){
				var bomb= new Bomb(x,y);
				this.bombs.push(bomb);
				console.log("Planted at ",x,y );
			},


			update:function(){
				this.collideObject(this.player);
			},


		};

		console.log("Game Initialized");
	}

	update(){
		this.world.update();
	};

};

class Bomb{
	constructor(x,y){
		this.x=x;
		this.y=y;
		this.color="#EE0000";
		this.height=5;
		this.survival=30;
		this.width=10;
	}

	bombTick(){
		this.survival--;
	}
}


class Player{
	constructor(x,y){
		this.x=x;
		this.y=y;
		this.x_velocity=0;
		this.y_velocity=0;
		this.height=10;
		this.width=15;
		this.color="#00FF00";
	}
	moveLeft(){
		this.x+=-1;
	}
	moveRight(){
		this.x+=1;
	}
	moveUp(){
		this.y+=-1;
	}
	moveDown(){
		this.y+=1;
	}

}