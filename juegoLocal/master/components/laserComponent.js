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
        this.laser = this.relatedScene.physics.add.image(500,500,'laserPrueba');
        this.laser.setAngularVelocity(40);
    }




    hitLaser (player, laser)
    {

    }
}
