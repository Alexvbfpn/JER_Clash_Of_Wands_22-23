import { FloorTiles} from "../components/floorTiles.js";
import {PointsPerson} from "../components/pointsPerson.js";
var currentPoints = 1;
export class Match extends Phaser.Scene
{

    constructor()
    {
        super({key: 'match'});
        this.floorTiles = new FloorTiles(this, 2);
        this.iker = new PointsPerson(this, 200, 400, 'iker',1);
    }


    preload()
    {
        this.load.image('match_Background', 'assets/img/match_backgroundPublic.png');
        this.floorTiles.preload();
        this.load.image('ring', 'assets/img/Ring.png');
        this.iker.preload();
    }

    create()
    {
        this.add.image(960, 540, 'match_Background');




        var carva = new PointsPerson(this, 200, 600, 'carva', 2);
        var pepe = new PointsPerson(this, 200, 800, 'pepe', 3);

        var iker = this.iker;
        this.iker.create();
        carva.create();
        pepe.create();

        this.floorTiles.create();
        //RING
        var ring = this.add.image(283,120, 'ring').setOrigin(0).setInteractive({ draggable: true });




    }
    update()
    {
        this.floorTiles.update();
        this.iker.currentPoints = currentPoints;
        this.iker.update();
       // this.floorTiles.text.setText('Event.progress: ' + this.floorTiles.timedEvent.getProgress().toString().substring(0, 4)
         //   + '\nEvent.repeatCount: ' + this.floorTiles.timedEvent.repeatCount);
    }
}