class Scene2 extends Phaser.Scene{
  constructor(){
    super("playGame");
  }

  create(){
    this.health = 2000
    //Background image here. Will be changed to tileset
    //this.background = this.add.image(0,0, "background");
    //this.background.setOrigin(0,0);
    //this.add.text();
    this.cameras.main.centerOn(1300, 200);
    const map = this.make.tilemap({ key: 'map' });
    const envtileset = map.addTilesetImage('envtileset', 'envtiles');
    const tileset = map.addTilesetImage('tileset', 'tiles');


    map.createStaticLayer('ground', tileset);
    const treeLayer = map.createStaticLayer('trees', envtileset)
    const envLayer = map.createStaticLayer('environment', envtileset);
    envLayer.setCollisionByProperty({ collides: true});
    treeLayer.setCollisionByProperty({ collides: true});
    // for testing collision
    //const envLayer = map.createStaticLayer('environment', [envtileset, completeFence])
    // envLayer.setCollisionByProperty({ collides: true});
    // const debugGraphics = this.add.graphics().setAlpha(0.7)
    // envLayer.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // })

    //Player sprite and interactions placed here
    this.player = this.physics.add.sprite(config.width/2 + 680, config.height/2 - 700, "player-right");
    //this.player.setSize(100,100);
    this.player.play("player_left")
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.player.setScale(1.3);

    //Check which direction player is facing
    this.direction = "player-right"

    //collision on the world
    // this.physics.overlap(this.player, this.treeLayer, this.stop, null, this);
    this.physics.add.collider(this.player, envLayer);
    this.physics.add.collider(this.player, treeLayer);
    // this.physics.overlap(this.player, envLayer, this.stop. null, this);
    //Random enemy sprites input here
    // this.enemy1 = this.physics.add.sprite();
    // this.enemy2 = this.physics.add.sprite();
    // this.enemy3 = this.physics.add.sprite();
    // this.enemy4 = this.physics.add.sprite();
    // this.enemy5 = this.physics.add.sprite();

    //Enemies put into group
    // this.enemies = this.physics.add.group();
    // this.enemies.add(this.enemy1);
    // this.enemies.add(this.enemy2);
    // this.enemies.add(this.enemy3);
    // this.enemies.add(this.enemy4);
    // this.enemies.add(this.enemy5);

    //Projectiles put into group
    // this.projectiles = this.add.group();


    //Projectiles
    // this.physics.add.collider(this.projectiles, this.enemies, magic(this.projectiles, this.enemies){
    //   projectile.destroy();
    // });
  }

    //If player touches enemy
  //  this.physics.add.overlap(this.player, this.enemies, this.damage, null, this);


  // magic(projectile, enemy){
  //   var magic = new Beam(this);
  // }

  stop(player, obstacle){
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
  }
  //When player touches enemy
  damage(player, obstacle){
    //input code
    this.health -= 20
  }

  //Sample code (May be deleted)
  moveAsteroid(asteroid, speed){
    asteroid.x -= speed;
    asteroid.angle += speed;
    if (asteroid.x < 0) {
      this.resetAsteroidPos(asteroid, false);
    }
  }


  update(){
    //Camera should be locked onto player
    //game.camera.focusOnXY(player.x, player.y);

    //Let's player move
    this.movePlayer();

    // if (Phaser.Input.Mouse.JustDown(this.rightButtonDown)){
    //   this.magic();
    // }

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

  //How player is moved
  movePlayer(){
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
    if(this.cursorKeys.up.isDown){
      this.player.setVelocityY(-gameSettings.playerSpeed);
    }else if(this.cursorKeys.down.isDown){
      this.player.setVelocityY(gameSettings.playerSpeed);
    }

    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-gameSettings.playerSpeed);
      this.direction = 'player_left'
      this.player.play(this.direction)
    }else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(gameSettings.playerSpeed);
      this.direction = 'player_right'
      this.player.play(this.direction)
    }
  }
}
