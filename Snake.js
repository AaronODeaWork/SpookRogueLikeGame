class Snake
{
    constructor(ctx)
    { 
        this.enemyPosition = [435,90];//the enemy postion
        this.enemyEndpostion= [ 435,90]// the end point of the postion
        this.direction=[0,0,0];// diretion of the enemy 
        this.playerDistance = [0,0,0]// the direction from the enemy to the player 

        this.startingHealth = 200;//starting healt of the enemy 
        this.health = this.startingHealth;
        this.healthBarSize =[100,20];//size of the health bar 
        this.isAlive = true;//if the enemy is alive 

        this.isLoaded = false;
        this.enemyStrip =  new Image();//sprite for enemy
        this.viewRange = 1000;//view range of enemy

        this.ctx = ctx;
        this.moving = false;
    }
    /**
     * initiate or re start enemy
     */
    init()
    {
        var that = this;
        this.enemyStrip.addEventListener('load', function() {
            that.isLoaded = true;
             }, false);
        this.enemyStrip.src = 'Assets/snake.png';

         this.enemySprite = new Sprite(this.ctx, {
             width: SNAKE_FRAME_WIDTH,
             height: SNAKE_FRAME_HEIGHT,
             image: this.enemyStrip},
             FPS,
             this.enemyPosition[0],
             this.enemyPosition[1]);   

             this.enemyPosition = [window.innerWidth*.44,window.innerHeight*.168];
             this.enemyEndpostion= [window.innerWidth*.44,window.innerHeight*.168]
             this.enemySpeed = 1;
             this.playerDistance = [0,0,0]
     
             this.startingHealth = 500;
             this.health = this.startingHealth;
             this.healthBarSize =[100,20];
             this.isAlive = true;  
             this.enemyLevel = 0;
    }
    /**
     * update enemy
     */
    update(playerPostion)
    {
        if( this.isAlive == true)//if enemy alive
        {
            this.enemySprite.play();//draw sprite 
            this.moveEnemy(playerPostion);//move enemy call
        }
    }
    /**
     * render the enemy and or bolt 
     */
    render()
    {
        if( this.isAlive == true)//if enemy alive
        {   
            this.enemySprite.render();//draw enemy
        /*
        * health bar
        */
        this.ctx.beginPath();
        this.ctx.fillStyle  = "red";
        this.ctx.rect(this.enemyPosition[0] , this.enemyPosition[1] , this.healthBarSize[0],this.healthBarSize[1]);//health bar 
        this.ctx.fill();
     }
    }
    /**
     * get postion of enemy
     */
    getPos()
    {
        return this.enemyPosition;
    }
    /**
     * 
     * @param {vector} playerPostion //players postion
     */
    checkInRange(goal)
    {
        if( this.isAlive == true && !this.moving)
        {
            this.playerDistance[0] =  this.enemyPosition[0]+(PLAYER_FRAME_WIDTH/2)-15 -  goal[0];//get distance from the players x
            this.playerDistance[1] =  this.enemyPosition[1]+(PLAYER_FRAME_HEIGHT/2) -  goal[1];//get the distance from the players y
            this.playerDistance[2] = Math.sqrt((this.playerDistance[0]*this.playerDistance[0]) + (this.playerDistance[1]*this.playerDistance[1])); //find the distance between the two points 
            if(  this.playerDistance[2] <this.viewRange )
            {
                this.moving = true;
            }
        }
    }
    /**
     * 
     * @param {float } damage damage delth to enemy
     */
    takeDamage(damage)
    {
        this.health -= damage;//takes the playes damage output from the enemy 
        if(this.health > 0 && damage > 0 &&  this.isAlive == true )//check if enemy is alive and the damge done is greater than 0
        { 
            this.healthBarSize[0] = 100*(this.health/this.startingHealth)//decrease health bar 
        }
        if(this.health <= 0 )//kill enemy 
        {
            this.isAlive = false;
        }
    }
    /**
     * moves the enemy to random point from a point 
     */
    moveEnemy(playerPostion)
    {    
        this.enemyEndpostion[0] = playerPostion[0] + (SNAKE_FRAME_WIDTH / 6) ;
        this.enemyEndpostion[1] = playerPostion[1] + (SNAKE_FRAME_HEIGHT / 6) ;
        this.direction[0] = this.enemyPosition[0]+(ENEMY_FRAME_WIDTH/2) -  this.enemyEndpostion[0]; // direction for x
        this.direction[1]= this.enemyPosition[1]+(ENEMY_FRAME_HEIGHT/2) -  this.enemyEndpostion[1]; //direction for y
        this.direction[2] = Math.sqrt((this.direction[0]*this.direction[0]) + (this.direction[1]*this.direction[1])); //find the distance between the two points 
    
       //  if( this.direction[2] >= 10) //if the distance is more than this move the player to that point 
          {
            this.enemyPosition[0] -= (( this.direction[0]/ this.direction[2]) *  this.enemySpeed)  ;// move in the direction x by the speed 
            this.enemyPosition[1] -= (( this.direction[1]/ this.direction[2]) *  this.enemySpeed) ;
        
          }
      //   else // if the enemy  has reached the point  generate a new random location to walk to
          {
              
            // this.enemyEndpostion[0] = Math.random() * (window.innerWidth *.94)+70;
            // this.enemyEndpostion[1] = Math.random() *  (window.innerHeight*.93)+70; 
            
          }
          this.enemySprite.move( this.enemyPosition[0], this.enemyPosition[1]); // move the enemy 
    }
    /**
    * reset enemy
    */
    reset()
    {
        this.fired = false;
        this.enemyPosition = [window.innerWidth*.44,window.innerHeight*.168];
        this.enemyEndpostion= [window.innerWidth*.44,window.innerHeight*.168]
        this.playerDistance = [0,0,0]

        this.enemySpeed += 0.2;
        this.startingHealth = 200;
        this.startingHealth += 100;
        this.health = this.startingHealth;
        this.healthBarSize =[100,20];
        this.isAlive = true;
    }
       /**
     * checks if the enemy is dead and the resets it to a new enemy 
     */
    checkAlive()
    {    
     if(this.isAlive === false)
     {
        this.enemyLevel++;//increases what level enemy the player is on 
        this.reset();//reset the enemy 
        return false;//retrun that the enemy is dead
     }
     return true;
    }

    /**
     * reset the level of the enemy 
     */
    resetLevel()
    {
    this.enemyLevel = 0;
    }

    /**
     *get the level of the enemy 
     */
    getLevel()
    {
        return (this.enemyLevel);
    }
}