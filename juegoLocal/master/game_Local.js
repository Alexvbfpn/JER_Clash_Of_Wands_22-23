import {MainMenu} from './scenes/mainMenu.js';
import {Match} from './scenes/match.js';
import {CharacterSelector} from './scenes/characterSelector.js';
var scenes = [];
scenes.push(Match);
scenes.push(MainMenu);
scenes.push(CharacterSelector);




var config = {

    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scene: scenes,
    scale:
        {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
    physics:
        {
            default: 'arcade',
            arcade:
                {
                    gravity: {y: 300},
                    debug: true
                }
        },
    title: 'Clash of Wands'
    }

var game = new Phaser.Game(config);