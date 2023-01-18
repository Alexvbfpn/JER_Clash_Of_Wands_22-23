var player1;
var character;
var text;
export class Selector {
    constructor(scene, elementName, x, y, runeFrame, characters1, characterFrame, flip, player_type, textP1, textFrame) {
        this.relatedScene = scene;
        this.element = elementName;
        this.x = x;
        this.y = y;
        this.runeFrame = runeFrame;
        this.characters1 = characters1;
        this.characterFrame = characterFrame;
        this.flip = flip;
        this.player_type = player_type;
        this.rune;
        this.currentCharacter;
        this.textP1 = textP1;
        this.textFrame = textFrame;
        this.currentText;
    }

    preload()
    {

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
                color: this.player_type,
                highLightRune(runes)
                {

                    for (let i = 0; i < 4; i++)
                    {

                            runes[i].rune.sprite.setFrame(0);
                            runes[i].rune.isSelected = false;


                    }

                }
            };
        var rune = this.rune;
        rune.sprite = this.relatedScene.add.sprite(this.x, this.y, this.element, 0);
        rune.sprite.setOrigin(0, 0);
        rune.sprite.setInteractive();

        this.currentCharacter = this.characters1;
        character = this.currentCharacter;
        this.currentText = this.textP1;
    }

    update()
    {
        character = this.currentCharacter;
        text = this.currentText;
    }
}