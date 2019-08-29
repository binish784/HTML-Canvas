class Display{
	constructor(canvas){
		this.canvas=canvas;
		this.player_sprite=new Image();
		this.player_sprite.src="img/player_ship.png";
		// this.canvas.style.height="600px";
		// this.canvas.style.width="600px";
		this.canvas.style.backgroundColor="black";
		this.ctx=this.canvas.getContext("2d");
		console.log("Display Initialized");
	}

	drawSprite(sprite,x,y){
		var sprite_height=36;
		var sprite_width=27;
		switch(sprite){
			case "player":
				var sprite=this.player_sprite;
				break;
		}
		this.ctx.drawImage(sprite,49,0,27,36,x,y,27,36);
	}

	fill(color){
		this.ctx.fillStyle=color;
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
	}

	drawRectangle(x,y,width,height,color){
		this.ctx.fillStyle=color;
		this.ctx.fillRect(Math.floor(x),Math.floor(y),width,height);
	}

	showText(text,x,y){
		this.ctx.fillStyle="white";
		this.ctx.font="20px Comic Sans MS";
		this.ctx.fillText(text,x,y);
	}

	startScreen(){
		this.ctx.fillStyle="black";
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.fillStyle='red';
		this.ctx.font="30px Comic Sans MS";
		this.ctx.fillText("Welcome to 'The Game'",150,200);
		this.ctx.fillStyle='white';
		this.ctx.font="15px Comic Sans MS";
		this.ctx.fillText("Press 'space' to Start",200,350);
	}

	deadScreen(score){
		this.ctx.fillStyle="black";
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.fillStyle='red';
		this.ctx.font="30px Comic Sans MS";
		this.ctx.fillText("Salute to the Dead",150,200);
		this.ctx.fillStyle='white';
		this.ctx.font="15px Comic Sans MS";
		this.ctx.fillText("High Score : " + score,230,250);
		this.ctx.fillText("Press 'space' to restart",200,450);
	}
}