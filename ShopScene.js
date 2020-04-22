/**
 * menus class is a class exstened from scene class
 */
class ShopScene extends Scene
{
    /**
     * 
     * @param {string} title is a title of the scene
     * @param {color} colour the colour of the background of the scene
     */
    constructor(title,colour,scene,ctx,Player)
    {  
 
     super(title);//call to overide the assigning of title to the super class 
     this.ctx = ctx; 
     this.player = Player;
 
     this.exitDistance=[0,0,0];//click distance to exit button
     this.healthDistance=[0,0,0];//click distance to exit button
     this.upgradeDistance=[0,0,0];//click distance to exit button
  

     this.buttonRadius = 30;
     this.exitButtonPos = [130,120];
     this.exitText = "Exit";

     this.healthButtonPos = [400,220];
     this.healthText = "Upgrade Health";
     this.priceHealthText = "10";
     this.healthprice = 10;
 
 
     this.damageButtonPos = [420,320];
     this.damageText = "Upgrade Damage ";
     this.priceDamageText = "10";
     this.damageprice = 10;
 
 
     this.moneyText = "GEMS: ";
     this.moneyPostion = [400,50];
     this.moneyAmount = "0";
     this.amountPostion = [600,50];
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

    ctx.beginPath();
    ctx.arc(this.exitButtonPos[0], this.exitButtonPos[1], this.buttonRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.fillText(this.exitText, this.exitButtonPos[0]-this.buttonRadius*4 , this.exitButtonPos[1]+this.buttonRadius /2)
    ctx.font = '48px arial';


    ctx.beginPath();
    ctx.arc(this.healthButtonPos[0], this.healthButtonPos[1], this.buttonRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "gray";
    ctx.fill();

    ctx.fillText(this.healthText, this.healthButtonPos[0]-this.buttonRadius*13 , this.healthButtonPos[1]+this.buttonRadius /2)
    ctx.fillText(this.priceHealthText, this.healthButtonPos[0]+this.buttonRadius , this.healthButtonPos[1]+this.buttonRadius /2)
    ctx.font = '48px arial';


    ctx.beginPath();
    ctx.arc(this.damageButtonPos[0], this.damageButtonPos[1], this.buttonRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.fillText(this.damageText, this.damageButtonPos[0]-this.buttonRadius*14 , this.damageButtonPos[1]+this.buttonRadius /2)
    ctx.fillText(this.priceDamageText, this.damageButtonPos[0]+this.buttonRadius , this.damageButtonPos[1]+this.buttonRadius /2)
    ctx.font = '48px arial';



    ctx.fillText(this.moneyText, this.moneyPostion[0], this.moneyPostion[1]);
    ctx.fillText(this.moneyAmount, this.amountPostion[0], this.amountPostion[1]);

    document.body.style.backgroundColor =  this.colour;
   }
   update()
   { 
    this.moneyAmount = this.player.money;
   }
   init()
    {
        document.body.addEventListener('touchstart', this.boundHandler, false);
    }

   clickHandler(ShopScene, e)
   {

    ShopScene.touches = e.touches[0];
    ShopScene.exitDistance[0] =  ShopScene.exitButtonPos[0] -  ShopScene.touches.clientX;
    ShopScene.exitDistance[1] =  ShopScene.exitButtonPos[1] -  ShopScene.touches.clientY;
    ShopScene.exitDistance[2] = Math.sqrt((ShopScene.exitDistance[0]*ShopScene.exitDistance[0]) + (ShopScene.exitDistance[1]*ShopScene.exitDistance[1])); //find the distance between the two points   

    ShopScene.healthDistance[0] =  ShopScene.healthButtonPos[0] -  ShopScene.touches.clientX;
    ShopScene.healthDistance[1] =  ShopScene.healthButtonPos[1] -  ShopScene.touches.clientY;
    ShopScene.healthDistance[2] = Math.sqrt((ShopScene.healthDistance[0]*ShopScene.healthDistance[0]) + (ShopScene.healthDistance[1]*ShopScene.healthDistance[1])); //find the distance between the two points   

    ShopScene.upgradeDistance[0] =  ShopScene.damageButtonPos[0] -  ShopScene.touches.clientX;
    ShopScene.upgradeDistance[1] =  ShopScene.damageButtonPos[1] -  ShopScene.touches.clientY;
    ShopScene.upgradeDistance[2] = Math.sqrt((ShopScene.upgradeDistance[0]*ShopScene.upgradeDistance[0]) + (ShopScene.upgradeDistance[1]*ShopScene.upgradeDistance[1])); //find the distance between the two points  

    if(  ShopScene.exitDistance[2] < ShopScene.buttonRadius )
    {
        ShopScene.sceneManger.goToScene('Menu');//go to next scene in the list 
        document.body.removeEventListener("touchstart", ShopScene.boundHandler, false);
    }
    if(  ShopScene.healthDistance[2] < ShopScene.buttonRadius )
    {

        if(ShopScene.player.money >=  ShopScene.healthprice)
        {
            ShopScene.player.money -=  ShopScene.healthprice;
            ShopScene.player.startingHealth += 20;
            ShopScene.healthprice += 10;
            ShopScene.priceHealthText =  ShopScene.healthprice;
        }
    }

    if(  ShopScene.upgradeDistance[2] < ShopScene.buttonRadius )
    {
        if(ShopScene.player.money >=  ShopScene.damageprice)
        {
            ShopScene.player.money -=  ShopScene.damageprice;
            ShopScene.player.playerDamage += 1;
            ShopScene.damageprice += 10;
            ShopScene.priceDamageText =  ShopScene.damageprice;
        }
    }
   }  
}
