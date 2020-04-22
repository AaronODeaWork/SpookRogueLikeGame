/**
 * a class derived from the scene class 
 */
class GameScreen extends Scene
{ /**
 * 
 * @param {string} title the title of the scene
 * @param {canvas} colour //colour of the scenes background 
 */
   constructor(title,colour, scene, ctx, Player,websocket)
   {  
    super(title);//overide to the super class
    this.ctx = ctx; 
    this.ws = websocket;

    this.joinDistance=[0,0,0];
    this.buttonRadius = window.innerHeight / 15 ;
    this.joinButtonPos = [window.innerWidth*.1, window.innerHeight*.2];
    this.joinButtonText = "Join";

    this.sceneManger = scene;

    this.player = Player;
    this.enemy = new Enemy(this.ctx);
    this.snake = new Snake(this.ctx);
    this.gem = new Pickup(this.ctx);

    this.colour = colour;//set the colour;
    this.boundHandler = this.onTouchStart.bind(null, this);
    this.touches = {};

    this.moneyText = "GEMS: ";
    this.moneyPostion = [30,80];
    this.moneyAmount = "0";
    this.amountPostion = [200,80];

    this.isLoaded = false;
    this.levelImage =  new Image();
    this.source = {};
   }
    /**
    * renders to the screen
    * @param {canvas} ctx 
    */
   render(ctx)
   {
       ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);//clear the screen
       super.render(ctx);//call the supers render 
       ctx.fillStyle  = "black";
       ctx.font = '48px serif';//set font 
       document.body.style.backgroundColor =  this.colour;//set background colour 
       this.ctx.drawImage(this.levelImage, 0 ,0,window.innerWidth *.96, window.innerHeight*.95);//draw background image
       this.ctx.fillText(this.moneyText, this.moneyPostion[0], this.moneyPostion[1]);
       this.ctx.fillText(this.moneyAmount, this.amountPostion[0], this.amountPostion[1]);

       this.player.render();//draw the player

       this.enemy.render();//draw the enemy 
       
        ctx.beginPath();
        ctx.arc(this.joinButtonPos[0], this.joinButtonPos[1], this.buttonRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.fillText(this.joinButtonText, this.joinButtonPos[0]+this.buttonRadius, this.joinButtonPos[1])
       this.snake.render();
       this.gem.render();
    }
    update()
    {
        this.moneyAmount = this.player.money;
        this.player.update(this.touches);//update the players movement 
        this.enemy.update();//update the enmey 
        this.enemy.checkInRange(this.player.getPos());//check if player is in range of enemy 
        this.enemy.takeDamage(this.player.checkInRange(this.enemy.getPos(),this.enemy.isAlive));//check if the enemy is takeing damage 

        this.snake.update(this.player.getPos());//update the snake 
        this.snake.checkInRange(this.player.getPos());//check if player is in range of enemy 
        this.snake.takeDamage(this.player.checkInRange(this.snake.getPos(),this.snake.isAlive));//check if the enemy is takeing damage 

       if( this.gem.checkInRange(this.player.getPos()))
       {
        this.player.addHealth()
       }

        if(!this.enemy.checkAlive())
        {
            this.player.money += 10*this.enemy.getLevel();//increses the players money by a multipled enemy level
        }

        if(!this.snake.checkAlive())
        {
            this.player.money += 10*this.snake.getLevel();//increses the players money by a multipled enemy level
        }
        this.player.checkIfBit(this.snake.getPos());//check if the  snake hits the player
        // this.player.checkIfHit(this.enemy.boltPosition);//check if the  bolt hits the player
        if(!this.player.isAlive)//if player is dead end game 
        {
            this.snake.resetLevel();
            this.enemy.resetLevel();
            this.sceneManger.goToScene('GameOver');//go to next scene in the list 
        }
    }
    init()
    {
        document.body.addEventListener('touchstart', this.boundHandler, false);
         // loading image
        var that = this;
        this.levelImage.addEventListener('load', function() {
            that.isLoaded = true;
        }, false);
        this.levelImage.src = this.source;
        
        this.snake.init();
        this.enemy.init();
        this.player.init(66);   
    }
    onTouchStart(GameScreen, e)
    {
        GameScreen.touches = e.touches[0];    
        
        GameScreen.joinDistance[0] =  GameScreen.joinButtonPos[0] -  GameScreen.touches.clientX;
        GameScreen.joinDistance[1] =  GameScreen.joinButtonPos[1] -  GameScreen.touches.clientY;
        GameScreen.joinDistance[2] = Math.sqrt((GameScreen.joinDistance[0]*GameScreen.joinDistance[0]) + (GameScreen.joinDistance[1]*GameScreen.joinDistance[1])); //find the distance between the two points   
    
        if(  GameScreen.joinDistance[2] < GameScreen.buttonRadius )
        {
            alert("Game Joined");
            console.log("Join Game");
            var message={};
            message.type = "join";
            GameScreen.ws.send(JSON.stringify(message));        }
       
    }
    setSource(source)
    {
        this.source = source;
    }
}
