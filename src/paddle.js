
export default class Paddle{

    constructor(game) {
        this.gameWidth = game.gameWidth;
        this.width = 150;
        this.height = 30;

        this.maxSpeed = 10;
        this.speed = 0;
        this.speedY = 0;

        this.position = {
            x:game.gameWidth / 2 - this.width / 2,
            y:game.gameHeight - this.height - 10,
        }
        
    }

    draw(ctx){

        ctx.fillStyle = '#0f0'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime){
        
        

        this.position.x += this.speed;
        this.position.y += this.speedY;

        if (this.position.x < 0) this.position.x = 0;

        if (this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;

        // if (this.position.y < 0) this.speedY = this.maxSpeed;

        // if (this.position.y > 570) this.speedY = -this.maxSpeed;

    }

    moveLeft(){
        this.speed = -this.maxSpeed;
    }

    moveRight() {
        this.speed = this.maxSpeed;
    }

    // moveUp(){
    //     this.speedY = -this.maxSpeed;
    // }

    // moveDown(){
    //     this.speedY = this.maxSpeed;
    // }
    stop() {
        this.speed = 0;
    }
    
    
    

}