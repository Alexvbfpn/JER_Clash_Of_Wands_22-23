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

    }

    create()
    {

        //Fondo
        this.relatedScene.add.sprite(0, 0, 'midScene_Background', this.type).setOrigin(0, 0);
        this.relatedScene.add.sprite(161, 109, 'midScene_Text', this.winner).setOrigin(0, 0);

    }

}