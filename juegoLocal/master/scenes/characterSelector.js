import {Selector} from "../components/selector.js";
import {RuneManager} from "../components/runeManager.js";

var runes;

export class CharacterSelector extends Phaser.Scene
{
    constructor()
    {
        super({key: 'characterSelector'});
        this.water = new Selector(this);

    }

    init()
    {
        this.dataObj =
            {
                player1Data:
                    {
                        type: null,
                        points: 2,
                        wins: 0
                    },
                player2Data:
                    {
                        type: null,

                        points: 3,

                        wins: 0
                    }

            };

    }

    preload()
    {
        this.load.image('characterSelector_Background', 'assets/img/characterSelector/background_characterSelector.png');
        this.load.image('confirm_button', 'assets/img/characterSelector/confirm_button.png')
        this.water.preload();
    }

    create()
    {
        var confirm_button;
        var characters1;
        var characters2;

        //Fondo
        this.add.image(960, 540, 'characterSelector_Background');
        var scene = this.scene;

        //Añadimos los artworks de los personajes
        characters1 = this.add.sprite(1, 290, 'characters');
        characters1.visible = false;
        characters1.setOrigin(0, 0);
        characters1.setFlipX(true);

        characters2 = this.add.sprite(1370, 290, 'characters');
        characters2.visible = false;
        characters2.setOrigin(0, 0);
        characters2.setFlipX(false);

        //Creamos los selectores de cada runa (cada una asociada al artwork correspondiente)
        this.water = new Selector(this, 'water', 1043, 257, 0, characters1,0, true, 'Azul');
        this.fire = new Selector(this, 'fire', 709, 27, 0, characters1, 1, true, 'Rojo');
        this.wind = new Selector(this, 'wind', 709, 257, 0, characters1, 2, true, 'Verde');
        this.bolt = new Selector(this, 'bolt', 1043, 27, 0, characters1, 3, true, 'Amarillo');

        this.water.create();
        this.fire.create();
        this.wind.create();
        this.bolt.create();

        runes = [this.water, this.fire, this.wind, this.bolt]

        confirm_button = this.add.image(665, 825, 'confirm_button').setOrigin(0, 0);
        confirm_button.setInteractive()
        confirm_button.visible = false;

        var generalData = this.dataObj;

        confirm_button.on('pointerdown', function ()
        {
            if(runes[0].currentCharacter == characters2)
            {
                scene.start('match', generalData);
            }
            console.log('Tipo player1: ' + generalData.player1Data.type);
            console.log('Tipo player2: ' + generalData.player2Data.type);
            console.log(runes.currentCharacter)

        });

        confirm_button.on('pointerover', function (){

            confirm_button.setTint(0x44ff44);
        });

        confirm_button.on('pointerout', function (){

            confirm_button.clearTint();
        });

        this.runeManager = new RuneManager(this, runes, confirm_button, characters2);
        this.runeManager.create();
        console.log(this.runeManager.player1Type);

            /*
        for (let i = 0; i<4; i++)
        {
            runes[i].rune.sprite.on('pointerdown', function (){


                if(runes[i].rune.isSelected == false)
                {
                    runes[i].rune.highLightRune(runes);
                    runes[i].rune.sprite.setFrame(1);
                    runes[i].rune.isSelected = true;
                    runes[i].currentCharacter.visible = true;
                    currentSelected = runes[i].characterFrame;
                    confirm_button.visible = true;

                } else
                {
                    runes[i].rune.sprite.setFrame(0);
                    runes[i].currentCharacter.visible = false;
                    runes[i].rune.isSelected = false;
                    confirm_button.visible = false;
                    lightAgain = false;
                    currentSelected = null;
                }
                //runes[i].rune.isSelected = !runes[i].rune.isSelected;
                console.log(runes[i].rune.isSelected)
            });

            confirm_button.on('pointerdown', function (){

                runes[i].currentCharacter= characters2;
                runes[i].rune.isSelected = false;
                runes[i].rune.sprite.setFrame(0);
                confirm_button.visible = false;
                confirm_button.setPosition(1100, 825)
                currentSelected = null;

            });

            runes[i].rune.sprite.on('pointerover', function (){
                if(runes[i].rune.isSelected == false && lightAgain == true)
                {
                    runes[i].rune.sprite.setFrame(1);
                    runes[i].currentCharacter.setFrame(runes[i].characterFrame);
                    runes[i].currentCharacter.visible = true;
                }
            });

            runes[i].rune.sprite.on('pointerout', function (){
                if(!runes[i].rune.isSelected) {
                    runes[i].rune.sprite.setFrame(0);
                    runes[i].currentCharacter.visible = false;

                }
                if(currentSelected != null)
                {
                    runes[i].currentCharacter.setFrame(currentSelected);
                    runes[i].currentCharacter.visible = true;
                }

                lightAgain = true;
            })
        }

             */
    }
    update()
    {
        for (let i = 0; i < 4; i++)
        {

            runes[i].update();

        }
        this.runeManager.update();
        this.dataObj.player1Data.type = this.runeManager.player1Type;
        this.dataObj.player2Data.type = this.runeManager.player2Type;
    }

}