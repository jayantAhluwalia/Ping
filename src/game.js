import Paddle from './paddle.js';
import InputHandler from './input.js';
import Ball from './ball.js';
import Brick from './brick.js';
import {buildLevel, level1 } from './levels.js';

const GAMESTATE =  {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
};
export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        new InputHandler(this.paddle, this);
        this.gameObjects = [];
        this.lives = 3;
    }

    
    
    start() {
        if(this.gamestate !== GAMESTATE.MENU) return;

        let bricks = buildLevel(this, level1);
        this.gameObjects = [this.ball, this.paddle, ...bricks];
        this.gamestate = GAMESTATE.RUNNING;
    }

    update(deltaTime) {
        // this.paddle.update(deltaTime);
        // this.ball.update(deltaTime);
        if(this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

        if(this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.GAMEOVER) return;
        this.gameObjects.forEach((Object) => Object.update(deltaTime));

        this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion);
    }

    draw(ctx) {
        
        this.gameObjects.forEach((Object) => Object.draw(ctx));
        if(this.gamestate == GAMESTATE.PAUSED){
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fill();


            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }
        if(this.gamestate == GAMESTATE.MENU){
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fill();


            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press Spacebar to Start", this.gameWidth / 2, this.gameHeight / 2);
        }
        if(this.gamestate == GAMESTATE.GAMEOVER){
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fill();


            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
        }
    }

    togglePause() {
        if(this.gamestate == GAMESTATE.PAUSED){
            this.gamestate = GAMESTATE.RUNNING;
        }
        else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }
}