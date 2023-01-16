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
        //this.display.preload()
        this.load.audio("winSound", 'assets/sound/winSound.wav');
    }

    create()
    {
        this.dataObj.currentScene = this.scene.key;
        var winner = this.dataObj.player1Data.points === 3 ? this.dataObj.player1Data : this.dataObj.player2Data;
        var types = ['Azul', 'Rojo', 'Amarillo', 'Verde'];
        this.display.type = types.indexOf(winner.type);
        this.display.winner = winner.id;
        this.winSound = this.sound.add("winSound");
        this.winSound.play();
        this.exitButton = new Button(this, 'mainMenu', 'exitButton', 697, 868,
            1.15, 1.40, this.dataObj);
        this.display.create();
        this.exitButton.create();
        this.dataObj.music.stop();
        this.dataObj.crowdSound.stop();

        let pauseButton = this.add.image(1868 - 162, 45, 'pauseButton').setOrigin(0, 0);
        pauseButton.setInteractive();

        pauseButton.on('pointerover', function (){

            pauseButton.setScale(1.15, 1.15);
            //playButton.setTint(0x44ff44);
            //onS.play();
        });

        pauseButton.on('pointerout', function (){

            pauseButton.setScale(1, 1);

        });
        var scene = this.scene;
        var data = this.dataObj;
        pauseButton.on('pointerdown', function (){
            scene.pause();
            scene.launch('pauseScreen', data);
        });
        

    }
    
    update()
    {

	}
}