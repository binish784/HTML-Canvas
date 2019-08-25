class Engine{

	constructor(frame_rate,update,render){
		this.now_time=0;
		this.last_time=0;
		this.update=update;
		this.updated=false;
		this.render=render;
		this.animator=undefined;
		this.accumulated_time=0;
		this.frame_rate=frame_rate;
		console.log("Engine Initialized");
	}

	run(){
		this.now=this.getTimestamp();
		this.accumulated_time+=(this.last_time-this.now_time);
		if(this.accumulated_time>=this.frame_rate*3){
			this.accumulated_time=this.frame_rate;
		}
		while(this.accumulated_time>=this.frame_rate){
			this.accumulated_time-=this.frame_rate;
			this.update();
			this.updated=true;
		}
		if(this.updated){
			this.render();
			this.updated=false;
		}
		this.animator=window.requestAnimationFrame(function(){
			this.run();
		}.bind(this));
		this.last_time=this.now;	
	}


	getTimestamp(){
		if(window.performance && window.performance.now()){
			return window.performance.now();
		}else{
			return new Date().getTime();
		}
	}

	start(){
		this.last_time=this.getTimestamp();
		this.animator=window.requestAnimationFrame(function(){
			this.run();
		}.bind(this));
	}

	stop(){
		window.cancelAnimationFrame(this.animator);
	}

}
