import {Phaser} from "../phaser";


export class MainMenu extends Phaser.Scene
{
    constructor()
    {
        super({key: 'mainMenu'});
    }

    preload()
    {
        this.load.image('mainMenu_Background', '../assets/img_mainMenu');
    }

    create()
    {
        this.add.image(960, 540, 'mainMenu_Background');
    }
}