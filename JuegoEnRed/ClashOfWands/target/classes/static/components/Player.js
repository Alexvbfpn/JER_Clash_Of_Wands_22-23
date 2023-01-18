import {Controller} from "../components/Controller.js";

function Cooldown()
{
    this.attackCooldown=true;
}
function resetSpeed()
{

    PlayerC1.speed=0.16;
    PlayerC2.speed=0.16;
}

var PlayerC1=1;
var PlayerC2=1;

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
        this.canAttack=false;
        this.speed=0.16;
    }




    preload()
    {

    }

    create()
    {
        this.player = this.relatedScene.matter.add.sprite(this.posX, this.posY, this.type);
        this.Collision= this.relatedScene.matter.add.sprite(this.player.x+150,this.player.y+150,'Collision',null, {isSensor:true});

        this.Collision.visible=false;

        this.relatedScene.anims.create({
            key: this.type + 'idle',
            frames: this.player.anims.generateFrameNumbers(this.type, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });
        this.relatedScene.anims.create({
            key: this.type + 'walk',
            frames: this.player.anims.generateFrameNumbers(this.type, { start: 5, end: 8 }),
            frameRate: 20,
            repeat: 0
        });
        this.relatedScene.anims.create({
            key: this.type + 'idlePunch',
            frames: this.player.anims.generateFrameNumbers(this.type, { start: 10, end: 14 }),
            frameRate: 10,
            repeat: 0
        });
        this.relatedScene.anims.create({
            key: this.type + 'walkPunch',
            frames: this.player.anims.generateFrameNumbers(this.type, { start: 15, end: 19 }),
            frameRate: 10,
            repeat: 0
        });

        this.player.setFrictionAir(0.1);
        this.player.setMass(50);
        this.player.setFixedRotation();
        if(this.playerNumber===1){PlayerC2=this.relatedScene.Player2}
        if(this.playerNumber===2){PlayerC1=this.relatedScene.Player1}

    }

    update()
    {

        this.checkCollision();

        this.calculateRotation()
        this.Collision.rotation=this.player.rotation;

        if (this.Controller.actions.UP.isDown)
        {
            this.player.thrust(this.speed);
            //this.player.y -= 10;
            if(!this.player.anims.isPlaying){this.player.anims.play(this.type + 'walk', true);}
        }
        else if (this.Controller.actions.DOWN.isDown)
        {
            this.player.thrust(-this.speed);
            //this.player.y += 10;
            if(!this.player.anims.isPlaying){this.player.anims.play(this.type + 'walk', true);}
        }
        else
        {
            this.player.thrust(0);
            if(!this.player.anims.isPlaying){this.player.anims.play(this.type + 'idle', true);}
        }

        if (this.Controller.actions.LEFT.isDown)
        {
            /*if(this.player.angle<=0&&this.player.angle>=-180){this.player.thrustLeft(0.16);}
            else{this.player.thrustLeft(-0.16);}*/

            this.player.thrustLeft(this.speed);
        }
        else if (this.Controller.actions.RIGHT.isDown)
        {
            /*if(this.player.angle<=0&&this.player.angle>=-180){this.player.thrustRight(0.16);}
            else{this.player.thrustRight(-0.16);}*/

            this.player.thrustRight(this.speed);
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
        }

        if(this.Controller.actions.ATTACK.isDown && this.attackCooldown)
        {
            this.attackCooldown=false;

            this.relatedScene.time.addEvent({ delay: 3000, callback: Cooldown, callbackScope: this, loop: false});
            this.player.anims.play(this.type + 'walkPunch', true);

            if(this.canAttack)
            {
                this.Attack();
            }

        }
        if(this.player.anims.isPlaying){this.isAttacking=false;}

    }

    Attack()
    {
        var PlayerC;
        if(this.playerNumber===1){PlayerC=this.relatedScene.Player2}
        if(this.playerNumber===2){PlayerC=this.relatedScene.Player1}
        var distance=50;

        var vector = new Phaser.Math.Vector2(PlayerC.player.x - this.player.x,PlayerC.player.y - this.player.y);
        vector.normalize()
        if(this.type==='Rojo'){distance=100;}
        else if(this.type==='Azul'){PlayerC.speed=0.08; this.relatedScene.time.addEvent({ delay: 1500, callback: resetSpeed, callbackScope: this, loop: false});}
        else if(this.type==='Amarillo'){PlayerC.speed=0; this.relatedScene.time.addEvent({ delay: 1000, callback: resetSpeed, callbackScope: this, loop: false});}
        else if(this.type==='Verde'){}

        PlayerC.player.setPosition(PlayerC.player.x + vector.x*distance,PlayerC.player.y + vector.y*distance);


    }
    calculateRotation()
    {
        const vx =this.player.x + Math.cos(this.player.rotation) * 125;
        const vy =this.player.y + Math.sin(this.player.rotation) * 125;
        this.Collision.setPosition(vx,vy);
    }

    checkCollision()
    {
        this.canAttack=false;
        if(this.playerNumber===1) {
            if ((this.relatedScene.Player2.player.x <= (this.Collision.x + this.Collision.width / 2)) && (this.relatedScene.Player2.player.x >= (this.Collision.x - this.Collision.width / 2))) {
                if ((this.relatedScene.Player2.player.y <= (this.Collision.y + this.Collision.height / 2)) && (this.relatedScene.Player2.player.y >= (this.Collision.y - this.Collision.height / 2)))
                {
                    this.canAttack=true;
                }
            }
        }
        if(this.playerNumber===2) {
            if((this.relatedScene.Player1.player.x <= (this.Collision.x + this.Collision.width/2)) && (this.relatedScene.Player1.player.x >= (this.Collision.x - this.Collision.width/2))) {
                if((this.relatedScene.Player1.player.y <= (this.Collision.y + this.Collision.height/2)) && (this.relatedScene.Player1.player.y >= (this.Collision.y - this.Collision.height/2)))
                {
                    this.canAttack=true;
                }
            }
        }


    }




}