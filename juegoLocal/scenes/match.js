import { PlayButton } from "../components/playButton.js";
let gameOptions = {
    rows: 6,
    columns: 6,
    tileSize: 200
}

let level = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
]
var graphics;
export class Match extends Phaser.Scene
{

    constructor()
    {
        super({key: 'match'});
        this.playButton = new PlayButton(this, 'mainMenu');
    }

    preload()
    {
        this.load.image('match_Background', 'assets/img_combat.jpg');
        this.playButton.preload();
        this.load.image('tile', 'assets/sprite_Placa.PNG');
        this.load.spritesheet("tiles", "assets/sprite_Placa.PNG", {
            frameWidth: gameOptions.tileSize,
            frameHeight: gameOptions.tileSize
        });
        this.load.image('ring', 'assets/Ring.png')
    }

    create()
    {
        this.add.image(960, 540, 'match_Background');
       // this.add.image(360, 200, 'tile'); //En realidad en x es 281, porque Javi no sabe hacer cosas proporcionales
        this.playButton.create();

        this.tilesArray = [];

        for(let i = 0; i < 4; i ++){
            this.tilesArray[i] = [];
            for(let j = 0; j < 6; j ++){
                let tile = this.add.sprite(j * gameOptions.tileSize + 285, i * gameOptions.tileSize + 121, 'tiles', level[i][j]);
                tile.setOrigin(0, 0);
                this.tilesArray[i][j] = {
                    value: level[i][j],
                    isFixed: level[i][j] == 0,
                    sprite: tile
                }
            }
        }
        this.tilesArray[0][0].sprite.alpha = 0.5;
        var ring = this.add.image(285,121, 'ring').setOrigin(0).setInteractive({ draggable: true });
        ring.on('drag', function (pointer, dragX, dragY) {

            this.x = dragX;
            this.y = dragY;

        });
        /*
        var group = this.add.group({
            key: 'plate',
            setXY:
                {
                    x: 800,
                    y: 100,
                    stepX: 200,
                    stepY: 200
                }
        });
         */
    }
    uptade()
    {
        if (this.input.pointer1.isDown)
        {
            graphics.clear();
        }
    }
}