export class PlayButton {
    constructor(scene, destination) {
        this.relatedScene = scene;
        this.relatedDestination = destination;
    }

    preload() //Cargariamos el sprite del botón
    {
        this.relatedScene.load.image('playButton', 'assets/play_button.png');
        this.relatedScene.load.image('textPlayButton', 'assets/play_button_text.png');
    }
    create() //Añadimos el botón en la escena
    {
        //creamos el boton para la escena relativa en la que se le meta
        this.playButton = this.relatedScene.add.image(0, 0, 'playButton').setScale(1.5, 1.5);
        this.textPlayButton = this.relatedScene.add.image(0, 0, 'textPlayButton').setScale(1.5, 1.5);

        //Interpolación para animar el texto
        this.relatedScene.tweens.add({
            targets: this.textPlayButton,
            alpha: 0.5,
            duration: 750,
            ease: 'Sine.easeOut',
            yoyo: true,
            repeat: -1
        });
        var scene = this.relatedScene.scene;
        var button = this.playButton;
        var dest = this.relatedDestination;

        var container = this.relatedScene.add.container(950, 900, [this.playButton, this.textPlayButton]);
        container.setSize(this.playButton.width*1.5, this.textPlayButton.height*1.5);
        container.setInteractive();

        container.on('pointerover', function (){

            button.setTint(0x44ff44);
        });

        container.on('pointerout', function (){

            button.clearTint();
        });

        container.on('pointerdown', function (){

            scene.start(dest);
        });

    }
}