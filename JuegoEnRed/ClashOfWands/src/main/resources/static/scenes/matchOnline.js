import { FloorTiles} from "../components/floorTiles.js";
import {PointsPerson} from "../components/pointsPerson.js";
import {Player} from "../components/Player.js";
import {Controller} from "../components/Controller.js";
import {LaserObs} from "../components/laserComponent.js";
import {Chat} from "../components/chat.js";

let url;

let activeUsersNumber;
let activePrevUsersNumber;

let textActiveUsers;

var Jugador1=new Player(475,275,1);
var Jugador2=new Player(1425,915,2);

var id;
var connection;
var isSocketOpen = false;
var timedEventUpdateConnection;
let msg;

export class MatchOnline extends Phaser.Scene
{
    constructor()
    {
        super({key: 'MatchOnline'});
        this.floorTiles = new FloorTiles(this, 2);

        this.ikerP1 = new PointsPerson(this, 135, 201, 'iker',1);
        this.ikerP2 = new PointsPerson(this, 1686, 201, 'iker2',1);

        this.Controller1=new Controller(this);
        this.Controller2=new Controller(this);

		this.escena=this;
		Jugador1.relatedScene=this.escena;
		Jugador2.relatedScene=this.escena;
		
		Jugador1.Controller=this.Controller1;
		Jugador2.Controller=this.Controller1;

        this.Player1=Jugador1
        this.Player2=Jugador2


        this.laserComponent = new LaserObs(this, 1160,590 );
        this.laserComponent2 = new LaserObs(this, 765,590 );

        this.chat = new Chat(this);

    }

    init(data)
    {
        this.dataObj = data;
        id = this.dataObj.playerId;
        connection = this.dataObj.connection;
    }

    preload()
    {
		console.log("Player id= "+id + "----------------------------------------------------------");
        this.load.image('match_Background', 'assets/img/match/match_backgroundPublic.png');
        this.floorTiles.preload();
        this.load.image('ring', 'assets/img/Ring.png');

        this.ikerP1.preload();

		this.Player1.relatedScene=this.escena;
		this.Player1.relatedScene=this.escena;
       // this.load.image('playerSprite', 'assets/img/sprite_Placa.PNG');
        this.Player1.preload();
        this.Player2.preload();
        this.laserComponent.preload();
        this.laserComponent2.preload();
        this.cursors = this.input.keyboard.createCursorKeys();



    }

    create()
    {
		//Control de usuarios
		this.username = this.dataObj.username;
        url = this.dataObj.url;
        activeUsersNumber = 0;
        activePrevUsersNumber = 0;

        this.Controller1.create(Phaser.Input.Keyboard.KeyCodes.W,Phaser.Input.Keyboard.KeyCodes.S,Phaser.Input.Keyboard.KeyCodes.A,Phaser.Input.Keyboard.KeyCodes.D,Phaser.Input.Keyboard.KeyCodes.X,Phaser.Input.Keyboard.KeyCodes.E,Phaser.Input.Keyboard.KeyCodes.Q)
        this.Controller2.create(Phaser.Input.Keyboard.KeyCodes.I,Phaser.Input.Keyboard.KeyCodes.K,Phaser.Input.Keyboard.KeyCodes.J,Phaser.Input.Keyboard.KeyCodes.L,Phaser.Input.Keyboard.KeyCodes.M,Phaser.Input.Keyboard.KeyCodes.O,Phaser.Input.Keyboard.KeyCodes.U)
        this.matter.world.setBounds(360, 195, 1200, 800,500);
        this.add.image(960, 540, 'match_Background');



        //Puntuadores Player1
        var carvaP1 = new PointsPerson(this, 135, 393, 'carva', 2, this.dataObj.player1Data);
        var pepeP1 = new PointsPerson(this, 135, 706, 'pepe', 3, this.dataObj.player1Data);
        this.ikerP1.relativePlayer = this.dataObj.player1Data;
        var ikerP1 = this.ikerP1;
        this.ikerP1.create();
        carvaP1.create();
        pepeP1.create();

        //Puntuadores Player2
        this.ikerP2.relativePlayer = this.dataObj.player2Data;
        var ikerP2 = this.ikerP2;
        var carvaP2 = new PointsPerson(this, 1686, 393, 'carva2', 2, this.dataObj.player2Data);
        var pepeP2 = new PointsPerson(this, 1686, 706, 'pepe2', 3, this.dataObj.player2Data);
        ikerP2.create();
        carvaP2.create();
        pepeP2.create();

        this.Player1.type = this.dataObj.player1Data.type;
        this.Player2.type = this.dataObj.player2Data.type;
        this.Player1.create();
        this.Player2.create();
        this.Player2.player.angle = -180;
        this.floorTiles.create();
        this.laserComponent.create();
        this.laserComponent2.create();
        //RING
        var ring = this.add.image(283,120, 'ring').setOrigin(0);


        if(!this.dataObj.crowdSound.isPlaying)
        {
            //this.fightTheme.play();
            this.dataObj.crowdSound.play()
            this.dataObj.crowdSound.volume = 0.5;
        }
		// USUARIOS Y CHAT
        textActiveUsers = this.add.text(50, 30, 'Usuarios activos: ' + activeUsersNumber, {
			fontFamily: 'tilesFont',
			font: (40).toString() + "px tilesFont",
			color: 'white'
		});
		
		setInterval (getMessage, 2500); // Recarga los mensajes cada 2 segundos y medio

		//Al cerrarse la pestaña se desconecta el usuario
		window.addEventListener('beforeunload', () =>
        {
			
            deleteActiveUser(username);
            sendMessage(username, 'abandono se ha desconectado');
            
        });
        
        // ------------CHAT-----------------

        var scene = this;
        this.chat.dataObj = this.dataObj;
        this.chat.create();


        //FUNCIONES WEBSOCKETS
        isSocketOpen = true;
        connection.onopen = function (){
            console.log("Socket abierto")
            isSocketOpen = true;
        }

        connection.onclose = function (){
            console.log("Socket cerrado")
            isSocketOpen = false;
        }

        connection.onmessage = function (message){
            msg = JSON.parse(message.data);
            console.log(msg);
            updatePlayerInfo(msg); 
            
        }
        timedEventUpdateConnection = this.time.addEvent({
            delay: 33,
            callback: this.sendCharacterInfo,
            callbackScope: this,
            loop: true });
    }
    update()
    {
        this.floorTiles.update();
        //this.iker.currentPoints = this.dataObj.currentPoints;
        this.ikerP1.update();
        this.ikerP2.update();


		/*
        this.floorTiles.text.setText('Event.progress: ' + this.floorTiles.timedEvent.getProgress().toString().substring(0, 4)
          + '\nEvent.repeatCount: ' + this.floorTiles.timedEvent.repeatCount);

        this.floorTiles.text.setText('Event.progress: ' + this.floorTiles.timedEvent.getProgress().toString().substring(0, 4)
            + '\nEvent.repeatCount: ' + this.floorTiles.timedEvent.repeatCount);

		*/
		if(id==0){this.Player1.update();}
        if(id==1){this.Player2.update();}
        
        this.laserComponent.update();
        this.laserComponent2.update();
        
        getActiveUsers();
        updateActiveUsers();
        textActiveUsers.setText('Usuarios activos: ' + activeUsersNumber);
    }


    sendCharacterInfo()
    {
        let message;

        if(id == "0")
        {
			//console.log("X= " + this.Player1.player.x + " Y= " + this.Player1.player.y);
            //runes[0].currentCharacter = characters1
            message = {
                //id: id,
                animationFrame: this.Player1.player.frame.name,
                positionX: this.Player1.player.x,
                positionY: this.Player1.player.y,
                isAttacking: this.Player1.isAttacking,
                rotation:this.Player1.player.rotation*100,
            }
        }
        else if (id == "1")
        {
			//console.log("X= " + this.Player2.player.x + " Y= " + this.Player2.player.y);
            //runes[0].currentCharacter = characters2;
            message = {
                //id: id,
                animationFrame: this.Player2.player.frame.name,
                positionX: this.Player2.player.x,
                positionY: this.Player2.player.y,
                isAttacking: this.Player2.isAttacking,
                rotation:this.Player2.player.rotation*100,
            }
        }
        //console.log(message);
        //console.log("Mando? "+isSocketOpen);
        isSocketOpen=true;
        if(isSocketOpen)
        {
            //console.log("Sending");
            console.log("Data sent: rotation= " + message.rotation);
            connection.send(JSON.stringify(message))
        }
    }

}

//Funciones websockets

function updatePlayerInfo(data)
{
	console.log("Data received: rotation= " + data.rotation);
	//console.log("Data received: X= "+ data.positionX + " Y= " + data.positionY);
    if (id == "0")
    {
        //console.log("Frame Character: "+ data.frameCharacter);
        //console.log("Data received: X= "+ data.positionX + " Y= " + data.positionY);

        Jugador2.player.setFrame(data.animationFrame);
        Jugador2.player.setPosition(data.positionX,data.positionY);
        Jugador2.isAttacking=data.isAttacking;
        Jugador2.player.rotation=data.rotation/100;

    } else if (id == "1")
    {
		//console.log("Data received: X= "+ data.positionX + " Y= " + data.positionY);
        //console.log("Frame Character: "+ data.frameCharacter);

        Jugador1.player.setFrame(data.animationFrame);
        Jugador1.player.setPosition(data.positionX,data.positionY);
        Jugador1.isAttacking=data.isAttacking;
        Jugador1.player.rotation=data.rotation/100;
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
            console.log("The URL was:\n" + url + "users/"+user)
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
