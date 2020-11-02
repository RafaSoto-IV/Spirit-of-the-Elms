class Attack extends Phaser.GameObjects.Sprite{
  constructor(scene){

    var x = scene.player.x;
    var y = scene.player.y;
    var counter = 0;
    var animation = '';
    var test_direction = scene.test_direction;

    if (test_direction == "player_left"){
      x -= 20
      animation = 'melee-left';
    }else if (test_direction == "player_right"){
      x += 20
      animation = 'melee-right';
    }else if (test_direction == "player_up"){
      y += 20
      animation = 'melee-down';
    }else if (test_direction == "player_down"){
      y -= 20
      animation = 'melee-up';
    }
    super(scene, x, y);
    scene.add.existing(this);

    //this.load.image('attack', 'hit1.png');

    scene.projectiles.add(this);
    scene.player.play(animation);
    //this.setScale(.3);
    scene.physics.world.enableBody(this);
  }

  update(){
    console.log('?')
    if (this.counter >= scene.player.attackRemovalDelay){
      console.log("wtf");
      this.destroy();
    } else{
      scene.counter += 1;
      console.log(scene.player.counter);
    }
  }
}
