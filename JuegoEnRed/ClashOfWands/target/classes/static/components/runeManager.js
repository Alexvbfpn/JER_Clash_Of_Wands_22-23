var player1Type;
var player2Type;
export class RuneManager {
    constructor(scene, runes, confirm_button, characters2, textP2) {
        this.relatedScene = scene;
        this.runes = runes;
        this.confirm_button = confirm_button;
        this.characters2 = characters2;
        this.player1Type = null;
        this.player2Type = null;
        this.textP2 = textP2;
    }

    preload()
    {
        this.relatedScene.load.audio("onB", 'assets/sound/encimaBoton.wav');
    }

    create()
    {
        //Declaración de variables globales
        var onS = this.relatedScene.sound.add("onB");
        let currentSelected
        let textSelected;
        let lightAgain = true;
        let runes = this.runes;
        player1Type = this.player1Type;
        player2Type = this.player2Type;
        let confirm_button = this.confirm_button;
        let characters2 = this.characters2;
        let textP2 = this.textP2;
        //Comprobaciones relativas a tener en cuent las otras runas del selector
        for (let i = 0; i<4; i++)
        {
            let currentRune = this.runes[i].rune;
            let selector = this.runes[i];


            currentRune.sprite.on('pointerdown', function (){


                if(currentRune.isSelected == false)
                {

                    currentRune.highLightRune(runes);
                    currentRune.sprite.setFrame(1);
                    currentRune.isSelected = true;

                    if(currentRune.isSelected && selector.currentCharacter != characters2)
                    {
                        player1Type = currentRune.color;
                    }
                    if (selector.currentCharacter === characters2 && currentRune.isSelected)
                    {
                        player2Type = currentRune.color;
                    }
                    selector.currentCharacter.visible = true;
                    currentSelected = selector.characterFrame;
                    textSelected = selector.textFrame;
                    confirm_button.visible = true;

                } else
                {
                   // player1Type = null; //CUIDADO
                    currentRune.sprite.setFrame(0);
                    selector.currentText.setFrame(0);
                    selector.currentCharacter.visible = false;
                    currentRune.isSelected = false;
                    confirm_button.visible = false;
                    lightAgain = false;
                    currentSelected = null;
                    textSelected = null;
                }
                //currentRune.isSelected = !currentRune.isSelected;
            });

            this.confirm_button.on('pointerdown', function (){

                selector.currentCharacter= characters2;
                selector.currentText = textP2;
                selector.currentText.visible = true;
                currentRune.isSelected = false;
                currentRune.sprite.setFrame(0);
                this.visible = false;
                this.setPosition(1608, 908)
                currentSelected = null;
                textSelected = null;

            });

            currentRune.sprite.on('pointerover', function (){
                if(currentRune.isSelected == false && lightAgain == true)
                {
                    onS.play();
                    currentRune.sprite.setFrame(1);
                    selector.currentText.setFrame(selector.textFrame);
                    selector.currentCharacter.setFrame(selector.characterFrame);
                    selector.currentCharacter.visible = true;
                }
            });

            currentRune.sprite.on('pointerout', function (){
                if(!currentRune.isSelected) {
                    currentRune.sprite.setFrame(0);
                    selector.currentCharacter.visible = false;
                    selector.currentText.setFrame(0);

                }
                if(currentSelected != null)
                {
                    selector.currentCharacter.setFrame(currentSelected);
                    selector.currentText.setFrame(textSelected);
                    selector.currentCharacter.visible = true;
                    selector.currentCharacter.frame;
                    console.log(selector.currentCharacter.frame.name);
                }

                lightAgain = true;
            })

        }
    }
    update()
    {
        this.player1Type = player1Type;
        this.player2Type = player2Type;
    }
    
}