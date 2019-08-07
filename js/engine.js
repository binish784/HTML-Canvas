class Engine{
	constructor(frame_rate,render,update){
		this.frame_rate=frame_rate;
		this.accumulated_time=0;
		this.animator=undefined;
		this.render=render;
		this.update=update;
		this.time=undefined;
		this.updated=true;

		console.log("Engine Initialized");
	}

	handleRun(){
		//each frame run
		this.accumulated_time+=(this.frame_rate-this.time);
		this.time=this.time-this.frame_rate;
		if(this.accumulated_time>=this.frame_rate*3){
			this.accumulated_time=this.frame_rate;
		}

		while(this.accumulated_time>=this.frame_rate){
			this.accumulated_time-=this.frame_rate;
			this.update();
			this.updated=true;
		}
		
		if(this.updated){
			this.updated=false;
			this.render();
		}
		this.animator=window.requestAnimationFrame(function(){
			this.handleRun();
		}.bind(this));
	}

	start(){
		this.accumulated_time=this.frame_rate;
		this.time=window.performance.now();
		this.animator=window.requestAnimationFrame(function(){
			this.handleRun();
		}.bind(this));
	}

	stop(){
		window.cancelAnimationFrame(this.animator);
	}

}