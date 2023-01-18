
var url, activeUsersNumber, activePrevUsersNumber;

export class Chat
{
    constructor(scene, dataObj) {
        this.relatedScene = scene;
        this.dataObj = dataObj;
    }
    preload()
    {

    }
    create()
    {
        this.username = this.dataObj.username;
        url = this.dataObj.url;
        activeUsersNumber = 0;
        activePrevUsersNumber = 0;
        var scene = this.relatedScene;
        let username = this.username;

        setInterval (getMessage, 2500); // Recarga los mensajes cada 2 segundos y medio

        // ------------CHAT-----------------
        var chat = this.relatedScene.add.dom(1400, -280).createFromCache('chat');
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

    update()
    {

    }

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