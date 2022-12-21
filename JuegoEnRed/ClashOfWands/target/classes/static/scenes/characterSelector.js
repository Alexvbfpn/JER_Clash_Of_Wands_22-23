import {Selector} from "../components/selector.js";
import {RuneManager} from "../components/runeManager.js";
import {Button} from "../components/button.js";

var runes;

let url;

let activeUsersNumber;
let activePrevUsersNumber;

let textActiveUsers;

export class CharacterSelector extends Phaser.Scene
{
    constructor()
    {
        super({key: 'characterSelector'});
        this.water = new Selector(this);
        this.backButton = new Button(this);

    }

    init(data)
    {
        this.dataObj = data;  

    }

    preload()
    {
        this.load.image('characterSelector_Background', 'assets/img/characterSelector/background_characterSelector.png');
        this.load.image('confirm_button', 'assets/img/characterSelector/confirm_button.png')
        this.water.preload();
        this.backButton.preload();
        this.load.audio("fightMusic", 'assets/sound/fightTheme.ogg');
        this.load.spritesheet('textP1', 'assets/img/characterSelector/spriteSheet_textP1.png', {
            frameWidth: 336,
            frameHeight: 428
        });
        this.load.spritesheet('textP2', 'assets/img/characterSelector/spriteSheet_textP2.png', {
            frameWidth: 336,
            frameHeight: 428
        });
        this.load.audio("crowdSound", 'assets/sound/crowdSound.wav');
    }

    create()
    {
        var confirm_button;
        var characters1;
        var characters2;
        var textP1;
        var textP2;


		//Control de usuarios
		this.username = this.dataObj.username;
        url = this.dataObj.url;
        activeUsersNumber = 0;
        activePrevUsersNumber = 0;
        
        
		
		
        //Fondo
        this.add.image(960, 540, 'characterSelector_Background');
        var scene = this.scene;
        //Sonido
        this.fightTheme = this.sound.add("fightMusic", {loop: true});
        this.dataObj.music = this.fightTheme;
        this.crowdSound = this.sound.add("crowdSound", {loop: true});
        this.dataObj.crowdSound = this.crowdSound;
        //Añadimos los artworks de los personajes
        characters1 = this.add.sprite(1, 290, 'characters');
        characters1.visible = false;
        characters1.setOrigin(0, 0);
        characters1.setFlipX(true);

        characters2 = this.add.sprite(1370, 290, 'characters');
        characters2.visible = false;
        characters2.setOrigin(0, 0);
        characters2.setFlipX(false);

        textP1 = this.add.sprite(575, 551, 'textP1').setOrigin(0, 0);
        textP2 = this.add.sprite(1008, 551, 'textP2').setOrigin(0, 0);
        textP2.visible = false;

        //Creamos los selectores de cada runa (cada una asociada al artwork correspondiente)
        this.water = new Selector(this, 'water', 1043, 257, 0, characters1,0, true, 'Azul', textP1, 1);
        this.fire = new Selector(this, 'fire', 709, 27, 0, characters1, 1, true, 'Rojo', textP1, 2);
        this.wind = new Selector(this, 'wind', 709, 257, 0, characters1, 2, true, 'Verde', textP1, 3);
        this.bolt = new Selector(this, 'bolt', 1043, 27, 0, characters1, 3, true, 'Amarillo', textP1, 4);

        this.water.create();
        this.fire.create();
        this.wind.create();
        this.bolt.create();

        runes = [this.water, this.fire, this.wind, this.bolt]

        if(!this.fightTheme.isPlaying)
        {
            //this.fightTheme.play();
            this.dataObj.music.play()
            this.dataObj.music.volume = 0.3;
        }


        //Boton de confirmación
        confirm_button = this.add.image(140, 908, 'confirm_button').setOrigin(0, 0);
        confirm_button.setInteractive()
        confirm_button.visible = false;

        //Datos generales a la partida
        var generalData = this.dataObj;

        //Botón de vuelta atrás
        this.backButton = new Button(this, 'mainMenu', 'backButton', 22, 65, 0.75, 1, null, this.fightTheme); //this.fightTheme
        this.backButton.create();
        confirm_button.on('pointerdown', function ()
        {
            if(runes[0].currentCharacter == characters2)
            {
                scene.scene.start('match', generalData);
            }

        });

        confirm_button.on('pointerover', function (){

            if(runes[0].currentCharacter == characters1)
            {
                if(generalData.player1Data.type == 'Verde')
                {
                    confirm_button.setTint(0x2BA32B);
                } else if(generalData.player1Data.type == 'Rojo')
                {
                    confirm_button.setTint(0xFF2D2D);
                } else if(generalData.player1Data.type == 'Azul')
                {
                    confirm_button.setTint(0x2C81CE);
                } else if (generalData.player1Data.type == 'Amarillo')
                {
                    confirm_button.setTint(0xACAC0F);
                }
            }
            else if(runes[0].currentCharacter == characters2)
            {
                if(generalData.player2Data.type == 'Verde')
                {
                    confirm_button.setTint(0x2BA32B);
                } else if(generalData.player2Data.type == 'Rojo')
                {
                    confirm_button.setTint(0xFF2D2D);
                } else if(generalData.player2Data.type == 'Azul')
                {
                    confirm_button.setTint(0x2C81CE);
                } else if (generalData.player2Data.type == 'Amarillo')
                {
                    confirm_button.setTint(0xACAC0F);
                }
            }


        });

        confirm_button.on('pointerout', function (){

            confirm_button.clearTint();
        });

        this.runeManager = new RuneManager(this, runes, confirm_button, characters2, textP2);
        this.runeManager.create();
        
        // USUARIOS Y CHAT
        textActiveUsers = this.add.text(50, 30, 'Usuarios activos: ' + activeUsersNumber, {
			fontFamily: 'tilesFont',
			font: (40).toString() + "px tilesFont",
			color: 'black'
		});
		
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
        var scene = this;
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
        

    }
    update()
    {
		getActiveUsers();
        updateActiveUsers();
        textActiveUsers.setText('Usuarios activos: ' + activeUsersNumber);
        for (let i = 0; i < 4; i++)
        {

            runes[i].update();

        }
        this.runeManager.update();
        this.dataObj.player1Data.type = this.runeManager.player1Type;
        this.dataObj.player2Data.type = this.runeManager.player2Type;
    }

}

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