export class Controller
{

    constructor(scene,UP,DOWN,LEFT,RIGHT)
    {
        this.relatedScene=scene;
        this.actions=Phaser.input.keyboard.addKeys({ 'UP': UP, 'DOWN': DOWN,'LEFT':LEFT,'RIGHT':RIGHT });
        /*
        this.UP=Phaser.Input.Keyboard.KeyCodes.W;
        this.DOWN=Phaser.Input.Keyboard.KeyCodes.S;
        this.LEFT=Phaser.Input.Keyboard.KeyCodes.A;
        this.RIGHT=Phaser.Input.Keyboard.KeyCodes.D;*/
    }

Preload()
{

    /*createCursorKeys: function ()
    {
        return this.addKeys({
            up: KeyCodes.UP,
            down: KeyCodes.DOWN,
            left: KeyCodes.LEFT,
            right: KeyCodes.RIGHT,
            space: KeyCodes.SPACE,
            shift: KeyCodes.SHIFT
        });
    },*/



}

create()
{
    //this.relatedScene.input.keyboard.addKeys({ 'up': Phaser.Input.Keyboard.KeyCodes.W, 'down': Phaser.Input.Keyboard.KeyCodes.S });
}










}