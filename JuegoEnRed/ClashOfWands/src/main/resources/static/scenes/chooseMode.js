import {Button} from "../components/button.js"
let url;

let activeUsersNumber;
let activePrevUsersNumber;

let textActiveUsers;
export class ChooseMode extends Phaser.Scene
{
    constructor()
    {
        super({key: 'chooseMode'});
        this.localButton = new Button(this);
        this.onlineButton = new Button(this);
    }

    preload()
    {
        //this.load.image('mainMenu_Background', 'assets/img/background_mainMenu.png');
        this.localButton.preload();
        this.load.image('local_button', 'assets/img/buttons/local_buttonDef.png');
        this.load.image('online_button', 'assets/img/buttons/online_buttonDef.png');
        this.onlineButton.preload();
    }
	
	init(data)
    {
        this.dataObj = data;
    }
	
    create()
    {
        //Fondo
        this.add.image(960, 540, 'mainMenu_Background');

        //Creamos la instancia de cada botón
        this.backButton = new Button(this, 'mainMenu', 'backButtonCredits', 52, 45, 1, 1.25, null);
        this.clickS = this.sound.add("pulsarB");
        this.encimaS = this.sound.add("encimaB");

        this.localButton = new Button(this, 'characterSelector', 'local_button', 286, 757, 1.15, 1.40, null, null, this.dataObj);
        this.onlineButton = new Button(this, 'login', 'online_button', 1101, 757, 1.15, 1.40, null, null, this.dataObj);


        //Llamamos al create de cada uno para que se cree y muestre en la escena
        this.localButton.create();
        this.onlineButton.create();
        this.backButton.create();
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

        var scene = this;
        console.log(this.dataObj);
        this.username = this.dataObj.username;
        url = this.dataObj.url;
        activeUsersNumber = 0;
        activePrevUsersNumber = 0;
        var data = this.dataObj;
        textActiveUsers = this.add.text(50, 50, 'Usuarios activos: ' + activeUsersNumber, {
            fontFamily: 'tilesFont',
            font: (40).toString() + "px tilesFont",
            color: 'black'
        })

        let username = this.username;

        /*
        //Al cerrarse la pestaña se desconecta el usuario
        window.addEventListener('beforeunload', () =>
        {
            deleteActiveUser(username);
        });
         */

    }
    update(){

        getActiveUsers();
        updateActiveUsers();
        textActiveUsers.setText('Usuarios activos: ' + activeUsersNumber);
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
