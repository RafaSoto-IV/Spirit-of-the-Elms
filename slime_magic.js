class Slime_Magic extends Phaser.GameObjects.Sprite{
  constructor(scene, magic_slime){

    var x = magic_slime.x;
    var y = magic_slime.y;

    var slimeX = -scene.player.x + magic_slime.x;
    var slimeY = -scene.player.y + magic_slime.y;

    var slimeSpeedX = scene.slimeSpeed;
    var slimeSpeedY = scene.slimeSpeed;

    var x_over_y = Math.abs(slimeX/slimeY);
    var y_over_x = Math.abs(slimeY/slimeX);

    if (x_over_y > 5){
      x_over_y = 5
    }
    if (y_over_x > 5){
      y_over_x = 5
    }

    if (slimeX > 0){
      slimeSpeedX = -scene.slimeSpeed;
    } else if (slimeX <= 0){
      slimeSpeedX = scene.slimeSpeed;
    }

    if (slimeY > 0){
      slimeSpeedY = -scene.slimeSpeed;
    } else if (slimeY <= 0){
      slimeSpeedY = scene.slimeSpeed;
    }

    //var angle = game.physics.arcade.angleBetween(magic_slime, scene.player)

    super(scene, x, y, "slime_magic");
    scene.add.existing(this);

    // this.enemyMagic = game.add.weapon(5, 'slime_magic');
    // this.enemyMagic.setScale(.2);
    // this.enemyMagic.fireAngle = game.math.radToDeg(angle);
    // this.enemyWeapon.fire();

    this.play("slime_magic");
    this.setScale(.7);
    scene.physics.world.enableBody(this);
    // if(Math.abs(slimeX) < scene.slimeRange){
    //   if (Math.abs(slimeY) < scene.slimeRange){
    this.body.velocity.x = (x_over_y * slimeSpeedX) * .20;
    this.body.velocity.y = (y_over_x * slimeSpeedY) * .20;
    //this.body.angularVelocity
    //   }
    // }

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
