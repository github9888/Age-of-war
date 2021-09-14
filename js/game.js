window.onload = async function(){
    Game.init();
    await Game.preload();
    Game.create();
    setInterval(Game.update, 1000/60);
};

Game = {
    init(){
        Game.canvas = document.createElement("canvas");
        document.body.appendChild(Game.canvas);
        Game.ctx = Game.canvas.getContext("2d");

        Game.canvas.width = window.innerWidth;
        Game.canvas.height = window.innerHeight;
        Game.cw = Game.canvas.width;
        Game.ch = Game.canvas.height; 

        this.specialBarWidth = 0;
        this.groundY = Game.ch-50;
        this.specialClick = false;
        Game.fireBallActive = false;
        // Game.fieBallRandomX = Math.floor(Math.random()*300);
    },
    loadImage(path){
        let img = new Image();
        img.src = path
        return img
    },
    preload() {
      return new Promise(resolve => {
        fireBall = Game.loadImage('./images/fireBall.png');
        ArcherY = Game.loadImage('./images/ArcherY.png');
        ArcherX = Game.loadImage('./images/ArcherX.png');
        WarriorY = Game.loadImage('./images/WarriorY.png');
        WarriorX = Game.loadImage('./images/WarriorX.png');
        Ground = Game.loadImage('./images/Ground.png');
        Castle1 = Game.loadImage('./images/Castle1.png');
        Castle2 = Game.loadImage('./images/Castle2.png');
        Background = Game.loadImage('./images/Background.png');
        Background.onload = resolve;
      })  
    },
    create(){
        Game.team = [];
        Game.teamEnemy = [];

        Game.specialSpell = [];

        Game.team.push(new Warrior(150, 20, 2, WarriorX, 100, Game.ch -135, 'team'));
        Game.team.push(new Archer(100, 20, 1,ArcherX, 100, Game.ch -165, 'team'));
        Game.teamEnemy.push(new Warrior(150, 10, 2, WarriorY, Game.cw - 190, Game.ch - 115, 'enemy'));
        Game.teamEnemy.push(new Archer(100, 10, 1, ArcherY, Game.cw - 150, Game.ch - 172, 'enemy'));
        Game.specialSpell.push(new FireBall(50, 4, fireBall, 500, 10));
        

    },
    draw(){
        Game.ctx.drawImage(Background, 0, 0);
        Game.ctx.drawImage(Ground, 0, Game.groundY);
        Game.ctx.drawImage(Castle1, 0, Game.ch- 245);
        Game.ctx.drawImage(Castle2, Game.cw -300, Game.ch - 245);

        
        Game.ctx.fillStyle = "#FFFFFF";
        Game.ctx.fillRect(10, 10, 400, 25);
    
        Game.ctx.fillStyle = "#FF0000";
        Game.ctx.fillRect(10, 10, this.specialBarWidth, 25);

        Game.ctx.fillStyle = "black";
        Game.ctx.font = "15px Arial";
        Game.ctx.fillText("Special Spell", 150, 30);


        for(let i=0; i<Game.team.length; i++){
            Game.team[i].draw();
            }
        for(let i=0; i<Game.teamEnemy.length; i++){
            Game.teamEnemy[i].draw();
            }

    },

    //////////////////////////////////////////////////////////////////
   
    isSpecialBarFull(){
        if(this.specialBarWidth <= 400){
            this.specialBarWidth++
            Game.canvas.addEventListener("click", Game.mouseClick)
        }
        else{
        Game.specialClick = true;
        }
    },

    mouseClick(e){
        if(Game.specialClick === true){                                                                                 
            if (e.clientX >= 10 && e.clientX <= 400 && e.clientY > 10){
                console.log(Game.specialClick);
                Game.fireBallActive = true;
            }
        }
    },

    fireBallFall(){
        for(let i=0; i<Game.specialSpell.length; i++){
            Game.specialSpell[i].draw();
            Game.specialSpell[i].fall();

            for(let j=0; j<Game.teamEnemy.length; j++){
           
                if(Game.specialSpell[i].y >= Game.teamEnemy[j].y -106 && Game.specialSpell[i].x >= Game.teamEnemy[j].x && Game.specialSpell[i].x + Game.specialSpell[i].width <= Game.teamEnemy[j].x + Game.teamEnemy[j].width || Game.specialSpell[i].y >= Game.groundY -106){
                    Game.specialSpell.shift();
                    Game.specialSpell.push(new FireBall(50, 4, fireBall, 500, 10));
                    Game.specialClick = false;
                    Game.fireBallActive = false;
                    this.specialBarWidth = 0;
                }
            }
        }
    },
     //
//////////////////////////////////////////////////////////////
    isTeamMateFighting(i){
       return Game.teamEnemy.length && Game.team[i].x + Game.team[i].attackDistance >= Game.teamEnemy[0].x
    },

    dieCharacters(){
            if(Game.teamEnemy[0].isAlive() == false){
                Game.teamEnemy.shift();
            }

        
            if(Game.team[0].isAlive() == false){
                Game.team.shift();
            }
    },

    update(){
        
        for(let i=0; i<Game.team.length; i++){
            if( Game.isTeamMateFighting(i) == false ){
                Game.team[i].move();
            }
            else{
                
                if(Game.team[i].canAttack()){
                    Game.team[i].hit(Game.teamEnemy[0]);
                    Game.dieCharacters();
                }
                
            }
        };
        
        for(let i=0; i<Game.teamEnemy.length; i++){
            if( Game.teamEnemy[i].x - Game.team[i].attackDistance >= Game.team[0].x ){
                Game.teamEnemy[i].move();

            }
        }
           
        Game.draw();
        Game.isSpecialBarFull();
        if(Game.fireBallActive === true){
            Game.fireBallFall();
        }
      
    }

    

};
