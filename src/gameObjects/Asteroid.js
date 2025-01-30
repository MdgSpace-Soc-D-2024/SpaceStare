// this is the asteroid objects which we need to destroy. 
//Properties -->

// Will get destroyed by the bullet object on collision
// spawn randomly from outside the frame and move irregularly throughout the screen or maybe in a pattern
// Damages the player ship when hits it or passes by it.
// Has animation when destroyed --> particles --> phaser

import { Math, GameObjects } from "phaser";

export class Asteroid extends GameObjects.Sprite
{
    speed = Math.GetSpeed(3000, 1);

    constructor(scene, x, y){
        super(scene, x, y, "rock");
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(0.5);
        this.anims.play("rock");
    }
    
    update(){
        // Makes the rock move and wrap in the frame until it gets destroyed.
        this.x -= this.speed;

        // Wrapping the asteroids to the screen dimensions.
        this.x = Math.Wrap(this.x, 0, 1124);
        this.y = Math.Wrap(this.y, -70, 550);

    }
    
    destroyRock(){
        this.setVisible(false);
        this.setActive(false);
        this.destroy(false);
    }
}