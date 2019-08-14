var canvas=document.querySelector("canvas");
var frame_rate=1000/30;


var display= new Display(canvas);

var game = new Game();

var player=game.world.player;

var controller = new Controller();



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

function renderAirEnemies(){
	game.world.airEnemies.forEach(function(enemy,index){
		display.drawRectangle(enemy.x,enemy.y,enemy.width,enemy.height,enemy.color);
	})
}

function renderGroundEnemies(){
	game.world.groundEnemies.forEach(function(enemy,index){
		display.drawRectangle(enemy.x,enemy.y,enemy.width,enemy.height,enemy.color);
	})
}

function renderPlayer(){
	display.drawRectangle(player.x,player.y,player.width,player.height,player.color);
}

function renderHealth(){
	if(player.health>0){
		display.showText("Health : " + player.health);		
	}else{
		display.showText("Player Dead");			
	}
}

var render=function(){
	display.fill(game.world.background_color);
	renderHealth();
	renderBombs();
	if(game.world.fires.length>0){
		renderFires();
	}
	renderBullets();
	renderAirEnemies();
	renderGroundEnemies();
	renderPlayer();
	// console.log(player.x,player.y);
}

var update=function(){

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