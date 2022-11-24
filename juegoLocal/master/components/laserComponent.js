export class LaserObs {
    constructor(scene) {
        this.relatedScene = scene;
    }

    preload() {
        //Se precarga la imagen en escena
        this.relatedScene.load.image('laserPrueba', 'assets/img/laserPrueba.png');
        this.relatedScene.load.image('bola', 'assets/img/bola.png');
    }

    create() {
        this.ball = this.relatedScene.matter.add.image(1160, 590, 'bola');
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
        this.ball.setOnCollideWith(this.block2, pair => {
            this.createLaser();
        });

    }

    checkCollisiom()
    {
        console.log("Colisiona");
    }

    createLaser()
    {
        this.laser = this.relatedScene.matter.add.image(this.ball.positionX,this.ball.positionY,'laserPrueba');
        this.laser.setAngularVelocity(0.03);
        this.laser.setFriction(0, 0, 0);
        this.laser.setMass(40000000); //Seteamos la masa a un número muy alto para evitar que se mueva al colisionar
        //NOTA: PROBAR HACER FUNCIONAR EL SETIMMOVABLE
        this.ball.destroy();
    }
}
