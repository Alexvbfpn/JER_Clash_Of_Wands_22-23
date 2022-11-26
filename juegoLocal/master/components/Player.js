import {Controller} from "../components/Controller.js";

function Cooldown()
{

    this.attackCooldown=true;

}
function DeletePunch()
{
    console.log("Desactiva");
    this.Collision.visible=false;
    //this.Collision.setActive(false);
    //this.Collision.destroy();

}
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
        this.attackCooldown=true;
    }

    preload()
    {
        //console.log(this.type);
        this.relatedScene.load.spritesheet('Azul', "assets/img/PantalladeJuego/Spritesheets/SpritesheetAgua.PNG", {
            frameWidth: 165,
            frameHeight: 124
        });
        this.relatedScene.load.spritesheet('Rojo', "assets/img/PantalladeJuego/Spritesheets/SpritesheetFuego.PNG", {
            frameWidth: 165,
            frameHeight: 124
        });
        this.relatedScene.load.spritesheet('Amarillo', "assets/img/PantalladeJuego/Spritesheets/SpritesheetRayo.PNG", {
            frameWidth: 165,
            frameHeight: 124
        });
        this.relatedScene.load.spritesheet('Verde', "assets/img/PantalladeJuego/Spritesheets/SpritesheetViento.PNG", {
            frameWidth: 165,
            frameHeight: 124
        });
        this.relatedScene.load.spritesheet("Collision", "assets/img/play_button.PNG", {
            frameWidth: 100,
            frameHeight: 50
        });
    }

    create()
    {
        console.log(this.type);
            this.player = this.relatedScene.matter.add.sprite(this.posX, this.posY, this.type);

        //this.Collision= this.relatedScene.matter.add.sprite(this.player.x,this.player.y,'Collision');
        this.Collision= this.relatedScene.matter.add.sprite(this.player.x+100,this.player.y+100,'Collision',null, {isSensor:true});
        //this.Collision.parent=this.player;
        //this.Collision.setActive(false);
        this.Collision.visible=false;

        this.relatedScene.anims.create({
            key: this.type + 'idle',
            frames: this.player.anims.generateFrameNumbers(this.type, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.relatedScene.anims.create({
            key: this.type + 'walk',
            frames: this.player.anims.generateFrameNumbers(this.type, { start: 5, end: 8 }),
            frameRate: 20,
            repeat: -1
        });
        this.relatedScene.anims.create({
            key: this.type + 'idlePunch',
            frames: this.player.anims.generateFrameNumbers(this.type, { start: 10, end: 14 }),
            frameRate: 10,
            repeat: -1
        });
        this.relatedScene.anims.create({
            key: this.type + 'walkPunch',
            frames: this.player.anims.generateFrameNumbers(this.type, { start: 15, end: 19 }),
            frameRate: 10,
            repeat: -1
        });

        this.player.setFrictionAir(0.1);
        this.player.setMass(50);
        this.player.setFixedRotation();

        if(this.playerNumber===1)
        {
            //console.log("Comprueba colision")
            this.Collision.setOnCollideWith(this.relatedScene.Player2, pair => {
                this.Attack();
            });
        }
        if(this.playerNumber===2)
        {
            this.Collision.setOnCollideWith(this.relatedScene.Player1, pair => {
                this.Attack();
            });
        }
    }

    update()
    {

        this.Collision.setX(this.player.x+100);
        this.Collision.setY(this.player.y);
        this.Collision.rotation=this.player.rotation;

               if (this.Controller.actions.UP.isDown)
               {
                   this.player.thrust(0.16);
                   //this.player.y -= 10;
                   this.player.anims.play(this.type + 'walk', true);
               }
               else if (this.Controller.actions.DOWN.isDown)
               {
                   this.player.thrust(-0.16);
                   //this.player.y += 10;
                   this.player.anims.play(this.type + 'walk', true);
               }
               else
               {
                   this.player.thrust(0);
                   this.player.anims.play(this.type + 'idle', true);
               }

               if (this.Controller.actions.LEFT.isDown)
               {
                   this.player.x -= 10;
               }
               else if (this.Controller.actions.RIGHT.isDown)
               {
                   this.player.x += 10;
               }

               if (this.Controller.actions.ROTATEL.isDown)
               {
                   this.player.setAngularVelocity(-0.08);

               }
               else if (this.Controller.actions.ROTATER.isDown)
               {
                    this.player.setAngularVelocity(0.08);
               }
               else
               {
                   this.player.setAngularVelocity(0);
                   //this.player.anims.play('idle', true);
               }

               if(this.Controller.actions.ATTACK.isDown && this.attackCooldown)
               {
                   this.attackCooldown=false;
                   this.relatedScene.time.addEvent({ delay: 1000, callback: Cooldown, callbackScope: this, loop: false});

                   this.Collision.visible=true;
                   this.Collision.rotation=this.player.rotation;
                   this.relatedScene.time.addEvent({ delay: 200, callback: DeletePunch, callbackScope: this, loop: false});

               }



    }

    Attack(PlayerC)
    {

        console.log("Ataque");
        //this.Collision.destroy();

    }



}

