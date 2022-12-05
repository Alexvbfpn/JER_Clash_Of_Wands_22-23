import {Button} from "../components/button.js"
import {MidDisplay} from "../components/midDisplay.js";

export class MidScene extends Phaser.Scene
{
    constructor()
    {
        super({key: 'midScene'});
        this.display = new MidDisplay(this)
    }

    init(data)
    {
        this.dataObj = data;
    }

    preload()
    {
        this.display.preload()
    }

    create()
    {
        //Fondo
        /*
        this.add.sprite(0, 0, 'midScene_Background').setOrigin(0, 0);
        this.add.sprite(161, 109, 'midScene_Text').setOrigin(0, 0);
         */

        var winner = this.dataObj.player1Data.points === 3 ? this.dataObj.player1Data : this.dataObj.player2Data;
        var types = ['Azul', 'Rojo', 'Amarillo', 'Verde'];
        this.display.type = types.indexOf(winner.type);
        this.display.winner = winner.id;

        this.continueButton = new Button(this, 'match', 'continueButton', 697, 858,
            1.15, 1.40, this.dataObj);
        this.display.create();
        this.continueButton.create();

    }

}