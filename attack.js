class Attack extends Phaser.GameObjects.Sprite{
  constructor(scene){

    var x = scene.player.x;
    var y = scene.player.y;
    var counter = 0;
    var animation = '';
    var test_direction = scene.test_direction;

    if (test_direction == "player_left"){
      x -= 30
      animation = 'melee-left';
    }else if (test_direction == "player_right"){
      x += 30
      animation = 'melee-right';
    }else if (test_direction == "player_up"){
      y += 30
      animation = 'melee-down';
    }else if (test_direction == "player_down"){
      y -= 30
      animation = 'melee-up';
    } else if (test_direction == "idle_left_anim"){
      x -= 30
      animation = 'melee-left';
    } else if (test_direction == "idle_right_anim"){
      x += 30
      animation = 'melee-right';
    }

    super(scene, x, y);
    scene.add.existing(this);

    //this.load.image('attack', 'hit1.png');

    scene.melee_attacks.add(this);
    scene.player.play(animation);
    //this.setScale(.3);
    scene.physics.world.enableBody(this);
  }

  update(scene){
    if (scene.player.counter >= scene.player.attackRemovalDelay){
      this.destroy();
      scene.player.counter = 0;
    } else{
      scene.player.counter += 1;
    }
  }
}
