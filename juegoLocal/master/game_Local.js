import {MainMenu} from './scenes/mainMenu.js';
import {Match} from './scenes/match.js';
import {CharacterSelector} from './scenes/characterSelector.js';
import {MidScene} from "./scenes/midScene.js";
import {FinalScene} from "./scenes/finalScene.js";
import {Credits} from "./scenes/credits.js";

var scenes = [];

scenes.push(MainMenu);
scenes.push(Credits);
scenes.push(CharacterSelector);
scenes.push(Match);
scenes.push(MidScene);
scenes.push(FinalScene);

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
            default: 'matter',
            matter: {
                debug: true,

                gravity: {
                    x: 0,
                    y: 0

                }
            }
        },
    title: 'Clash of Wands'
    }

var game = new Phaser.Game(config);



