import {Button} from "../components/button.js"
import {Chat} from "../components/chat.js";

let url;

let activeUsersNumber;
let activePrevUsersNumber;

let textActiveUsers;

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
		this.load.audio("onB", 'assets/sound/encimaBoton.wav');
        this.load.audio("pulsarB", 'assets/sound/clickBoton.wav');
        this.load.image('mainMenu_Background', 'assets/img/background_mainMenu.png');
        this.creditsButton.preload();
        this.load.image('play_button', 'assets/img/play_buttonDef.png');
        this.creditsButton.preload();
        this.tutorialButton.preload();
        this.load.audio("encimaB", 'assets/sound/encimaBoton.wav');
        this.load.audio("pulsarB", 'assets/sound/clickBoton.wav');
        this.load.audio('mainMenuMusic', 'assets/sound/mainTheme.ogg');
        this.chat.preload();
    }

    create()
    {
        var clickS = this.sound.add("pulsarB");
        var onS = this.sound.add("onB");
        var scene = this;
		console.log(this.dataObj);
        /*
        this.username = this.dataObj.username;
        url = this.dataObj.url;
        activeUsersNumber = 0;
        activePrevUsersNumber = 0;

         */
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
            //playButton.clearTint();

        });
        container.on('pointerdown', function (){

            clickS.play();
           
            mainTheme.stop();
           
            
            
            scene.scene.start('chooseMode', data);
            


        });
        
        //this.playButton.setInteractive().on('pointerdown', () => {
			//scene.scene.start('characterSelector', data);});
        //Llamamos al create de cada uno para que se cree y muestre en la escena
        //this.playButton.create();
        this.creditsButton.create();
        this.tutorialButton.create();
        /*
        textActiveUsers = this.add.text(50, 50, 'Usuarios activos: ' + activeUsersNumber, {
			fontFamily: 'tilesFont',
			font: (40).toString() + "px tilesFont",
			color: 'black'
		})

         */

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

        //this.chat.dataObj = this.dataObj;
        //this.chat.create();
        /*
		// PRUEBA DE CHAT
	
		let username = this.username;
		
		setInterval (getMessage, 2500); // Recarga los mensajes cada 2 segundos y medio

		//Al cerrarse la pestaña se desconecta el usuario
		window.addEventListener('beforeunload', () =>
        {
            deleteActiveUser(username);
        });

        // ------------CHAT-----------------
        var chat = this.add.dom(1400, -280).createFromCache('chat');
        let input = chat.getChildByName("inputChat");
        let button = chat.getChildByName("sendButton");
        input.placeholder='Introduzca su mensaje';
        chat.addListener('click');
       
        chat.on('click', function()
        {
			if(event.target.name ==='sendButton'){
				if(input.value != null){
					sendMessage(username, input.value);
					input.value = "";
				}
			}
			if(event.target.name ==='showButton')
			{
				if(event.target.innerHTML === 'Mostrar chat'){
						event.target.innerHTML = 'Ocultar chat';
						scene.tweens.add({
					        targets: chat,
					        y: 400,
					        duration: 1250,
					        ease: 'Bounce'
					    });
				    } else if (event.target.innerHTML === 'Ocultar chat')
				    {
						event.target.innerHTML = 'Mostrar chat';
						scene.tweens.add({
					        targets: chat,
					        y: -280,
					        duration: 2000,
					        ease: 'Power3'
					    });
					}
			}
		})

         */
    	
    }
	
    update(){

        //getActiveUsers();
        //updateActiveUsers();
        //textActiveUsers.setText('Usuarios activos: ' + activeUsersNumber);
        /*
        window.addEventListener('beforeunload', () =>
        {
            $.ajax({
                method: "DELETE",
                url: url+ "activeUsers/" + username,
                success : function () {
                    console.log("User removed");
                },
                error : function () {
                    console.log("Failed to delete");
                    console.log("The URL was:\n" + url + "users/"+username)
                }
            })
        });

         */
        //console.log(activeUsersNumber);
        //this.chat.update();
    }

}
/*
function updateActiveUsers(){
    
    if(activePrevUsersNumber != activeUsersNumber)
    {
        if(activePrevUsersNumber < activeUsersNumber){
            console.log("Se ha conectado alguien. El número actual de usuarios es: " + activeUsersNumber);
            sendMessage('Alguien', 'se ha conectado, ¡viene con ganas de pelea!');
        }else if(activePrevUsersNumber > activeUsersNumber){
			sendMessage('Alguien', 'se ha desconectado, un cobarde menos');
            console.log("Alguien se ha desconectado. El número actual de usuarios es: " + activeUsersNumber);
        }

        activePrevUsersNumber = activeUsersNumber;
    }

}

function deleteActiveUser(user)
{
    $.ajax({
        method: "DELETE",
        url: url+ "activeUsers/" + user,
        success : function () {
            console.log("User removed");
        },
        error : function () {
            console.log("Failed to delete");
            console.log("The URL was:\n" + url + "users/"+username)
        }
    });
}

function getActiveUsers(){
    $.ajax({
        url:  url + "activeUsersNum",
        method: 'GET',
        dataType: 'json'
    }).done(function(data) {
        activeUsersNumber = data;
    });
}

// FUNCIONES DE CHAT

function sendMessage(user, message)
{
	$.ajax({
		type: "POST",
		async:false,
		headers: {
			'Accept': 'application/json',
			'Content-type' : 'application/json'	
		},
		url: url + "chat",
		data: JSON.stringify( { user: "-"+user, message: ""+message } ),
		dataType: "json" 
	})
	getMessage();
}

function getMessage() {
	for (let i = 0; i < 8; i++) {
		$.ajax({
			method: "GET",
			url: url + "chat/" + i.toString()
		}).done(function(data){
			if(data != "")
				document.getElementById("message"+i.toString()).innerHTML = data;
		})
	}

}
 */

