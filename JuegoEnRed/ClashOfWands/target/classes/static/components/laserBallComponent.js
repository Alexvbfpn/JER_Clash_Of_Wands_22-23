import { LaserObs} from "../components/laserComponent.js";

export class BallObs {
    constructor(scene) {
        this.relatedScene = scene;
        this.laserComponent = new LaserObs(this);
    }

    preload() {
        //Se precarga la imagen en escena

        this.laserComponent.preload();
    }

    create() {
        this.ball = this.relatedScene.matter.add.image(1160, 590, 'bola');
        this.ball.setScale(5,5);

        //Codigo de prueba para comprobar las colisiones del laser
        this.block2 = this.relatedScene.matter.add.image(500, 350, 'laserPrueba');
        this.block2.setVelocity(1, 1);
        this.block2.setBounce(1, 1);

        this.ball.relatedScene.matter.add.overlap(this.block2,this.ball,this.ballCollision(),null,this);



    }



    ballCollision(){
        this.ball.disableBody(true,true);
        this.laserComponent.create();
    }
}