var scene;

//Destruir laser
function onEvent(){
    this.laser.destroy();
    this.timesUp = this.relatedScene.time.addEvent({ delay: 5000, callback: setCooldown, callbackScope: this, loop: false});
}

function setCooldown(){

    this.imIn = false;
    this.cooldwn = false;
}

export class LaserObs {
    constructor(scene,posX,posY,player) {
        this.relatedScene = scene;
        this.laser;
        this.positionX = posX; //Variable en el constructor para almacenar la posición en X
        this.positionY = posY; //Variable en el constructor para almacenar la posición en Y
        this.playerType = player;
        this.ball;
        this.timesUp //Control del tiempo del laser
        this.cooldwn = true;
        this.imIn = true;
    }

    preload() {
        //Se precarga las imagenes en escena
        this.relatedScene.load.image("varaLaser", 'assets/img/varaLaser.png');
        this.relatedScene.load.spritesheet("bola", 'assets/img/bolaMagica.png',{ frameWidth: 46, frameHeight: 46 });
        this.relatedScene.load.audio("laserSound", 'assets/sound/laserSound.wav');
    }

    create() {

        //Se crea la bola en una posición determinada (posX y posY)
        this.ball = this.relatedScene.matter.add.sprite(this.positionX, this.positionY, 'bola');
        //Para el sonido del laser
        this.laserS = this.relatedScene.sound.add("laserSound");

        //Animación del sprite de la bola
        this.relatedScene.anims.create({
            key: 'move',
            frameRate: 15,
            frames: this.ball.anims.generateFrameNumbers('bola', { start: 0, end: 8 }),
            repeat: -1
        });
        this.ball.anims.play('move');

        //this.ball.setScale(5,5);
        this.ball.setMass(4000000);

        //Si colisiona la bola con el bloque de prueba, se ejecuta la función createLaser
        scene = this.relatedScene.scene;

        this.ball.setOnCollideWith(this.relatedScene.Player1.player, pair => {
            this.ball.destroy();
            this.createLaserP1(this.positionX, this.positionY);
            //Sonido del laser
            this.laserS.play();
            this.laserS.volume = 0.1;
        });

        this.ball.setOnCollideWith(this.relatedScene.Player2.player, pair => {
            this.ball.destroy();
            this.createLaserP2(this.positionX, this.positionY);
            //Sonido del laser
            this.laserS.play();
            this.laserS.volume = 0.1;
        });

    }

    nextCombat(playerData)
    {
        playerData.points++;
        if(playerData.points != 3)
        {
            this.relatedScene.scene.restart();
        } else if (playerData.points === 3)
        {
            playerData.wins++;
            if(playerData.wins=== 2)
            {
                this.relatedScene.scene.start('finalScene', this.relatedScene.dataObj);
            }
            else
            {
                this.relatedScene.scene.start('midScene', this.relatedScene.dataObj);
            }

        }

    }

    update(){
        this.cooldown();
    }

    //Función que hace desaparecer la bola con la colisión y que salga el laser en la posición que estaba la bola
    createLaserP1(px1,py1)
    {
        this.pos1 = px1;
        this.pos2 = py1;
        this.laser = this.relatedScene.matter.add.image(this.pos1,this.pos2,'varaLaser', null, {isSensor: true});

        //Para pintar el laser y evitar que colisione con él
        if(this.relatedScene.Player1.type === 'Rojo'){
            this.laser.tint = 0xFF4C3A; //Rojo
        }
        if(this.relatedScene.Player1.type === 'Azul'){
            this.laser.tint = 0x3AF6FF; //Azul
        }
        if(this.relatedScene.Player1.type === 'Amarillo'){
            this.laser.tint = 0xFBFB32 ; //Amarillo
        }
        if(this.relatedScene.Player1.type === 'Verde'){
            this.laser.tint = 0x35FB55 ; //Verde
        }

        this.laser.setMass(40000000); //Seteamos la masa a un número muy alto para evitar que se mueva al colisionar
        this.laser.setAngularVelocity(0.03);
        this.laser.setFriction(0, 0, 0);

        this.laser.setOnCollideWith(this.relatedScene.Player2.player, pair => {
            this.laserS.stop();
            this.nextCombat(this.relatedScene.dataObj.player1Data);

        });
        this.cooldwn = true;
        this.imIn = true;
        this.timesUp = this.relatedScene.time.addEvent({ delay: 6000, callback: onEvent, callbackScope: this, loop: false});

    }

    createLaserP2(px2, py2)
    {

        this.pos1 = px2;
        this.pos2 = py2;
        this.laser = this.relatedScene.matter.add.image(this.pos1,this.pos2,'varaLaser', null, {isSensor: true});

        //Para pintar el laser y evitar que colisione con él (Cambiar block2 por player)
        if(this.relatedScene.Player2.type === 'Rojo'){
            this.laser.tint = 0xFF4C3A; //Rojo
        }
        if(this.relatedScene.Player2.type === 'Azul'){
            console.log(this.relatedScene.Player2.type);
            this.laser.tint = 0x3AF6FF; //Azul
        }
        if(this.relatedScene.Player2.type === 'Amarillo'){
            this.laser.tint = 0xFBFB32 ; //Amarillo
        }
        if(this.relatedScene.Player2.type === 'Verde'){
            this.laser.tint = 0x35FB55 ; //Verde
        }

        this.laser.setMass(40000000); //Seteamos la masa a un número muy alto para evitar que se mueva al colisionar
        this.laser.setAngularVelocity(0.03);
        this.laser.setFriction(0, 0, 0);


        this.laser.setOnCollideWith(this.relatedScene.Player1.player, pair => {
            this.laserS.stop();
            this.nextCombat(this.relatedScene.dataObj.player2Data);

        });

        this.cooldwn = true;
        this.imIn = true;
        this.timesUp = this.relatedScene.time.addEvent({ delay: 6000, callback: onEvent, callbackScope: this, loop: false});

    }

    cooldown(){

        if(this.cooldwn === false && this.imIn === false){
            this.cooldwn = true;
            this.imIn === true;
            this.create();
        }
    }



}