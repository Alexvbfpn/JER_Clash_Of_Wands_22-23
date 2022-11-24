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
        this.laser = this.relatedScene.matter.add.image(760,590,'laserPrueba');
        this.laser.setAngularVelocity(0.03);
        this.laser.setFriction(0, 0, 0);
        this.laser.setMass(40000000); //Seteamos la masa a un número muy alto para evitar que se mueva al colisionar


        //Codigo de prueba para comprobar las colisiones del laser
        this.block2 = this.relatedScene.matter.add.image(500, 350, 'laserPrueba');
        this.block2.setVelocity(1, 1);
        this.block2.setBounce(1, 1);


    }





    hitLaser (player, laser)
    {

    }
}
