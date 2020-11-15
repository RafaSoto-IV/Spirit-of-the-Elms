class Slime extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, id, x, y){

    var x = x;
    var y = y;
    var id = id;
    var slimeRange = 200;
    var slimeSpeed = 75
    var canMove = true;
    var generated = true;
    //this.slime_scale =
    super(scene, x, y, "slime");

    //IT WON'T READ SLIME FOR SOME REASON

    // this.slime = scene.physics.add.sprite(this.x, this.y, "slime_blue");
    // this.slime.setScale(this.slime_scale);

    scene.add.existing(this);

    // scene.normal_enemies.add(this);
    // scene.slime_enemies.add(this);
    scene.generatedEnemies.add(this);

    // console.log("Slime: " + x + " " + y);
    // console.log("Player: " + scene.player.x + " " + scene.player.y);

    this.health = 200
    scene.physics.world.enableBody(this);
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;


    this.play("blue_slime_anim");
  }

  update(scene){
    if(this.canMove == null || this.canMove == true){
      var slimeX = scene.player.x - this.x;
      var slimeY = scene.player.y - this.y;
      if(Math.abs(slimeX) < 200){
        // console.log("passed through first test");
        if (Math.abs(slimeY) < 200){
          // console.log("passed through second test");
          this.body.velocity.x = Math.sign(slimeX)*75;
          this.body.velocity.y = Math.sign(slimeY)*75;
          console.log("X: " + this.body.velocity.x + " Y: " + this.body.velocity.y);
        }
      }
    }
  }
}
