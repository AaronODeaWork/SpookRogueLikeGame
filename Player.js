class Player
{
    constructor(ctx)
    { 
        this.position = [window.innerWidth * 0.5, window.innerHeight*0.8];//starting postion of the player 
        this.endposition= [window.innerWidth * 0.5, window.innerHeight*0.7]//end postion of the player 
        this.direction = [0,0];// direction the player is faceing
        this.viewRange = window.innerWidth *0.08;// the range the player can hit 
        this.playerHitBox = 25;//the size of the players hit box
    
        this.startingHealth = 100;//starting health of the player 
        this.health = this.startingHealth;
        this.healthBarSize =[100,20];//set size of the health bar 
        this.isAlive = true;//set the player to be active 
    
        this.enemyDistance=[0,0, 0];//distance the enemy is from the player 
        this.boltDistance=[0,0, 0];//distance the bolt isfrom the player 
        this.snakeDistance=[0,0,0];

        this.money = 0;
        this.isLoaded = false;//is the image for the player loaded 
        this.playerStrip =  new Image();//player sprite 
        this.ctx = ctx;//canvase 

    }
    init(viewRange)
    {
     // loading spritesheets
     var that = this;
     this.playerStrip.addEventListener('load', function() {
        that.isLoaded = true;
        }, false);
    this.playerStrip.src = 'Assets/link.png';
       // create sprites
       this.playerSprite = new Sprite(this.ctx, {
        width: PLAYER_FRAME_WIDTH,
        height: PLAYER_FRAME_HEIGHT,
        image: this.playerStrip},
        FPS,
        this.position[0],
        this.position[1]); 

        this.position = [window.innerWidth * 0.5, window.innerHeight*0.6];
        this.endposition= [window.innerWidth * 0.5, window.innerHeight*0.7]
        this.direction = [0,0];
        this.viewRange = viewRange;
        this.playerHitBox = 25;
    
        this.startingHealth = 500;
        this.health = this.startingHealth;
        this.healthBarSize =[100,20];
        this.isAlive = true;
        this.playerDamage = 1;
        this.enemyDistance=[0,0, 0];
        this.boltDistance=[0,0, 0];
        this.previousPos= [0,0]
    }

    move(touches)
    {    
        
        this.previousPos[0] = this.position[0] ;
        this.previousPos[1] = this.position[1] ;

        this.direction[0] = this.position[0]+(PLAYER_FRAME_WIDTH/2) -  this.endposition[0]; // direction for x
        this.direction[1]= this.position[1]+(PLAYER_FRAME_HEIGHT/2) -  this.endposition[1]; //direction for y
        this.distance = Math.sqrt((this.direction[0]*this.direction[0]) + (this.direction[1]*this.direction[1])); //find the distance between the two points 
    
        if( this.distance >= 10) //if the distance is more than this move the player to that point 
          {


            this.position[0] -= ( this.direction[0]/ this.distance) *  3 ;// move in the direction x by the speed 
            this.position[1] -= ( this.direction[1]/ this.distance) *  3 ;

            if( this.position[0] > window.innerWidth *.9 || this.position[0] < window.innerWidth *.008
            ||this.position[1] > window.innerHeight *.76 || this.position[1] < window.innerHeight *.008)
            {
                this.position[0] =  this.previousPos[0]
                this.position[1] =  this.previousPos[1]
            }
       
            this.playerSprite.reset();
          }
            
            this.endposition[0] = touches.clientX ;
            this.endposition[1] = touches.clientY;     
          
    }

    render()
    {
        this.playerSprite.render();//render the player Sprite
        
        this.ctx.beginPath();
        this.ctx.fillStyle  = "red";
        this.ctx.rect(this.position[0] , this.position[1] , this.healthBarSize[0],this.healthBarSize[1]); // health bar 
        this.ctx.fill();
    }

    update(touches)
    {

        this.move(touches);
        
        
        this.playerSprite.move(this.position[0],this.position[1]);
    }
    getPos()
    {
        return this.position;
    }

    checkInRange(enemyPostion,enemyAlive )
    {
        if(enemyAlive == true)
        {
        this.enemyDistance[0] =  this.position[0]+(PLAYER_FRAME_WIDTH/2) -  enemyPostion[0];
        this.enemyDistance[1] =  this.position[1]+(PLAYER_FRAME_HEIGHT/2) -  enemyPostion[1];
        this.enemyDistance[2] = Math.sqrt((this.enemyDistance[0]*this.enemyDistance[0]) + (this.enemyDistance[1]*this.enemyDistance[1])); //find the distance between the two points   
            if(  this.enemyDistance[2] < this.viewRange * 2.2 )
            {
                this.endposition[0] += this.enemyDistance[0] ;
                this.endposition[1] += this.enemyDistance[1];
                this.playerSprite.play(); 
                return this.playerDamage;
            }
        }
    return 0;
    }

    checkIfHit(boltPostion)
    {
        if(this.isAlive == true)
        {
        this.boltDistance[0] =  this.position[0]+(PLAYER_FRAME_WIDTH/2) -  boltPostion[0];
        this.boltDistance[1] =  this.position[1]+(PLAYER_FRAME_HEIGHT/2) -  boltPostion[1];
        this.boltDistance[2] = Math.sqrt((this.boltDistance[0]*this.boltDistance[0]) + (this.boltDistance[1]*this.boltDistance[1])); //find the distance between the two points   
        if(  this.boltDistance[2] < this.playerHitBox*2  )
        {
            this.takeDamage(1);
        } 
        }
    }
    checkIfBit(snakePostion)
    {
        if(this.isAlive == true)
        {
            this.snakeDistance[0] =  this.position[0]+(PLAYER_FRAME_WIDTH/2) -  snakePostion[0] - (SNAKE_FRAME_WIDTH / 3);
            this.snakeDistance[1] =  this.position[1]+(PLAYER_FRAME_HEIGHT/2) -  snakePostion[1] - (SNAKE_FRAME_HEIGHT / 2) ;
            this.snakeDistance[2] = Math.sqrt((this.snakeDistance[0]*this.snakeDistance[0]) + (this.snakeDistance[1]*this.snakeDistance[1])); //find the distance between the two points   
            if(  this.snakeDistance[2] < this.playerHitBox* 1.5  )
            {
                this.takeDamage(1);
            } 
        }
    }

    takeDamage(damage)
    {
        
        this.health -= damage;//takes the playes damage output from the player 
        if(this.health > 0 &&  this.isAlive == true )//check if player is alive and the damage done is greater than 0
        { 
            this.healthBarSize[0] = 100*(this.health/this.startingHealth)//decrease health bar 
        }
        if(this.health <= 0 )//kill player 
        {
          
            this.isAlive = false;
     
        }
    }

    addHealth()
    {
        this.health += 10;
    }

}