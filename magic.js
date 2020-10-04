class Magic extends Phaser.GameObjects.Sprite{
  constructor(scene){

    var x = scene.player.x;
    var y = scene.player.y;

    super(scene,x, y, "magic");
    scene.projectiles.add(this);

    this.play("magic_anim");
    scene.physics.world.enableBody(this);
    this.body.velocity.y = - 250;
  }

  update(){
    if(this.y < 32){
      this.destroy();
    }
  }
}
