
class Bomb{
	constructor(x,y){
		this.x=x+5;
		this.y=y+10;
		this.color="#EE0000";
		this.height=20;
		this.timer=120;
		this.width=20;
		this.flag=true;
	}

	bombTick(){
		if(this.timer%10==0){
			if(this.flag){
				this.height=25;
				this.width=25;
				this.x-=2;
				this.y-=2;
				this.flag=false;
			}else{
				this.x+=2;
				this.y+=2;
				this.height=20;
				this.width=20;
				this.flag=true;
			}
		}
		this.timer--;
	}
}
class Fire{
	constructor(x,y){
		this.color="#111199";
		this.x=x-20;
		this.y=y-20;
		this.timer=100;
		this.height=60;
		this.width=60;
	}
	fireTick(){
		this.timer--;
	}
}