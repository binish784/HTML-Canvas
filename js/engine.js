class Engine{

	constructor(frame_rate,update,render){
		this.screen=0;
		this.now_time=0;
		this.last_time=undefined;
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
		}else{
			this.handleScreen();
		}
	}

	getTimestamp(){
		if(window.performance && window.performance.now()){
			return window.performance.now();
		}else{
			return new Date().getTime();
		}
	}

	handleScreen(){
		switch(this.screen){
			case 0:
				display.startScreen();
				switch(this.start_option) {
						case 0:
							game.world.players[0].sprite.render(display.ctx,150,230);
							// display.drawRectangle(180,240,10,10,"blue");
							break;
						case 1:
							game.world.players[0].sprite.render(display.ctx,150,280);
							break;
						case 2:
							game.world.players[0].sprite.render(display.ctx,150,330);
							break;
					}
				break;
			case 1:
				display.selectScreen();
				if(this.player_num==1){
					game.world.players[0].sprite.render(display.ctx,200,230);
				}else{
					game.world.players[0].sprite.render(display.ctx,150,280);
					game.world.players[1].sprite.render(display.ctx,200,280);
					// display.drawRectangle(220,290,10,10,"green");
					// display.drawRectangle(200,290,10,10,"blue");
				}
				break;
			case 2:
				display.controlScreen();
				break;
		}

	}

	start(){
		this.last_time=this.getTimestamp();
		this.animator=window.requestAnimationFrame(function(){
			this.run();
		}.bind(this));
	}

	stop(){
		if(window.cancelAnimationFrame(this.animator)){
			console.log("canacelleed");
		}else{
			console.log("Cancel Failed");
		}
	}

}
