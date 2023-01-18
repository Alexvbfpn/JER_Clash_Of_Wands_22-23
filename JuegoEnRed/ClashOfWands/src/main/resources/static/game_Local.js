import {MainMenu} from './scenes/mainMenu.js';
import {Match} from './scenes/match.js';
import {CharacterSelector} from './scenes/characterSelector.js';
import {MidScene} from "./scenes/midScene.js";
import {FinalScene} from "./scenes/finalScene.js";
import {Credits} from "./scenes/credits.js";
import {Controls} from "./scenes/controls.js";
import {StartScene} from "./scenes/startScene.js";
import {ChooseMode} from "./scenes/chooseMode.js";
import {Login} from "./scenes/login.js";
import {Lobby} from "./scenes/lobby.js";
import {OnlineCharacterSelector} from "./scenes/onlineCharacterSelector.js";
import {LoadingScreen} from "./scenes/loadingScreen.js";
import {PauseScreen} from "./scenes/pauseScreen.js";
import {MatchOnline} from "./scenes/matchOnline.js";
import {MidSceneOnline} from "./scenes/midSceneOnline.js";
import {OnlineFinalScene} from "./scenes/finalSceneOnline.js";

var scenes = [];
scenes.push(LoadingScreen);
scenes.push(StartScene);
scenes.push(MainMenu);
scenes.push(Login);
scenes.push(ChooseMode);
scenes.push(Lobby);
scenes.push(OnlineCharacterSelector);
scenes.push(Credits);
scenes.push(Controls);
scenes.push(CharacterSelector);
scenes.push(Match);
scenes.push(MidScene);
scenes.push(FinalScene);
scenes.push(PauseScreen);
scenes.push(MatchOnline);
scenes.push(MidSceneOnline);
scenes.push(OnlineFinalScene);

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
    parent: "game",
    physics:
        {
            default: 'matter',
            matter: {
                debug: false,

                gravity: {
                    x: 0,
                    y: 0

                }
            }
        },
    dom:
    {
        createContainer: true,
    },
    title: 'Clash of Wands'
    }

var game = new Phaser.Game(config);

