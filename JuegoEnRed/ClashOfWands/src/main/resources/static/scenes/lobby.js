import {Button} from "../components/button.js"

let url;

let activeUsersNumber;
let activePrevUsersNumber;

let textActiveUsers;

export class Lobby extends Phaser.Scene
{
    constructor()
    {
        super({key: 'mainMenu'});

    }

    init(data)
    {
        this.dataObj = data;
    }

    preload()
    {

    }

    create()
    {
        var scene = this;
        this.username = this.dataObj.username;
        url = this.dataObj.url;
        activeUsersNumber = 0;
        activePrevUsersNumber = 0;
        //Fondo
        this.add.image(960, 540, 'mainMenu_Background');
        this.input.setDefaultCursor('url(assets/img/mainMenu/cursor.cur), pointer');

        //Creamos la instancia de cada botón
        var data = this.dataObj;


        //Llamamos al create de cada uno para que se cree y muestre en la escena
        //this.playButton.create();
        this.creditsButton.create();
        this.tutorialButton.create();


        let text = this.add.text(-100, -100, '0', {
            fontFamily: 'tilesFont',
            font: (1).toString() + "px tilesFont",
            //fontWeight: "bold",
            color: '#32023a'
        });

        textActiveUsers = this.add.text(50, 50, 'Usuarios activos: ' + activeUsersNumber, {
            fontFamily: 'tilesFont',
            font: (40).toString() + "px tilesFont",
            color: 'black'
        })

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
        console.log(activeUsersNumber);
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


