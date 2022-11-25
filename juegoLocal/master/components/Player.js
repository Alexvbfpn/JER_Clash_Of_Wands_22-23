import {Controller} from "../components/Controller.js";
export class Player
{

    constructor(scene,posX,posY,number,Controller,type)
    {
        this.relatedScene = scene;
        this.posX=posX;
        this.posY=posY;
        this.playerNumber=number;
        this.player;
        this.Controller=Controller;
        this.type=type;
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

        this.player= this.relatedScene.matter.add.sprite(this.posX,this.posY,'playerSprite');
        this.player.setFrictionAir(0.1);
        this.player.setMass(50);
        this.player.setFixedRotation();


    }

    update()
    {
               if (this.Controller.actions.UP.isDown) {this.player.thrust(0.16);}
               else if (this.Controller.actions.DOWN.isDown) {this.player.thrust(-0.16);}
               else{this.player.thrust(0);}
               if (this.Controller.actions.LEFT.isDown) {this.player.setAngularVelocity(-0.08);}
               else if (this.Controller.actions.RIGHT.isDown) {this.player.setAngularVelocity(0.08);}
               else{this.player.setAngularVelocity(0);}
    }


}