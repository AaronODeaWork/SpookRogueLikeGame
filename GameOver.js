/**
 * a class derived from the scene class 
 */
class GameOver extends Scene
{ /**
 * 
 * @param {string} title the title of the scene
 * @param {canvas} colour //colour of the scenes background 
 */
   constructor(title,colour,scene)
   {  

    super(title);//overide to the super class 
    this.sceneManger = scene;
    this.colour = colour;//set the colour 
    this.boundHandler = this.clickHandler.bind(null, this);
   }
    /**
    * renders to the screen
    * @param {canvas} ctx 
    */
   render(ctx)
   {
       ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);//clear the screen
       super.render(ctx);//call the supers render 
       ctx.font = '48px ariel';//set font 
       document.body.style.backgroundColor =  this.colour;//set background colour 
       
    }

    update(ctx)
    {

    }

    init()
    {
        document.body.addEventListener('touchstart', this.boundHandler, false);
    }
    
    clickHandler(GameOver, e)
    {
        GameOver.sceneManger.goToScene('Title');//go to next scene in the list 
        document.body.removeEventListener("touchstart", GameOver.boundHandler, false);
    }
}
