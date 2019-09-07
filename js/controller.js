
class Controller{
	constructor(){
		console.log("Controller Initialized");
		this.up= new buttonInput();
		this.down=new buttonInput();
		this.left=new buttonInput();
		this.right=new buttonInput();

		this.up2= new buttonInput();
		this.down2=new buttonInput();
		this.left2=new buttonInput();
		this.right2=new buttonInput();
	}

	handleKeyDownUp(event){
		var down=false;
		if(event.type=='keydown'){
			console.log(event.keyCode)
			down=true;
			if(engine.screen==0){
				// && event.keyCode==32
				switch (event.keyCode){
					case 38:
						engine.start_option-=1;
						break;
					case 40:
						engine.start_option+=1;
						break;
				}
				if(engine.start_option<0){
					engine.start_option=2;
				}else if(engine.start_option>2){
					engine.start_option=0;
				}
				if(engine.start_option==0 && event.keyCode==32){
					engine.screen=1;
				}else if(engine.start_option==1 && event.keyCode==32){
					engine.screen=2;
				}
				engine.start();
			}
			else if(engine.game_start==false && engine.screen==1){
					switch(event.keyCode){
						case 32:
							engine.game_start=true;
							startNewGame(engine.player_num);
							break;
						case 38:
							engine.player_num=1;
							break;
						case 40:
							engine.player_num=2;
							break;
					}
				engine.start();
			}else if(engine.game_start==false && engine.screen==5 && event.keyCode==32){
				engine.screen=1;
				engine.start();
			}else if( engine.screen==2 && event.keyCode==32){
				engine.screen=0;
				engine.start();
			}
			else if(event.keyCode==188 && game.world.players[0].health>0){
				game.world.players[0].plantBomb();
			}
			else if(event.keyCode==65 && game.world.player_count==2){
				if(game.world.players[1].health>0){
					game.world.players[1].plantBomb();
				}
			}
			else if(event.keyCode==32 && engine.screen==5){
				console.log("New Game start");
				startNewGame();
			}

		}

		switch(event.keyCode){
			case 104:this.up.getInput(down);break;
			case 101:this.down.getInput(down);break;
			case 100:this.left.getInput(down);break;
			case 102:this.right.getInput(down);break;
			case 190:game.world.players[0].shootBullet();break;
		 	case 191:game.world.players[0].sniperShot();break;

			case 85:this.up2.getInput(down);break;
			case 74:this.down2.getInput(down);break;
			case 72:this.left2.getInput(down);break;
 			case 75:this.right2.getInput(down);break;
 			case 83:
					if(game.world.player_count==2){
						game.world.players[1].shootBullet();break;
					}
					break;
			case 68:
				if(game.world.player_count==2){
					game.world.players[1].sniperShot();break;
	 		 	}
				break;
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
