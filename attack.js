class Attack extends Phaser.GameObjects.Sprite{
  constructor(scene){

    var x = scene.player.x;
    var y = scene.player.y;
    var test_direction = scene.test_direction;

    super(scene, x, y, "attack");
    scene.add.existing(this);

    //this.load.image('attack', 'hit1.png');

    scene.projectiles.add(this);

    //this.setScale(.3);
    scene.physics.world.enableBody(this);
    if (test_direction == "player_left"){
      this.hit = scene.physics.add.staticSprite(x - 20, y, "attack");
      scene.player.canAttack = false;
      scene.player.attackTimer = scene.time.addEvent({
            delay: scene.player.attackDelay,
            callback: scene.allowPlayerAttack,
            callbackScope: scene,
            loop: false,
            repeat: 0,
        });
      this.hit.destroy();
    } else if (test_direction == "player_right"){
      this.hit = scene.physics.add.staticSprite(x + 20, y, "attack");
      scene.player.canAttack = false;
      scene.player.attackTimer = scene.time.addEvent({
            delay: scene.player.attackDelay,
            callback: scene.allowPlayerAttack,
            callbackScope: scene,
            loop: false,
            repeat: 0
        });
      this.hit.destroy();
    } else if (test_direction == "player_up"){
      this.hit = scene.physics.add.staticSprite(x, y - 20, "attack");
      scene.player.canAttack = false;
      scene.player.attackTimer = scene.time.addEvent({
            delay: scene.player.attackDelay,
            callback: scene.allowPlayerAttack,
            callbackScope: scene,
            loop: false,
            repeat: 0
        });
      this.hit.destroy();
    } else if (test_direction == "player_down"){
      this.hit = scene.physics.add.staticSprite(x, y + 20, "attack");
      scene.player.canAttack = false;
      scene.player.attackTimer = scene.time.addEvent({
            delay: scene.player.attackDelay,
            callback: scene.allowPlayerAttack,
            callbackScope: scene,
            loop: false,
            repeat: 0
        });
      this.hit.destroy();
    }
    this.hit.destroy();
    // this.body.velocity.x = - 250;

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
