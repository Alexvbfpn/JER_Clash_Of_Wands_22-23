import {Button} from "../components/button.js"
import {FinalDisplay} from "../components/finalDisplay.js";

export class FinalScene extends Phaser.Scene
{
    constructor()
    {
        super({key: 'finalScene'});
        this.display = new FinalDisplay(this)
    }

    init(data)
    {
        this.dataObj = data;
    }

    preload()
    {
        this.display.preload()
        this.load.audio("winSound", 'assets/sound/winSound.wav');
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
        this.winSound = this.sound.add("winSound");
        this.winSound.play();
        //console.log(types.indexOf('Azul'));
        this.exitButton = new Button(this, 'mainMenu', 'exitButton', 697, 868,
            1.15, 1.40, this.dataObj);
        this.display.create();
        this.exitButton.create();
        this.dataObj.music.stop();

    }

}