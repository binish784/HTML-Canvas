class animatedSprite extends Sprite{
  constructor(obj,w,h,frame_idle,total_frames,d_height,d_width){
    super(obj,w,h,d_height,d_width);
    this.frametick=0;
    this.totalFrame=total_frames || 5;
    this.frameCount=10;
    this.idleFrame=frame_idle || 2;
    this.currentFrame=frame_idle || 2;
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
    ctx.drawImage(this.frame,this.width*this.currentFrame,0,this.width,this.height,x,y,this.d_width,this.d_height);
  }

}
