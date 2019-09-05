class Sprite{
  constructor(obj,w,h){
    this.width=w;
    this.height=h;
    this.frame=new Image();
    this.currentFrame=0;
    switch (obj) {
      case "Player":
        this.frame.src="img/player.png";
        break;
        case "Player2":
          this.frame.src="img/player2.png";
          break;
        case "Enemy":
        this.frame.src="img/enemy.png";
        break;
      case "Enemy_hit":
        this.frame.src="img/enemy_hit.png";
        break;
      case "Enemy2":
        this.frame.src="img/enemy2.png";
        break;
      case "kamikaze":
        this.frame.src="img/kamikaze.png";
        break;
      case "boss":
        this.frame.src="img/boss.png";
        break;
      }
    }
    render(ctx,x,y){
      ctx.drawImage(this.frame,this.width*this.currentFrame,0,this.width,this.height,x,y,this.width,this.height);
    }
}
