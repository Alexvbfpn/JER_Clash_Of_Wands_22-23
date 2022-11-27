import { FloorTiles} from "../components/floorTiles.js";
import {PointsPerson} from "../components/pointsPerson.js";
var currentPoints = 1;
export class Match extends Phaser.Scene
{
    constructor()
    {
        super({key: 'match'});
        this.floorTiles = new FloorTiles(this, 2);
        this.ikerP1 = new PointsPerson(this, 135, 201, 'iker',1);
        this.ikerP2 = new PointsPerson(this, 1686, 201, 'iker2',1);
    }

    init(data)
    {
        this.dataObj = data;
    }

    preload()
    {
        this.load.image('match_Background', 'assets/img/match/match_backgroundPublic.png');
        this.floorTiles.preload();
        this.load.image('ring', 'assets/img/Ring.png');
        this.ikerP1.preload();
    }

    create()
    {
        this.add.image(960, 540, 'match_Background');


        console.log(this.dataObj.player1Data.points);

        //Puntuadores Player1
        var carvaP1 = new PointsPerson(this, 135, 393, 'carva', 2, this.dataObj.player1Data);
        var pepeP1 = new PointsPerson(this, 135, 706, 'pepe', 3, this.dataObj.player1Data);
        this.ikerP1.relativePlayer = this.dataObj.player1Data;
        var ikerP1 = this.ikerP1;
        this.ikerP1.create();
        carvaP1.create();
        pepeP1.create();

        //Puntuadores Player2
        this.ikerP2.relativePlayer = this.dataObj.player2Data;
        var ikerP2 = this.ikerP2;
        var carvaP2 = new PointsPerson(this, 1686, 393, 'carva2', 2, this.dataObj.player2Data);
        var pepeP2 = new PointsPerson(this, 1686, 706, 'pepe2', 3, this.dataObj.player2Data);
        ikerP2.create();
        carvaP2.create();
        pepeP2.create();

        this.floorTiles.create();
        //RING
        var ring = this.add.image(283,120, 'ring').setOrigin(0).setInteractive({ draggable: true });
        console.log("Tipo player 1: " + this.dataObj.player1Data.type);
        console.log("Tipo player 2: " + this.dataObj.player2Data.type);




    }
    update()
    {
        this.floorTiles.update();
        //this.iker.currentPoints = this.dataObj.currentPoints;
        this.ikerP1.update();
        this.ikerP2.update();
        this.floorTiles.text.setText('Event.progress: ' + this.floorTiles.timedEvent.getProgress().toString().substring(0, 4)
          + '\nEvent.repeatCount: ' + this.floorTiles.timedEvent.repeatCount);
    }
}