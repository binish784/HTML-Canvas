class Sprite{
  constructor(obj,w,h){
    this.idleFrame=2;
    this.width=w;
    this.height=h;
    this.frametick=0;
    this.totalFrame=5;
    this.frameCount=10;
    this.currentFrame=2;
    this.frame=new Image();
    switch (obj) {
      case "Player":
        this.frame.src="img/player.png";
        break;
      case "Enemy":
        this.frame.src="img/enemy.png";
        break;
      }
    }
    update(frame){
      if(this.frametick==this.frameCount){
        if((this.currentFrame+frame)>=0 && (this.currentFrame+frame)<this.totalFrame){
          this.currentFrame+=frame;
          this.frametick=0;
        }
      }else{
        this.frametick++;
      }
    }

    stayIdle(){
      if(this.currentFrame!=this.idleFrame){
        if(this.frametick==this.frameCount){
          if(this.currentFrame<this.idleFrame){
            this.currentFrame++;
          }else if(this.currentFrame>this.idleFrame){
            this.currentFrame--;
          }
        }else{
          this.frametick++;
        }
      }
    }

    render(ctx,x,y){
      ctx.drawImage(this.frame,this.width*this.currentFrame,0,this.width,this.height,x,y,this.width,this.height);
    }
}
