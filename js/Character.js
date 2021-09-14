class Character {
    constructor(maxHealth, power, speed, image, x, y, type){

        this.maxHealth = maxHealth;
        this.power = power;
        this.speed = speed;
        this.image = image;
        this.x = x;
        this.y = y;
        this.type = type;
        this.width = image.width;
        this.health = this.maxHealth;
        this.hitTimestamp = 0;
        this.speedAttack = 1000*2;
        this.healthBarWidth = this.getHealthBarWidth();

    }

    draw() {
        Game.ctx.drawImage(this.image, this.x, this.y);

        //heal bar//
        Game.ctx.fillStyle = "#88bb00";
        Game.ctx.fillRect(this.x, this.y-20, this.healthBarWidth, 20);

    }

    move() {
        if(this.type === 'team'){
        this.x +=this.speed;
        }
        else{
            this.x -=this.speed;
        };
    }

    getHealthBarWidth() {
        
        let hpPercent = this.health/this.maxHealth;
        return this.width*hpPercent;
    }

    takeDamage(damage){
        this.health -= damage;
        
        this.healthBarWidth = this.getHealthBarWidth();
    }

    canAttack(){
       return new Date() - this.hitTimestamp >= this.speedAttack
    }

    hit(entity){
        entity.takeDamage(this.power);
        this.hitTimestamp = new Date();

    }
    isAlive(){
        return this.health > 0
        }
    
};








