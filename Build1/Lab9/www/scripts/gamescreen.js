const FRAME_WIDTH = 70;
const FRAME_HEIGHT = 102;

const FPS = 60;
/**
 * a class derived from the scene class 
 */
class GameScreen extends Scene
{ /**
 * 
 * @param {string} title the title of the scene
 * @param {canvas} colour //colour of the scenes background 
 */
   constructor(title,colour, scene, ctx)
   {  
    super(title);//overide to the super class 
    this.sceneManger = scene;
    this.colour = colour;//set the colour;
    this.boundHandler = this.onTouchStart.bind(null, this);
    this.Postion = [0,0];
    this.endPostion= [100,100]
    this.directionX = 0;
    this.directionY = 0;
    this.touches = {};

    this.isLoaded = false;
    this.previousTime = 0;
    this.spriteStrip =  new Image();
    this.ctx = ctx;
   }
    /**
    * renders to the screen
    * @param {canvas} ctx 
    */
   render(ctx)
   {
       ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);//clear the screen
       super.render(ctx);//call the supers render 
       ctx.font = '48px serif';//set font 
       document.body.style.backgroundColor =  this.colour;//set background colour 
       this.sprite.render();
    }
    update()
    {
        this.PlayerMove();
        this.sprite.move(this.Postion[0],this.Postion[1]);
    }
    init()
    {
        document.body.addEventListener('touchstart', this.boundHandler, false);

         // loading spritesheet
         var that = this;
         this.spriteStrip.addEventListener('load', function() {
            that.isLoaded = true;
        }, false);
        // source for sprite strip
        this.spriteStrip.src = 'Assets/link.png';
        // create sprite
        this.sprite = new Sprite(this.ctx, {
            width: FRAME_WIDTH,
            height: FRAME_HEIGHT,
            image: this.spriteStrip},
            FPS,
            0,
            0); 
    }
    PlayerMove()
    { 
        
        this.directionX = this.Postion[0] -  this.endPostion[0]; // direction for x
        this.directionY = this.Postion[1] -  this.endPostion[1]; //direction for y
        this.distance = Math.sqrt((this.directionX*this.directionX) + (this.directionY*this.directionY)); //find the distance between the two points 
    
        if( this.distance >= 10) //if the distance is more than this move the player to that point 
          {
            this.Postion[0] -= ( this.directionX/ this.distance) *  5 ;// move in the direction x by the speed 
            this.Postion[1] -= ( this.directionY/ this.distance) *  5 ;
            this.sprite.reset();
          }
        else // if the guard has reached the point  generate a new random location to walk to
          {
            this.endPostion[0] = this.touches.clientX;
            this.endPostion[1] = this.touches.clientY; 
            this.sprite.play();
            
          }
   
    }
 
    onTouchStart(GameScreen, e)
    {
        GameScreen.touches = e.touches[0];
       
                   
    }

}
