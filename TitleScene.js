/**
 * a class derived from the scene class 
 */
class TitleScene extends Scene
{ /**
 * 
 * @param {string} title the title of the scene
 * @param {canvas} colour //colour of the scenes background 
 */
   constructor(title,colour, scene)
   {  
    super(title);//overide to the super class 
    this.sceneManger = scene;
    this.colour = colour;//set the colour;
    this.boundHandler = this.clickHandler.bind(null, this);
    this.img = new Image();   // Create new img element
    this.img.src = 'Assets/BACKGROUND.png'; // Set source path
    this.img.id = "background"
    this.audioCtx = {};
    this.sound = {};
   }
    /**
    * renders to the screen
    * @param {canvas} ctx 
    */
   
   render(ctx)
   {
       ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);//clear the screen
       super.render(ctx);//call the supers render 
       ctx.drawImage(this.img, 0, 0,window.innerWidth *.96, window.innerHeight*.95);
       document.body.style.backgroundColor =  this.colour;//set background colour  
    }

    update(ctx)
    {
   
    }
    
    init()
    {
        document.body.addEventListener('touchstart', this.boundHandler, false);
    }

    clickHandler(Titlescene, e)
    {
        // uncomment for audio !
        // Titlescene.testAudioAPI();
        Titlescene.sceneManger.goToScene('Menu');//go to next scene in the list 
        document.body.removeEventListener("touchstart", Titlescene.boundHandler, false);
    }
     testAudioAPI()
    {
        try {
            this.audioCtx = new AudioContext();
            this.loadSound('https://itcgamesprog2.github.io/gd-gpp-project-aaron-dion/Assets/dungeon.wav');
        } catch(e) {
            throw new Error('Web Audio API Not supported');
        }
    }
    loadSound(url)
    {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        var that = this;
        request.onload = function() {
            //decode response
            that.audioCtx.decodeAudioData(request.response, function(buffer) {
                that.sound = buffer;
                that.playSound();
            }, function(error) {
                throw new Error(error);
            });
        };
        request.send();
    }
    playSound()
    {
        var source = this.audioCtx.createBufferSource();
        source.buffer = this.sound;
        source.connect(this.audioCtx.destination);
        source.start(0);
    }
}
