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
        this.relatedScene.load.spritesheet('finalScene_Background', 'assets/img/finalScreen/background_finalSheet.PNG', {
            frameWidth: 1920,
            frameHeight: 1080
        });
        this.relatedScene.load.spritesheet('finalScene_Text', 'assets/img/finalScreen/text_finalScene.PNG', {
            frameWidth: 1067,
            frameHeight: 288
        });
    }

    create()
    {

        //Fondo
        this.relatedScene.add.sprite(0, 0, 'finalScene_Background', this.type).setOrigin(0, 0);
        this.relatedScene.add.sprite(428, 477, 'finalScene_Text', this.winner).setOrigin(0, 0);

    }

}