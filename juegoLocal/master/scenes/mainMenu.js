import {Button} from "../components/button.js"
export class MainMenu extends Phaser.Scene
{
    constructor()
    {
        super({key: 'mainMenu'});
        this.playButton = new Button(this);
        this.creditsButton = new Button(this);
        this.tutorialButton = new Button(this);
    }

    preload()
    {
        this.load.image('mainMenu_Background', 'assets/img/background_mainMenu.png');
        this.playButton.preload();
        this.load.image('play_button', 'assets/img/play_buttonDef.png');
        this.creditsButton.preload();
        this.tutorialButton.preload();
        this.load.audio("encimaB", 'assets/sound/encimaBoton.wav');
        this.load.audio("pulsarB", 'assets/sound/clickBoton.wav');
        this.load.audio('mainMenuMusic', 'assets/sound/mainTheme.ogg');
    }

    create()
    {
        //Fondo
        this.add.image(960, 540, 'mainMenu_Background');
        this.input.setDefaultCursor('url(assets/img/mainMenu/cursor.cur), pointer');

        //Creamos la instancia de cada botón

        this.clickS = this.sound.add("pulsarB");
        this.encimaS = this.sound.add("encimaB");

        this.mainTheme = this.sound.add("mainMenuMusic", {loop: true});
        this.mainTheme.play();
        this.playButton = new Button(this, 'characterSelector', 'playButton', 686, 757, 1.15, 1.40, null, this.mainTheme);
        this.creditsButton = new Button(this, 'credits', 'creditsButton', 1301, 757, 0.75, 1);
        this.tutorialButton = new Button(this, 'controls', 'controlsButton', 73, 757, 0.75, 1);

        
        //Llamamos al create de cada uno para que se cree y muestre en la escena
        this.playButton.create();
        this.creditsButton.create();
        this.tutorialButton.create();


        let text = this.add.text(-100, -100, '0', {
            fontFamily: 'tilesFont',
            font: (1).toString() + "px tilesFont",
            //fontWeight: "bold",
            color: '#32023a'
        });
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