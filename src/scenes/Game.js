//This file will contain the game in which the player object moves and shoots a bullet object to the asteroid object to 
//destroy them and get points.


import { Math, Scene } from 'phaser';
import { Player } from '../gameObjects/Player';
import { Asteroid } from '../gameObjects/Asteroid';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
        this.gazeY = 400;
    }

    spawn(){
        // randomisation logic for generating asteroids
        var rand = Math.Between(0,512);
        this.rock = this.rocks.get(1074, rand);
    }

    create ()
    {
        // Creating a background
        this.background = this.add.sprite(0, 0, 'bg').setOrigin(0, 0);

        // Creating a new player object and passing this scene as parameter.
        this.player = new Player({scene: this});

        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.space.on('down', ()=>{
            this.player.shoot();
        });

        // Creating a new asteroid object --> just one for now 
        this.rocks = this.physics.add.group({
            classType: Asteroid,
            runChildUpdate: true
        });

        // Calls a callback function every 2 sec
        var timer = this.time.addEvent({
            delay: 2000,
            callback: this.spawn,
            callbackScope: this,
            loop: true
        });

        // Detects overlap b/w bullet and asteroid and destroys both
        this.physics.add.overlap(this.player.bullets, this.rocks, (rock, bullet) =>{
            bullet.setActive(false);
            bullet.setVisible(false);
            bullet.destroy();
            
            // rock.destroyRock();
            rock.setActive(false);
            rock.setVisible(false);
            rock.destroy();
        });

        // Detects overlap b/w player and asteroid and destroys asteroid + damages ship
        this.physics.add.overlap(this.player, this.rocks, (player, rock)=> {
            this.player.damage();
            // rock.destroyRock();
            rock.setActive(false);
            rock.setVisible(false);
            rock.destroy();
        });

        //setting listener for prediction data
        webgazer.setGazeListener((data, elapsedTime) =>{
            if(data){
                this.gazeY = data.y;
            }    
        });
    }

    update(){
        //Playing the background animation
        this.background.anims.play("bg", true);

        // Clamping the prediction value and passing it to player move function
        this.gazeY = Phaser.Math.Clamp(this.gazeY, 0, 1024);
        this.player.move(this.gazeY);

        // Pause/Resume for webgazer
        if(this.input.keyboard.addKey('p').isDown){
            webgazer.pause();
        }
        else if (this.input.keyboard.addKey('r').isDown){
            webgazer.resume();
        }
    }
}
