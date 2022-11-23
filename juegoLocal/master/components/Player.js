export class Player
{
    constructor(scene,posX,posY)
    {
        this.relatedScene = scene;
        this.posX=posX;
        this.posY=posY;
    }

    preload()
    {

        this.relatedScene.load.spritesheet("playerSprite", "assets/img/sprite_PlacaM.PNG", {
            frameWidth: 100,
            frameHeight: 100
        });

    }

    create()
    {

        this.relatedScene.physics.add.sprite(this.posX,this.posY,'playerSprite')

    }



}