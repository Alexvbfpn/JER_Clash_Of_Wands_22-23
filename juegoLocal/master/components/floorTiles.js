let gameOptions = {
    rows: 4,
    columns: 6,
    tileSize: 200,
    initTilePosX: 362,
    initTilePosY: 188
}

function onEvent()
{
    for(let i = 0; i < gameOptions.rows; i ++)
    {
        for(let j = 0; j < gameOptions.columns; j ++)
        {
            this.tilesArray[i][j].value--;
            this.tilesArray[i][j].tileText.text = this.tilesArray[i][j].value.toString();
        }
    }
}

export class FloorTiles {
    constructor(scene, floorMode) {
        this.relatedScene = scene;
        this.floorMode = floorMode;
    }

    preload()
    {
        this.relatedScene.load.spritesheet("tiles", "assets/img/sprite_PlacaM.PNG", {
            frameWidth: gameOptions.tileSize,
            frameHeight: gameOptions.tileSize
        });
        this.relatedScene.load.spritesheet("openTiles", "assets/img/sprite_PlacaN.PNG", {
            frameWidth: gameOptions.tileSize,
            frameHeight: gameOptions.tileSize
        });
    }

    createLevel()
    {
        gameOptions.rows = 4;
        gameOptions.columns = 6;
        gameOptions.tileSize = 200;
        gameOptions.rows /= this.floorMode;
        gameOptions.columns /= this.floorMode;
        gameOptions.tileSize *= this.floorMode;
        var level = [];
        for(let i = 0; i < gameOptions.rows; i++)
        {
            level[i] = [];
            for(let j = 0; j < gameOptions.columns; j ++)
            {
                level[i][j] = Math.floor(Math.random()* (10 - 4) + 4);
            }
        }
        return level;
    }

    create()
    {
        this.tilesArray = [];
        this.text;
        this.timedEvent;
        /*
        var tileGroup = this.relatedScene.add.group({
            key: 'tiles',
            frameQuantity: gameOptions.rows * gameOptions.columns,
            gridAlign:{
                width: gameOptions.columns /this.floorMode,
                height: gameOptions.rows/this.floorMode,
                cellWidth: gameOptions.tileSize * this.floorMode,
                cellHeight: gameOptions.tileSize * this.floorMode,
                x: gameOptions.initTilePosX,
                y: gameOptions.initTilePosY
            },


        });
         */
        var level = this.createLevel();
        var group = this.relatedScene.add.group();
        for(let i = 0; i < gameOptions.rows; i ++){
            this.tilesArray[i] = [];
            for(let j = 0; j < gameOptions.columns; j ++){
                let openTile = this.relatedScene.add.sprite(j * gameOptions.tileSize + gameOptions.initTilePosX,
                    i * gameOptions.tileSize + gameOptions.initTilePosY,
                    'openTiles', level[i][j]);
                openTile.setScale(1);
                openTile.setScale(this.floorMode)
                //openTile.setScale(this.floorMode);
                let tile = this.relatedScene.add.sprite(j * gameOptions.tileSize + gameOptions.initTilePosX,
                    i * gameOptions.tileSize + gameOptions.initTilePosY,
                    'tiles', level[i][j]);
                tile.setScale(1);
                tile.setScale(this.floorMode);
                let text = this.relatedScene.add.text(tile.x + gameOptions.tileSize/4, tile.y, level[i][j].toString(), {
                    font: (gameOptions.tileSize).toString() + "px Times",
                    fontWeight: "bold",
                    color: "black"
                })
                tile.setOrigin(0, 0);
                openTile.setOrigin(0, 0);
                this.tilesArray[i][j] = {
                    value: level[i][j],
                    isOpen: level[i][j] == 0,
                    sprite: tile,
                    tileText: text,
                    openTileSprite: openTile
                }

            }
        }
        //this.tilesArray[0][0].sprite.alpha = 0.5;

        this.timedEvent = this.relatedScene.time.addEvent({ delay: 1500, callback: onEvent, callbackScope: this, loop: true});

        this.text = this.relatedScene.add.text(32, 32);
    }

    update()
    {
        for(let i = 0; i < gameOptions.rows; i ++)
        {
            for(let j = 0; j < gameOptions.columns; j ++)
            {
                if(this.tilesArray[i][j].value == 0)
                {
                    this.tilesArray[i][j].sprite.visible = false;
                    this.tilesArray[i][j].tileText.visible = false;
                }
                if (this.tilesArray[i][j].value == -1)
                {
                    this.tilesArray[i][j].sprite.visible = true;
                    this.tilesArray[i][j].tileText.visible = true;
                    var newValue = Math.floor(Math.random()* (10 - 4) + 4);
                    this.tilesArray[i][j].value = newValue;
                    this.tilesArray[i][j].tileText.text = this.tilesArray[i][j].value.toString();
                }
            }
        }
    }

}
