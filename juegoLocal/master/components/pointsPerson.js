
var currentPoints;
export class PointsPerson
{
    constructor(scene,posX,posY,name, posterNumber, relativePlayer)
    {
        this.relatedScene = scene;
        this.posX=posX;
        this.posY=posY;
        this.name=name;
        this.posterNumber = posterNumber;
        this.person;
        this.currentPoints = 0;
        this.isActive;
        this.relativePlayer = relativePlayer;

    }

    preload()
    {
        this.relatedScene.load.spritesheet('iker', 'assets/img/match/spriteSheet_OnePoint.png', {
            frameWidth: 102,
            frameHeight: 105
        });
        this.relatedScene.load.spritesheet('carva', 'assets/img/match/spriteSheet_TwoPoints.png', {
            frameWidth: 102,
            frameHeight: 105
        });
        this.relatedScene.load.spritesheet('pepe', 'assets/img/match/spriteSheet_ThreePoints.png', {
            frameWidth: 102,
            frameHeight: 105
        });
        //Separamos los scorers del p2
        this.relatedScene.load.spritesheet('iker2', 'assets/img/match/spriteSheet_OnePoint.png', {
            frameWidth: 102,
            frameHeight: 105
        });
        this.relatedScene.load.spritesheet('carva2', 'assets/img/match/spriteSheet_TwoPoints.png', {
            frameWidth: 102,
            frameHeight: 105
        });
        this.relatedScene.load.spritesheet('pepe2', 'assets/img/match/spriteSheet_ThreePoints.png', {
            frameWidth: 102,
            frameHeight: 105
        });

    }

    create()
    {
        this.person = this.relatedScene.add.sprite(this.posX, this.posY, this.name, 0).setOrigin(0, 0);
        this.isActive = false;


        this.relatedScene.anims.create({
            key: this.name + this.relativePlayer + 'show',
            frames: this.person.anims.generateFrameNumbers(this.name, { frames: [ 0, 1, 2, 3] }),
            frameRate: 12,
        });
        this.relatedScene.anims.create({
            key: this.name + this.relativePlayer + 'hide',
            frames: this.person.anims.generateFrameNumbers(this.name, { frames: [ 4, 5, 6, 7] }),
            frameRate: 12,
        });
        var person = this.person;
        var name = this.name;
        //currentPoints = this.currentPoints;
        currentPoints = this.relativePlayer.points;

        var isActive = this.isActive;
        var posterNumber = this.posterNumber;
        var relativePlayer = this.relativePlayer;


        this.relatedScene.input.on('pointerdown', function () {
            if (relativePlayer.points === posterNumber) {
                person.play(name + relativePlayer + 'show');
                isActive = true;
            }
        }, this);

        this.relatedScene.input.on('pointerup', function() {
            if(isActive) {
                person.play(name + relativePlayer + 'hide');
                isActive = false
            }
        }, this);



    }

    update()
    {
        currentPoints = this.relativePlayer.points;
    }

}