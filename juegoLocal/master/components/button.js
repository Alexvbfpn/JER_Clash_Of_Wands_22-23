export class Button {
    constructor(scene, destination, spriteButtonName, x, y, buttonScale, maxScale) {
        this.relatedScene = scene;
        this.relatedDestination = destination;
        this.spriteButtonName = spriteButtonName;
        this.x = x;
        this.y = y;
        this.buttonScale = buttonScale;
        this.maxScale = maxScale;
    }

    preload() //Cargamos el sprite del botón
    {
        this.relatedScene.load.image('playButton', 'assets/img/play_buttonDef.png');
        this.relatedScene.load.image('tutorialButton', 'assets/img/tutorial_buttonDef.png');
        this.relatedScene.load.image('creditsButton', 'assets/img/credits_buttonDef.png');
        this.relatedScene.load.audio("onB", 'assets/sound/encimaBoton.wav');
        this.relatedScene.load.audio("pulsarB", 'assets/sound/clickBoton.wav');
    }

    create() //Añadimos el botón en la escena
    {
        var scene = this.relatedScene.scene;
        var dest = this.relatedDestination;
        var clickS = this.relatedScene.sound.add("pulsarB");
        var onS = this.relatedScene.sound.add("onB");


        //creamos el boton para la escena relativa en la que se le meta
        this.button = this.relatedScene.add.image(0, 0, this.spriteButtonName);
        //this.textPlayButton = this.relatedScene.add.image(0, 0, 'textPlayButton').setScale(1.5, 1.5);

        /*
        //Interpolación para animar el texto
        this.relatedScene.tweens.add({
            targets: this.textPlayButton,
            alpha: 0.5,
            duration: 750,
            ease: 'Sine.easeOut',
            yoyo: true,
            repeat: -1
        });
         */

        //Creamos el contenedor que tendrá al botón dentro y permitirá detectar acciones sobre el
        var container = this.relatedScene.add.container(this.x + this.button.width/2, this.y + this.button.height/2,
            [this.button]).setScale(this.buttonScale, this.buttonScale);
        container.setSize(this.button.width, this.button.height);
        container.setInteractive();

        var regularScale = this.buttonScale;
        var maxScale = this.maxScale;


        //this.onS.play();
        //this.onS.volume = 0.1;

        container.on('pointerover', function (){

            container.setScale(maxScale, maxScale);
            //playButton.setTint(0x44ff44);
            onS.play();
        });

        container.on('pointerout', function (){

            container.setScale(regularScale, regularScale);
            //playButton.clearTint();

        });
        container.on('pointerdown', function (){

            clickS.play();
            scene.start(dest);

        });

    }
}