class Magic extends Phaser.GameObjects.Sprite{
  constructor(scene){

    var x = scene.player.x;
    var y = scene.player.y;
    var test_direction = scene.test_direction;

    super(scene, x, y, "magic");
    scene.add.existing(this);

    this.play("magic_anim");
    // this.setScale(100000);
    scene.physics.world.enableBody(this);
    if (test_direction == "player_left"){
      this.body.velocity.x = -250;
    } else if (test_direction == "player_right"){
      this.body.velocity.x = 250;
    } else if (test_direction == "player_up"){
      this.body.velocity.y = 250;
    } else if (test_direction == "player_down"){
      this.body.velocity.y = -250;
    }
    // this.body.velocity.x = - 250;

    scene.projectiles.add(this);
  }

  update(){
    if(this.x < -20){
      this.destroy();
    }
  }
}
