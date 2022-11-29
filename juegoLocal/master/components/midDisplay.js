export class MidDisplay
{
    constructor(scene, playerWinner, indexType)
    {
        this.relatedScene = scene;
        this.winner = playerWinner;
        this.type = indexType;
    }

    preload()
    {
        this.relatedScene.load.spritesheet('midScene_Background', 'assets/img/midScreen/background_midSheet.PNG', {
            frameWidth: 1920,
            frameHeight: 1080
        });
        this.relatedScene.load.spritesheet('midScene_Text', 'assets/img/midScreen/text_midScene.PNG', {
            frameWidth: 1686,
            frameHeight: 448
        });
    }

    create()
    {

        //Fondo
        this.relatedScene.add.sprite(0, 0, 'midScene_Background', this.type).setOrigin(0, 0);
        this.relatedScene.add.sprite(161, 109, 'midScene_Text', this.winner).setOrigin(0, 0);

    }

}