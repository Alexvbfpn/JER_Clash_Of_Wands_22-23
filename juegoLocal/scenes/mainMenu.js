export class MainMenu extends Phaser.Scene
{
    constructor()
    {
        super({key: 'mainMenu'});
    }

    preload()
    {
        this.load.image('mainMenu_Background', 'assets/img_mainMenu.jpg');
    }

    create()
    {
        this.add.image(960, 540, 'mainMenu_Background');
        var play_button = this.add.image(0, 0, 'assets/play_button.png');
        var text_play_button = this.add.image(0, 0, 'play_button_text');

        var container = this.add.container(400, 300, [play_button, text_play_button]);

        container.setSize(play_button.width, play_button.height);
        container.setInteractive();

        container.on('pointover', function (){

            play_button.setTint(0x44ff44);
        });

        container.on('pointerout', function (){

            play_button.clearTint();
        });
    }
}