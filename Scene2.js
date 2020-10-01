class Scene2 extends Phaser.Scene{
  constructor(){
    super("playGame");
  }

  create(){
    //Background image here. Will be changed to tileset
    this.background = this.add.image(0,0, "background");
    this.background.setOrigin(0,0);
    this.add.text();

    //Player sprite and interactions placed here
    this.player = this.physics.add.sprite(300, 200, "player");
    this.player.setSize(100,100);
    this.player.play("player_anim");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);
    this.player.setScale(.3);

    //Random enemy sprites input here
    this.enemy1 = this.physics.add.sprite();
    this.enemy2 = this.physics.add.sprite();
    this.enemy3 = this.physics.add.sprite();
    this.enemy4 = this.physics.add.sprite();
    this.enemy5 = this.physics.add.sprite();

    //Enemies put into group
    this.enemies = this.physics.add.group();
    this.obstacles.add(this.enemy1);
    this.obstacles.add(this.enemy2);
    this.obstacles.add(this.enemy3);
    this.obstacles.add(this.enemy4);
    this.obstacles.add(this.enemy5);

    //If player touches enemy
    this.physics.add.overlap(this.player, this.enemies, this.damage, null, this);
  }

  //When player touches enemy
  damage(player, obstacle){
    //input code
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
    game.camera.focusOnXY(player.x, player.y);

    //Let's player move
    this.movePlayer();


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
    }else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(gameSettings.playerSpeed);
    }
  }
}
