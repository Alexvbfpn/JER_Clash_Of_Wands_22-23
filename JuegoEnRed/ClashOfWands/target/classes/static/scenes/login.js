
$(document).ready(function(){
    console.log('DOM charged (login)')
});
var countdown = 1;
let url;
export class Login extends Phaser.Scene {
    constructor() {
        super({key: 'login'});

        this.username = 'Anonymous';
    }

    init(data)
    {
        this.dataObj = data;
    }

    preload() {
        //this.load.image('background_login', 'assets/img/background_mainMenu.png');
        /*
        this.load.image('button', '../../Resources/Art/UI/SC_Choose/BT_select_small.png');
        this.load.image('button_ready', '../../Resources/Art/UI/SC_Choose/BT_select_big.png');


         */
        this.load.image('play_button', 'assets/img/play_buttonDef.png');
        this.load.image('mainMenu_Background', 'assets/img/background_mainMenu.png');
        this.load.html('form', "./form.html");
        this.load.image('start_button', 'assets/img/access.png');
        this.load.image('login_background', 'assets/img/login/background_login.png');
        this.load.spritesheet('login_texts', 'assets/img/login/spritesheet_LoginTexts.png', {
            frameWidth: 638,
            frameHeight: 137
        });

    }


    create() {
		url = this.dataObj.url;
        this.add.image(960, 540, 'login_background');
        
        // Creates variable for managing the textview
        countdown = 1;
        var element = this.add.dom(750, 800).createFromCache('form');

        let name = element.getChildByName("name");
        let password = element.getChildByName("password");

        let text = this.add.text(350, 650, '', {fontFamily: 'tilesFont',
            font: (20).toString() + "px tilesFont",
            color: 'black'}).setScale(2);
        this.responseText = this.add.sprite(650, 550, 'login_texts', 0).setOrigin(0, 0);
        this.responseText.setVisible(false);
        let change = false; // boolean to change scene (at first is set to false)
        var responseText = this.responseText;
		var data = this.dataObj;
        this.startButton = this.add.sprite(955, 950, 'start_button');
        this.startButton.setInteractive().on('pointerdown', () => {
            if (name.value != "" && password.value != "") {
				console.log(url);
				console.log(name.value);
                $.ajax({
                    type: "POST",
                    async: false,
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    url: url + "users",
                    data: JSON.stringify({nick: "" + name.value, password: "" + password.value}),
                    dataType: "json",
                    success: function (boolean) { // returned variable to check if we can change the scene
                        change = boolean;
                    }
                }).done(function (item) {
				    console.log("User created: " + JSON.stringify({nickname: "" + name.value, password: "" + password.value}));
				})

                // Starts the next scene
                if (change) { //Si el usuario y contraseña existen y estan bien o no existen, se crea uno nuevo y se inicia la escena
                    this.responseText.setFrame(0);
                    this.responseText.setVisible(true);
                    //this.scene.stop();
                    this.dataObj.username = name.value;
                    this.dataObj.url = url;
                    this.time.addEvent({delay: 1000, callback: countdownFunction, callbackScope: this, loop: true});
                    //this.scene.start('lobby', data);
                } else { // Si existe el usuario introducido pero la contraseña no es la guardada en el servidor, le decimos que intente de nuevo
                    this.responseText.setFrame(2);
                    this.responseText.setVisible(true);
                    //text.setText('Contraseña incorrecta. Inténtelo de nuevo'); //
                }
            }
        });
        this.startButton.on('pointerover', function (){

            this.setScale(1.2, 1.2);
            //playButton.setTint(0x44ff44);
            //onS.play();
        });
        this.startButton.on('pointerout', function (){

            this.setScale(1, 1);
            //playButton.setTint(0x44ff44);
            //onS.play();
        })

        this.tweens.add({
            targets: responseText,
            alpha: 0.5,
            duration: 1000,
            ease: 'Sine.easeOut',
            yoyo: true,
            repeat: -1
        });
    }
    update()
    {
        if(countdown<= 0)
        {
            this.scene.start('lobby', this.dataObj);
        }
    }
}
function countdownFunction()
{
    countdown--;
    //countdownText.text = countdown.toString();
}