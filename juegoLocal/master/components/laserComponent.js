export class LaserObs {
    constructor(scene,posX,posY) {
        this.relatedScene = scene;
        this.laser;
        this.positionX = posX; //Variable en el constructor para almacenar la posición en X
        this.positionY = posY; //Variable en el constructor para almacenar la posición en Y
        this.ball;
    }

    preload() {
        //Se precarga las imagenes en escena
        this.relatedScene.load.image('laserPrueba', 'assets/img/laserPrueba.png');
        this.relatedScene.load.image('bola', 'assets/img/bola.png');
    }

    create() {

        //Se crea la bola en una posición determinada (posX y posY)
        this.ball = this.relatedScene.matter.add.image(this.positionX = 1160, this.positionY = 590, 'bola');
        this.ball.setScale(5,5);
        this.ball.setMass(4000000);

        //Codigo de prueba para comprobar las colisiones del laser
        this.block2 = this.relatedScene.matter.add.image(500, 350, 'laserPrueba');
        this.block2.setVelocity(1.9, 1);
        this.block2.setBounce(1, 1);
        this.block2.setFriction(0, 0, 0);

        //this.createLaser();
        //this.ball.matter.overlap(this.block2,this.ball,this.createLaser(),null,this);
        //this.relatedScene.matter.add.overlap(this.block2,this.ball,this.checkCollisiom(),null,this);

        console.log(this.positionX,this.ball.positionY);

        //Si se coliciona la bola con el bloque de prueba, se ejecuta la función createLaser
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
        this.laser = this.relatedScene.matter.add.image(this.positionX,this.positionY,'laserPrueba');
        console.log(this.ball.positionX,this.ball.positionY);
        //this.laser.setMass(40000000); //Seteamos la masa a un número muy alto para evitar que se mueva al colisionar
        //NOTA: PROBAR HACER FUNCIONAR EL SETIMMOVABLe
        this.laser.setAngularVelocity(0.03);
        this.laser.setFriction(0, 0, 0);



    }
}
