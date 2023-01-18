export class FinalDisplay
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
        this.relatedScene.add.sprite(0, 0, 'finalScene_Background', this.type).setOrigin(0, 0);
        this.relatedScene.add.sprite(428, 477, 'finalScene_Text', this.winner).setOrigin(0, 0);

    }

}