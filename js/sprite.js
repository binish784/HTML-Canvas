class Sprite{
  constructor(obj,w,h,d_height,d_width){
    this.width=w;
    this.height=h;
    this.d_width=d_width || w;
    this.d_height=d_height || h;
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
      case "bomb":
        this.frame.src="img/bomb.png";
        break;
      case "explosion":
        this.frame.src="img/explosion.png";
        break;
      case "background":
        this.frame.src="img/background.png";
        break;
      case "turrent":
        this.frame.src="img/turrent_gun.png";
        break;
      case "health":
        this.frame.src="img/heart.png";
        break;
      case "double_damage":
        this.frame.src="img/doubleDamage.png";
        break;
      case "double_bullet":
        this.frame.src="img/doubleBullet.png";
        break;
      case "bomb_consume":
        this.frame.src="img/bomb_consume.png";
        break;
      case "armor_consume":
        this.frame.src="img/armor_consume.png";
        break;
      }
    }
    render(ctx,x,y){
      ctx.drawImage(this.frame,this.width*this.currentFrame,0,this.width,this.height,x,y,this.width,this.height);
    }
}
