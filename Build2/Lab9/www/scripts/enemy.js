class Enemy {
    constructor(ctx) {
        this.fired = false;//if the bolt is fired
        this.enemyPosition = [435, 90];//the enemy postion
        this.enemyEndpostion = [435, 90]// the end point of the postion
        this.direction = [0, 0, 0];// diretion of the enemy 
        this.playerDistance = [0, 0, 0]// the direction from the enemy to the player 
        this.boltPosition = [-10, -10];// the postion of the bolt 

        this.startingHealth = 500;//starting healt of the enemy 
        this.health = this.startingHealth;
        this.healthBarSize = [100, 20];//size of the health bar 
        this.isAlive = true;//if the enemy is alive 

        this.isLoaded = false;
        this.enemyStrip = new Image();//sprite for enemy
        this.boltImage = new Image();//sprite for bolt 
        this.boltHitBox = 10;//bolts hit box
        this.viewRange = 200;//view range of enemy 
        this.boltSpeed = 4;

        this.randColour = 0;

        this.ctx = ctx;
    }
    /**
     * initiate or re start enemy
     */
    init() {
        this.randomImg();
        var that = this;
        this.boltImage.addEventListener('load', function () {
            that.isLoaded = true;
        }, false);
        this.boltImage.src = 'Assets/bolt.png';

        this.enemySprite = new Sprite(this.ctx, {
            width: ENEMY_FRAME_WIDTH,
            height: ENEMY_FRAME_HEIGHT,
            image: this.enemyStrip
        },
            FPS,
            this.enemyPosition[0],
            this.enemyPosition[1]);

        this.fired = false;
        this.enemyPosition = [window.innerWidth * .44, window.innerHeight * .168];
        this.enemyEndpostion = [window.innerWidth * .44, window.innerHeight * .168]
        this.enemySpeed = 1;
        this.playerDistance = [0, 0, 0]
        this.boltPosition = [this.enemyPosition[0] + ENEMY_FRAME_WIDTH / 3, this.enemyPosition[1] + ENEMY_FRAME_HEIGHT / 1.15];

        this.startingHealth = 500;
        this.health = this.startingHealth;
        this.healthBarSize = [100, 20];
        this.isAlive = true;
        this.enemyLevel = 0;

    }
    /**
     * update enemy
     */
    update() {
        if (this.isAlive == true)//if enemy alive
        {
            this.enemySprite.play();//draw sprite 
            if (this.fired)//if bolt fired
            {
                this.boltPosition[1] -= (this.playerDistance[1] / this.playerDistance[2]) * this.boltSpeed;// move the bolt towards the player 
                this.boltPosition[0] -= (this.playerDistance[0] / this.playerDistance[2]) * this.boltSpeed;
                if (this.boltPosition[1] > window.innerHeight || this.boltPosition[1] < 0 ||//if outside bounds destroy
                    this.boltPosition[0] > window.innerWidth || this.boltPosition[0] < 0
                ) {

                    this.boltPosition[1] = -10;
                    this.boltPosition[0] = -10;
                    this.fired = false;

                }
            }
            this.moveEnemy();//move enemy call
        }

    }
    /**
     * render the enemy and or bolt 
     */
    render() {
        if (this.isAlive == true)//if enemy alive
        {
            this.enemySprite.render();//draw enemy
            if (this.fired)//if bolt fired 
            {
                this.ctx.drawImage(this.boltImage, this.boltPosition[0] + 20, this.boltPosition[1] - 10);
            }
            /*
            * health bar
            */
            this.ctx.beginPath();
            this.ctx.fillStyle = "red";
            this.ctx.rect(this.enemyPosition[0], this.enemyPosition[1], this.healthBarSize[0], this.healthBarSize[1]);//health bar 
            this.ctx.fill();
        }
    }
    /**
     * get postion of enemy
     */
    getPos() {
        return this.enemyPosition;
    }
    /**
     * 
     * @param {vector} playerPostion //players postion
     */
    checkInRange(playerPostion) {
        if (this.isAlive == true && !this.fired) {
            this.playerDistance[0] = this.enemyPosition[0] + (PLAYER_FRAME_WIDTH / 2) - 15 - playerPostion[0];//get distance from the players x
            this.playerDistance[1] = this.enemyPosition[1] + (PLAYER_FRAME_HEIGHT / 2) - playerPostion[1];//get the distance from the players y
            this.playerDistance[2] = Math.sqrt((this.playerDistance[0] * this.playerDistance[0]) + (this.playerDistance[1] * this.playerDistance[1])); //find the distance between the two points 
            if (this.playerDistance[2] < this.viewRange) {
                this.fire();
            }
        }
    }
    /**
     * fire the bolt 
     */
    fire() {
        if (!this.fired) {
            this.boltPosition = [this.enemyPosition[0] + ENEMY_FRAME_WIDTH / 3, this.enemyPosition[1] + ENEMY_FRAME_HEIGHT / 1.15];//set the bolt postion to the postion of the enemy 
            this.fired = true;
        }
    }
    /**
     * 
     * @param {float } damage damage delth to enemy
     */
    takeDamage(damage) {
        this.health -= damage;//takes the playes damage output from the enemy 
        if (this.health > 0 && damage > 0 && this.isAlive == true)//check if enemy is alive and the damge done is greater than 0
        {
            this.healthBarSize[0] = 100 * (this.health / this.startingHealth)//decrease health bar 
        }
        if (this.health <= 0)//kill enemy 
        {
            this.isAlive = false;
        }
    }
    /**
     * moves the enemy to random point from a point 
     */
    moveEnemy() {
        this.direction[0] = this.enemyPosition[0] + (ENEMY_FRAME_WIDTH / 2) - this.enemyEndpostion[0]; // direction for x
        this.direction[1] = this.enemyPosition[1] + (ENEMY_FRAME_HEIGHT / 2) - this.enemyEndpostion[1]; //direction for y
        this.direction[2] = Math.sqrt((this.direction[0] * this.direction[0]) + (this.direction[1] * this.direction[1])); //find the distance between the two points 

        if (this.direction[2] >= 10) //if the distance is more than this move the player to that point 
        {
            this.enemyPosition[0] -= (this.direction[0] / this.direction[2]) * this.enemySpeed;// move in the direction x by the speed 
            this.enemyPosition[1] -= (this.direction[1] / this.direction[2]) * this.enemySpeed;

        }
        else // if the enemy  has reached the point  generate a new random location to walk to
        {

            this.enemyEndpostion[0] = Math.random() * (window.innerWidth * .94) + 70;
            this.enemyEndpostion[1] = Math.random() * (window.innerHeight * .93) + 70;

        }
        this.enemySprite.move(this.enemyPosition[0], this.enemyPosition[1]);//move the enemy 
    }

    /**
    * reset enemy
    */
    reset() {
        this.randomImg();
        this.fired = false;
        this.enemyPosition = [window.innerWidth * .44, window.innerHeight * .168];
        this.enemyEndpostion = [window.innerWidth * .44, window.innerHeight * .168]
        this.playerDistance = [0, 0, 0]
        this.boltPosition = [this.enemyPosition[0] + ENEMY_FRAME_WIDTH / 3, this.enemyPosition[1] + ENEMY_FRAME_HEIGHT / 1.15];
        this.boltSpeed += 1;

        this.enemySpeed += 1;
        this.startingHealth = 500;
        this.startingHealth += 100;
        this.health = this.startingHealth;
        this.healthBarSize = [100, 20];
        this.isAlive = true;
    }
    /**
 * picks a random img for the enemy each time it spawns in
 */
    randomImg() {
        this.randColour = Math.floor(Math.random() * 4);
        var that = this;
        if (this.randColour == 0) {
            this.enemyStrip.addEventListener('load', function () {

                that.isLoaded = true;
            }, false);
            this.enemyStrip.src = 'Assets/enemy.png';
        }
        else if (this.randColour == 1) {
            this.enemyStrip.addEventListener('load', function () {

                that.isLoaded = true;
            }, false);
            this.enemyStrip.src = 'Assets/enemy2.png';
        }
        else if (this.randColour == 2) {
            this.enemyStrip.addEventListener('load', function () {

                that.isLoaded = true;
            }, false);
            this.enemyStrip.src = 'Assets/enemy3.png';
        }
        else if (this.randColour == 3) {
            this.enemyStrip.addEventListener('load', function () {

                that.isLoaded = true;
            }, false);
            this.enemyStrip.src = 'Assets/enemy4.png';
        }
    }
    /**
  * checks if the enemy is dead and the resets it to a new enemy 
  */
    checkAlive() {
        if (this.isAlive === false) {
            this.enemyLevel++;//increases what level enemy the playeris on 
            this.reset();//reset the enemy 
            return false;//retrun that the enemy is dead
        }
        return true;
    }

    /**
     * reset the level of the enemy 
     */
    resetLevel() {
        this.enemyLevel = 0;
    }

    /**
     *get the level of the enemy 
     */
    getLevel() {
        return (this.enemyLevel);
    }
}