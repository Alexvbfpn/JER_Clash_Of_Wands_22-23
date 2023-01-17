import {Button} from "../components/button.js"
let url;

let activeUsersNumber;
let activePrevUsersNumber;

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
        this.localButton.preload();

        //this.onlineButton.preload();
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
        //this.onlineButton = new Button(this, 'login', 'online_button', 1101, 757, 1.15, 1.40, null, null, this.dataObj);
		this.onlineButton = this.add.image(1101, 755,'onlineBlock_button').setOrigin(0,0).setScale(1.15,1.15);

        //Llamamos al create de cada uno para que se cree y muestre en la escena
        this.localButton.create();
        //this.onlineButton.create();
        this.backButton.create();


        console.log(this.dataObj);
        this.username = this.dataObj.username;
        url = this.dataObj.url;

    }
    update(){

    }
}
