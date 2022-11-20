let gameOptions = {
    rows: 6,
    columns: 6,
    tileSize: 200,
    initTilePosX: 362,
    initTilePosY: 188
}
let level = [
    [5, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];
function onEvent()
{
    for(let i = 0; i < 4; i ++)
    {
        for(let j = 0; j < 6; j ++)
        {
            this.tilesArray[i][j].value--;
            this.tilesArray[i][j].tileText.text = this.tilesArray[i][j].value.toString();
        }
    }
}

export class FloorTiles {
    constructor(scene) {
        this.relatedScene = scene;
    }

    preload()
    {
        this.relatedScene.load.spritesheet("tiles", "assets/img/sprite_PlacaM.PNG", {
            frameWidth: gameOptions.tileSize,
            frameHeight: gameOptions.tileSize
        });
    }

    create()
    {
        this.tilesArray = [];
        this.text;
        this.timedEvent;
        for(let i = 0; i < 4; i ++){
            this.tilesArray[i] = [];
            for(let j = 0; j < 6; j ++){
                let tile = this.relatedScene.add.sprite(j * gameOptions.tileSize + gameOptions.initTilePosX,
                    i * gameOptions.tileSize + gameOptions.initTilePosY,
                    'tiles', level[i][j]);
                let text = this.relatedScene.add.text(tile.x + 50, tile.y, level[i][j].toString(), {
                    font: (gameOptions.tileSize).toString() + "px Times",
                    fontWeight: "bold",
                    color: "black"
                })
                tile.setOrigin(0, 0);
                this.tilesArray[i][j] = {
                    value: level[i][j],
                    isFixed: level[i][j] == 0,
                    sprite: tile,
                    tileText: text,
                }
            }
        }
        this.tilesArray[0][0].sprite.alpha = 0.5;

        this.timedEvent = this.relatedScene.time.addEvent({ delay: 2000, callback: onEvent, callbackScope: this, repeat: 4});

        this.text = this.relatedScene.add.text(32, 32);
    }

    onEvent()
    {
        for(let i = 0; i < 4; i ++)
        {
            for(let j = 0; j < 6; j ++)
            {
                this.tilesArray[i][j].value--;
            }
        }
    }
}
