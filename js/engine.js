class Engine{

	constructor(frame_rate,update,render){
		this.screen=0;
		this.now_time=0;
		this.last_time=0;
		this.player_num=1;
		this.start_option=0;
		this.update=update;
		this.updated=false;
		this.render=render;
		this.game_start=false;
		this.animator=undefined;
		this.accumulated_time=0;
		this.frame_rate=frame_rate;

		console.log("Engine Initialized");
	}

	run(){
		if(this.game_start){
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
		switch(this.screen){
			case 0:
				display.startScreen();
				switch (this.start_option) {
					case 0:
						display.drawRectangle(180,240,10,10,"blue");
						break;
					case 1:
						display.drawRectangle(180,290,10,10,"blue");
						break;
					case 2:
						display.drawRectangle(180,340,10,10,"blue");
						break;
				}
				break;
			case 1:
				display.selectScreen();
				if(this.player_num==1){
					display.drawRectangle(220,240,10,10,"blue");
				}else{
					display.drawRectangle(220,290,10,10,"green");
					display.drawRectangle(200,290,10,10,"blue");
				}
				break;
			case 2:
				display.controlScreen();
				break;
		}
			if(this.game_start){
				this.animator=window.requestAnimationFrame(function(){
					this.run();
				}.bind(this));
			}
		}

	stop(){
		if(window.cancelAnimationFrame(this.animator)){
			console.log("canacelleed");
		}else{
			console.log("Cancel Failed");
		}
	}

}
