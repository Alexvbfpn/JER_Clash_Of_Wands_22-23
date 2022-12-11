import {Button} from "../components/button.js"
export class ChooseMode extends Phaser.Scene
{
    constructor()
    {
        super({key: 'chooseMode'});
        this.localButton = new Button(this);
        this.onlineButton = new Button(this);
    }

    preload()
    {
        //this.load.image('mainMenu_Background', 'assets/img/background_mainMenu.png');
        this.localButton.preload();
        this.load.image('local_button', 'assets/img/buttons/local_buttonDef.png');
        this.load.image('online_button', 'assets/img/buttons/onlineBlock_buttonDef.png');
        this.onlineButton.preload();
    }

    create()
    {
        //Fondo
        this.add.image(960, 540, 'mainMenu_Background');

        //Creamos la instancia de cada botón
        this.backButton = new Button(this, 'mainMenu', 'backButtonCredits', 52, 45, 1, 1.25, null);
        this.clickS = this.sound.add("pulsarB");
        this.encimaS = this.sound.add("encimaB");

        this.localButton = new Button(this, 'characterSelector', 'local_button', 286, 757, 1.15, 1.40, null, this.mainTheme);
        this.onlineButton = new Button(this, 'credits', 'online_button', 1101, 757, 1.15, 1.40);


        //Llamamos al create de cada uno para que se cree y muestre en la escena
        this.localButton.create();
        this.onlineButton.create();
        this.backButton.create();
        /*
        //Animación del texto
        var play_button = this.add.image(0, 0, 'playButton').setScale(1.5, 1.5);
        var text_play_button = this.add.image(0, 0, 'textPlayButton').setScale(1.5, 1.5);

        this.tweens.add({
            targets: text_play_button,
            alpha: 0.5,
            duration: 750,
            ease: 'Sine.easeOut',
            yoyo: true,
            repeat: -1
        });

         */
    }

}