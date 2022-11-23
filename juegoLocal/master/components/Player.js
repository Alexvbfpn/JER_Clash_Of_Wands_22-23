import {Controller} from "../components/Controller.js";
export class Player
{

    constructor(scene,posX,posY,number)
    {
        this.relatedScene = scene;
        this.posX=posX;
        this.posY=posY;
        this.playerNumber=number;
        this.player;
        this.cursors;
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

        this.cursors = new Controller(this.relatedScene);
        //this.cursors.create();
        this.player= this.relatedScene.physics.add.sprite(this.posX,this.posY,'playerSprite');

    }

    update()
    {

            if(this.playerNumber===1) {
                this.player.setVelocity(0)
                this.relatedScene.input.keyboard.on('keydown-W', function (event) {this.player.setVelocityY(-160)}, this);
                this.relatedScene.input.keyboard.on('keydown-A', function (event) {this.player.setVelocityX(-160)}, this);
                this.relatedScene.input.keyboard.on('keydown-S', function (event) {this.player.setVelocityY(160)}, this);
                this.relatedScene.input.keyboard.on('keydown-D', function (event) {this.player.setVelocityX(160)}, this);
                this.relatedScene.input.keyboard.on('keyup-W', function (event) {this.player.setVelocityY(0)}, this);
                this.relatedScene.input.keyboard.on('keyup-A', function (event) {this.player.setVelocityX(0)}, this);
                this.relatedScene.input.keyboard.on('keyup-S', function (event) {this.player.setVelocityY(0)}, this);
                this.relatedScene.input.keyboard.on('keyup-D', function (event) {this.player.setVelocityX(0)}, this);
                this.relatedScene.input.keyboard.on('keydown-E', function (event) {this.player.setAngularVelocity(20)}, this);
                this.relatedScene.input.keyboard.on('keyup-E', function (event) {this.player.setAngularVelocity(0)}, this);
                //this.player.setVelocityX(0);
                //this.player.setVelocityY(0);

            /*if (this.cursors.AKey.isDown) {this.player.setVelocityX(-160)}
            else if (this.cursors.DKey.isDown) {this.player.relatedScene.setVelocityX(160);}
            else if (this.cursors.WKey.isDown) {this.player.relatedScene.setVelocityY(160);}
            else if (this.cursors.SKey.isDown) {this.player.relatedScene.setVelocityY(-160);}
            else{this.player.setVelocityX(0);this.player.setVelocityY(0);}*/
        }
        if(this.playerNumber===2)
        {
            this.relatedScene.input.keyboard.on('keydown-UP', function (event) {this.player.setVelocityY(-160)}, this);
            this.relatedScene.input.keyboard.on('keydown-LEFT', function (event) {this.player.setVelocityX(-160)}, this);
            this.relatedScene.input.keyboard.on('keydown-DOWN', function (event) {this.player.setVelocityY(160)}, this);
            this.relatedScene.input.keyboard.on('keydown-RIGHT', function (event) {this.player.setVelocityX(160)}, this);
            this.relatedScene.input.keyboard.on('keyup-UP', function (event) {this.player.setVelocityY(0)}, this);
            this.relatedScene.input.keyboard.on('keyup-LEFT', function (event) {this.player.setVelocityX(0)}, this);
            this.relatedScene.input.keyboard.on('keyup-DOWN', function (event) {this.player.setVelocityY(0)}, this);
            this.relatedScene.input.keyboard.on('keyup-RIGHT', function (event) {this.player.setVelocityX(0)}, this);
            /*if(this.cursors.left.isDown){this.player.relatedScene.setVelocityX(-160);}
            else if(this.cursors.right.isDown){this.player.relatedScene.setVelocityX(160);}
            else if(this.cursors.up.isDown){this.player.relatedScene.setVelocityY(160);}
            else if(this.cursors.down.isDown){this.player.relatedScene.setVelocityY(-160);}
            else {this.player.relatedScene.setVelocityX(0);this.player.relatedScene.setVelocityY(0);}*/
        }




    }


}