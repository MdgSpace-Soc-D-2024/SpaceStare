import { Game as MainGame } from './scenes/Game';
import { AUTO, Scale,Game } from 'phaser';
import { Preloader } from './Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: AUTO,
    width: 1024,
    height: 512,
    parent: 'game-container',
    backgroundColor: '#000000',
    scale: {
        autoCenter: Scale.CENTER_BOTH
    },
    physics:{
        default: 'arcade',
        arcade:{
            gravity:{y:0},
            debug: false
        }
    },
    scene: [
        Preloader,
        MainGame
    ]
};

export default new Game(config);
