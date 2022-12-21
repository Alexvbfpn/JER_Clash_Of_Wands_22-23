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

function firstCharge()
{
    for(let i = 0; i < gameOptions.rows; i ++)
    {
        for(let j = 0; j < gameOptions.columns; j ++)
        {
            //this.tilesArray[i][j].value--;
            this.tilesArray[i][j].tileText.text = this.tilesArray[i][j].value.toString();
            this.tilesArray[i][j].tileText.visible = true;
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
        this.relatedScene.load.spritesheet("openTiles0", "assets/img/sprite_PlacaN.PNG", {
            frameWidth: gameOptions.tileSize,
            frameHeight: gameOptions.tileSize
        });
        this.relatedScene.load.spritesheet("openTiles1", "assets/img/match/sprite_placaN1.PNG", {
            frameWidth: gameOptions.tileSize,
            frameHeight: gameOptions.tileSize
        });
        this.relatedScene.load.spritesheet("openTiles2", "assets/img/match/sprite_placaN2.PNG", {
            frameWidth: gameOptions.tileSize,
            frameHeight: gameOptions.tileSize
        });
        this.relatedScene.load.spritesheet("openTiles3", "assets/img/match/sprite_placaN3.PNG", {
            frameWidth: gameOptions.tileSize,
            frameHeight: gameOptions.tileSize
        });
        this.relatedScene.load.spritesheet("openTilesCol", "assets/img/match/sprite_placaTrans.PNG", {
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
                level[i][j] = Math.floor(Math.random()* (9 - 4) + 4);
            }
        }
        return level;
    }

    nextCombat(playerData)
    {
        playerData.points++;
        if(playerData.points != 3)
        {
            this.relatedScene.scene.restart();
        } else if (playerData.points === 3)
        {
            playerData.wins++;
            if(playerData.wins=== 2)
            {
                this.relatedScene.scene.start('finalScene', this.relatedScene.dataObj);
            }
            else
            {
                this.relatedScene.scene.start('midScene', this.relatedScene.dataObj);
            }

        }

    }

    create()
    {
        this.tilesArray = [];
        this.timedEvent;
        this.firstEvent;

        var level = this.createLevel();

        for(let i = 0; i < gameOptions.rows; i ++){
            this.tilesArray[i] = [];
            for(let j = 0; j < gameOptions.columns; j ++){
                let randomTile = Math.floor(Math.random()* (4));

                let openTileCol = this.relatedScene.matter.add.sprite(j * gameOptions.tileSize + gameOptions.initTilePosX +gameOptions.tileSize/2,
                    i * gameOptions.tileSize + gameOptions.initTilePosY +gameOptions.tileSize/2,
                    'openTilesCol', 0, {isSensor: true}).setScale(this.floorMode);

                let openTile = this.relatedScene.add.sprite(j * gameOptions.tileSize + gameOptions.initTilePosX,
                    i * gameOptions.tileSize + gameOptions.initTilePosY,
                    'openTiles' + randomTile, 0).setScale(this.floorMode);

                let tile = this.relatedScene.add.sprite(j * gameOptions.tileSize + gameOptions.initTilePosX,
                    i * gameOptions.tileSize + gameOptions.initTilePosY,
                    'tiles', 0).setScale(this.floorMode);

                let text = this.relatedScene.add.text(j * gameOptions.tileSize + gameOptions.initTilePosX, i * gameOptions.tileSize + gameOptions.initTilePosY - 75, level[i][j].toString(), {
                    fontFamily: 'tilesFont',
                    font: (gameOptions.tileSize-50).toString() + "px tilesFont",
                    color: '#32023a'
                });
                /*
                let container = this.relatedScene.add.container(j * gameOptions.tileSize + gameOptions.initTilePosX,
                    i * gameOptions.tileSize + gameOptions.initTilePosY);
                container.add(openTile);
                container.add(tile);
                container.add(text);

                 */
                openTile.setDepth(-1);
                tile.setDepth(-1)
                text.setDepth(-1)
                tile.setOrigin(0, 0);
                openTile.setOrigin(0, 0);
                text.setOrigin(-0.35, -0.05);
                let graphics = this.relatedScene.add.graphics();
               // graphics.lineStyle(5, 0xff0000);
                //graphics.strokeRectShape(container.getBounds());

                this.tilesArray[i][j] = {
                    value: level[i][j],
                    isOpen: level[i][j] == 0,
                    sprite: tile,
                    tileText: text,
                    openTileSprite: openTile,
                    //container: container,
                }
                this.tilesArray[i][j].tileText.visible = false;
                this.tilesArray[i][j].value++;
                //this.tilesArray[i][j].tileText.text = this.tilesArray[i][j].value.toString();

            }
        }
        //this.tilesArray[0][0].sprite.alpha = 0.5;
        this.firstEvent = this.relatedScene.time.addEvent({ delay: 75, callback: firstCharge, callbackScope: this, loop: false});
        this.timedEvent = this.relatedScene.time.addEvent({ delay: 1500, callback: onEvent, callbackScope: this, loop: true});
        this.text = this.relatedScene.add.text(32, 32);
    }

    update()
    {
        for(let i = 0; i < gameOptions.rows; i ++)
        {
            for(let j = 0; j < gameOptions.columns; j ++)
            {
                let t = this.tilesArray[i][j].sprite.getBounds();
                if(this.tilesArray[i][j].value == 0)
                {
                    this.tilesArray[i][j].sprite.visible = false;
                    this.tilesArray[i][j].tileText.visible = false;

                    if((this.relatedScene.Player1.player.x > t.x && this.relatedScene.Player1.player.x < t.x + t.width) &&
                        (this.relatedScene.Player1.player.y > t.y && this.relatedScene.Player1.player.y < t.y + t.height))
                    {
                        this.nextCombat(this.relatedScene.dataObj.player2Data)
                    }

                    if((this.relatedScene.Player2.player.x > t.x && this.relatedScene.Player2.player.x < t.x + t.width) &&
                        (this.relatedScene.Player2.player.y > t.y && this.relatedScene.Player2.player.y < t.y + t.height))
                    {
                        this.nextCombat(this.relatedScene.dataObj.player1Data)
                    }


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

    checkInTile(t)
    {
         return ((this.relatedScene.Player1.player.x > t.x && this.relatedScene.Player1.player.x < t.x + t.width) && (this.relatedScene.Player1.player.y > t.y && this.relatedScene.Player1.player.y < t.y + t.height))

    }
}
