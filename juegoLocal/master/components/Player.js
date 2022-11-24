import {Controller} from "../components/Controller.js";
export class Player
{

    constructor(scene,posX,posY,number,Controller)
    {
        this.relatedScene = scene;
        this.posX=posX;
        this.posY=posY;
        this.playerNumber=number;
        this.player;
        this.Controller=Controller;
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

            if(this.playerNumber===1)
            {
                   /*this.relatedScene.input.keyboard.on('keydown-W', function (event) {this.player.thrust(0.008);}, this);
                   this.relatedScene.input.keyboard.on('keydown-A', function (event) {this.player.setVelocityX(-10)}, this);
                   this.relatedScene.input.keyboard.on('keydown-S', function (event) {this.player.thrust(-0.008)}, this);
                   this.relatedScene.input.keyboard.on('keydown-D', function (event) {this.player.setVelocityX(10)}, this);
                   this.relatedScene.input.keyboard.on('keyup-W', function (event) {this.player.thrust(0);}, this);
                   this.relatedScene.input.keyboard.on('keyup-A', function (event) {this.player.setVelocityX(0)}, this);
                   this.relatedScene.input.keyboard.on('keyup-S', function (event) {this.player.thrust(0);}, this);
                   this.relatedScene.input.keyboard.on('keyup-D', function (event) {this.player.setVelocityX(0)}, this);
                   this.relatedScene.input.keyboard.on('keydown-E', function (event) {this.player.setAngularVelocity(0.1)}, this);
                   this.relatedScene.input.keyboard.on('keyup-E', function (event) {this.player.setAngularVelocity(0)}, this);
                    this.relatedScene.input.keyboard.on('keydown-Q', function (event) {this.player.setAngularVelocity(-0.1)}, this);
                    this.relatedScene.input.keyboard.on('keyup-Q', function (event) {this.player.setAngularVelocity(0)}, this);*/
                   //this.player.setVelocityX(0);
                   //this.play.setVelocityY(0);

               if (this.Controller.UP.isDown) {this.player.thrust(0.008);}
               else if (this.Controller.DOWN.isDown) {this.player.thrust(-0.008);}
               else{this.player.thrust(0);}
               if (this.Controller.LEFT.isDown) {this.player.setAngularVelocity(0.1);}
               else if (this.Controller.RIGHT.isDown) {this.player.setAngularVelocity(-0.1);}
               else{this.player.setAngularVelocity(0);}
        }
        if(this.playerNumber===2)
        {
            this.relatedScene.input.keyboard.on('keydown-UP', function (event) {this.player.thrust(0.008)}, this);
            this.relatedScene.input.keyboard.on('keydown-LEFT', function (event) {this.player.setVelocityX(-10)}, this);
            this.relatedScene.input.keyboard.on('keydown-DOWN', function (event) {this.player.thrust(-0.008)}, this);
            this.relatedScene.input.keyboard.on('keydown-RIGHT', function (event) {this.player.setVelocityX(10)}, this);
            this.relatedScene.input.keyboard.on('keyup-UP', function (event) {this.player.thrust(0);}, this);
            this.relatedScene.input.keyboard.on('keyup-LEFT', function (event) {this.player.setVelocityX(0)}, this);
            this.relatedScene.input.keyboard.on('keyup-DOWN', function (event) {this.player.thrust(0);}, this);
            this.relatedScene.input.keyboard.on('keyup-RIGHT', function (event) {this.player.setVelocityX(0)}, this);
            this.relatedScene.input.keyboard.on('keydown-NUMPAD_ONE', function (event) {this.player.setAngularVelocity(0.1)}, this);
            this.relatedScene.input.keyboard.on('keyup-NUMPAD_ONE', function (event) {this.player.setAngularVelocity(0)}, this);
            this.relatedScene.input.keyboard.on('keydown-NUMPAD_TWO', function (event) {this.player.setAngularVelocity(-0.1)}, this);
            this.relatedScene.input.keyboard.on('keyup-NUMPAD_TWO', function (event) {this.player.setAngularVelocity(0)}, this);
            /*if(this.cursors.left.isDown){this.player.relatedScene.setVelocityX(-160);}
            else if(this.cursors.right.isDown){this.player.relatedScene.setVelocityX(160);}
            else if(this.cursors.up.isDown){this.player.relatedScene.setVelocityY(160);}
            else if(this.cursors.down.isDown){this.player.relatedScene.setVelocityY(-160);}
            else {this.player.relatedScene.setVelocityX(0);this.player.relatedScene.setVelocityY(0);}*/
        }




    }


}