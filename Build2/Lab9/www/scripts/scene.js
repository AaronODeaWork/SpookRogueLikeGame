/**
 * class for the scene 
 */
class Scene
{

    /**
     * @param {string} title  title of the scene
     */
    constructor(title)
    {
        this.title = title;//assgin name to the class
    }

    /**
     * starts the scene 
     */
    start()
    {
        console.log(this.title +" starting");// say starting scene
    }

    /**
     * stops the scene
     */
    stop()
    {
        console.log(this.title+" stoping");// say stoping scene
    }

    /**
     * render the scene
     */
    render(ctx)
    {
        ctx.fillText(this.title, 10, 50);//render the title to the screne
    }
    
  /**
     * update the scene
     */
    update(ctx)
    {
       // ctx.fillText(this.title, 10, 50);//render the title to the screne
    }
}