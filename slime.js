class Slime extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y){

    var x = x;
    var y = y;
    //this.slime_scale =
    super(scene, x, y);

    this.slime = scene.physics.add.sprite(scene.map.widthInPixels - this.x, this.y, "slime_blue");
    //this.slime.setScale(this.slime_scale);
    //this.slime.play("blue_slime_anim");

    scene.add.existing(this);

    // scene.normal_enemies.add(this.slime);
    // scene.slime_enemies.add(this.slime);
    scene.physics.world.enableBody(this);
  }

  update(scene){
    x = 0
  }
}
