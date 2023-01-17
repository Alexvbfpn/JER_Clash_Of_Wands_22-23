import {OnlineFloorTiles} from "../components/onlineFloorTiles.js";
import {PointsPerson} from "../components/pointsPerson.js";
import {Player} from "../components/Player.js";
import {Controller} from "../components/Controller.js";
import {LaserObs} from "../components/laserComponent.js";
import {Chat} from "../components/chat.js";
var scene;
let url;

let activeUsersNumber;
let activePrevUsersNumber;

let textActiveUsers;

var Jugador1=new Player(475,275,1);
var Jugador2=new Player(1425,915,2);
var Casillas= new OnlineFloorTiles(this, 2);
var once = true;

var id;
var connection;
var isSocketOpen = false;
var timedEventUpdateConection;
let msg;
var rivalReady;
var ready;
var dataObj;
let rivalOut = false;
let outCount = 4;
let alert;
var username;
export class MatchOnline extends Phaser.Scene
{
    constructor()
    {
        super({key: 'MatchOnline'});
        this.escena=this;
        Casillas.relatedScene=this.escena;
        this.floorTiles=Casillas;

        this.ikerP1 = new PointsPerson(this, 135, 201, 'iker',1);
        this.ikerP2 = new PointsPerson(this, 1686, 201, 'iker2',1);

        this.Controller1=new Controller(this);
        this.Controller2=new Controller(this);
        this.Controller3=new Controller(this);
		
		Jugador1.relatedScene=this.escena;
		Jugador2.relatedScene=this.escena;
		
		Jugador1.Controller=this.Controller1;
		Jugador2.Controller=this.Controller2;

        this.Player1=Jugador1;
        this.Player2=Jugador2;


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
        this.chat.preload();


    }

    create()
    {
		//Control de usuarios
		this.username = this.dataObj.username;
        username = this.username;
        url = this.dataObj.url;
        activeUsersNumber = 0;
        activePrevUsersNumber = 0;

        this.Controller1.create(Phaser.Input.Keyboard.KeyCodes.W,Phaser.Input.Keyboard.KeyCodes.S,Phaser.Input.Keyboard.KeyCodes.A,Phaser.Input.Keyboard.KeyCodes.D,Phaser.Input.Keyboard.KeyCodes.X,Phaser.Input.Keyboard.KeyCodes.E,Phaser.Input.Keyboard.KeyCodes.Q)
        this.Controller2.create(Phaser.Input.Keyboard.KeyCodes.I,Phaser.Input.Keyboard.KeyCodes.K,Phaser.Input.Keyboard.KeyCodes.J,Phaser.Input.Keyboard.KeyCodes.L,Phaser.Input.Keyboard.KeyCodes.M,Phaser.Input.Keyboard.KeyCodes.O,Phaser.Input.Keyboard.KeyCodes.U)
        this.Controller3.create(Phaser.Input.Gamepad.Configs.DUALSHOCK_4.UP,Phaser.Input.Gamepad.Configs.DUALSHOCK_4.DOWN,Phaser.Input.Gamepad.Configs.DUALSHOCK_4.LEFT,Phaser.Input.Gamepad.Configs.DUALSHOCK_4.RIGHT,Phaser.Input.Gamepad.Configs.DUALSHOCK_4.SQUARE,Phaser.Input.Gamepad.Configs.DUALSHOCK_4.R1,Phaser.Input.Gamepad.Configs.DUALSHOCK_4.L1)
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
       	this.Player1.player.setPosition(475,275);
       	this.Player2.player.setPosition(1425,915);
       	this.Player1.player.setFrame(0);
       	this.Player2.player.setFrame(0);
        this.Player2.player.angle = -180;

        this.floorTiles.id=id;
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

		//Al cerrarse la pestaña se desconecta el usuario
		window.addEventListener('beforeunload', () =>
        {
			
            deleteActiveUser(username);
            
        });
        
        // ------------CHAT-----------------

        scene = this.scene;
        this.chat.dataObj = this.dataObj;
        this.chat.create();

        //FUNCIONES WEBSOCKETS
        //isSocketOpen = true;
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

            updatePlayerInfo(msg); 
            
        }
        timedEventUpdateConection = this.time.addEvent({
            delay: 13,
            callback: this.sendCharacterInfo,
            callbackScope: this,
            loop: true });
        dataObj = this.dataObj;

        this.outEvent = this.time.addEvent({delay: 1000, callback: rivalDisconnect, callbackScope: this, loop: true});
        alert = this.add.image(0, 0, 'outWindow').setOrigin(0, 0);
        alert.setVisible(false);
    }
    update()
    {
        dataObj = this.dataObj;
        this.floorTiles.update();
        //this.iker.currentPoints = this.dataObj.currentPoints;
        this.ikerP1.update();
        this.ikerP2.update();

		if(id==0)
		{
            this.Player1.update();
            if(this.Player2.type!=null && once)
            {
                once= false;
		    }
            if(dataObj.player1Data.points === 3)
            {
                ready = true;
            }
		}
		
        if(id==1)
        {
            this.Player2.update();
            if(this.Player1.type!=null && once)
            {

                once= false;
		    }
            if(dataObj.player2Data.points === 3)
            {
                ready = true;
            }
		}
        
        if((dataObj.player1Data.points >= 3 || dataObj.player2Data.points >= 3))
        {
            if((dataObj.player1Data.wins > 0 && dataObj.player1Data.points >= 3))
            {
                this.scene.start('onlineFinalScene', this.dataObj);
            } else if (dataObj.player2Data.wins > 0 && dataObj.player2Data.points >= 3)
            {
                this.scene.start('onlineFinalScene', this.dataObj);
            } else {
                this.scene.start('midSceneOnline', this.dataObj);
            }

        }
        this.laserComponent.update();
        this.laserComponent2.update();
        
        getActiveUsers();
        updateActiveUsers();
        textActiveUsers.setText('Usuarios activos: ' + activeUsersNumber);
        this.floorTiles.rivalReady = rivalReady;
        if(outCount <= 0)
        {
            this.scene.start('mainMenu');
        }

    }


    sendCharacterInfo()
    {
        let message;

        if(id == "0")
        {
            message = {
                //id: id,
                animationFrame: this.Player1.player.frame.name,
                positionX: this.Player1.player.x,
                positionY: this.Player1.player.y,
                isAttacking: this.Player1.isAttacking,
                rotation:this.Player1.player.rotation*100,
                ready: true,
                type: this.Player1.type,
                Lready: ready,
                cell0: this.floorTiles.tilesArray[0][0].value,
                cell1: this.floorTiles.tilesArray[0][1].value,
                cell2: this.floorTiles.tilesArray[0][2].value,
                cell3: this.floorTiles.tilesArray[1][0].value,
                cell4: this.floorTiles.tilesArray[1][1].value,
                cell5: this.floorTiles.tilesArray[1][2].value,

                pointsP1: this.dataObj.player1Data.points,
                pointsP2: this.dataObj.player2Data.points,
            }
        }
        else if (id == "1")
        {
            message = {
                //id: id,
                animationFrame: this.Player2.player.frame.name,
                positionX: this.Player2.player.x,
                positionY: this.Player2.player.y,
                isAttacking: this.Player2.isAttacking,
                rotation:this.Player2.player.rotation*100,
                ready: true,
                Lready: ready,
                type: this.Player2.type,
                pointsP1: this.dataObj.player1Data.points,
                pointsP2: this.dataObj.player2Data.points,
            }
        }
        isSocketOpen=true;
        if(isSocketOpen)
        {
            connection.send(JSON.stringify(message))
        }
    }

}

function rivalDisconnect()
{
    if(rivalOut)
    {
        outCount--;
    }
    if(outCount === 3)
    {
        deleteActiveUser(username);
        alert.setVisible(true);
    }

}

//Funciones websockets

function updatePlayerInfo(data)
{

    if (id == "0")
    {
        Jugador2.player.setFrame(data.animationFrame);
        Jugador2.player.setPosition(data.positionX,data.positionY);
        Jugador2.isAttacking=data.isAttacking;
        Jugador2.player.rotation=data.rotation/100;
        rivalReady = data.Lready;
        if(data.pointsP1 >= 3 || data.pointsP2 >=3)
        {
            dataObj.player1Data.points = data.pointsP1;
            dataObj.player2Data.points = data.pointsP2;
        }
        //Jugador2.type=data.type;

    } else if (id == "1")
    {
        Jugador1.player.setFrame(data.animationFrame);
        Jugador1.player.setPosition(data.positionX,data.positionY);
        Jugador1.isAttacking=data.isAttacking;
        Jugador1.player.rotation=data.rotation/100;
        rivalReady = data.Lready;
        if(data.cell0!=null)
        {
            Casillas.tilesArray[0][0].value=data.cell0;
            Casillas.tilesArray[0][1].value=data.cell1;
            Casillas.tilesArray[0][2].value=data.cell2;
            Casillas.tilesArray[1][0].value=data.cell3;
            Casillas.tilesArray[1][1].value=data.cell4;
            Casillas.tilesArray[1][2].value=data.cell5;
            dataObj.player1Data.points = data.pointsP1;
            dataObj.player2Data.points = data.pointsP2;
        }
    }
}



function updateActiveUsers(){
    
    if(activePrevUsersNumber != activeUsersNumber)
    {
        if(activePrevUsersNumber < activeUsersNumber){
            console.log("Se ha conectado alguien. El número actual de usuarios es: " + activeUsersNumber);
        }else if(activePrevUsersNumber > activeUsersNumber){
            rivalOut = true;
            //scene.start('mainMenu');
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
