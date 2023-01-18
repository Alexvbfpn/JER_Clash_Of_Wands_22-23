
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
        this.scorer =
            {
                sprite: this.person,
                isActive: this.isActive,
                name: this.name,
                posterNumber: this.posterNumber,
                relativePlayer: this.relativePlayer
            };


        var person = this.person;
        var name = this.name;
        //currentPoints = this.currentPoints;
        currentPoints = this.relativePlayer.points;

        var isActive = this.isActive;
        var posterNumber = this.posterNumber;
        var relativePlayer = this.relativePlayer;


        this.relatedScene.input.on('pointerdown', function () {

        }, this);

        this.relatedScene.input.on('pointerup', function() {
            if(isActive) {
                //person.play(name + relativePlayer + 'hide');
                isActive = false
            }
        }, this);

        if (this.scorer.relativePlayer.points === this.scorer.posterNumber) {
            this.scorer.sprite.play(this.name + relativePlayer + 'show');
            this.scorer.isActive = true;
        }
        if(this.scorer.isActive && relativePlayer.points != posterNumber)
        {
            this.scorer.sprite.play(name + relativePlayer + 'hide');
            this.scorer.isActive = false
        }


    }

    update()
    {
        this.scorer.relativePlayer.points = this.relativePlayer.points;

    }

}