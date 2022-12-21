
$(document).ready(function(){
    console.log('DOM charged (login)')
});

let url;
export class Login extends Phaser.Scene {
    constructor() {
        super({key: 'login'});

        this.username = 'Anonymous';
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
            };

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

    }


    create() {
		url = this.dataObj.url;
        this.add.image(960, 540, 'mainMenu_Background');
        
        // Creates variable for managing the textview

        var element = this.add.dom(750, 800).createFromCache('form');

        let name = element.getChildByName("name");
        let password = element.getChildByName("password");

        let text = this.add.text(450, 500, '').setScale(2);

        let change = false; // boolean to change scene (at first is set to false)

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
                if (change) { // if we access with an existing user and correct password or create a new one we can change the scene
                    this.scene.stop();
                    this.dataObj.username = name.value;
                    this.dataObj.url = url;
                    this.scene.start('mainMenu', data);
                } else { // if the given password doesn't match the one of the existing user, we can't change the scene
                    text.setText('Wrong password. Try again'); //
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


    }
}