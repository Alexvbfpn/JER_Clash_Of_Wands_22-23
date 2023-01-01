import {Chat} from "../components/chat.js";
let url;
var maxUsersReady = 2;
let activeUsersNumber;
let activePrevUsersNumber;
var data;
let textActiveUsers;
var id;
let usersReady = 0;
var countdown = 10;
var countdownText;
var waitText;

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
    }

    create()
    {
        var scene = this;
        this.username = this.dataObj.username;
        url = this.dataObj.url;
        activeUsersNumber = 0;
        activePrevUsersNumber = 0;
        var onlineUsers;
        var connection;
        countdown = 5;
        let username = this.username;

        //Fondo
        this.add.image(960, 540, 'lobby_background');

        data = this.dataObj;

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
        //Atributos de la conexión
        connection.onerror = function(e){
            console.log("WS error: " + e);
        }

        connection.onclose = function(){
            deleteActiveUser(username);
            console.log("Closing socket.");

        }

        if (activeUsersNumber < 2)
        {
            waitText = this.add.image(312, 889, 'waitingText').setOrigin(0, 0);
            /*
            waitText = this.add.text(400, 200, 'Esperando a que un rival se conecte, espere por favor', {
                fontFamily: 'tilesFont',
                font: (40).toString() + "px tilesFont",
                color: 'black'});
                */

        }
        countdownText = this.add.text(900, 250, "", {
            fontFamily: 'tilesFont',
            font: (300).toString() + "px tilesFont",
            color: 'white'});
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
        this.tweens.add({
            targets: waitText,
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

    }

    update(){
        console.log("Countdown: " + countdown);
        console.log("Users Ready: " + usersReady);
        getActiveUsers();
        updateActiveUsers();
        textActiveUsers.setText('Usuarios activos: ' + activeUsersNumber);
        //countdownText.setText(countdown);
        if(activeUsersNumber === 1)
        {
            id = 0;
        } else if (activeUsersNumber === 2 && id==null)
        {
            id = 1;

        }

        if(activeUsersNumber == maxUsersReady)
        {
            usersReady++;
        }

        if(usersReady === 1)
        {
            this.rivalFoundText = this.add.image(357, 804, 'foundText').setOrigin(0, 0);
            /*
            this.rivalFoundText = this.add.text(500, 200, 'Se ha encontrado un rival, preparando el ring...', {
                fontFamily: 'tilesFont',
                font: (20).toString() + "px tilesFont",
                color: 'black'}).setScale(2);

             */
            waitText.setVisible(false);
        }
        if (countdown <= 0)
        {
            this.dataObj.playerId = id;
            console.log("ID: " + id);
            this.scene.start("onlineCharacterSelector", this.dataObj);
        }
    }

}

function countdownFunction()
{
    if(usersReady >1)
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



