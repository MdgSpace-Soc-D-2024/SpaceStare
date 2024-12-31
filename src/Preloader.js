//loads all the assets for the game and also has the background sprite which is common in all the scenes

export class Preloader extends Phaser.Scene
{
    constructor(){
        super({key: 'Preloader'});
    }

    preload(){
        this.load.setPath("assets");

        this.load.spritesheet('background', 'spacebg.png', {frameWidth: 1024, frameHeight: 512 });        
        this.load.image('ship', 'shuttle.png');
        this.load.spritesheet('bullet','bullet.png',{frameWidth: 32, frameHeight: 32});

    }
    create(){
        // Animation for background
        this.anims.create({
            key: "bg",
            frames: this.anims.generateFrameNames("background", {
                start: 0,
                end:3
            }),
            frameRate: 2,
            repeat: -1
        });

        // Animation for bullet
        this.anims.create({
            key:"bullet",
            frames: this.anims.generateFrameNames("bullet", {
                start: 0,
                end: 3
            }),
            frameRate: 4,
            repeat: -1
        });

        //Moving to the next scene
        this.scene.start("Game");
    }
}