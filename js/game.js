
class Game{
	constructor(){
		this.world={
			background_color:"rgb(0,0,0)",
			height:600,
			width:600,
			player:new Player(350,500,"#00FF00",true),
			airEnemies:new Array(new Player(50,10,"#DDEE11",false),new Player(500,150,"#DDEE11",false),new Player(200,50,"#DDEE11",false)),
			groundEnemies:new Array(new turrent(20,90),new turrent(400,400)),
			bombs:new Array(),
			fires:new Array(),
			bullets:new Array(),

			collideObject:function(object){
				if(object.x<0){
					object.x=0;
				}else if(object.x+object.width>this.width){
					object.x=this.width-object.width;
				}
				if(object.y<0){
					object.y=0;
				}else if(object.y+object.height>this.height){
					object.y=this.height-object.height;
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
				if(Math.abs(enemy.x-this.player.x)>500){
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
				else if(enemy.y<=this.player.y-400){
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

					if((bullet.y>this.height+50 || bullet.y<(-this.height-50)) && !bullet.isTurrent){
						this.removeBullet(bullet);
					}else if((bullet.x>this.width+50 || bullet.x<(-this.width-50)) && bullet.isTurrent){
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

