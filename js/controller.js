
class Controller{
	constructor(){
		console.log("Controller Initialized");
		this.up= new buttonInput();
		this.down=new buttonInput();
		this.left=new buttonInput();
		this.right=new buttonInput();
	}

	handleKeyDownUp(event){
		var down=false;
		if(event.type=='keydown'){
			down=true;
			if(engine.game_start==false && event.keyCode==32){
				engine.game_start=true;
				engine.start();
				startNewGame();
				console.log("Start");
			}
			else if(event.keyCode==32 && game.world.player.health>0){
				game.world.player.plantBomb();
			}
			else if(event.keyCode==32 && game.world.player.health<=0){
				console.log("New Game start");
				startNewGame();
			}

		}

		switch(event.keyCode){
			case 37:this.left.getInput(down);break;
			case 38:this.up.getInput(down);break;
			case 39:this.right.getInput(down);break;
			case 40:this.down.getInput(down);break;
			case 90:game.world.player.shootBullet();break;
		 	case 88:game.world.player.sniperShot();break;
		 }
		// console.log(event.keyCode  + " Pressed");
	};

}


class buttonInput{
	constructor(){
		this.active=false;
		this.down = false;
	}

	getInput(down){
		if(this.down!=down){
			this.active=down;
		}
		this.down=down;
	}
}
