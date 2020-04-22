/**
 * a class derived from the scene class 
 */
class TutorialScreen extends Scene
{ /**
 * 
 * @param {string} title the title of the scene
 * @param {canvas} colour //colour of the scenes background 
 */
constructor(title,colour, scene, ctx, Player)
{  
    super(title);//overide to the super class
    this.ctx = ctx; 
    this.sceneManger = scene;
    this.player = Player
    this.dummy = {};

    this.colour = colour;//set the colour;
    this.boundHandler = this.onTouchStart.bind(null, this);
    this.touches = {};

    this.isLoaded = false;
    this.levelImage =  new Image();
    
    this.hasLearned = false;
    this.dummyPos = [window.innerWidth*.536,window.innerHeight *.435]
    this.doorPos = [window.innerWidth *.585, window.innerHeight*.009];
    this.renderText = '';

    this.moneyText = "GEMS: ";
    this.moneyPostion = [30,80];
    this.moneyAmount = "0";
    this.amountPostion = [200,80];
   }
    /**
    * renders to the screen
    * @param {canvas} ctx 
    */
   render(ctx)
   {
       ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);//clear the screen
       super.render(ctx);//call the supers render 
       ctx.font = '24 px serif';//set font 
       document.body.style.backgroundColor =  this.colour;//set background colour 
       this.ctx.drawImage(this.levelImage, 0 ,0,window.innerWidth *.96, window.innerHeight*.95);//draw background image
       this.player.render();//draw the player

       this.ctx.beginPath();
       this.ctx.fillStyle  = "red";
       this.ctx.rect(this.dummyPos[0] - 35 , this.dummyPos[1] - 105 , this.healthBarSize[0],this.healthBarSize[1]);//health bar 
       this.ctx.fill();
       this.ctx.fillStyle  = "black";
       this.ctx.fillText(this.renderText, 200, 420);
       this.source = {};

       this.ctx.fillText(this.moneyText, this.moneyPostion[0], this.moneyPostion[1]);
       this.ctx.fillText(this.moneyAmount, this.amountPostion[0], this.amountPostion[1]);
    }
    update()
    {
        this.moneyAmount = this.player.money;
        this.player.update(this.touches);//update the players movement 
        this.takeDamage(this.player.checkInRange(this.dummyPos, !this.hasLearned));//check if the enemy is taking damage 
        if (this.player.checkInRange(this.doorPos, true))
        {
            if(this.hasLearned)// if player has been taught, start the game 
            {
                this.sceneManger.goToScene('Game');//go to next scene in the list 
            }
            else
            {
                this.renderText = 'First you need to train !';
            }
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
        this.player.init(35); 

        this.startingHealth = 250;
        this.health = this.startingHealth;
        this.healthBarSize = [100, 20];
        
    }
    onTouchStart(GameScreen, e)
    {
        GameScreen.touches = e.touches[0];          
    }
    takeDamage(damage)
    {
        this.health -= damage;//takes the playes damage output from the enemy 
        if(this.health > 0 && damage > 0 &&  !this.hasLearned)//check if enemy is alive and the damge done is greater than 0
        { 
            this.healthBarSize[0] = 100*(this.health/this.startingHealth)//decrease health bar 
        }
        if(this.health <= 0 )//kill enemy 
        {
            this.hasLearned = true;
            this.renderText = 'You may enter.. at your own peril';
        }
    }
    setSource(source)
    {
        this.source = source;
    }
}
