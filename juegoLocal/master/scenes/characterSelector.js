import {Selector} from "../components/selector.js";
import {RuneManager} from "../components/runeManager.js";
import {Button} from "../components/button.js";

var runes;

export class CharacterSelector extends Phaser.Scene
{
    constructor()
    {
        super({key: 'characterSelector'});
        this.water = new Selector(this);
        this.backButton = new Button(this);

    }

    init()
    {
        this.dataObj =
        {
            player1Data:
                {
                    type: null,
                    points: 0,
                    wins: 0,
                    id: 0
                },
            player2Data:
                {
                    type: null,

                    points: 0,

                    wins: 0,

                    id:1

                },

            music: null,

        };

    }

    preload()
    {
        this.load.image('characterSelector_Background', 'assets/img/characterSelector/background_characterSelector.png');
        this.load.image('confirm_button', 'assets/img/characterSelector/confirm_button.png')
        this.water.preload();
        this.backButton.preload();
        this.load.audio("fightMusic", 'assets/sound/fightTheme.ogg');
        this.load.spritesheet('textP1', 'assets/img/characterSelector/spriteSheet_textP1.png', {
            frameWidth: 336,
            frameHeight: 428
        });
        this.load.spritesheet('textP2', 'assets/img/characterSelector/spriteSheet_textP2.png', {
            frameWidth: 336,
            frameHeight: 428
        });
    }

    create()
    {
        var confirm_button;
        var characters1;
        var characters2;
        var textP1;
        var textP2;

        //Fondo
        this.add.image(960, 540, 'characterSelector_Background');
        var scene = this.scene;
        this.fightTheme = this.sound.add("fightMusic", {loop: true});
        this.dataObj.music = this.fightTheme;
        //Añadimos los artworks de los personajes
        characters1 = this.add.sprite(1, 290, 'characters');
        characters1.visible = false;
        characters1.setOrigin(0, 0);
        characters1.setFlipX(true);

        characters2 = this.add.sprite(1370, 290, 'characters');
        characters2.visible = false;
        characters2.setOrigin(0, 0);
        characters2.setFlipX(false);

        textP1 = this.add.sprite(575, 551, 'textP1').setOrigin(0, 0);
        textP2 = this.add.sprite(1008, 551, 'textP2').setOrigin(0, 0);
        textP2.visible = false;

        //Creamos los selectores de cada runa (cada una asociada al artwork correspondiente)
        this.water = new Selector(this, 'water', 1043, 257, 0, characters1,0, true, 'Azul', textP1, 1);
        this.fire = new Selector(this, 'fire', 709, 27, 0, characters1, 1, true, 'Rojo', textP1, 2);
        this.wind = new Selector(this, 'wind', 709, 257, 0, characters1, 2, true, 'Verde', textP1, 3);
        this.bolt = new Selector(this, 'bolt', 1043, 27, 0, characters1, 3, true, 'Amarillo', textP1, 4);

        this.water.create();
        this.fire.create();
        this.wind.create();
        this.bolt.create();

        runes = [this.water, this.fire, this.wind, this.bolt]

        if(!this.fightTheme.isPlaying)
        {
            //this.fightTheme.play();
            this.dataObj.music.play()
        }


        //Boton de confirmación
        confirm_button = this.add.image(140, 908, 'confirm_button').setOrigin(0, 0);
        confirm_button.setInteractive()
        confirm_button.visible = false;

        //Datos generales a la partida
        var generalData = this.dataObj;

        //Botón de vuelta atrás
        this.backButton = new Button(this, 'mainMenu', 'backButton', 52, 45, 1, 1.25, null, this.fightTheme); //this.fightTheme
        this.backButton.create();
        confirm_button.on('pointerdown', function ()
        {
            if(runes[0].currentCharacter == characters2)
            {
                //generalData.player2Data.type =
                console.log(generalData.player1Data.type)
                scene.start('match', generalData);
            }
            console.log('Tipo player1: ' + generalData.player1Data.type);
            console.log('Tipo player2: ' + generalData.player2Data.type);
            console.log(runes.currentCharacter)

        });

        var tint

        confirm_button.on('pointerover', function (){

            if(runes[0].currentCharacter == characters1)
            {
                if(generalData.player1Data.type == 'Verde')
                {
                    confirm_button.setTint(0x2BA32B);
                } else if(generalData.player1Data.type == 'Rojo')
                {
                    confirm_button.setTint(0xFF2D2D);
                } else if(generalData.player1Data.type == 'Azul')
                {
                    confirm_button.setTint(0x2C81CE);
                } else if (generalData.player1Data.type == 'Amarillo')
                {
                    confirm_button.setTint(0xACAC0F);
                }
            }
            else if(runes[0].currentCharacter == characters2)
            {
                if(generalData.player2Data.type == 'Verde')
                {
                    confirm_button.setTint(0x2BA32B);
                } else if(generalData.player2Data.type == 'Rojo')
                {
                    confirm_button.setTint(0xFF2D2D);
                } else if(generalData.player2Data.type == 'Azul')
                {
                    confirm_button.setTint(0x2C81CE);
                } else if (generalData.player2Data.type == 'Amarillo')
                {
                    confirm_button.setTint(0xACAC0F);
                }
            }


        });

        confirm_button.on('pointerout', function (){

            confirm_button.clearTint();
        });

        this.runeManager = new RuneManager(this, runes, confirm_button, characters2, textP2);
        this.runeManager.create();
        console.log(this.runeManager.player1Type);

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