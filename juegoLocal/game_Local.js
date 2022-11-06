import {MainMenu} from './scenes/mainMenu.js';
import {Match} from './scenes/match.js';

var scenes = [];
scenes.push(MainMenu)
scenes.push(Match);

var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scene: scenes,
    physics:
        {
            default: 'arcade',
            arcade:
                {
                    gravity: {y: 300},
                    debug: false
                }
        }
    }

var game = new Phaser.Game(config);