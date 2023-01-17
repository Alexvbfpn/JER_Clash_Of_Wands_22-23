import {Button} from "../components/button.js"
import {MidDisplay} from "../components/midDisplay.js";
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
var countdown = 3;
var countdownText;
var stateText;
var playerText;
var continueButton;
var playerReady = false;
var rivalReady = false;
var isSocketOpen = false;
var timedEventUpdateConnection;


export class MidSceneOnline extends Phaser.Scene
{
    constructor()
    {
        super({key: 'midSceneOnline'});
        this.display = new MidDisplay(this)
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
        this.display.preload()
        this.chat.preload();
    }

    create()
    {
        //Control de usuarios
        playerReady = false;
        rivalReady = false;
        this.username = this.dataObj.username;
        url = this.dataObj.url;
        activeUsersNumber = 0;
        activePrevUsersNumber = 0;
        countdown = 3;
        var username = this.username;
        //Fondo
        /*
        this.add.sprite(0, 0, 'midScene_Background').setOrigin(0, 0);
        this.add.sprite(161, 109, 'midScene_Text').setOrigin(0, 0);
         */

        var winner = this.dataObj.player1Data.points >= 3 ? this.dataObj.player1Data : this.dataObj.player2Data;
        var types = ['Azul', 'Rojo', 'Amarillo', 'Verde'];
        winner.wins++;
        this.display.type = types.indexOf(winner.type);
        this.display.winner = winner.id;

        this.display.create();
        let continueButton = this.add.image(697, 858, 'continueButton').setOrigin(0,0);
        continueButton.setScale(1.15);
        continueButton.setInteractive();

        continueButton.on('pointerdown', function ()
        {

            continueButton.setVisible(false);
            playerReady = true;
            //console.log("PlayerReady: " + playerReady);
            //console.log("RivalReady: " + rivalReady);
            if(playerReady && rivalReady)
            {

                //scene.scene.start('match', generalData);
            }

        });

        continueButton.on('pointerover', function (){

            continueButton.setScale(1.40);

        });

        continueButton.on('pointerout', function (){

            continueButton.setScale(1.15);
        });

        this.dataObj.player1Data.points = 0;
        this.dataObj.player2Data.points = 0;

        this.countdownEvent = this.time.addEvent({delay: 1000, callback: countdownFunction, callbackScope: this, loop: true});
        // USUARIOS Y CHAT
        textActiveUsers = this.add.text(50, 30, 'Usuarios activos: ' + activeUsersNumber, {
            fontFamily: 'tilesFont',
            font: (40).toString() + "px tilesFont",
            color: 'black'
        });

        //Al cerrarse la pestaña se desconecta el usuario
        window.addEventListener('beforeunload', () =>
        {
            deleteActiveUser(username);
        });

        // ------------CHAT-----------------
        this.chat.dataObj = this.dataObj;
        this.chat.create();

        countdownText = this.add.text(900, 250, "", {
            fontFamily: 'tilesFont',
            font: (300).toString() + "px tilesFont",
            color: 'white'});

        isSocketOpen = true;
        console.log(connection);
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
    update()
    {
        getActiveUsers();
        updateActiveUsers();
        textActiveUsers.setText('Usuarios activos: ' + activeUsersNumber);
        if (countdown <= 0)
        {
            this.dataObj.playerId = id;
            //console.log("ID: " + id);
            this.scene.start("MatchOnline", this.dataObj);
        }
    }

    sendCharacterInfo()
    {
        let message;
        message = {
            id: id,
            ready: playerReady,
            Lready: true,
            visibleCharacter: null,
            frameCharacter: null,
            text: null,
            type: null,
        }


        //console.log(message);
        if(isSocketOpen && (activeUsersNumber == 2))
        {
            //console.log("Sending");
            connection.send(JSON.stringify(message))
        }
    }
}

function updatePlayerInfo(data)
{
    //console.log("Rival listo: " + data.Lready);
    console.log("rivalReady : " + data.ready);
    rivalReady = data.ready;
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