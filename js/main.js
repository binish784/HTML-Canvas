var canvas=document.querySelector("canvas");
var frame_rate=1000/30;


var display= new Display(canvas);

var game = new Game();

var player=game.world.player;

var controller = new Controller();

var render=function(){
	display.fill(game.world.background_color);
	game.world.bombs.forEach(function(bomb,index){
		display.drawRectangle(bomb.x,bomb.y,bomb.width,bomb.height,bomb.color);
	})
	display.drawRectangle(player.x,player.y,player.width,player.height,player.color);
	console.log(player.x,player.y);
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