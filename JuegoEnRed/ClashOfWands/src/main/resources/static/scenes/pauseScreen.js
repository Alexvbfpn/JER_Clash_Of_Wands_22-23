export var PauseScreen = new Phaser.Class ({

    Extends: Phaser.Scene,

    init: function (data)
    {
        this.dataObj = data;
    },
    initialize:

        function PauseScreen ()
        {
            Phaser.Scene.call(this, { key: 'pauseScreen' });

            this.resumeButton;
            this.controlsButton;
        },


    constructor: function (scene, sound){
        //super({key: 'pauseScreen' });
        this.resumeButton;
        this.controlsButton;
        this.relatedScene = scene;
        this.sound = sound;
    },



    preload: function ()
    {
    },

    create: function ()
    {
        var data = this.dataObj;
        var graphics = this.add.graphics({fillStyle: { color: 0x000000, alpha: 0.8} });
        var square = new Phaser.Geom.Rectangle();
        square.width = square.height = 2000;
        //square.setOrigin(0, 0);
        graphics.fillRectShape(square);
        let pauseText = this.add.image(706, 136, 'pauseText').setOrigin(0, 0);
        this.resumeButton= this.add.sprite(0, 0, 'resumeButton');
        let resumeButton = this.resumeButton;
        let exitButton = this.add.sprite(0, 0, 'exitButton');
        var clickS = this.sound.add("pulsarB");
        var onS = this.sound.add("onB");
        var container = this.add.container(686 + this.resumeButton.width/2, 403 + this.resumeButton.height/2,
            [this.resumeButton]).setScale(1, 1);
        container.setSize(this.resumeButton.width, this.resumeButton.height);
        container.setInteractive();
        container.on('pointerover', function (){

            container.setScale(1.25, 1.25);
            //playButton.setTint(0x44ff44);
            if(container.active) {
                onS.play();
            }
        });

        container.on('pointerout', function (){

            container.setScale(1, 1);

        });
        var scene = this.scene;
        var relatedScene = this.relatedScene;
        container.on('pointerdown', function (){
            if(container.active) {
                clickS.play();
                scene.setActive(false, 'pauseScreen');
                scene.setVisible(false, 'pauseScreen');
                scene.resume(data.currentScene);
            }
        });

        //CONTROLES
        this.controlsButton = this.add.sprite(0, 0, 'controlsButton2');
        let controlsButton = this.controlsButton;
        let controlsImg = this.add.image(0, 0, 'controls_Background').setOrigin(0, 0).setVisible(false);
        let backButton = this.add.image(52, 45, 'backButtonCredits').setOrigin(0, 0).setVisible(false);

        backButton.setInteractive();
        var container2 = this.add.container(686 + this.controlsButton.width/2, 600 + this.controlsButton.height/2,
            [this.controlsButton]).setScale(1, 1);
        container2.setSize(this.controlsButton.width, this.controlsButton.height);
        container2.setInteractive();
        container2.on('pointerover', function (){

            container2.setScale(1.25, 1.25);
            //playButton.setTint(0x44ff44);
            if(container2.active) {
                onS.play();
            }
        });

        container2.on('pointerout', function (){

            container2.setScale(1, 1);

        });

        container2.on('pointerdown', function (){
            clickS.play();
            container2.setVisible(false);
            controlsImg.setVisible(true);
            backButton.setVisible(true);
            container2.setActive(false);
            container.setActive(false);
            resumeButton.setActive(false);

            controlsButton.setActive(false);
            exitButton.setActive(false);
            container3.setVisible(false);
            container3.setActive(false);

            //scene.setActive(false, 'pauseScreen');
            //scene.setVisible(false, 'pauseScreen');
        });
        backButton.on('pointerover', function (){

            backButton.setScale(1.15, 1.15);
            //playButton.setTint(0x44ff44);
            onS.play();
        });

        backButton.on('pointerout', function (){

            backButton.setScale(1, 1);

        });

        backButton.on('pointerdown', function (){
            clickS.play();
            controlsImg.setVisible(false);
            backButton.setVisible(false);
            backButton.setActive(false);
            container2.setVisible(true);
            scene.setActive(true, 'pauseScreen');
            scene.setVisible(true, 'pauseScreen');
            container2.setActive(true);
            container.setActive(true);
            resumeButton.setActive(true);
            controlsButton.setActive(true);
            exitButton.setActive(true);
            container3.setVisible(true);
            container3.setActive(true);

        });

        var container3 = this.add.container(686 + exitButton.width/2, 797 + exitButton.height/2,
            [exitButton]).setScale(1, 1);
        container3.setSize(exitButton.width, exitButton.height);
        container3.setInteractive();
        container3.on('pointerover', function (){

            container3.setScale(1.25, 1.25);
            //playButton.setTint(0x44ff44);
            if(container3.active) {
                onS.play();
            }
        });

        container3.on('pointerout', function (){

            container3.setScale(1, 1);

        });
        let sound = this.sound;
        container3.on('pointerdown', function (){
            clickS.play();
            if(data.crowdSound != null)
            {
                data.crowdSound.stop();
            }
            if(data.music != null)
            {
                data.music.stop();
            }
            //sound.stop();
            console.log(data.currentScene);
            scene.stop(data.currentScene);
            scene.start('mainMenu');
            /*
            container3.setVisible(false);
            controlsImg.setVisible(true);
            backButton.setVisible(true);
            container3.setActive(false);
            container.setActive(false);
            resumeButton.setActive(false);
            controlsButton.setActive(false);

             */
            //scene.setActive(false, 'pauseScreen');
            //scene.setVisible(false, 'pauseScreen');
        });
    },

    update: function ()
    {

    }

})
