export class Match extends Phaser.Scene
{
    constructor()
    {
        super({key: 'match'});
    }

    preload()
    {
        this.load.image('match_Background', '../assets/img_combat.jpg');
    }

    create()
    {
        this.add.image(960, 540, 'match_Background');
    }
}