class Slime_Magic extends Phaser.GameObjects.Sprite{
  constructor(scene, magic_slime){

    var x = magic_slime.x;
    var y = magic_slime.y;

    var slimeX = scene.player.x - magic_slime.x;
    var slimeY = scene.player.y - magic_slime.y;

    super(scene, x, y, "slime_magic");
    scene.add.existing(this);

    //change to "slime_magic"
    this.play("slime_magic");
    //this.setScale(100000);
    scene.physics.world.enableBody(this);
    if(Math.abs(slimeX) < scene.slimeRange){
      if (Math.abs(slimeY) < scene.slimeRange){
        this.body.velocity.x = (Math.sign(slimeX)*scene.slimeSpeed);
        this.body.velocity.y = (Math.sign(slimeY)*scene.slimeSpeed);
      }
    }
    // this.body.velocity.x = - 250;

    scene.slime_projectiles.add(this);
  }

  update(){
    if(this.x < -200){
      this.destroy();
    }
    if(this.y < -200){
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
