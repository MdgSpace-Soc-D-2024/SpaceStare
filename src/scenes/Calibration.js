import { Scene } from "phaser";

export class Calibration extends Scene{
    constructor(){
        super("Calibration");
    }

    create(){
        this.background = this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
        this.background.play("bg", true);

        this.add.rectangle(this.scale.width/2, this.scale.height/5, 800, 150, 0xffffff)
        .setOrigin(0.5, 0.5)
        .setAlpha(0.8);
        this.add.text(this.scale.width/2, this.scale.height/5 - 15, "This is the calibration scene.                                            ", {color: '#000000'}).setOrigin(0.5, 0.5);
        this.add.text(this.scale.width/2, this.scale.height/5 + 15, "Please click on the Red dots without setting your eyesight off the cursor.\nPlease do it slow.", {color: '#000000'}).setOrigin(0.5, 0.5);

        for ( let i = 0; i < 5; i++){
            for (let j = 0; j < 5 ; j++){
                const dot = this.add.circle(100 + i* 205, 30 + j*115, 8, 0xff0000).setInteractive();
                dot.on("pointerdown", () => {
                dot.setFillStyle(0x00ff00);
                });
            }
        }

        this.add.rectangle(this.scale.width/2, this.scale.height/5*4 + 10, 120, 40, 0xffffff)
        .setOrigin(0.5, 0.5)
        .setAlpha(0.8)
        .setInteractive()
        .on("pointerdown", () => {
            this.scene.start("StartScene");
        });
        this.add.text(this.scale.width/2, this.scale.height/5*4 +10, "Back", {color:'#000000'}).setOrigin(0.5, 0.5);
    }
}
