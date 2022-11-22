import { PlayButton } from "../components/playButton.js";
import { FloorTiles} from "../components/floorTiles.js";

export class Match extends Phaser.Scene
{

    constructor()
    {
        super({key: 'match'});
        this.playButton = new PlayButton(this, 'mainMenu');
        this.floorTiles = new FloorTiles(this, 2);
    }


    preload()
    {
        this.load.image('match_Background', 'assets/img/match_backgroundPublic.png');
        this.playButton.preload();
        this.load.image('tile', 'assets/img/sprite_Placa.PNG');
        this.floorTiles.preload();
        this.load.image('ring', 'assets/img/Ring.png');
    }

    create()
    {
        this.add.image(960, 540, 'match_Background');
        this.playButton.create();
        this.floorTiles.create();
        //RING
        var ring = this.add.image(283,120, 'ring').setOrigin(0).setInteractive({ draggable: true });
    }
    update()
    {
        this.floorTiles.update();
        this.floorTiles.text.setText('Event.progress: ' + this.floorTiles.timedEvent.getProgress().toString().substring(0, 4)
            + '\nEvent.repeatCount: ' + this.floorTiles.timedEvent.repeatCount);
    }
}