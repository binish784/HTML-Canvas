class Display{
	constructor(canvas){
		this.canvas=canvas;
		this.canvas.style.backgroundColor="black";
		this.ctx=this.canvas.getContext("2d");
		console.log("Display Initialized");
	}

	fill(color){
		this.ctx.fillStyle=color;
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
	}

	drawRectangle(x,y,width,height,color){
			this.ctx.fillStyle=color;
			this.ctx.fillRect(Math.floor(x),Math.floor(y),width,height);
		}

	drawEnemy(x,y,width,height,color){
		this.ctx.fillStyle="#76ff69";
		this.ctx.fillRect(Math.floor(x+(width/2)-5),Math.floor(y+height),10,10);
		this.ctx.fillStyle=color;
		this.ctx.fillRect(Math.floor(x),Math.floor(y+10),width,height);
		this.ctx.fillStyle="green";
		this.ctx.fillRect(Math.floor(x),Math.floor(y+5),width,5);
		this.ctx.fillStyle="red";
		this.ctx.fillRect(Math.floor(x-5),Math.floor(y+20),5,15);
		this.ctx.fillRect(Math.floor(x-10),Math.floor(y+15),5,15);
		// this.ctx.fillRect(Math.floor(x+width-5),Math.floor(y+height+15),5,15);
		// this.ctx.fillRect(Math.floor(x+width),Math.floor(y+height+20),5,15);
	}

	drawPlayer(x,y,width,height,color){
		this.ctx.fillStyle="#76ff69";
		this.ctx.fillRect(Math.floor(x+(width/2)-5),Math.floor(y-10),10,10);
		this.ctx.fillStyle=color;
		this.ctx.fillRect(Math.floor(x),Math.floor(y),width,height-10);
		this.ctx.fillStyle="green";
		this.ctx.fillRect(Math.floor(x),Math.floor(y+height-10),width,5);
		this.ctx.fillStyle="red";
		this.ctx.fillRect(Math.floor(x-5),Math.floor(y+height-20),5,15);
		this.ctx.fillRect(Math.floor(x-10),Math.floor(y+height-15),5,15);
		this.ctx.fillRect(Math.floor(x+width+5),Math.floor(y+height-15),5,15);
		this.ctx.fillRect(Math.floor(x+width),Math.floor(y+height-20),5,15);
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
		this.ctx.fillText("Start Game",200,250);
		this.ctx.fillText("Player Controls",200,300);
		this.ctx.fillText("Help",200,350);
		this.ctx.fillStyle='yellow';
		this.ctx.fillText("(The Control Scheme has been changed)",150,450);
	}

	selectScreen(){
		this.ctx.fillStyle="black";
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.fillStyle='red';
		this.ctx.font="30px Comic Sans MS";
		this.ctx.fillText("Select Number of Players",150,200);
		this.ctx.fillStyle='white';
		this.ctx.font="15px Comic Sans MS";
		this.ctx.fillText("1 Player",250,250);
		this.ctx.fillText("2 Player",250,300);
		this.ctx.fillText("Press 'space' to Start",200,350);
	}

	controlScreen(){
		this.ctx.fillStyle="black";
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.fillStyle='red';
		this.ctx.font="30px Comic Sans MS";
		this.ctx.fillText("Player Controls",150,200);
		this.ctx.fillStyle='white';
		this.ctx.font="15px Comic Sans MS";
		this.ctx.fillText("1 Player",250,250);
		this.ctx.fillText("Movement - ",100,300);
		this.ctx.fillText("8, 5, 4, 6 (Number Pad)",200,300);
		this.ctx.fillText("Shoot - Press > ",100,350);
		this.ctx.fillText("Bomb - Press <",250,350);
		this.ctx.fillText("2 Player",250,400);
		this.ctx.fillText("Movement - ",100,450);
		this.ctx.fillText("U, J, H, K",200,450);
		this.ctx.fillText("Shoot - Press S ",100,500);
		this.ctx.fillText("Bomb - Press A",250,500);
		this.ctx.fillText("Press 'space' to Back",200,550);
		// this.ctx.fillText("2 Player",350,250);
		// this.ctx.fillText("Press 'space' to go Back",200,350);
	}

	deadScreen(scores,player_score){
		this.ctx.fillStyle="black";
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.fillStyle='red';
		this.ctx.font="30px Comic Sans MS";
		this.ctx.fillText("Salute to the Dead",150,200);
		this.ctx.fillStyle='white';
		this.ctx.font="15px Comic Sans MS";
		this.ctx.fillText("High Score : " + scores[scores.length-1],230,250);
		var y=290;
		for(var i=4;i>=0;i--){
			if(scores[i]==player_score){
					this.ctx.fillStyle="yellow";
					this.ctx.fillText(scores[i],260,y);
					this.ctx.fillStyle="white";
			}else{
				this.ctx.fillText(scores[i],260,y);
			}
			y=y+40;
		}
		this.ctx.fillText("Press 'space' to restart",200,500);
	}
}
