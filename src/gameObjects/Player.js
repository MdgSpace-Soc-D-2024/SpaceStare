// This will have properties of the player -->
// function to shoot bullet
// Animation on hit 
// Health 1/2/3/4 --> according to health image changes
// Additional powerups

import { Physics, GameObjects} from "phaser";
import { Bullet } from "./Bullet";

export class Player extends Physics.Arcade.Image {
    bullets = null;
    
    constructor({scene}){
        super(scene, 20, 200, 'ship');
        this.setOrigin(0, 0)
        this.setScale(2);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds();

        //Bullets group
        this.bullets = this.scene.physics.add.group({
            classType: Bullet,
            maxSize: 100,
        });

        this.bullets.runChildUpdate = true; 
    }

    move(gazeY){

        console.log("this is the players y: %d", this.y);
        
        if(gazeY > this.y+175){
            this.setVelocityY(160);
        }
        else if (gazeY < this.y+175){
            this.setVelocityY(-160);
        }
        else{
            this.setVelocity(0);
        }
    }

    shoot(){
        const bullet = this.bullets.get();
        if(bullet){
            bullet.fire(this.x +80 , this.y+48);
        }
        
    }

    damage(){
        this.setTexture("ship2");
    }
}