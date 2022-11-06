import { PlayButton } from "../components/playButton.js";
export class Match extends Phaser.Scene
{
    constructor()
    {
        super({key: 'match'});
        this.playButton = new PlayButton(this, 'mainMenu');
    }

    preload()
    {
        this.load.image('match_Background', 'assets/img_combat.jpg');
        this.playButton.preload();
    }

    create()
    {
        this.add.image(960, 540, 'match_Background');
        this.playButton.create();
    }
}