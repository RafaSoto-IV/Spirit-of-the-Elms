class Magic extends Phaser.GameObjects.Sprite{
  constructor(scene){

    var x = scene.player.x;
    var y = scene.player.y;
    var magic_direction = scene.magic_direction;

    super(scene, x, y, "magic");
    scene.add.existing(this);

    this.play("magic_anim");
    this.setScale(.3);
    scene.physics.world.enableBody(this);
    if (magic_direction == "player_left"){
      this.body.velocity.x = -350;
    } else if (magic_direction == "player_right"){
      this.body.velocity.x = 350;
    } else if (magic_direction == "player_up"){
      this.body.velocity.y = 350;
    } else if (magic_direction == "player_down"){
      this.body.velocity.y = -350;
    }
    // this.body.velocity.x = - 250;

    scene.projectiles.add(this);
  }

  update(){
    if(this.x < -20){
      this.destroy();
    }
    if(this.y < -20){
      this.destroy();
    }
    if (this.x > 2000){
      this.destroy();
    }
    if (this.y > 2000){
      this.destroy();
    }
  }
}
