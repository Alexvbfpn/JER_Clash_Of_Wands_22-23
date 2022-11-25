export class LaserObs {
    constructor(scene,posX,posY,player) {
        this.relatedScene = scene;
        this.laser;
        this.positionX = posX; //Variable en el constructor para almacenar la posición en X
        this.positionY = posY; //Variable en el constructor para almacenar la posición en Y
        this.playerType = player;
        this.ball;
    }

    preload() {
        //Se precarga las imagenes en escena
        this.relatedScene.load.image("varaLaser", 'assets/img/varaLaser.png');
        this.relatedScene.load.spritesheet("bola", 'assets/img/bolaMagica.png',{ frameWidth: 32, frameHeight: 48 });
    }

    create() {

        //Se crea la bola en una posición determinada (posX y posY)
        this.ball = this.relatedScene.matter.add.sprite(this.positionX = 1160, this.positionY = 590, 'bola');

        //Animación del sprite de la bola
        this.relatedScene.anims.create({
            key: 'move',
            frameRate: 5,
            frames: this.ball.anims.generateFrameNumbers('bola', { start: 0, end: 8 }),
            repeat: -1
        });
        this.ball.anims.play('move');

        //this.ball.setScale(5,5);
        this.ball.setMass(4000000);

        //Codigo de prueba para comprobar las colisiones del laser (Hace referencia al jugador 1 (Recoge el powerup))
        this.block2 = this.relatedScene.matter.add.image(500, 350, 'varaLaser');
        this.block2.setVelocity(1.9, 1);
        this.block2.setBounce(1, 1);
        this.block2.setFriction(0, 0, 0);
        this.block2.playerType = 'Azul';

        //Codigo de prueba para comprobar las colisiones del laser (Hace referencia al jugador 2 (Muere))
        this.block1 = this.relatedScene.matter.add.image(1100, 350, 'varaLaser');
        this.block1.setVelocity(0, 0.1);
        this.block1.setBounce(1, 1);
        this.block1.setFriction(0, 0, 0);
        this.block1.playerType = 'Rojo';


        console.log(this.positionX,this.ball.positionY);

        //Si colisiona la bola con el bloque de prueba, se ejecuta la función createLaser
        this.ball.setOnCollideWith(this.block2, pair => {
            this.createLaser();
        });

    }

    //Comprobación de colisiones
    checkCollisiom()
    {
        console.log("Colisiona");
    }

    //Función que hace desaparecer la bola con la colisión y que salga el laser en la posición que estaba la bola
    createLaser()
    {
        this.ball.destroy();
        this.laser = this.relatedScene.matter.add.image(this.positionX,this.positionY,'varaLaser');

        //Para pintar el laser y evitar que colisione con él (Cambiar block2 por player)

        if(this.block2.playerType === 'Rojo'){
            this.laser.tint = 0xfe0000; //Rojo
        }
        if(this.block2.playerType === 'Azul'){
            this.laser.tint = 0x4040FD; //Azul
        }
        if(this.block2.playerType === 'Amarillo'){
            this.laser.tint = 0xFBFB32 ; //Amarillo
        }
        if(this.block2.playerType === 'Verde'){
            this.laser.tint = 0x35FB55 ; //Verde
        }


        console.log(this.ball.positionX,this.ball.positionY);
        this.laser.setMass(40000000); //Seteamos la masa a un número muy alto para evitar que se mueva al colisionar
        this.laser.setAngularVelocity(0.03);
        this.laser.setFriction(0, 0, 0);

        //QUITAR ESTA LÍNEA DE PRUEBA
        this.block2.destroy();

        this.laser.setOnCollideWith(this.block1, pair => {
            this.playerDie();
        });
    }

    //La función hace que el jugador muera al tocar el laser si no le corresponde
    playerDie()
    {
        this.block1.destroy();
    }
}
