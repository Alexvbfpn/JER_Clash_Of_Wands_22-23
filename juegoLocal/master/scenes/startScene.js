import {Button} from "../components/button.js"
export class StartScene extends Phaser.Scene
{
    constructor()
    {
        super({key: 'start'});

    }

    preload()
    {
        this.load.image('start_Background', 'assets/img/background_start.png');

        this.load.image('start_text', 'assets/img/start_text.png');

    }

    create()
    {
        //Fondo
        this.back = this.add.image(960, 540, 'start_Background');
        this.text = this.add.image(495, 869, 'start_text').setOrigin(0, 0);
        this.input.setDefaultCursor('url(assets/img/mainMenu/cursor.cur), pointer');

        this.back.setInteractive();
        let scene = this.scene;
        this.back.on('pointerdown', function (){

            scene.start('mainMenu');



        });

        this.tweens.add({
            targets: this.text,
            alpha: 0.2,
            duration: 1300,
            ease: 'Sine.easeOut',
            yoyo: true,
            repeat: -1
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