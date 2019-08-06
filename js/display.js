class Display{
	constructor(canvas){
		this.canvas=canvas;
		this.canvas.style.height="600px";
		this.canvas.style.width="600px";
		// this.canvas.style.height=(document.documentElement.clientHeight-50) +"px";
		// this.canvas.style.width=(document.documentElement.clientWidth-50)+"px";
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

}