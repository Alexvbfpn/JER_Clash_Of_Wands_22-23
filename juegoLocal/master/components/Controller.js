export class Controller
{

    constructor(scene)
    {
        this.relatedScene=scene;
        this.actions;
    }

    Preload()
    {

    }

    create(UP,DOWN,LEFT,RIGHT,ATTACK)
    {
        this.actions=this.relatedScene.input.keyboard.addKeys({ 'UP': UP, 'DOWN': DOWN,'LEFT':LEFT,'RIGHT':RIGHT, 'ATTACK':ATTACK});
    }

}