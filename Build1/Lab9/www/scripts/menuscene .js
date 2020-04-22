/**
 * menus class is a class exstened from scene class
 */
class MenuScene extends Scene
{
    /**
     * 
     * @param {string} title is a title of the scene
     * @param {color} colour the colour of the background of the scene
     */
   constructor(title,colour,scene)
   {  

    super(title);//call to overide the assigning of title to the super class 

    var img = {};
    this.img = new Image();   // Create new img element
    this.img.src = 'Assets/button.png'; // Set source path
    this.img.id = "Button"

    this.sceneManger = scene;
    this.colour = colour;//assiginig the constructor colour  to the initial colour 

    this.boundHandler = this.clickHandler.bind(null, this);

   }
 /**
 * @param {canvas} ctx is the canvas the background canvas object 
 */
   render(ctx)
   {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);//clear the screen
    super.render(ctx);
    
    ctx.drawImage(this.img, 100, 100);

    ctx.font = '48px arial';
    document.body.style.backgroundColor =  this.colour;
    
   }
   update(ctx)
   { 
   }

   init()
    {
        document.body.addEventListener('touchstart', this.boundHandler, false);
    }

   clickHandler(MenuScene, e)
   {
       MenuScene.sceneManger.goToScene('Game');//go to next scene in the list 
       document.body.removeEventListener("touchstart", MenuScene.boundHandler, false);
   }
}
