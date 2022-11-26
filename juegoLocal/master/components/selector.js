var player1;
var character;
export class Selector {
    constructor(scene, elementName, x, y, runeFrame, characters1, characterFrame, flip, characters2) {
        this.relatedScene = scene;
        this.element = elementName;
        this.x = x;
        this.y = y;
        this.runeFrame = runeFrame;
        this.characters1 = characters1;
        this.characters2 = characters2;
        this.characterFrame = characterFrame;
        this.flip = flip;
        this.rune;
        this.currentCharacter;
    }

    preload()
    {
        this.relatedScene.load.spritesheet('bolt', 'assets/img/characterSelector/sprites_bolt.png', {
        frameWidth: 168,
        frameHeight: 224
        });
        this.relatedScene.load.spritesheet('fire', 'assets/img/characterSelector/sprites_fire.png', {
            frameWidth: 168,
            frameHeight: 224
        });
        this.relatedScene.load.spritesheet('water', 'assets/img/characterSelector/sprites_water.png', {
            frameWidth: 168,
            frameHeight: 224
        });
        this.relatedScene.load.spritesheet('wind', 'assets/img/characterSelector/sprites_wind.png', {
            frameWidth: 168,
            frameHeight: 224
        });

        this.relatedScene.load.spritesheet('characters', 'assets/img/characterSelector/spriteSheet_characters.png', {
            frameWidth: 542,
            frameHeight: 620
        });
    }

    create()
    {
        player1 = true;
        var scene = this.relatedScene.scene;
        this.rune =
            {
                sprite: null,
                frame: this.runeFrame,
                isSelected: false,
                highLightRune(runes)
                {

                    for (let i = 0; i < 4; i++)
                    {

                            runes[i].rune.sprite.setFrame(0);
                            runes[i].rune.isSelected = false;


                    }
                    /*
                    if(this.isSelected == false)
                    {
                        this.sprite.setFrame(1);
                        this.isSelected = true;
                    } else
                    {
                        this.sprite.setFrame(0);
                        this.isSelected = false;
                    }
                    //rune.sprite.setFrame(1);
                    character.setFrame(chaFrame)
                    character.visible = true;

                     */

                }
            };
        var rune = this.rune;
        rune.sprite = this.relatedScene.add.sprite(this.x, this.y, this.element, 0);
        rune.sprite.setOrigin(0, 0);
        rune.sprite.setInteractive();

        var chaFrame = this.characterFrame;
        this.currentCharacter = this.characters1;
        character = this.currentCharacter;
        /*
        rune.sprite.on('pointerover', function (){
            if(rune.isSelected == false) {
                rune.sprite.setFrame(1);
                character.setFrame(chaFrame)
                character.visible = true;
            }
        });
*/
/*
        rune.sprite.on('pointerout', function (){
            if(!rune.isSelected) {
                rune.sprite.setFrame(0);
                character.visible = false;
            }
        });



        rune.sprite.on('pointerdown', function (){
            if(rune.isSelected == false)
            {
                rune.sprite.setFrame(1);
                character.setFrame(chaFrame)
                character.visible = true;
            } else if (rune.isSelected == true)
            {
                rune.sprite.setFrame(0);
                character.visible = false;
            }

            rune.isSelected = !rune.isSelected;
            console.log(rune.isSelected)
        })


 */

    }

    update()
    {
        character = this.currentCharacter;
    }
}