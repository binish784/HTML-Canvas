
class Game{
	constructor(player_num){
		this.world={
			score:0,
			width:600,
			height:600,
			map_speed:1,
			boss:new Array(),
			bossActive:false,
			bombs:new Array(),
			fires:new Array(),
			bullets:new Array(),
			kamikazeActive:true,
			kamikaze:new Array(),
			airEnemies:new Array(),
			consumables:new Array(),
			groundEnemies:new Array(),
			player_count:player_num || 1,
			background_color:"rgb(0,0,0)",
			players:[new Player(150,500,1),new Player(450,500,2)],

			collideKamikaze:function(){
				this.kamikaze.forEach(function(enemy,index){
					for(var i=0;i<this.player_count;i++){
						if((enemy.x+enemy.width>=players[i].x) && (enemy.x<=players[i].x+players[i].width) && (enemy.y+enemy.height>=players[i].y) && (enemy.y<=players[i].y+players[i].height)){
							enemy.health=0;
							players[i].y+=5;
							players[i].kamikazeDamage();
						}
					}
				}.bind(this))
				this.kamikaze=this.kamikaze.filter(function(enemy,index){
					return (enemy.health>0);
				})
			},

			consumeItems:function(){
				this.consumables.forEach(function(item,index){
					for(var i=0;i<this.player_count;i++){
						if((item.x+item.width>=players[i].x) && (item.x<=players[i].x+players[i].width) && (item.y+item.height>=players[i].y) && (item.y<=players[i].y+players[i].height)){
							item.consume(players[i]);
						}
					}
				}.bind(this))
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
									this.score+=enemy.kill_value;
								}
							}
					}.bind(this));
					this.boss.forEach(function(enemy,index){
							if((bullet.y<(enemy.y+enemy.height)&&(bullet.y>enemy.y)) && ((bullet.x<=(enemy.x+enemy.width) && (bullet.x>=enemy.x)))){
								this.removeBullet(bullet);
								bullet.damage(enemy);
								enemy.bulletDamage();
								if(enemy.health<=0){
									this.score+=enemy.kill_value;
								}
							}
					}.bind(this));
					this.kamikaze.forEach(function(enemy,index){
						if((bullet.y<(enemy.y+enemy.height)&&(bullet.y>enemy.y)) && ((bullet.x<=(enemy.x+enemy.width) && (bullet.x>=enemy.x)))){
							this.removeBullet(bullet);
							bullet.damage(enemy);
							enemy.bulletDamage();
							if(enemy.health<=0){
								this.score+=enemy.kill_value;
							}
						}
					}.bind(this));
				}
				for(var i=0;i<this.player_count;i++){
					if(!bullet.direction && ((bullet.y>this.players[i].y) && bullet.y<(this.players[i].y+this.players[i].height)) && (bullet.x<=(this.players[i].x+this.players[i].width) && (bullet.x>=this.players[i].x))) {
						this.removeBullet(bullet);
						bullet.damage(this.players[i]);
						this.players[i].bulletDamage();
					}
				}

			},

			triggerBullet:function(x,y,direction,isTurrent,doubleDamage,sniperShot){
				var sniper=sniperShot || false;
				if(!isTurrent){
					if(direction){
						y=y-1;
					}else{
						y=y+1;
					}
					var bullet=new Bullet(x,y,direction,isTurrent,0,doubleDamage,sniper);
				}else{
					var dx=99999;
					var dy=99999;
					for(var i=0;i<this.player_count;i++){
						var temp_x=x-(players[i].x+players[i].width/2);
						var temp_y=y-(players[i].y+players[i].width/2);
						if(temp_x<dx){
							dx=temp_x;
							dy=temp_y;
						}
					}
					var angle=Math.atan2(dy,dx) - Math.PI;
					var bullet=new Bullet(x,y,direction,isTurrent,angle,false,sniper);
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
				fire.sound.play();
				this.fires.push(fire);
				this.groundEnemies=this.groundEnemies.filter(function(enemy,index){
						if(((enemy.x+enemy.width)>=(fire.x) &&
							(enemy.x<=fire.x+fire.width) &&
							(enemy.y+enemy.height)>=(fire.y) &&
							(enemy.y<=fire.y+fire.height))){
								var busted=true;
								this.score+=enemy.kill_value;
							}else{
								var busted=false;
							}
					return  !(busted)
				}.bind(this));
			},

			removeFire:function(index){
				this.fires=this.fires.filter(function(val,ind){
					return(index!=ind);
				});
			},

			enemyControls:function(){
				this.airEnemies.forEach(function(enemy,index){
					if(enemy.spreadShot){
						enemy.shootBullet();
					}else{
						for(var i=0;i<this.player_count;i++){
							if((Math.abs(enemy.x-this.players[i].x)<=this.players[i].width) && (enemy.y<this.players[i].y)){
								enemy.shootBullet();
							}
						}

					}

					let shift=this.getRandomMoveShift(enemy);
					let x_shift=shift[0];
					let y_shift=shift[1];
					if(x_shift==-1) enemy.moveLeft();
					else if(x_shift==1) enemy.moveRight();
					if(y_shift==-1) enemy.moveUp();
					else if(y_shift==1) enemy.moveDown();

				}.bind(this));
				if(this.boss.length>0){
					this.boss.forEach(function(enemy,index){
						enemy.shootBullet();
						let shift=this.getRandomMoveShift(enemy);
						let x_shift=shift[0];
						let y_shift=shift[1];
						if(x_shift==-1) enemy.moveLeft();
						else if(x_shift==1) enemy.moveRight();
						if(y_shift==-1) enemy.moveUp();
						else if(y_shift==1) enemy.moveDown();
						if((enemy.health%350)==0){
							for(var i=0;i<2;i++){
								this.generateConsumables(1,enemy.x+enemy.width/2,enemy.y+enemy.height/2);
							}
							enemy.health-=10;
						}

					}.bind(this))
				}
				this.groundEnemies.forEach(function(enemy,index){
					enemy.y+=this.map_speed;
					enemy.shootBullet();
				}.bind(this))
				this.bombs.forEach(function(bomb,index){
					bomb.y+=this.map_speed/2;
				}.bind(this))
				this.fires.forEach(function(fire,index){
					fire.y+=this.map_speed;
				}.bind(this))
				this.kamikaze.forEach(function(enemy,index){
					for(var i=0;i<this.player_count;i++){
						if((Math.abs(enemy.x-this.players[i].x)<=this.players[i].width) && (enemy.y<this.players[i].y)){
							enemy.shootBullet();
						}
					}
					enemy.move();
				}.bind(this))
			},

			getRandomMoveShift:function(enemy){
				let shift=[];

				if(Math.abs(enemy.x-this.players[0].x)>400){
					if(enemy.x>this.players[0].x){
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

				if(enemy.y>=(this.players[0].y-25)){
					shift.push(-1);
				}
				else if(enemy.y<=this.players[0].y-400){
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
				this.boss=this.boss.filter(function(enemy,index){
					if(enemy.health<=0){
						this.generateConsumables(0.9,enemy.x,enemy.y);
					}
					if(enemy.health<=0 && this.players[0].sniper_enable==false){
						for(var i=0;i<this.player_count;i++){
							this.players[i].sniper_enable=true;
						}
						if(!this.players[0].armor_enable){
							message_enabled=true;
							message="Sniper Enabled - '?/d' to shoot ";
						}
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
				this.groundEnemies=this.groundEnemies.filter(function(turrent,index){
					return(turrent.y+turrent.height<this.height+50);
				}.bind(this));
				this.players.forEach(function(player,index){
					if(player.health<=0){
						player.x=-2500;
					}
				})

			},

			generateConsumables(freq,x,y){
				if(Math.random()<=freq){
					var ran=Math.random()*100;
					if(ran<=20){
						this.consumables.push(new doubleDamage(x,y));
					}else if(ran<=50){
						this.consumables.push(new healthPower(x,y));
					}else if(ran<=70){
						this.consumables.push(new doubleBullet(x,y));
					}else if(ran<=85){
						this.consumables.push(new bombConsume(x,y));
					}else{
						this.consumables.push(new armorConsume(x,y));
					}
				}
			},

			generateBoss(){
				var armored_boss=false;
				if(players[0].sniper_enable){
					armored_boss=true;
				}
				this.boss.push(new Boss(250,-1000,armored_boss));
			},

			generateGroundEnemies(){
				var ran=this.getRandomNum(0,500);
				if(this.groundEnemies.length==0 && ran>450){
					if(this.score<8000){
						var max_count=1;
					}else if(this.score<16000){
						var max_count=2;
					}else {
						var max_count=3;
					}
					var number=this.getRandomNum(0,max_count+1);
					for(var i=1;i<=number;i++){
						var y=this.getRandomNum(-500,-300);
						var x=this.getRandomNum(50,this.width-100);
						this.groundEnemies.push(new Turrent(x,y));
					}
				}
			},

			generateAirEnemies(){
				if(this.airEnemies.length==0){
					if(this.score<1500){
						var number=2
					}else if(this.score<6000){
						var number=this.getRandomNum(3,5);
					}else{
						var number=this.getRandomNum(4,6);
					}
					for(var i=1;i<=number;i++){
						if(this.score<8000){
							var spreadShot_chances=0;
						}
						else if(this.score<15000){
							var spreadShot_chances=2;
						}else if(this.score<20000){
							var spreadShot_chances=4;
						}else if(this.score<25000){
							var spreadShot_chances=6;
						}else if(this.score<30000){
							var spreadShot_chances=8;
						}else{
							var spreadShot_chances=10;
						}
						var ran=this.getRandomNum(0,10);
						if(ran>=spreadShot_chances){
							var spreadShot=false;
						}else{
							var spreadShot=true;
						}
						this.airEnemies.push(new Enemy(Math.floor(((this.width-150)/number)*i),-(this.getRandomNum(200,600)),spreadShot));
					}
				}
			},

			tickGunTimer:function(){

				for(var i=0;i<this.player_count;i++){
					this.players[i].TickWarm();
				}
				this.airEnemies.forEach(function(enemy,index){
					enemy.TickWarm();
				})
				this.groundEnemies.forEach(function(enemy,index){
					enemy.TickWarm();
				})
				this.kamikaze.forEach(function(enemy,index){
					enemy.TickWarm();
				})
				this.boss.forEach(function(enemy,index){
					enemy.TickWarm();
				})

			},

			summonKamikaze:function(){
				if(this.kamikazeActive){
					if(this.kamikaze.length==0){
						if(this.score<1500){
							var kamikaze_number=3;
						}else if(this.score<2500){
							var kamikaze_number=4;
						}else if(this.score<10000){
							var kamikaze_number=5;
						}else if(this.score<13000){
							var kamikaze_number=6;
						}else if(this.score<19000){
							var kamikaze_number=7;
						}else{
							var kamikaze_number=this.getRandomNum(5,10);
						}
						for(var  i=1;i<=kamikaze_number;i++){
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

			generateEnemies:function(){
				if((this.score%6000)<500 && this.score>=6000 && this.boss.length==0){
					this.bossActive=true;
				}
				if(this.bossActive){
					if(this.airEnemies.length==0){
						this.generateBoss();
						this.bossActive=false;
					}
				}
				if(this.boss.length==0){
					this.summonKamikaze();
					this.generateAirEnemies();
					this.generateGroundEnemies();
				}
			},

			update:function(){
				for(var i=0;i<this.player_count;i++){
					this.collideObject(this.players[i]);
				}
				this.collideKamikaze();
				this.enemyControls();
				this.bulletControls();
				this.tickGunTimer();
				this.clearTheDead();
				this.consumeItems();
				this.moveConsumables();
				this.generateEnemies();
			},

		};

		console.log("Game Initialized");
	}

	update(){

		this.world.update();

	};

};
