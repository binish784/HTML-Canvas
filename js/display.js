class Display{
	constructor(canvas){
		this.canvas=canvas;
		this.canvas.style.height="600px";
		this.canvas.style.width="600px";
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

	showText(text){
		this.ctx.fillStyle="white";
		this.ctx.font="8px Comic Sans MS"
		this.ctx.fillText(text,240,145);
	}

}