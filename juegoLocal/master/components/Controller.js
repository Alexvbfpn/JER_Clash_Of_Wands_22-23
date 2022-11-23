export class Controller
{

    constructor(scene)
    {
        this.relatedScene=scene;
        this.WKey;
        this.AKey;
        this.SKey;
        this.DKey;

        this.up;
        this.down;
        this.right;
        this.left;
    }

Preload()
{




}

create()
{

    this.WKey=this.relatedScene.input.keyboard.addKey(Phaser.input.keyboard.keyCodes.W);
    this.AKey=this.relatedScene.input.keyboard.addKey(Phaser.input.keyboard.keyCodes.A);
    this.SKey=this.relatedScene.input.keyboard.addKey(Phaser.input.keyboard.keyCodes.S);
    this.DKey=this.relatedScene.input.keyboard.addKey(Phaser.input.keyboard.keyCodes.D);

    this.up=this.relatedScene.input.keyboard.addKey(Phaser.input.keyboard.keyCodes.UP);
    this.down=this.relatedScene.input.keyboard.addKey(Phaser.input.keyboard.keyCodes.DOWN);
    this.right=this.relatedScene.input.keyboard.addKey(Phaser.input.keyboard.keyCodes.RIGHT);
    this.left=this.relatedScene.input.keyboard.addKey(Phaser.input.keyboard.keyCodes.LEFT);

}










}