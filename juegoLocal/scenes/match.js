import { PlayButton } from "../components/playButton.js";
import { FloorTiles} from "../components/floorTiles.js";


var graphics;
var timedEvent;
var scene;
var text;

export class Match extends Phaser.Scene
{

    constructor()
    {
        super({key: 'match'});
        this.playButton = new PlayButton(this, 'mainMenu');
        this.floorTiles = new FloorTiles(this);
    }



    preload()
    {
        this.load.image('match_Background', 'assets/match_backgroundPublic.png');
        this.playButton.preload();
        this.load.image('tile', 'assets/sprite_Placa.PNG');
        this.floorTiles.preload();
        this.load.image('ring', 'assets/Ring.png');
    }

    create()
    {
        text = this.floorTiles.text;
        scene = this.scene;
        this.add.image(960, 540, 'match_Background');
        // this.add.image(360, 200, 'tile'); //En realidad en x es 281, porque Javi no sabe hacer cosas proporcionales
        this.playButton.create();
        this.floorTiles.create();
        var game = this.game;
        //RING
        var ring = this.add.image(283,120, 'ring').setOrigin(0).setInteractive({ draggable: true });
        ring.on('drag', function (pointer, dragX, dragY) {

            this.x = dragX;
            this.y = dragY;

        });


    }
    update()
    {
        if (this.input.pointer1.isDown)
        {
            graphics.clear();
        }
        //console.log("Hola" + this.tilesArray.some(value => 0));
        for(let i = 0; i < 4; i ++)
        {
            for(let j = 0; j < 6; j ++)
            {
                if(this.floorTiles.tilesArray[i][j].value == 0)
                {
                    //console.log("Hola" + this.tilesArray.some(value => 0));
                    var newValue = Math.floor(Math.random()* (10 - 4) + 4);
                    //this.floorTiles.level[i][j] = newValue;
                    this.floorTiles.tilesArray[i][j].value = newValue;
                    this.floorTiles.tilesArray[i][j].tileText.text = this.floorTiles.tilesArray[i][j].value.toString();

                    //console.log("Valor: " + this.tilesArray.value)
                }
            }
          }

        this.floorTiles.text.setText('Event.progress: ' + this.floorTiles.timedEvent.getProgress().toString().substr(0, 4)
            + '\nEvent.repeatCount: ' + this.floorTiles.timedEvent.repeatCount);

    }
}