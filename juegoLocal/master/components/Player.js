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
        this.relatedScene.load.spritesheet("playerSprite", "assets/img/PantalladeJuego/Spritesheets/SpritesheetAgua.PNG", {
            frameWidth: 124,
            frameHeight: 165
        });
    }

    create()
    {

        this.player= this.relatedScene.matter.add.sprite(this.posX,this.posY,'playerSprite');

        this.relatedScene.anims.create({
            key: 'idle',
            frames: this.player.anims.generateFrameNumbers('playerSprite', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.relatedScene.anims.create({
            key: 'walk',
            frames: this.player.anims.generateFrameNumbers('playerSprite', { start: 5, end: 8 }),
            frameRate: 20,
            repeat: -1
        });
        this.relatedScene.anims.create({
            key: 'idlePunch',
            frames: this.player.anims.generateFrameNumbers('playerSprite', { start: 10, end: 14 }),
            frameRate: 10,
            repeat: -1
        });
        this.relatedScene.anims.create({
            key: 'walkPunch',
            frames: this.player.anims.generateFrameNumbers('playerSprite', { start: 15, end: 19 }),
            frameRate: 10,
            repeat: -1
        });
        this.player.setFrictionAir(0.1);
        this.player.setMass(50);
        this.player.setFixedRotation();


    }

    update()
    {
               if (this.Controller.actions.UP.isDown)
               {
                   this.player.thrust(0.16);
                   this.player.anims.play('walk', true);
               }
               else if (this.Controller.actions.DOWN.isDown)
               {
                   this.player.thrust(-0.16);
                   this.player.anims.play('walk', true);
               }
               else
               {
                   this.player.thrust(0);
                   this.player.anims.play('idle', true);
               }

               if (this.Controller.actions.LEFT.isDown)
               {
                   this.player.setAngularVelocity(-0.08);
                   //this.player.anims.play('walk', true);
               }
               else if (this.Controller.actions.RIGHT.isDown)
               {
                   this.player.setAngularVelocity(0.08);
                   //this.player.anims.play('walk', true);
               }
               else
               {
                   this.player.setAngularVelocity(0);
                   //this.player.anims.play('idle', true);
               }
    }


}