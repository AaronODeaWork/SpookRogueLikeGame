class Pickup
{
    constructor(ctx)
    { 
        this.position = [window.innerWidth * 0.8, window.innerHeight*0.2];//starting postion of the player 
    
        this.pickupDistance = [0,0,0];
        this.sprite =  new Image();// sprite 
        this.ctx = ctx;//canvase 
        this.init();

    }
    init()
    {
        this.sprite.src = 'Assets/gem.png';
        this.isAlive = true;
    }
    render()
    {
            this.ctx.drawImage(this.sprite, this.position[0], this.position[1]);
    }

    update()
    {

    }
    getPos()
    {
        return this.position;
    }

    checkInRange(playerPostion)
    {

        this.pickupDistance[0] =  this.position[0]+(PLAYER_FRAME_WIDTH/2) -  playerPostion[0];
        this.pickupDistance[1] =  this.position[1]+(PLAYER_FRAME_HEIGHT/2) -  playerPostion[1];
        this.pickupDistance[2] = Math.sqrt((this.pickupDistance[0]*this.pickupDistance[0]) + (this.pickupDistance[1]*this.pickupDistance[1])); //find the distance between the two points   
            if(  this.pickupDistance[2] < 70 )
            {
                this.position[0] = Math.random() * (window.innerWidth *.87 )+window.innerWidth *.008 ;
                this.position[1] = Math.random() *  (window.innerHeight *.74)+window.innerWidth *.008 ; 
                return 1;
            }
    return 0;
    }

}