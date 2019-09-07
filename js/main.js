var canvas=document.querySelector("canvas");
var frame_rate=1000/30;

var display= new Display(canvas);

var game = new Game(1);

var players=game.world.players;

var controller = new Controller();

var sound= new Sound();

function startNewGame(num_of_players){
	display = new Display(canvas);
	game= new Game(num_of_players);
	players= game.world.players;
	controller=new Controller();
}

function renderBombs(){
	game.world.bombs.forEach(function(bomb,index){
		// display.drawRectangle(bomb.x,bomb.y,bomb.width,bomb.height,bomb.color);
		bomb.sprite.render(display.ctx,bomb.x,bomb.y);
		bomb.bombTick();
		if(bomb.timer==0){
			console.log("Explosion");
			this.game.world.explodeBomb(bomb);
		}
	})
}

function renderFires(){
	game.world.fires.forEach(function(fire,index){
		// display.drawRectangle(fire.x,fire.y,fire.width,fire.height,fire.color);
		fire.sprite.render(display.ctx,fire.x,fire.y);
		fire.fireTick();
		if(fire.timer==0){
			console.log("Exhaust Fire " +index);
			this.game.world.removeFire(index);
		}
	})
}


function renderBullets(){
	// console.log(game.world.bullets.length);
	game.world.bullets.forEach(function(bullet,index){
		// console.log(bullet);
		display.drawRectangle(bullet.x,bullet.y,bullet.width,bullet.height,bullet.color);
	})
}

function renderBoss(){
	game.world.boss.forEach(function(enemy,index){
		// if(enemy.armor_enable){
		// 	display.drawRectangle(enemy.x-10,enemy.y-10,enemy.width+20,enemy.height+20,enemy.armor_color);
		// }
		// display.drawRectangle(enemy.x,enemy.y,enemy.width,enemy.height,enemy.color);
		enemy.sprite.render(display.ctx,enemy.x,enemy.y);
	})
}

function renderAirEnemies(){
	game.world.airEnemies.forEach(function(enemy,index){
		enemy.sprite.render(display.ctx,enemy.x,enemy.y);
	})
	game.world.kamikaze.forEach(function(enemy,index){
		enemy.sprite.render(display.ctx,enemy.x,enemy.y);
	})
}

function renderGroundEnemies(){
	game.world.groundEnemies.forEach(function(enemy,index){
		display.drawRectangle(enemy.x,enemy.y,enemy.width,enemy.height,enemy.color);
	})
}

function renderPlayer(){
	// if(player.armor_enable && player.armor>0){
	// 	display.drawRectangle(player.x-10,player.y-10,player.width+20,player.height+20,player.armor_color);
	// }
	for(var i=0;i<game.world.player_count;i++){
		players[i].sprite.render(display.ctx,players[i].x,players[i].y);
	}
}

function renderStatus(){
	for(var i=0;i<game.world.player_count;i++){
		var x=30;
		if(players[i].health>0){
			display.showText("Health : " + players[i].health,i*400+30,30);
			display.showText("Bomb : " + game.world.players[i].NUM_OF_BOMBS,i*400+30,60);
		}else{
			display.showText("Player Dead",i*400+30,30);
		}
	}
	display.showText("Score : " + game.world.score,250,30);
}

message_time=250;
message="";
message_enabled=false;
function renderMessage(){
	if(message_time>0 && message_enabled){
		display.showText(message,220,220);
		message_time--;
	}else{
		message_enabled=false;
	}
}

function renderConsumables(){
	game.world.consumables.forEach(function(item,index){
		display.drawRectangle(item.x,item.y,item.width,item.height,item.color);
	})
}

var render=function(){
	display.fill(game.world.background_color);
	renderStatus();
	if(game.world.fires.length>0){
		renderFires();
	}
	renderBullets();
	renderGroundEnemies();
	renderBombs();
	renderConsumables();
	renderBoss();
	renderAirEnemies();
	renderMessage();
	renderPlayer();
	// console.log(player.x,player.y);
}

var update=function(){
	var all_dead=false;
	var player_num=game.world.player_count;
	if(player_num==1 && players[0].health<=0){
		all_dead=true;
	}else if(player_num==2 && players[1].health<=0 && players[0].health<=0){
		all_dead=true;
	}
	if(all_dead){
			var highScore=JSON.parse(localStorage.getItem('highScores')) || [0,0,0,0,0] ;
			highScore=highScore.sort(function(a,b){return (a-b);});
			if (game.world.score>=highScore[0]){
					highScore[0]=game.world.score;
					highScore=highScore.sort(function(a,b){return (a-b);});

					localStorage.setItem('highScores',JSON.stringify(highScore));
        }
        highScore=JSON.parse(localStorage.getItem('highScores'));
			engine.game_start=false;
			engine.screen=5;
			display.deadScreen(highScore,game.world.score);
	}

	if(controller.left.active){
		players[0].sprite.update(-1);
		players[0].moveLeft();
	}
	if(controller.right.active){
		players[0].sprite.update(1);
		players[0].moveRight();
	}
	if(controller.up.active){
		players[0].moveUp();
	}
	if(controller.down.active){
		players[0].moveDown();
	}
	if(!(controller.left.active || controller.right.active || controller.up.active || controller.down.active)){
		// console.log("Player Idle");
		players[0].sprite.stayIdle();
	}

if(players.length==2){
	if(controller.left2.active){
		players[1].sprite.update(-1);
		players[1].moveLeft();
	}
	if(controller.right2.active){
		players[1].sprite.update(1);
		players[1].moveRight();
	}
	if(controller.up2.active){
		players[1].moveUp();
	}
	if(controller.down2.active){
		players[1].moveDown();
	}
	if(!(controller.left2.active || controller.right2.active || controller.up2.active || controller.down2.active)){
		// console.log("Player Idle");
		players[1].sprite.stayIdle();
	}
}

	game.update();
}


window.addEventListener("keydown",function(event){
	controller.handleKeyDownUp(event);
})

window.addEventListener("keyup",function(event){
	controller.handleKeyDownUp(event);
})

var engine = new Engine(frame_rate,render,update);

engine.start();
