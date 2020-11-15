class Slime extends Phaser.GameObjects.Sprite{
  constructor(scene, id, x, y){

    var x = x;
    var y = y;
    var id = id;
    var slimeRange = 200;
    var slimeSpeed = 75
    var canMove = null;
    //this.slime_scale =
    super(scene, x, y, "slime");

    //IT WON'T READ SLIME FOR SOME REASON

    // this.slime = scene.physics.add.sprite(this.x, this.y, "slime_blue");
    // this.slime.setScale(this.slime_scale);

    scene.add.existing(this);

    scene.normal_enemies.add(this);
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
      if(Math.abs(slimeX) < this.slimeRange){
        if (Math.abs(slimeY) < this.slimeRange){
          this.body.velocity.x = Math.sign(slimeX)*this.slimeSpeed;
          this.body.velocity.y = Math.sign(slimeY)*this.slimeSpeed;
        }
      }
    }
  }
}
