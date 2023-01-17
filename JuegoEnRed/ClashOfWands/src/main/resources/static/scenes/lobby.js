import {Chat} from "../components/chat.js";
let url;
var maxUsersReady = 2;
let activeUsersNumber;
let activePrevUsersNumber;
var data;
let textActiveUsers;
var id;
var connection;
let usersReady = 0;
var countdown = 10;
var countdownText;
var stateText;
var playerText;
var confirm_button;
var playerReady = false;
var rivalReady = false;
var isSocketOpen = false;
var timedEventUpdateConnection;

export class Lobby extends Phaser.Scene
{
    constructor()
    {
        super({key: 'lobby'});
        this.chat = new Chat(this);
    }

    init(data)
    {
        this.dataObj = data;
    }

    preload()
    {
        this.chat.preload();
        this.load.image('lobby_background', 'assets/img/lobby/background_lobby.png');
        this.load.image('waitingText', 'assets/img/lobby/waitingText.png');
        this.load.image('foundText', 'assets/img/lobby/findText.png');
        this.load.image('confirm_button', 'assets/img/characterSelector/confirm_button.png');
        this.load.spritesheet('player_texts', 'assets/img/lobby/player_text.png', {
            frameWidth: 512,
            frameHeight: 80
        })
        this.load.spritesheet('states_texts','assets/img/lobby/spritesheet_lobby.png' , {
            frameWidth: 1304,
            frameHeight: 248
        })

    }

    create()
    {
        id = null;
        playerReady = false;
        rivalReady = false;
        var scene = this;
        this.username = this.dataObj.username;
        url = this.dataObj.url;
        activeUsersNumber = 0;
        activePrevUsersNumber = 0;

        countdown = 5;
        let username = this.username;

        //Fondo
        this.add.image(960, 540, 'lobby_background');

        data = this.dataObj;

        if(activeUsersNumber === 1)
        {
            id = 0;
            playerText.setFrame(0);
        } else if (activeUsersNumber === 2 && id==null)
        {
            id = 1;
            playerText.setFrame(1);
        }

        //Botón de confirmación
        //confirm_button = this.add.image(140, 908, 'confirm_button').setOrigin(0, 0);
        confirm_button = this.add.image(900, 508, 'confirm_button').setOrigin(0, 0);
        confirm_button.setInteractive()
        confirm_button.visible = false;

        confirm_button.on('pointerdown', function ()
        {
            console.log()
            confirm_button.setVisible(false);
            playerReady = true;
            console.log("PlayerReady: " + playerReady);
            console.log("RivalReady: " + rivalReady);
            if(playerReady && rivalReady)
            {
                stateText.setFrame(2);
                stateText.setPosition(357, 889);
                //scene.scene.start('match', generalData);
            }

        });

        confirm_button.on('pointerover', function (){

            confirm_button.setTint(0x2BA32B);

        });

        confirm_button.on('pointerout', function (){

            confirm_button.clearTint();
        });

        //----------CHAT---------
        this.chat.dataObj = this.dataObj;
        this.chat.create();



        // ------------WEBSOCKETS--------------
        console.log(url);
        var wsURL = url.replace("http://", "");

        if(connection == null || connection == undefined)
        {
            connection = new WebSocket("ws://"+ wsURL + "echo");
            this.dataObj.connection = connection;
        }
        console.log("Ws URL: \n" + wsURL + "echo");
        textActiveUsers = this.add.text(50, 50, 'Usuarios activos: ' + activeUsersNumber, {
            fontFamily: 'tilesFont',
            font: (40).toString() + "px tilesFont",
            color: 'black'
        })

        //stateText = this.add.sprite(312, 889, 'states_text', 0).setOrigin(0, 0);
        if (activeUsersNumber < 2)
        {
            stateText = this.add.sprite(312, 889, 'states_texts', 0).setOrigin(0, 0);
        }


        countdownText = this.add.text(900, 250, "", {
            fontFamily: 'tilesFont',
            font: (300).toString() + "px tilesFont",
            color: 'white'});

        this.tweens.add({
            targets: stateText,
            alpha: 0.2,
            duration: 1400,
            ease: 'Sine.easeOut',
            yoyo: true,
            repeat: -1
        });
        // PRUEBA DE CHAT

        //Al cerrarse la pestaña se desconecta el usuario

        window.addEventListener('beforeunload', () =>
        {
            deleteActiveUser(username);
        });

        this.countdownEvent = this.time.addEvent({delay: 1000, callback: countdownFunction, callbackScope: this, loop: true});



        playerText = this.add.sprite(712, 100, 'player_texts', 0).setOrigin(0, 0);
        if(id === 0)
        {
            playerText.setFrame(0);
            playerText.setScale(1, 1);
        } else if(id == 1)
        {
            playerText.setFrame(1);
            playerText.setScale(1, 1);
        }

        //Atributos de la conexión

        connection.onopen = function (){
            isSocketOpen = true;
            console.log("Socket abierto")

        }

        connection.onclose = function(){
            deleteActiveUser(username);
            isSocketOpen = false;
            console.log("Closing socket.");
        }

        connection.onmessage = function (message){
            let msg = JSON.parse(message.data);
            updatePlayerInfo(msg);
        }

        timedEventUpdateConnection = this.time.addEvent({
            delay: 13,
            callback: this.sendCharacterInfo,
            callbackScope: this,
            loop: true });

    }

    update(){
        //console.log("Countdown: " + countdown);
        //console.log("Users Ready: " + usersReady);
        getActiveUsers();
        updateActiveUsers();
        textActiveUsers.setText('Usuarios activos: ' + activeUsersNumber);
        //countdownText.setText(countdown);
        if(activeUsersNumber === 1)
        {
            id = 0;
            playerText.setFrame(0);
        } else if (activeUsersNumber === 2 && id==null)
        {
            id = 1;
            playerText.setFrame(1);
        }

        if(activeUsersNumber == maxUsersReady)
        {
            usersReady++;
            if(playerReady && rivalReady)
            {
                stateText.setPosition(357, 889);
                stateText.setFrame(2);
            }
        }

        if(usersReady === 1)
        {
            //this.rivalFoundText = this.add.image(357, 804, 'foundText').setOrigin(0, 0);
            confirm_button.setVisible(true);
            /*
            this.rivalFoundText = this.add.text(500, 200, 'Se ha encontrado un rival, preparando el ring...', {
                fontFamily: 'tilesFont',
                font: (20).toString() + "px tilesFont",
                color: 'black'}).setScale(2);

             */
            stateText.setPosition(357, 804);
            stateText.setFrame(1);

        }

        if (countdown <= 0)
        {
            this.dataObj.playerId = id;
            console.log("ID: " + id);
            this.scene.start("onlineCharacterSelector", this.dataObj);
        }
    }

    sendCharacterInfo()
    {
        let message;

        message = {
            Lready: playerReady,
        }


        console.log(message);
        if(isSocketOpen && (activeUsersNumber == 2))
        {
            //console.log("Sending");
            connection.send(JSON.stringify(message))
        }
    }

}

function updatePlayerInfo(data)
{
    console.log("Rival listo: " + data.Lready);
    rivalReady = data.Lready;
}

function countdownFunction()
{
    if(playerReady && rivalReady)
    {
        countdown--;
        countdownText.text = countdown.toString();
    }

}


function updateActiveUsers(){

    if(activePrevUsersNumber != activeUsersNumber)
    {
        if(activePrevUsersNumber < activeUsersNumber){
            console.log("Se ha conectado alguien. El número actual de usuarios es: " + activeUsersNumber);
            //sendMessage('Alguien', 'se ha conectado, ¡viene con ganas de pelea!');
        }else if(activePrevUsersNumber > activeUsersNumber){
            //sendMessage('Alguien', 'se ha desconectado, un cobarde menos');
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
            console.log("The URL was:\n" + url + "users/" + user)
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



