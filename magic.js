class Magic extends Phaser.GameObjects.Sprite{
  constructor(scene){

    var x = scene.player.x;
    var y = scene.player.y;

    super(scene, x, y, "magic");
    scene.add.existing(this);

    this.play("magic_anim");
    // this.setScale(100000);
    scene.physics.world.enableBody(this);
    this.body.velocity.x = - 250;

    scene.projectiles.add(this);
  }

  update(){
    if(this.x < -20){
      this.destroy();
    }
  }
}
