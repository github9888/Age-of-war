class FireBall {
    constructor(power, speed, image, x, y,){

        this.power = power;
        this.speed = speed;
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = image.width;
        
    }

    draw(){
        Game.ctx.drawImage(this.image, this.x, this.y);
        
    }

    fall(){
        this.y = this.y + this.speed;
    }
    
}
