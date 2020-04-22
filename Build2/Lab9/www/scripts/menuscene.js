/**
 * menus class is a class exstened from scene class
 */
class MenuScene extends Scene {
    /**
     * 
     * @param {string} title is a title of the scene
     * @param {color} colour the colour of the background of the scene
     */
    constructor(title, colour, scene) {

        super(title);//call to overide the assigning of title to the super class 

        this.playDistance = [0, 0, 0];
        this.shopDistance = [0, 0, 0];
        this.quitDistance = [0, 0, 0];

        this.buttonRadius = window.innerHeight / 15;
        this.playButtonPos = [window.innerWidth * .1, window.innerHeight * .2];
        this.playText = "PLAY";
        this.shopButtonPos = [window.innerWidth * .1, window.innerHeight * .4];
        this.shopText = "SHOP";
        this.quitButtonPos = [window.innerWidth * .1, window.innerHeight * .6];
        this.quitText = "QUIT";

        this.img = new Image();   // Create new img element
        this.img.src = 'Assets/menu.png'; // Set source path
        this.img.id = "menu"

        this.sceneManger = scene;
        this.colour = colour;//assiginig the constructor colour  to the initial colour 

        this.boundHandler = this.clickHandler.bind(null, this);

    }
    /**
    * @param {canvas} ctx is the canvas the background canvas object 
    */
    render(ctx) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);//clear the screen
        super.render(ctx);
        ctx.drawImage(this.img, 0, 0, window.innerWidth * .96, window.innerHeight * .95);//draw image

        ctx.beginPath();
        ctx.arc(this.playButtonPos[0], this.playButtonPos[1], this.buttonRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.fillText(this.playText, this.playButtonPos[0] + this.buttonRadius, this.playButtonPos[1])

        ctx.beginPath();
        ctx.arc(this.shopButtonPos[0], this.shopButtonPos[1], this.buttonRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.fillText(this.shopText, this.shopButtonPos[0] + this.buttonRadius, this.shopButtonPos[1])

        ctx.beginPath();
        ctx.arc(this.quitButtonPos[0], this.quitButtonPos[1], this.buttonRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.fillText(this.quitText, this.quitButtonPos[0] + this.buttonRadius, this.quitButtonPos[1])


        ctx.font = '28px arial';


        document.body.style.backgroundColor = this.colour;

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

    MenuScene.touches = e.touches[0];
    MenuScene.playDistance[0] =  MenuScene.playButtonPos[0] -  MenuScene.touches.clientX;
    MenuScene.playDistance[1] =  MenuScene.playButtonPos[1] -  MenuScene.touches.clientY;
    MenuScene.playDistance[2] = Math.sqrt((MenuScene.playDistance[0]*MenuScene.playDistance[0]) + (MenuScene.playDistance[1]*MenuScene.playDistance[1])); //find the distance between the two points   

    MenuScene.shopDistance[0] =  MenuScene.shopButtonPos[0] -  MenuScene.touches.clientX;
    MenuScene.shopDistance[1] =  MenuScene.shopButtonPos[1] -  MenuScene.touches.clientY;
    MenuScene.shopDistance[2] = Math.sqrt((MenuScene.shopDistance[0]*MenuScene.shopDistance[0]) + (MenuScene.shopDistance[1]*MenuScene.shopDistance[1])); //find the distance between the two points   

    MenuScene.quitDistance[0] =  MenuScene.quitButtonPos[0] -  MenuScene.touches.clientX;
    MenuScene.quitDistance[1] =  MenuScene.quitButtonPos[1] -  MenuScene.touches.clientY;
    MenuScene.quitDistance[2] = Math.sqrt((MenuScene.quitDistance[0]*MenuScene.quitDistance[0]) + (MenuScene.quitDistance[1]*MenuScene.quitDistance[1])); //find the distance between the two points   

    if(  MenuScene.playDistance[2] < MenuScene.buttonRadius )
    {
        MenuScene.sceneManger.goToScene('Tutorial');//go to next scene in the list 
        document.body.removeEventListener("touchstart", MenuScene.boundHandler, false);
    }
   
    if(  MenuScene.shopDistance[2] < MenuScene.buttonRadius )
    {
        MenuScene.sceneManger.goToScene('Shop');//go to next scene in the list 
        document.body.removeEventListener("touchstart", MenuScene.boundHandler, false);
    }
      
    if(  MenuScene.quitDistance[2] < MenuScene.buttonRadius )
    {
    
    }
     
     
   }

 
     
}
