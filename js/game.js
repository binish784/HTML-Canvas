
class Game{
	constructor(){
		this.world={
			background_color:"rgb(0,0,0)",
			height:150,
			width:300,
	
			player:new Player(150,120,"#00FF00",true),
			airEnemies:new Array(new Player(50,10,"#DDEE11",false),new Player(100,30,"#DDEE11",false),new Player(200,50,"#DDEE11",false)),
			groundEnemies:new Array(new turrent(20,90),new turrent(230,45)),
			bombs:new Array(),
			fires:new Array(),
			bullets:new Array(),

			collideObject:function(object){
				if(object.x<0){
					object.x=0;
					object.x_velocity=0;
				}else if(object.x+object.width>this.width){
					object.x=this.width-object.width;
					object.x_velocity=0;
				}
				if(object.y<0){
					object.y=0;
					object.y_velocity=0;
				}else if(object.y+object.height>this.height){
					object.y=this.height-object.height;
					object.y_velocity=0;
				}
			},

			bulletCollision:function(bullet){
				this.airEnemies.forEach(function(enemy,index){
					if((bullet.y<(enemy.y+enemy.height)&&(bullet.y>enemy.y)) && ((bullet.x<=(enemy.x+enemy.width) && (bullet.x>=enemy.x)))){
						this.removeBullet(bullet);
						enemy.bulletDamage();
					}
				}.bind(this));
				if(((bullet.y>this.player.y) && bullet.y<(this.player.y+this.player.height)) && (bullet.x<=(this.player.x+this.player.width) && (bullet.x>=this.player.x))) {
					this.removeBullet(bullet);
					this.player.bulletDamage();
					console.log("Health : " + this.player.health);
				}
			},

			triggerBullet:function(x,y,direction,isTurrent){
				if(!isTurrent){
					if(direction){
						y=y-1;
					}else{
						y=y+1;
					}
				}
				// console.log("Trigger " + direction);
				var bullet=new Bullet(x,y,direction,isTurrent);
				this.bullets.push(bullet);
			},

			plantBomb:function(x,y){
				var bomb= new Bomb(x,y);
				this.bombs.push(bomb);
				console.log("Planted at ",x,y );
			},

			explodeBomb:function(bomb){
				var index=this.bombs.indexOf(bomb);
				var fire= new Fire(bomb.x,bomb.y);
				this.bombs=this.bombs.filter(function(val,ind){
					return(index!=ind);
				});
				this.fires.push(fire);
				this.groundEnemies=this.groundEnemies.filter(function(enemy,index){
					return  !((
						(enemy.x+enemy.width)>=(fire.x) && 
						(enemy.x<=fire.x+fire.width) &&
						(enemy.y+enemy.height)>=(fire.y) &&
						(enemy.y<=fire.y+fire.height)))
				})
			},

			removeFire:function(index){
				this.fires=this.fires.filter(function(val,ind){
					return(index!=ind);
				});
			},

			enemyControls:function(){
				this.airEnemies.forEach(function(enemy,index){
					if((Math.abs(enemy.x-this.player.x)<=this.player.width) && (enemy.y<this.player.y)){
						enemy.shootBullet();
					}
					let shift=this.getRandomMoveShift(enemy);
					let x_shift=shift[0];
					let y_shift=shift[1];
					if(x_shift==-1) enemy.moveLeft();
					else if(x_shift==1) enemy.moveRight();
					if(y_shift==-1) enemy.moveUp();
					else if(y_shift==1) enemy.moveDown();

				}.bind(this));
				this.groundEnemies.forEach(function(enemy,index){
					if(Math.abs(enemy.y-this.player.y)<=this.player.height){
						enemy.shootBullet();
					}
				}.bind(this))
			},

			getRandomMoveShift:function(enemy){
				let shift=[];
				if(Math.abs(enemy.x-this.player.x)>100){
					if(enemy.x>this.player.x){
						shift.push(-1);
					}
					else{
						shift.push(1);
					}	
				}else{
					if(Math.random()<=0.5){
						shift.push(Math.floor(Math.random() * 2)+1);
					}else{
						shift.push(Math.floor(Math.random() * 2)-1);
					}	
				}
				if(enemy.y>=(this.player.y-25)){
					shift.push(-1);	
				}
				else if(enemy.y<=this.player.y-100){
					shift.push(1);
				}
				else{
					if(Math.random()<0.5){
						shift.push(Math.floor(Math.random() * 2)-1);
					}else{
						shift.push(Math.floor(Math.random() * 2)+1);
					}	
				}
				return shift;
			},


			removeBullet:function(bullet){
				var index=this.bullets.indexOf(bullet);
				this.bullets=this.bullets.filter(function(val,ind){
						return(index!=ind);
					});
				},

			clearTheDead:function(){
				this.airEnemies=this.airEnemies.filter(function(enemy,index){
					return (enemy.health>0);
				})
				if(this.player.health<=0){
					console.log("Dead");
				}
			},

			update:function(){
				this.collideObject(this.player);
				this.enemyControls();
				this.bullets.forEach(function(bullet,index){
					this.bulletCollision(bullet);
					if(bullet.isTurrent){
						bullet.moveSide();
					}else{
						bullet.moveForward();
					}

					if((bullet.y>150 || bullet.y<(-150)) && !bullet.isTurrent){
						this.removeBullet(bullet);
					}else if((bullet.x>320 || bullet.x<(-320)) && bullet.isTurrent){
						this.removeBullet(bullet);
					}

				}.bind(this));
				this.player.TickWarm();
				this.airEnemies.forEach(function(enemy,index){
					enemy.TickWarm();
				})
				this.groundEnemies.forEach(function(enemy,index){
					enemy.TickWarm();
				})
				this.clearTheDead();
			},


		};

		console.log("Game Initialized");
	}

	update(){
		this.world.update();
	};

};

class Bomb{
	constructor(x,y){
		this.x=x+2;
		this.y=y+2;
		this.color="#EE0000";
		this.height=5;
		this.timer=120;
		this.width=10;
		this.flag=true;
	}

	bombTick(){
		if(this.timer%10==0){
			if(this.flag){
				this.height=8;
				this.width=12;
				this.x-=1;
				this.y-=1;
				this.flag=false;
			}else{
				this.x+=1;
				this.y+=1;
				this.height=5;
				this.width=10;
				this.flag=true;
			}
		}
		this.timer--;
	}
}

class Bullet{
	constructor(x,y,direction,isTurrent){
		this.x=x;
		this.y=y;
		this.x_velocity=4;
		this.y_velocity=2;
		if(isTurrent){
			this.height=1;
		}else{
			this.height=3;
		}
		this.width=2;
		this.isTurrent=isTurrent || false;
		this.color="#FFFFFF";
		this.direction=direction;
	}
	moveForward(){
		if(this.direction){
			this.y-=this.y_velocity;
		}else{
			this.y+=this.y_velocity;
		}
	}
	moveSide(){
		if(this.direction){
			// console.log("Bullet moving right");
			this.x+=this.x_velocity;
		}else{
			// console.log("Bullet moving left");
			this.x-=this.x_velocity;
		}
	}
}

class turrent{
	constructor(x,y){
		this.x=x;
		this.y=y;
		this.color="#ff8c08";
		this.height=5;
		this.width=10;
		this.warm_counter=0;
		this.GUN_WARM=5;
		this.ammo=5;
		if(this.x>(300/2)){//fix this 
			this.direction=false;
		}else{
			this.direction=true;
		}
	}

	shootBullet(){
		if(this.warm_counter==0){
			//gun ready to fire
			if(this.direction){
				//trigger gun left
				game.world.triggerBullet(this.x-2,this.y+(this.height/2),this.direction,true);
			}else{
				//trigger gun right
				game.world.triggerBullet(this.x+2,this.y+(this.height/2),this.direction,true);
			}
			this.ammo--;
			//reset counter
			if(this.ammo==0){
				this.warm_counter=30;		
				this.ammo=5;
			}else{
				this.warm_counter=this.GUN_WARM;	
			}
		}
	}

	TickWarm(){
		//tick the gun counter
		if(this.warm_counter>0){
			this.warm_counter--;
		}
	}
}

class Player{
	constructor(x,y,color,direction){
		this.health=100;
		this.x=x;
		this.y=y;
		this.x_velocity=0;
		this.y_velocity=0;
		this.height=10;
		this.width=15;
		this.color=color;
		this.warm_counter=0;
		this.direction=direction;
		if(direction){
			this.GUN_WARM=25;
		}else{
			this.GUN_WARM=50;//30;
		}
	}
	
	shootBullet(){
		if(this.warm_counter==0){
			//gun ready to fire
			if(this.direction){
				//trigger gun up
				game.world.triggerBullet(this.x+this.width/2,this.y,this.direction,false);
			}else{
				//trigger gun down
				game.world.triggerBullet(this.x+this.width/2,this.y+this.height,this.direction,false);
			}
			//reset counter
			this.warm_counter=this.GUN_WARM;	
		}
	}

	TickWarm(){
		//tick the gun counter
		if(this.warm_counter>0){
			this.warm_counter--;
		}
	}
	bulletDamage(){
		this.health-=10;
	}
	moveLeft(){
		this.x+=-1;
	}
	moveRight(){
		this.x+=1;
	}
	moveUp(){
		this.y+=-1;
	}
	moveDown(){
		this.y+=1;
	}
}

class Fire{
	constructor(x,y){
		this.color="#111199";
		this.x=x-15;
		this.y=y-8;
		this.timer=100;
		this.height=20;
		this.width=40;
	}
	fireTick(){
		this.timer--;
	}
}
