var canvas=document.querySelector("canvas");
var frame_rate=1000/30;

var display= new Display(canvas);

var game = new Game();

var player=game.world.player;

var controller = new Controller();

var sound= new Sound();

function startNewGame(){
	display = new Display(canvas);
	game= new Game();
	player= game.world.player;
	controller=new Controller();
}

function renderBombs(){
	game.world.bombs.forEach(function(bomb,index){
		display.drawRectangle(bomb.x,bomb.y,bomb.width,bomb.height,bomb.color);
		bomb.bombTick();
		if(bomb.timer==0){
			console.log("Explosion");
			this.game.world.explodeBomb(bomb);
		}
	})
}

function renderFires(){
	game.world.fires.forEach(function(fire,index){
		display.drawRectangle(fire.x,fire.y,fire.width,fire.height,fire.color);
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
	player.sprite.render(display.ctx,player.x,player.y);
}

function renderStatus(){
	if(player.health>0){
		display.showText("Health : " + player.health,430,20);
		display.showText("Score : " + game.world.score,430,45);
		display.showText("Bomb : " + game.world.player.NUM_OF_BOMBS,430,65);
	}else{
		display.showText("Player Dead",480,20);
	}
}

message_time=150;
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

	if(game.world.player.health<=0){
			var highScore=JSON.parse(localStorage.getItem('highScores')) || [0,0,0,0,0] ;
			highScore=highScore.sort(function(a,b){return (a-b);});
			if (game.world.score>=highScore[0]){
					highScore[0]=game.world.score;
					highScore=highScore.sort(function(a,b){return (a-b);});

					localStorage.setItem('highScores',JSON.stringify(highScore));
        }
        highScore=JSON.parse(localStorage.getItem('highScores'));
			engine.game_start=false;
			display.deadScreen(highScore,game.world.score);
	}

	if(controller.left.active){
		player.sprite.update(-1);
		player.moveLeft();
	}
	if(controller.right.active){
		player.sprite.update(1);
		player.moveRight();
	}
	if(controller.up.active){
		player.moveUp();
	}
	if(controller.down.active){
		player.moveDown();
	}
	if(!(controller.left.active || controller.right.active || controller.up.active || controller.down.active)){
		console.log("Player Idle");
		player.sprite.stayIdle();
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
