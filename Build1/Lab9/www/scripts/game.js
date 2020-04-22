
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
        this.boundRecursiveUpdate = this.update.bind(this);//bind update to this  when it goes out tof scope
        this.canvasWidth = width; // assign the width of the screen
        this.canvasHeight = height; // assign the height of the screen
        this.ctx = {};// create a context object for use in canvas
        this.audioCtx = {};
        this.init();// call initialise canvas 
        this.testAudioAPI();
        /**
        *------------------------------
        * Add screens here 
        * -----------------------------
        */
        this.sceneManager = new SceneManager(); //create a screen canvas
        this.titleScene = new TitleScene("Title", "pink", this.sceneManager);//create a title screen 
        this.menuScreen = new MenuScene("Menu", "red", this.sceneManager);//create a menu screen
        this.gameOver = new GameOver("GameOver", "green", this.sceneManager);//create a gameover screen
        this.gameScreen = new GameScreen("Game", "white", this.sceneManager, this.ctx);//create a gameplay screen

        this.sceneManager.addScene(this.titleScene);//add the tittle screen to the list
        this.sceneManager.addScene(this.menuScreen);//add the menu screen to the list 
        this.sceneManager.addScene(this.gameOver);//add the gameover screen to the list 
        this.sceneManager.addScene(this.gameScreen);//add the gameover screen to the list 

        this.sceneManager.goToScene("Title");//start scene
    }

    update()
    {
        this.sceneManager.render(this.ctx);
        this.sceneManager.update(this.ctx);
        window.requestAnimationFrame(this.boundRecursiveUpdate);// call game update
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
        // JSON loading from url for dynamic webpage : create own JSON file and upload it
        // NOTE: the failure to load resource can come from adblock / ublock
        var requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
            var gameData = request.response;
            // do something with gameData
        }
    }
    testAudioAPI()
    {
        try {
            this.audioCtx = new AudioContext();
        } catch(e) {
            throw new Error('Web Audio API Not supported');
        }
    }
}
    
