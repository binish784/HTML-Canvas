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
		if(enemy.armor_enable){
			display.drawRectangle(enemy.x-10,enemy.y-10,enemy.width+20,enemy.height+20,enemy.armor_color);
		}
		display.drawRectangle(enemy.x,enemy.y,enemy.width,enemy.height,enemy.color);
	})
}

function renderAirEnemies(){
	game.world.airEnemies.forEach(function(enemy,index){
		display.drawRectangle(enemy.x,enemy.y,enemy.width,enemy.height,enemy.color);
	})
	game.world.kamikaze.forEach(function(enemy,index){
		display.drawRectangle(enemy.x,enemy.y,enemy.width,enemy.height,enemy.color);
	})
}

function renderGroundEnemies(){
	game.world.groundEnemies.forEach(function(enemy,index){
		display.drawRectangle(enemy.x,enemy.y,enemy.width,enemy.height,enemy.color);
	})
}

function renderPlayer(){
	if(player.armor_enable && player.armor>0){
		display.drawRectangle(player.x-5,player.y-5,player.width+10,player.height+10,player.armor_color);
	}
	display.drawRectangle(player.x,player.y,player.width,player.height,player.color);
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
	renderPlayer();
	// console.log(player.x,player.y);
}

var update=function(){

	if(game.world.player.health<=0){
			var highScore=JSON.parse(localStorage.getItem('highScores')) || 0;
		    if (game.world.score>=highScore){
	        	localStorage.setItem('highScores',JSON.stringify(game.world.score));
	        }
	        highScore=localStorage.getItem('highScores');
			display.deadScreen(highScore);
	}

	if(controller.left.active){
		player.moveLeft();
	}
	if(controller.right.active){
		player.moveRight();
	}
	if(controller.up.active){
		player.moveUp();
	}
	if(controller.down.active){
		player.moveDown();
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
