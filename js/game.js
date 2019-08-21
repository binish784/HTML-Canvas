
class Game{
	constructor(){
		this.world={
			score:0,
			width:600,
			height:600,
			bombs:new Array(),
			fires:new Array(),
			bullets:new Array(),
			kamikazeActive:true,
			consumables:new Array(),
			player:new Player(350,500),
			background_color:"rgb(0,0,0)",
			groundEnemies:new Array(new Turrent(50,50),new Turrent(450,150)),
			airEnemies:new Array(new Enemy(150,150),new Enemy(250,100),new Enemy(500,150)),
			kamikaze:new Array(new Kamikaze(10,-1500),new Kamikaze(250,-1500),new Kamikaze(550,-1500)),
				
			collideKamikaze:function(){
				this.kamikaze.forEach(function(enemy,index){
					if((enemy.x+enemy.width>=player.x) && (enemy.x<=player.x+player.width) && (enemy.y+enemy.height>=player.y) && (enemy.y<=player.y+player.height)){
						enemy.health=0;
						player.y+=5;
						player.kamikazeDamage();
					}
				})
				this.kamikaze=this.kamikaze.filter(function(enemy,index){
					return (enemy.health>0);
				})
			},

			consumeItems:function(){
				this.consumables.forEach(function(item,index){
					if((item.x+item.width>=player.x) && (item.x<=player.x+player.width) && (item.y+item.height>=player.y) && (item.y<=player.y+player.height)){
						item.consume(player);
					}
				})
				this.consumables=this.consumables.filter(function(item,index){
					return (!item.consumed);
				})	
			},

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
				if(bullet.direction){
					this.airEnemies.forEach(function(enemy,index){
							if((bullet.y<(enemy.y+enemy.height)&&(bullet.y>enemy.y)) && ((bullet.x<=(enemy.x+enemy.width) && (bullet.x>=enemy.x)))){
								this.removeBullet(bullet);
								bullet.damage(enemy);
								enemy.bulletDamage();
								if(enemy.health<=0){
									this.score+=50;
								}
							}
					}.bind(this));
					this.kamikaze.forEach(function(enemy,index){
						if((bullet.y<(enemy.y+enemy.height)&&(bullet.y>enemy.y)) && ((bullet.x<=(enemy.x+enemy.width) && (bullet.x>=enemy.x)))){
							this.removeBullet(bullet);
							bullet.damage(enemy);
							enemy.bulletDamage();
							if(enemy.health<=0){
								this.score+=75;
							}
						}
					}.bind(this));
				}
				if(((bullet.y>this.player.y) && bullet.y<(this.player.y+this.player.height)) && (bullet.x<=(this.player.x+this.player.width) && (bullet.x>=this.player.x))) {
					this.removeBullet(bullet);
					bullet.damage(this.player);
					this.player.bulletDamage();
				}
			},

			triggerBullet:function(x,y,direction,isTurrent,doubleDamage){
				if(!isTurrent){
					if(direction){
						y=y-1;
					}else{
						y=y+1;
					}
					var bullet=new Bullet(x,y,direction,isTurrent,0,doubleDamage);
				}else{
					var dx=x-(player.x+player.width/2);
					var dy=y-(player.y+player.width/2);
					var angle=Math.atan2(dy,dx) - Math.PI;
					var bullet=new Bullet(x,y,direction,isTurrent,angle,false);
				
				}
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
					enemy.shootBullet();
				}.bind(this))
				this.kamikaze.forEach(function(enemy,index){
					if((Math.abs(enemy.x-this.player.x)<=this.player.width) && (enemy.y<this.player.y)){
						enemy.shootBullet();
					}
					enemy.move();
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
					if(enemy.health<=0){
						this.generateConsumables(0.5,enemy.x,enemy.y);
					}
					return (enemy.health>0);
				}.bind(this))	

				this.kamikaze=this.kamikaze.filter(function(enemy,index){
					if(enemy.health<=0){
						this.generateConsumables(0.4,enemy.x,enemy.y);
					}
					return(enemy.y<=this.height+200);
				}.bind(this));

				this.consumables=this.consumables.filter(function(item,index){
					return(item.life>0);
				})

			},

			generateConsumables(freq,x,y){
				if(Math.random()<=freq){
					if(Math.random()<=0.2){
						this.consumables.push(new doubleDamage(x,y));
					}else if(Math.random()<=0.7){
						this.consumables.push(new healthPower(x,y));
					}else {
						this.consumables.push(new doubleBullet(x,y));
					}
				}
			},

			generateAirEnemies(){
				if(this.airEnemies.length==0){
					var number=this.getRandomNum(3,6);
					for(var i=1;i<=number;i++){
						this.airEnemies.push(new Enemy(Math.floor((this.width/number)*i-50),-(this.getRandomNum(200,600))));
					}
				}
			},

			tickGunTimer:function(){

				this.player.TickWarm();
				this.airEnemies.forEach(function(enemy,index){
					enemy.TickWarm();
				})
				this.groundEnemies.forEach(function(enemy,index){
					enemy.TickWarm();
				})
				this.kamikaze.forEach(function(enemy,index){
					enemy.TickWarm();
				})
				
			},

			summonKamikaze:function(){
				if(this.kamikazeActive){
					if(this.kamikaze.length==0){
						for(var  i=1;i<=4;i++){
							let newKami=new Kamikaze(this.getRandomNum(10,120)*i,-(this.getRandomNum(1500,2000)));
							this.kamikaze.push(newKami);
						}
					}
				}
			},

			bulletControls:function(){
				this.bullets.forEach(function(bullet,index){
					this.bulletCollision(bullet);
					if(bullet.isTurrent){
						bullet.fromTurrent();
					}else{
						bullet.moveForward();
					}

					if((bullet.y>this.height+10 || bullet.y<(-this.height-10)) || bullet.x>this.width+10 || bullet.x<(-this.width-10)){
						this.removeBullet(bullet);
					}
					
				}.bind(this));
			},

			getRandomNum:function(min,max){
				var max=Math.floor(max);
				var min=Math.ceil(min);
				return Math.floor(Math.random()*(max-min)+min);
			},

			moveConsumables:function(){
				this.consumables.forEach(function(item,index){
					item.checkCollision(this.height,this.width);
				}.bind(this))
			},

			update:function(){
				this.collideObject(this.player);
				this.collideKamikaze();
				this.enemyControls();
				this.bulletControls();
				this.tickGunTimer();
				this.clearTheDead();
				this.summonKamikaze();
				this.consumeItems();
				this.moveConsumables();
				this.generateAirEnemies();
			},


		};

		console.log("Game Initialized");
	}

	update(){

		this.world.update();
		
	};

};

