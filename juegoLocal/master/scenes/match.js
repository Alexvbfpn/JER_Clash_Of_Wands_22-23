import { PlayButton } from "../components/playButton.js";
import { FloorTiles} from "../components/floorTiles.js";
import {Player} from "../components/Player.js";
import {Controller} from "../components/Controller.js";
import { LaserObs} from "../components/laserComponent.js";



export class Match extends Phaser.Scene
{



    constructor()
    {
        super({key: 'match'});
        this.playButton = new PlayButton(this, 'mainMenu');
        this.floorTiles = new FloorTiles(this, 2);

        //this.controller2=this.input.keyboard.addKey(Phaser.Input.keyboard.keyCodes.W)
        this.Controller1=new Controller(this);
        this.Controller2=new Controller(this);
            //new Controller(this,Phaser.Input.Keyboard.KeyCodes.W,Phaser.Input.Keyboard.KeyCodes.W,Phaser.Input.Keyboard.KeyCodes.W,Phaser.Input.Keyboard.KeyCodes.W);
        //this.Controller2=new Controller(this,Phaser.input.keyboard.KeyCodes.UP,Phaser.input.keyboard.KeyCodes.DOWN,Phaser.input.keyboard.KeyCodes.LEFT,Phaser.input.keyboard.KeyCodes.RIGHT)
        this.Player1=new Player(this,100,100,1,this.Controller1,'Azul');
        this.Player2=new Player(this,500,500,2,this.Controller2,'Rojo');
        this.laserComponent = new LaserObs(this);


    }


    preload()
    {
        this.load.image('match_Background', 'assets/img/match_backgroundPublic.png');
        this.playButton.preload();
        this.load.image('tile', 'assets/img/sprite_Placa.PNG');
        this.floorTiles.preload();
        this.laserComponent.preload();
        this.load.image('ring', 'assets/img/Ring.png');
        this.load.image('playerSprite', 'assets/img/sprite_Placa.PNG');
        this.Player1.preload();
        this.Player2.preload();
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    create()
    {
        this.Controller1.create(Phaser.Input.Keyboard.KeyCodes.W,Phaser.Input.Keyboard.KeyCodes.S,Phaser.Input.Keyboard.KeyCodes.A,Phaser.Input.Keyboard.KeyCodes.D,Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.Controller2.create(Phaser.Input.Keyboard.KeyCodes.UP,Phaser.Input.Keyboard.KeyCodes.DOWN,Phaser.Input.Keyboard.KeyCodes.LEFT,Phaser.Input.Keyboard.KeyCodes.RIGHT,Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO)

        this.matter.world.setBounds(0, 0, 1920, 1080);
        this.add.image(960, 540, 'match_Background');
        this.playButton.create();
        this.floorTiles.create();

        this.Player1.create();
        this.Player2.create();

        this.laserComponent.create();

        //RING
        var ring = this.add.image(283,120, 'ring').setOrigin(0).setInteractive({ draggable: true });
    }
    update()
    {
        this.floorTiles.update();
        this.floorTiles.text.setText('Event.progress: ' + this.floorTiles.timedEvent.getProgress().toString().substring(0, 4)
            + '\nEvent.repeatCount: ' + this.floorTiles.timedEvent.repeatCount);


        this.Player1.update();
        this.Player2.update();


    }

}