import {PlayButton} from "../components/playButton.js";

export class MainMenu extends Phaser.Scene
{
    constructor()
    {
        super({key: 'mainMenu'});
        this.playButton = new PlayButton(this, 'match');
    }

    preload()
    {
        this.load.image('mainMenu_Background', 'assets/img/img_mainMenu2.jpg');
        this.load.image('playButton', 'assets/img/play_button.png');
        this.load.image('textPlayButton', 'assets/img/play_button_text.png');
    }

    create()
    {
        this.add.image(960, 540, 'mainMenu_Background');



        this.playButton.create();
        /*
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

        var container = this.add.container(950, 900, [play_button, text_play_button]);
        var scene = this.scene;

        container.setSize(play_button.width*1.5, play_button.height*1.5);
        container.setInteractive();


        container.on('pointerover', function (){

            play_button.setTint(0x44ff44);
        });

        container.on('pointerout', function (){

            play_button.clearTint();
        });
        container.on('pointerdown', function (){

            scene.start('match');
        });
         */
    }
}