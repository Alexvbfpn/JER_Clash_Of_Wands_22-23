var player1Type;
var player2Type;
export class RuneManager {
    constructor(scene, runes, confirm_button, characters2) {
        this.relatedScene = scene;
        this.runes = runes;
        this.confirm_button = confirm_button;
        this.characters2 = characters2;
        this.player1Type = null;
        this.player2Type = null;
    }

    preload()
    {
        
    }

    create()
    {
        //Declaración de variables globales
        let currentSelected
        let lightAgain = true;
        let runes = this.runes;
        player1Type = this.player1Type;
        let confirm_button = this.confirm_button;
        let characters2 = this.characters2;
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
                        console.log('Player1Type: ' + player1Type);
                    }
                    if (selector.currentCharacter === characters2 && currentRune.isSelected)
                    {
                        player2Type = currentRune.color;
                        console.log('Player2Type: ' + player2Type);
                    }
                    selector.currentCharacter.visible = true;
                    currentSelected = selector.characterFrame;
                    confirm_button.visible = true;

                } else
                {
                    player1Type = null;
                    console.log('Player1Type: ' + player1Type);
                    currentRune.sprite.setFrame(0);
                    selector.currentCharacter.visible = false;
                    currentRune.isSelected = false;
                    confirm_button.visible = false;
                    lightAgain = false;
                    currentSelected = null;
                }
                //currentRune.isSelected = !currentRune.isSelected;
                console.log(currentRune.isSelected)
            });

            this.confirm_button.on('pointerdown', function (){

                selector.currentCharacter= characters2;
                console.log(selector.currentCharacter);
                currentRune.isSelected = false;
                currentRune.sprite.setFrame(0);
                this.visible = false;
                this.setPosition(1100, 825)
                currentSelected = null;

            });

            currentRune.sprite.on('pointerover', function (){
                if(currentRune.isSelected == false && lightAgain == true)
                {
                    currentRune.sprite.setFrame(1);
                    selector.currentCharacter.setFrame(selector.characterFrame);
                    selector.currentCharacter.visible = true;
                }
            });

            currentRune.sprite.on('pointerout', function (){
                if(!currentRune.isSelected) {
                    currentRune.sprite.setFrame(0);
                    selector.currentCharacter.visible = false;

                }
                if(currentSelected != null)
                {
                    selector.currentCharacter.setFrame(currentSelected);
                    selector.currentCharacter.visible = true;
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