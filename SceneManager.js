/**
 * a class to manage the transtion of scenes 
 */
class SceneManager
{   
    /**
     * a constructor for the sceen class
     * @param {scene} currentScene is the intiial scene the sceenManager 
     * will use if none it will be null
     */
    constructor( currentScene = null)
    {
        this.currentScene = currentScene;//assigin the input scene to scene
        this.sceneDict = {}; //constructing a dictonary 
        this.list = [];//constructing a list 
        this.index = -1;//an index which controls the current scene in the list/dic
    }
    /**
    * adds a scene to the list / dic 
    * @param {scene} scene the scene you want to add 
    */
    addScene(scene)
    {        
        this.sceneDict[scene.title]= scene;// adding the new scen to the dict
        this.list.push(scene.title);//pushing the scene to the lsit 
        this.index+= 1;//increasing the amount of scenes in the lsit 
    }
    /**
     * goes to a specfic scene
     * @param {string} title //the title of a scene
     */
    goToScene(title)
    {     
        // if the scene is null dont run anything 
        if(this.currentScene !== null)
        {
            this.currentScene.stop();
        }
        this.currentScene = this.sceneDict[title];//make the current scene  one in the dic
        this.currentScene.start();//start the scene
        this.currentScene.init();
        this.index = this.list.indexOf(title);
    }
    /**
     * go to the next scene in the lsit 
     */
    goToNextScene()
    {
    this.index += 1; //increase the scene index 

    if(this.currentScene != null)// if its null dont run
    {
    this.currentScene.stop();
    }

    if(this.index === this.list.length) // if the list is at the end of the list 
    {
        this.index = 0;//reset the index to thestart of the list 
        this.currentScene = this.sceneDict[this.list[this.index]];//make the scene the next scene in the list 
    }
    else
    {
        this.currentScene = this.sceneDict[this.list[this.index]];//make the scene the next scene in the list 
    }
    this.currentScene.start();//start the scene 
    }
    
    /**
     * renders the scene 
     * @param {canvas} ctx the canvas for the background
     */
    render(ctx)
    {
    this.currentScene.render(ctx);
    }
    update(ctx)
    {
     this.currentScene.update(ctx);
    }


}