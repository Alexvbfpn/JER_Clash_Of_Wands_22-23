import { PlayButton } from "../components/playButton.js";
import { FloorTiles} from "../components/floorTiles.js";
import {Player} from "../components/Player.js";


var Player1Mov ;
export class Match extends Phaser.Scene
{

    constructor()
    {
        super({key: 'match'});
        this.playButton = new PlayButton(this, 'mainMenu');
        this.floorTiles = new FloorTiles(this, 2);
        this.Player1=new Player(this,100,100,1);
        this.Player2=new Player(this,500,500,2);

    }


    preload()
    {
        this.load.image('match_Background', 'assets/img/match_backgroundPublic.png');
        this.playButton.preload();
        this.load.image('tile', 'assets/img/sprite_Placa.PNG');
        this.floorTiles.preload();
        this.load.image('ring', 'assets/img/Ring.png');

        this.load.image('playerSprite', 'assets/img/sprite_Placa.PNG');
        this.Player1.preload();
        this.Player2.preload();
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create()
    {
        this.add.image(960, 540, 'match_Background');
        this.playButton.create();
        this.floorTiles.create();
        this.Player1.create();
        this.Player2.create();
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