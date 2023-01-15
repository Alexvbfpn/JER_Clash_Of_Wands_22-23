import {Button} from "../components/button.js"
import {Chat} from "../components/chat.js";

export class MainMenu extends Phaser.Scene
{
    constructor()
    {
        super({key: 'mainMenu'});
        this.playButton = new Button(this);
        this.creditsButton = new Button(this);
        this.tutorialButton = new Button(this);
        this.chat = new Chat(this);
    }

    init()
    {
        this.dataObj =
            {
                player1Data:
                    {
                        type: null,
                        points: 0,
                        wins: 0,
                        id: 0
                    },
                player2Data:
                    {
                        type: null,

                        points: 0,

                        wins: 0,

                        id:1

                    },
                url: window.location.href,
                username: null,
                music: null,
                crowdSound: null,
                playerId: null,
                connection: null,
            };
    }

    preload()
    {
        this.creditsButton.preload();
        this.creditsButton.preload();
        this.tutorialButton.preload();
        this.chat.preload();
    }

    create()
    {
        var clickS = this.sound.add("pulsarB");
        var onS = this.sound.add("onB");
        var scene = this;
		console.log(this.dataObj);

        this.loadingText = this.add.text(960-157.5 - 500, 625-157.5 - 250, "", {
            fontFamily: 'tilesFont',
            font: (200).toString() + "px tilesFont",
            color: 'white'});

        //Fondo
        this.add.image(960, 540, 'mainMenu_Background');
        this.input.setDefaultCursor('url(assets/img/mainMenu/cursor.cur), pointer');

        //Creamos la instancia de cada botón

        this.clickS = this.sound.add("pulsarB");
        this.encimaS = this.sound.add("encimaB");
		var data = this.dataObj;
        this.mainTheme = this.sound.add("mainMenuMusic", {loop: true});
        this.mainTheme.play();
        var mainTheme = this.mainTheme;
        //this.playButton = new Button(this, 'characterSelector', 'playButton', 686, 757, 1.15, 1.40, null, this.mainTheme, this.dataObj);
        this.creditsButton = new Button(this, 'credits', 'creditsButton', 1301, 757, 0.75, 1,
        null, null, this.dataObj);
        this.tutorialButton = new Button(this, 'controls', 'controlsButton', 73, 757, 0.75, 1,
            null, null, this.dataObj);
		this.playButton = this.add.sprite(0, 0, 'play_button');
		var container = this.add.container(686 + this.playButton.width/2, 757 + this.playButton.height/2,
            [this.playButton]).setScale(1.15, 1.15);
        container.setSize(this.playButton.width, this.playButton.height);
        container.setInteractive();
		container.on('pointerover', function (){

            container.setScale(1.40, 1.40);
            //playButton.setTint(0x44ff44);
            onS.play();
        });

        container.on('pointerout', function (){

            container.setScale(1.15, 1.15);

        });
        container.on('pointerdown', function (){
            clickS.play();
            mainTheme.stop();
            scene.scene.start('chooseMode', data);
        });

        //Llamamos al create de cada uno para que se cree y muestre en la escena
        //this.playButton.create();
        this.creditsButton.create();
        this.tutorialButton.create();
    	
    }
	
    update(){

    }
}

