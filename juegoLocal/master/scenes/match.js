import { FloorTiles} from "../components/floorTiles.js";
import {PointsPerson} from "../components/pointsPerson.js";
var currentPoints = 1;

import {Player} from "../components/Player.js";
import {Controller} from "../components/Controller.js";
import {LaserObs} from "../components/laserComponent.js";

export class Match extends Phaser.Scene
{
    constructor()
    {
        super({key: 'match'});
        this.floorTiles = new FloorTiles(this, 2);

        this.ikerP1 = new PointsPerson(this, 135, 201, 'iker',1);
        this.ikerP2 = new PointsPerson(this, 1686, 201, 'iker2',1);

        this.Controller1=new Controller(this);
        this.Controller2=new Controller(this);

        this.Player1=new Player(this,475,275,1,this.Controller1);
        this.Player2=new Player(this,1425,915,2,this.Controller2);

        this.laserComponent = new LaserObs(this, 1160,590 );
        this.laserComponent2 = new LaserObs(this, 765,590 );
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


        this.load.image('playerSprite', 'assets/img/sprite_Placa.PNG');
        this.Player1.preload();
        this.Player2.preload();
        this.laserComponent.preload();
        this.laserComponent2.preload();
        this.cursors = this.input.keyboard.createCursorKeys();


    }

    create()
    {
        this.Controller1.create(Phaser.Input.Keyboard.KeyCodes.W,Phaser.Input.Keyboard.KeyCodes.S,Phaser.Input.Keyboard.KeyCodes.A,Phaser.Input.Keyboard.KeyCodes.D,Phaser.Input.Keyboard.KeyCodes.SPACE,Phaser.Input.Keyboard.KeyCodes.E,Phaser.Input.Keyboard.KeyCodes.Q)
        this.Controller2.create(Phaser.Input.Keyboard.KeyCodes.UP,Phaser.Input.Keyboard.KeyCodes.DOWN,Phaser.Input.Keyboard.KeyCodes.LEFT,Phaser.Input.Keyboard.KeyCodes.RIGHT,Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO,Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO,Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE)

        this.matter.world.setBounds(360, 195, 1200, 800);
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

        this.Player1.type = this.dataObj.player1Data.type;
        this.Player2.type = this.dataObj.player2Data.type;

        this.Player1.create();
        this.Player2.create();

        this.laserComponent.create();
        this.laserComponent2.create();



        //RING
        var ring = this.add.image(283,120, 'ring').setOrigin(0).setInteractive({ draggable: true });

        console.log("Tipo player 1: " + this.dataObj.player1Data.type);
        console.log("Tipo player 2: " + this.dataObj.player2Data.type);


        this.Player2.player.setOnCollideWith(this.Player1.Collision, pair => {
            this.Player1.Attack(this.Player2);
        });
        this.Player1.player.setOnCollideWith(this.Player2.Collision, pair => {
            this.Player2.Attack(this.Player1);
        });

            //console.log(this.Player1.type)
            //console.log(this.Player2.type)

    }
    update()
    {

        this.floorTiles.update();
        //this.iker.currentPoints = this.dataObj.currentPoints;
        this.ikerP1.update();
        this.ikerP2.update();
        this.floorTiles.text.setText('Event.progress: ' + this.floorTiles.timedEvent.getProgress().toString().substring(0, 4)
          + '\nEvent.repeatCount: ' + this.floorTiles.timedEvent.repeatCount);

        this.floorTiles.text.setText('Event.progress: ' + this.floorTiles.timedEvent.getProgress().toString().substring(0, 4)
            + '\nEvent.repeatCount: ' + this.floorTiles.timedEvent.repeatCount);

        this.Player1.update();
        this.Player2.update();
        this.laserComponent.update();
        this.laserComponent2.update();

    }

}