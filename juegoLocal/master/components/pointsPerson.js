
var currentPoints;
export class PointsPerson
{
    constructor(scene,posX,posY,name, posterNumber)
    {
        this.relatedScene = scene;
        this.posX=posX;
        this.posY=posY;
        this.name=name;
        this.posterNumber = posterNumber;
        this.person;
        this.currentPoints = 0;
        this.isActive;

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

    }

    create()
    {
        this.person = this.relatedScene.add.sprite(this.posX, this.posY, this.name, 0);
        this.isActive = false;


        this.relatedScene.anims.create({
            key: this.name + 'show',
            frames: this.person.anims.generateFrameNumbers(this.name, { frames: [ 0, 1, 2, 3] }),
            frameRate: 12,
        });
        this.relatedScene.anims.create({
            key: this.name + 'hide',
            frames: this.person.anims.generateFrameNumbers(this.name, { frames: [ 4, 5, 6, 7] }),
            frameRate: 12,
        });
        var person = this.person;
        var name = this.name;
        currentPoints = this.currentPoints;
        var isActive = this.isActive;
        var posterNumber = this.posterNumber;

        this.relatedScene.input.on('pointerdown', function () {
            if (currentPoints === posterNumber) {
                person.play(name + 'show');
                isActive = true;
            }
        }, this);

        this.relatedScene.input.on('pointerup', function() {
            if(isActive) {
                person.play(name + 'hide');
                isActive = false
            }
        }, this);



    }

    update()
    {
        currentPoints = this.currentPoints;
    }

}