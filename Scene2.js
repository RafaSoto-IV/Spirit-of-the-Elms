class Scene2 extends Phaser.Scene{
  constructor(){
    super("playGame");
  }


  create(){
    this.health = 2000;
    this.mana = 2000;
    //Background image here. Will be changed to tileset
    //this.background = this.add.image(0,0, "background");
    //this.background.setOrigin(0,0);
    //this.add.text();
    //this.cameras.main.centerOn(800, 800);

    const map = this.make.tilemap({ key: 'map' });
    const envtileset = map.addTilesetImage('envtileset', 'envtiles', 16, 16, 1, 2);
    const tileset = map.addTilesetImage('tileset', 'tiles', 16, 16, 1, 2);


    map.createStaticLayer('ground', tileset);
    const treeLayer = map.createStaticLayer('trees', envtileset)
    const envLayer = map.createStaticLayer('environment', envtileset);
    envLayer.setCollisionByProperty({ collides: true});
    treeLayer.setCollisionByProperty({ collides: true});


    // for testing collision
    // envLayer.setCollisionByProperty({ collides: true});
    // const debugGraphics = this.add.graphics().setAlpha(0.7)
    // envLayer.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // })
    // treeLayer.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // })

    //Player sprite and interactions placed here
    //this.player = this.physics.add.sprite(120, 120, "player-right");
    this.player = this.physics.add.sprite(map.widthInPixels - 380, map.heightInPixels - 1470, "player-right");
    this.player.health = 1000;
    this.player.vulnerable = true;
    //this.player = this.physics.add.sprite(config.width/2 + 680, config.height/2 - 700, "player-right");
    //this.player.setSize(100,100);
    this.player.play("player_left")
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    //this.mouse = this.input.pointer.
    //this.player.setCollideWorldBounds(true);
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.c = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    this.player.setScale(1.3);

    this.sensei = this.physics.add.staticSprite(1180, 130, "sensei");
    this.sensei.setScale(1.3);
    this.physics.add.collider(this.player, this.sensei);

    // set camera to follow player and to not show out of bounds
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true);

    //Check which direction player is facing
    this.test_direction = "player_left";
    // this.slime_scale = 2
    this.direction = "player_left";
    this.movement = "player_left";
    this.previous = "player_left";
    this.cloak = false;
    this.gameover = false;



    //collision on the world
    // this.physics.overlap(this.player, this.treeLayer, this.stop, null, this);
    this.physics.add.collider(this.player, envLayer);
    this.physics.add.collider(this.player, treeLayer);

    //Random enemy sprites input here
    this.slime1 = this.physics.add.sprite(map.widthInPixels - 700, map.heightInPixels - 1050, "slime_blue");
    this.slime1.setScale(this.slime_scale);
    this.slime1.play("blue_slime_anim")

    this.slime2 = this.physics.add.sprite(map.widthInPixels - 650, map.heightInPixels - 1100, "slime_blue");
    this.slime2.setScale(this.slime_scale);
    this.slime2.play("blue_slime_anim")

    this.slime3 = this.physics.add.sprite(map.widthInPixels - 700, map.heightInPixels - 1185, "slime_blue");
    this.slime3.setScale(this.slime_scale);
    this.slime3.play("blue_slime_anim")

    this.slime4 = this.physics.add.sprite(map.widthInPixels - 800, map.heightInPixels - 1050, "slime_blue");
    this.slime4.setScale(this.slime_scale);
    this.slime4.play("blue_slime_anim")

    this.slime5 = this.physics.add.sprite(map.widthInPixels - 850, map.heightInPixels - 1100, "slime_blue");
    this.slime5.setScale(this.slime_scale);
    this.slime5.play("blue_slime_anim")

    this.slime6 = this.physics.add.sprite(map.widthInPixels - 815, map.heightInPixels - 1185, "slime_blue");
    this.slime6.setScale(this.slime_scale);
    this.slime6.play("blue_slime_anim")

    //slime_enemies put into group
    this.slime_enemies = this.physics.add.group();
    this.slime_enemies.add(this.slime1);
    this.slime_enemies.add(this.slime2);
    this.slime_enemies.add(this.slime3);
    this.slime_enemies.add(this.slime4);
    this.slime_enemies.add(this.slime5);
    this.slime_enemies.add(this.slime6);

    //Projectiles put into group
    this.projectiles = this.add.group();

    //Projectiles
    this.physics.add.collider(this.projectiles, envLayer, this.enviro_hit, null, this);
    this.physics.add.collider(this.projectiles, treeLayer, this.enviro_hit, null, this);
    this.physics.add.collider(this.projectiles, this.slime_enemies, this.enemy_hit, null, this);

    // this.physics.add.collider(this.slime_enemies, envLayer, this.enviro_hug, null, this);
    // this.physics.add.collider(this.slime_enemies, treeLayer, this.enviro_hug, null, this);
    this.physics.add.overlap(this.player, this.slime_enemies, this.hit, null, this);
    this.hitTimer;
  }

    //If player touches enemy
  //  this.physics.add.overlap(this.player, this.slime_enemies, this.damage, null, this);

  hit(player, enemy){
    if(this.player.vulnerable){
      if (this.cloak){
        enemy.destroy();
      } else{
        this.player.health -= 100;
        this.events.emit('playerHit');
        this.player.vulnerable = false;
        if (this.player.health <= 0){
          if (!this.gameover){
            this.add.text(player.x, player.y, "GAMEOVER");
            this.gameover = true;
          }
        }
        if (this.direction == "player_left"){
          player.setVelocityX(100);
        } else if (this.direction == "player_right"){
          player.setVelocityX(-100);
        }
        player.play("blue_slime_anim")
      }
      this.hitTimer = this.time.addEvent({
            delay: 500,
            callback: this.removePlayerInvulnerability,
            callbackScope: this,
            loop: false,
            repeat: 0
        });
    }
  }

  removePlayerInvulnerability(){
    this.player.vulnerable = true;
  }

  enviro_hit(projectile, layer){
    projectile.destroy();
  }

  enviro_hug(unit, layer){
    unit.setVelocityX(0);
    unit.setVelocityY(0);
  }

  enemy_hit(projectile, enemy){
    projectile.destroy();
    enemy.destroy();
  }
  //accidental function but cloaks player
  cloaking(){
    // var magic = new Magic(this);
    if (this.cloak){
      this.cloak = false
    }else{
      this.cloak = true
      // this.player.play("magic_anim");
    }
  }

  //ranged magic attack
  magic(){
    var magic = new Magic(this);
  }

  stop(player, obstacle){
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
  }

  update(){
    //Camera should be locked onto player
    // game.camera.focusOnXY(player.x, player.y);
    // this.cameras.main.centerOn(this.player.width + 750, this.player.height - 100);
    // this.cameras.follow(this.player)
    // this.cameras.main.setBounds(0, 0, 1600, 1600);
    // this.cameras.main.startFollow(this.player);


    //Let's player move
    if(!this.gameover){
      this.movePlayer();
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
    }

    if (Phaser.Input.Keyboard.JustDown(this.c)){
      this.cloaking();
    }

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
      if (this.mana >= 50){
        this.magic();
        this.mana -= 50;
      }
    }

    if(this.cloak){
      this.mana -= 50;
      if (this.mana <= 0){
        this.cloak = false;
      }
    } else{
      this.mana += 1;
    }

    // for(var i = 0; i < this.projectiles.getChildren().length; i++){
    //   var magic = this.projectiles.getChildren()[i];
    //   magic.update()
    // }

  }

  //attack based on what familiars player has
  attack(){
    this.input.mouse.disableContextMenu();

    if(pointer.leftButtonDown()){
      //attack animation goes here
    }
  }

  animation(){
    if (this.previous != this.direction){
      this.player.play(this.direction);
      this.previous = this.direction
    }
  }

  //How player is moved
  movePlayer(){
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
    // this.player.play();
    if(this.cursorKeys.up.isDown){
      this.player.setVelocityY(-gameSettings.playerSpeed);
      if (!this.cloak){
        this.direction = this.movement;
      }else{
        this.direction = 'cloak_anim';
      }
      this.test_direction = "player_down";
      this.animation();
    }else if(this.cursorKeys.down.isDown){
      this.player.setVelocityY(gameSettings.playerSpeed);
      if (!this.cloak){
        this.direction = this.movement;
      }else{
        this.direction = 'cloak_anim';
      }
      this.test_direction = "player_up";
      this.animation();
    }

    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-gameSettings.playerSpeed);
      if (!this.cloak){
        this.direction = 'player_left';
        this.movement = 'player_left';
      }else{
        this.direction = 'cloak_anim';
        this.movement = 'player_left';
      }
      this.test_direction = "player_left";
      this.animation();
    }else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(gameSettings.playerSpeed);
      if (!this.cloak){
        this.direction = 'player_right';
        this.movement = 'player_right';
      }else{
        this.direction = 'cloak_anim';
        this.movement = 'player_right';
      }
      this.test_direction = "player_right";
      this.animation();
    }
  }
}
