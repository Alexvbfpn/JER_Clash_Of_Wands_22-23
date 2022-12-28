import {Button} from "../components/button.js"

let url;

let activeUsersNumber;
let activePrevUsersNumber;

let textActiveUsers;

export class Controls extends Phaser.Scene
{
    constructor()
    {
        super({key: 'controls'});
        this.backButton = new Button(this);
    }

    preload()
    {
        this.load.image('controls_Background', 'assets/img/controls/controls_background.png');
        this.backButton.preload();
    }
    init(data)
    {
        this.dataObj = data;

    }
    create()
    {
		//Control de usuarios
		this.username = this.dataObj.username;
        url = this.dataObj.url;
        activeUsersNumber = 0;
        activePrevUsersNumber = 0;
		
        //Fondo
        this.add.image(960, 540, 'controls_Background');

        //Creamos la instancia de cada botón
        this.backButton = new Button(this, 'mainMenu', 'backButtonCredits', 52, 45, 1, 1.25, null);

        //Llamamos al create de cada uno para que se cree y muestre en la escena
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