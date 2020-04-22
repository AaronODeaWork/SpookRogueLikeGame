/**
 * main game class for runing the game 
 */
class Game
{
    /**
     * a constructor ffor the main loop class 
     * @param {float} width  // width of screen
     * @param {float} height //height of screen
     */
    constructor(width, height)
    {
        this.ws = new WebSocket("ws://149.153.106.128:8080/wstest");   
       

        this.boundRecursiveUpdate = this.update.bind(this);//bind update to this  when it goes out tof scope
        this.canvasWidth = width; // assign the width of the screen
        this.canvasHeight = height; // assign the height of the screen
        this.ctx = {};// create a context object for use in canvas
        this.gameData = [];
        this.init();// call initialise canvas 
        this.loadJSON();
        this.player = new Player(this.ctx);

        /**
        *------------------------------
        * Add screens here 
        * -----------------------------
        */
        this.sceneManager = new SceneManager(); //create a screen canvas
        this.titleScene = new TitleScene("Title", "white", this.sceneManager);//create a title screen 
        this.menuScreen = new MenuScene("Menu", "white", this.sceneManager);//create a menu screen
        this.gameOver = new GameOver("GameOver", "green", this.sceneManager);//create a gameover screen
        this.tutorialScreen = new TutorialScreen("Tutorial", "grey", this.sceneManager, this.ctx ,this.player);//create a tutorial screen
        this.gameScreen = new GameScreen("Game", "grey", this.sceneManager, this.ctx,this.player,this.ws);//create a gameplay screen
        this.shopScreen = new ShopScene("Shop", "white", this.sceneManager, this.ctx,this.player);//creates a shop screen

        this.sceneManager.addScene(this.titleScene);//add the tittle screen to the list
        this.sceneManager.addScene(this.menuScreen);//add the menu screen to the list 
        this.sceneManager.addScene(this.gameOver);//add the gameover screen to the list 
        this.sceneManager.addScene(this.gameScreen);//add the gameplay screen to the list 
        this.sceneManager.addScene(this.tutorialScreen);//add the tutorial screen to the list 
        this.sceneManager.addScene(this.shopScreen);//add the tutorial screen to the list 

        this.sceneManager.goToScene("Title");//start scene
        this.ws.addEventListener("message", this.handleMessage.bind(null, this));
    }

    update()
    {
        this.sceneManager.render(this.ctx);
        this.sceneManager.update(this.ctx);
        window.requestAnimationFrame(this.boundRecursiveUpdate);// call game update
        this.loadJSON()
    }

    init()
    {
        // debug is touch device 
        console.log(is_touch_device());
        var canvas = document.createElement("canvas");	// make a canvas
        canvas.id = 'mycanvas'; // name the canvas
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        this.ctx = canvas.getContext("2d"); //assign canvas context to ctx
        document.body.appendChild(canvas);

        canvas.addEventListener("touchstart", onTouchStart);  
        canvas.addEventListener("touchmove", onTouchMove);  
        canvas.addEventListener("touchend", onTouchEnd);  
    }
    // JSON loading locally
    loadJSON(){
        var requestURL = 'https://itcgamesprog2.github.io/gd-gpp-project-aaron-dion/Assets/map.json';
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        var that = this;
        request.onload = function() {
            that.gameData = request.response;
            that.gameScreen.setSource(that.gameData.level);
            that.tutorialScreen.setSource(that.gameData.tutorial);
        }
    }

    handleMessage(game, evt)
    {
    //alert(evt.data);


        var object = JSON.parse(evt.data);// assign the message to a var so it displays as a meessage 
        if(object.type == "start")
        {
            game.GameStart = true;//start the game 
          
            
            alert(object.data);// say that the game has started 
        }
        if(  game.GameStart == true)//if the game has started update players 
        {
            if(object.type == "updateState")
            {
                game.updateFromNet(object.data);
            }
        }
        if(object.type == "GameOver")//when game over alert players 
        {
           alert(object.data);
        }
        if(object.type == "Error")//when game over alert players 
        {
           alert(object.data);
        }  
    };  
    join(game,evt)
    {      
        alert("Game Joined");
        console.log("Join Game");
        var message={};
        message.type = "join";
        game.ws.send(JSON.stringify(message));

    };

    GameOver(game,evt)
    {
        console.log("Game Over");
        var message={};
        message.type = "GameOver";
        game.ws.send(JSON.stringify(message));

    };
    updateState()
    {
        var updateMessage = {};
        updateMessage.type = "updateState";
        updateMessage.data = {x:this.player.x,y:this.player.y};
        // write the message to the server
        this.ws.send(JSON.stringify(updateMessage));
    };
    updateFromNet(posData)
    {
      this.secondPlayer.x = posData.x;
      this.secondPlayer.y = posData.y;

    }
}