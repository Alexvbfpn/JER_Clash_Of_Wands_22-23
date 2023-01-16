import { FloorTiles} from "../components/floorTiles.js";
import {PointsPerson} from "../components/pointsPerson.js";
import {Player} from "../components/Player.js";
import {Controller} from "../components/Controller.js";
import {LaserObs} from "../components/laserComponent.js";

let url;

let activeUsersNumber;
let activePrevUsersNumber;

let textActiveUsers;
let crowdSound;
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


       // this.load.image('playerSprite', 'assets/img/sprite_Placa.PNG');
        this.Player1.preload();
        this.Player2.preload();
        this.laserComponent.preload();
        this.laserComponent2.preload();
        this.cursors = this.input.keyboard.createCursorKeys();



    }

    create()
    {
        this.dataObj.currentScene = this.scene.key;
		//Control de usuarios
		this.username = this.dataObj.username;
        url = this.dataObj.url;
        activeUsersNumber = 0;
        activePrevUsersNumber = 0;

        this.Controller1.create(Phaser.Input.Keyboard.KeyCodes.W,Phaser.Input.Keyboard.KeyCodes.S,Phaser.Input.Keyboard.KeyCodes.A,Phaser.Input.Keyboard.KeyCodes.D,Phaser.Input.Keyboard.KeyCodes.X,Phaser.Input.Keyboard.KeyCodes.E,Phaser.Input.Keyboard.KeyCodes.Q)
        this.Controller2.create(Phaser.Input.Keyboard.KeyCodes.I,Phaser.Input.Keyboard.KeyCodes.K,Phaser.Input.Keyboard.KeyCodes.J,Phaser.Input.Keyboard.KeyCodes.L,Phaser.Input.Keyboard.KeyCodes.M,Phaser.Input.Keyboard.KeyCodes.O,Phaser.Input.Keyboard.KeyCodes.U)
        this.matter.world.setBounds(360, 195, 1200, 800,500);
        this.add.image(960, 540, 'match_Background');

        crowdSound = this.dataObj.crowdSound;

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

        this.Player1.type = this.dataObj.player1Data.type;
        this.Player2.type = this.dataObj.player2Data.type;
        this.Player1.create();
        this.Player2.create();
        this.Player2.player.angle = -180;
        this.floorTiles.create();
        this.laserComponent.create();
        this.laserComponent2.create();
        //RING
        var ring = this.add.image(283,120, 'ring').setOrigin(0);


        if(!this.dataObj.crowdSound.isPlaying)
        {
            //this.fightTheme.play();
            this.dataObj.crowdSound.play()
            this.dataObj.crowdSound.volume = 0.5;
        }

        let pauseButton = this.add.image(1868 - 162, 45, 'pauseButton').setOrigin(0, 0);
        pauseButton.setInteractive();

        pauseButton.on('pointerover', function (){

            pauseButton.setScale(1.15, 1.15);
            //playButton.setTint(0x44ff44);
            //onS.play();
        });

        pauseButton.on('pointerout', function (){

            pauseButton.setScale(1, 1);

        });
        var scene = this.scene;
        var data = this.dataObj;
        pauseButton.on('pointerdown', function (){
            scene.pause();
            scene.launch('pauseScreen', data);
        });


    }
    update()
    {
        this.floorTiles.update();
        //this.iker.currentPoints = this.dataObj.currentPoints;
        this.ikerP1.update();
        this.ikerP2.update();


		/*
        this.floorTiles.text.setText('Event.progress: ' + this.floorTiles.timedEvent.getProgress().toString().substring(0, 4)
          + '\nEvent.repeatCount: ' + this.floorTiles.timedEvent.repeatCount);

        this.floorTiles.text.setText('Event.progress: ' + this.floorTiles.timedEvent.getProgress().toString().substring(0, 4)
            + '\nEvent.repeatCount: ' + this.floorTiles.timedEvent.repeatCount);

		*/
        this.Player1.update();
        this.Player2.update();
        this.laserComponent.update();
        this.laserComponent2.update();

    }

}

