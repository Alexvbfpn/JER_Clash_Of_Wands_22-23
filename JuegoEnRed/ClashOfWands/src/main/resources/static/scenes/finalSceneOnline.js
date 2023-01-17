import {Button} from "../components/button.js"
import {FinalDisplay} from "../components/finalDisplay.js";
import {Chat} from "../components/chat.js";

let url;

let activeUsersNumber;
let activePrevUsersNumber;

let textActiveUsers;

export class OnlineFinalScene extends Phaser.Scene
{
    constructor()
    {
        super({key: 'onlineFinalScene'});
        this.display = new FinalDisplay(this)
        this.chat = new Chat(this);
    }

    init(data)
    {
        this.dataObj = data;
    }

    preload()
    {
        this.display.preload()
        this.load.audio("winSound", 'assets/sound/winSound.wav');
        this.chat.preload();
    }

    create()
    {
        //Control de usuarios
        this.username = this.dataObj.username;
        url = this.dataObj.url;
        activeUsersNumber = 0;
        activePrevUsersNumber = 0;
        var username = this.username;
        //Fondo
        /*
        this.add.sprite(0, 0, 'midScene_Background').setOrigin(0, 0);
        this.add.sprite(161, 109, 'midScene_Text').setOrigin(0, 0);
         */

        var winner = this.dataObj.player1Data.points === 3 ? this.dataObj.player1Data : this.dataObj.player2Data;
        var types = ['Azul', 'Rojo', 'Amarillo', 'Verde'];
        this.display.type = types.indexOf(winner.type);
        this.display.winner = winner.id;
        this.winSound = this.sound.add("winSound");
        this.winSound.play();

        this.display.create();
        this.dataObj.music.stop();
        this.dataObj.crowdSound.stop();

        var exitButton = this.add.image(697, 868, 'exitButton').setOrigin(0, 0);
        exitButton.setScale(1.15);
        exitButton.setInteractive();
        var scene = this.scene
        exitButton.on('pointerdown', function ()
        {

            exitButton.setVisible(false);
            deleteActiveUser(username);
            scene.start('mainMenu');

        });

        exitButton.on('pointerover', function (){

            exitButton.setScale(1.40);

        });

        exitButton.on('pointerout', function (){

            exitButton.setScale(1.15);
        });

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
    }

    update()
    {
        getActiveUsers();
        updateActiveUsers();
        textActiveUsers.setText('Usuarios activos: ' + activeUsersNumber);
    }
}
function updateActiveUsers(){

    if(activePrevUsersNumber != activeUsersNumber)
    {
        if(activePrevUsersNumber < activeUsersNumber){
            console.log("Se ha conectado alguien. El número actual de usuarios es: " + activeUsersNumber);

        }else if(activePrevUsersNumber > activeUsersNumber){

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
