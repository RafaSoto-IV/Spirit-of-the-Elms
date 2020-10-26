class Scene2 extends Phaser.Scene{
  constructor(){
    super("playGame");
  }

  //SEARCH 'PLAYER', 'ENVIRONMENT', 'ENEMY', 'MECHANICAL' TO GET TO FUNCTIONS QUICKER

  create(){

    //SEARCH 'GLOBAL', 'BACKGROUND', 'TESTING COMMENTS', 'PLAYER', 'CAMERA', 'KEYBOARD', OR 'SETTINGS' TO GET TO VARIABLES

    //GLOBAL VARIABLES
      //Check which direction player is facing
    this.test_direction = "player_left";
    this.magic_direction = "player_left"
      // this.slime_scale = 2
    this.direction = "player_left";
    this.movement = "player_left";
    this.previous = "player_left";
    this.cloak = false;
    this.gameover = false;

    this.slimeRange = 150;
    this.slimeSpeed = 75;

    //BACKGROUND VARIABLES
      //Background image here. Will be changed to tileset
      //this.background = this.add.image(0,0, "background");
      //this.background.setOrigin(0,0);
      //this.add.text();
      //this.cameras.main.centerOn(800, 800);

    this.map = this.make.tilemap({ key: 'map' });
    const envtileset = this.map.addTilesetImage('envtileset', 'envtiles', 16, 16, 1, 2);
    const tileset = this.map.addTilesetImage('tileset', 'tiles', 16, 16, 1, 2);


    this.map.createStaticLayer('ground', tileset);
    const treeLayer = this.map.createStaticLayer('trees', envtileset)
    const envLayer = this.map.createStaticLayer('environment', envtileset);
    const envLayer2 = this.map.createStaticLayer('environment2', envtileset);
    envLayer.setCollisionByProperty({ collides: true});
    envLayer2.setCollisionByProperty({ collides: true});
    treeLayer.setCollisionByProperty({ collides: true});


    //TESTING COMMENTS, IF NOT OF USE PLEASE DELETE
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

    //PLAYER RELATED VARIABLES
      //Player sprite and interactions placed here
      //this.player = this.physics.add.sprite(120, 120, "player-right");
    this.player = this.physics.add.sprite(this.map.widthInPixels - 380, 130, "player-right");
    this.player.mana = 2000;
    this.player.maxMana = this.player.mana;
    this.player.health = 1000;
    this.player.maxHealth = this.player.health;
    this.player.level = 1;
    this.player.xp = 0;
    this.player.xpForNextLevel = 1000;
    this.player.projectileDamage = 100;
    this.player.vulnerable = true;
    this.player.canShootProjectiles = true;
    this.player.progress = 1;
    this.player.projectileTimer;
    this.player.projectileDelay = 1000;
    //this.player = this.physics.add.sprite(config.width/2 + 680, config.height/2 - 700, "player-right");
    //this.player.setSize(100,100);
    this.player.play("player_left")
    this.player.setScale(1.3);


    //CAMERA VARIABLES
      // set camera to follow player and to not show out of bounds
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player, true);

    this.cameraRangeX = this.sys.game.config.width / 2;
    this.cameraRangeY = this.sys.game.config.height / 2;


    //KEYBOARD VARIABLES
    this.cursors = this.input.keyboard.createCursorKeys();
      //this.mouse = this.input.pointer.
      //this.player.setCollideWorldBounds(true);
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.c = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    this.p = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


    //SETTINGS OTHER CHARACTERS
    this.sensei = this.physics.add.staticSprite(this.map.widthInPixels - 420, 130, "sensei");
    this.sensei.setScale(1.3);
    this.physics.add.collider(this.player, this.sensei);



    this.physics.add.collider(this.player, this.vendor);

    this.hatGuy = this.physics.add.staticSprite(this.map.widthInPixels- 155, this.map.heightInPixels - 680, "hatGuy");
    this.hatGuy.setScale(1.3);
    this.physics.add.collider(this.player, this.hatGuy);

    this.vendor = this.physics.add.staticSprite(this.map.widthInPixels - 1080, this.map.heightInPixels - 330, "vendor");
    this.vendor.setScale(1.3);

      //collision on the world
      // this.physics.overlap(this.player, this.treeLayer, this.stop, null, this);
    this.physics.add.collider(this.player, envLayer);
    this.physics.add.collider(this.player, treeLayer);


    this.healthPickups = this.physics.add.group();
    this.physics.add.overlap(this.player, this.healthPickups, this.pickupHealth, null, this);

      //Random enemy sprites input here
      //1 - 6 Around trees first left path
    this.slime1 = this.physics.add.sprite(this.map.widthInPixels - 700, 550, "slime_blue");
    this.slime1.setScale(this.slime_scale);
    this.slime1.play("blue_slime_anim")

    this.slime2 = this.physics.add.sprite(this.map.widthInPixels - 650, 500, "slime_blue");
    this.slime2.setScale(this.slime_scale);
    this.slime2.play("blue_slime_anim")

    this.slime3 = this.physics.add.sprite(this.map.widthInPixels - 700, 415, "slime_blue");
    this.slime3.setScale(this.slime_scale);
    this.slime3.play("blue_slime_anim")

    this.slime4 = this.physics.add.sprite(this.map.widthInPixels - 800, 550, "slime_blue");
    this.slime4.setScale(this.slime_scale);
    this.slime4.play("blue_slime_anim")

    this.slime5 = this.physics.add.sprite(this.map.widthInPixels - 850, 500, "slime_blue");
    this.slime5.setScale(this.slime_scale);
    this.slime5.play("blue_slime_anim")

    this.slime6 = this.physics.add.sprite(this.map.widthInPixels - 815, 415, "slime_blue");
    this.slime6.setScale(this.slime_scale);
    this.slime6.play("blue_slime_anim")


      //7 - 15 Downward path
    this.slime7 = this.physics.add.sprite(this.map.widthInPixels - 70, 1000, "slime_blue");
    this.slime7.setScale(this.slime_scale);
    this.slime7.play("blue_slime_anim")

    this.slime8 = this.physics.add.sprite(this.map.widthInPixels - 200, 1050, "slime_blue");
    this.slime8.setScale(this.slime_scale);
    this.slime8.play("blue_slime_anim")

    this.slime9 = this.physics.add.sprite(this.map.widthInPixels - 70, 1100, "slime_blue");
    this.slime9.setScale(this.slime_scale);
    this.slime9.play("blue_slime_anim")

    this.slime10 = this.physics.add.sprite(this.map.widthInPixels - 200, 1150, "slime_blue");
    this.slime10.setScale(this.slime_scale);
    this.slime10.play("blue_slime_anim")

    this.slime11 = this.physics.add.sprite(this.map.widthInPixels - 70, 1200, "slime_blue");
    this.slime11.setScale(this.slime_scale);
    this.slime11.play("blue_slime_anim")

    this.slime12 = this.physics.add.sprite(this.map.widthInPixels - 200, 1250, "slime_blue");
    this.slime12.setScale(this.slime_scale);
    this.slime12.play("blue_slime_anim")

    this.slime13 = this.physics.add.sprite(this.map.widthInPixels - 70, 1300, "slime_blue");
    this.slime13.setScale(this.slime_scale);
    this.slime13.play("blue_slime_anim")

    this.slime14 = this.physics.add.sprite(this.map.widthInPixels - 200, 1350, "slime_blue");
    this.slime14.setScale(this.slime_scale);
    this.slime14.play("blue_slime_anim")

    this.slime15 = this.physics.add.sprite(this.map.widthInPixels - 70, 1400, "slime_blue");
    this.slime15.setScale(this.slime_scale);
    this.slime15.play("blue_slime_anim")


      //16 - 22 After town enemies
    this.slime16 = this.physics.add.sprite(this.map.widthInPixels - 1250, 1700, "slime_blue");
    this.slime16.setScale(this.slime_scale);
    this.slime16.play("red_slime_anim")

    this.slime17 = this.physics.add.sprite(this.map.widthInPixels - 1300, 1675, "slime_blue");
    this.slime17.setScale(this.slime_scale);
    this.slime17.play("red_slime_anim")

    this.slime18 = this.physics.add.sprite(this.map.widthInPixels - 1350, 1650, "slime_blue");
    this.slime18.setScale(this.slime_scale);
    this.slime18.play("red_slime_anim")

    this.slime19 = this.physics.add.sprite(this.map.widthInPixels - 1400, 1625, "slime_blue");
    this.slime19.setScale(this.slime_scale);
    this.slime19.play("red_slime_anim")

    this.slime20 = this.physics.add.sprite(this.map.widthInPixels - 1450, 1650, "slime_blue");
    this.slime20.setScale(this.slime_scale);
    this.slime20.play("red_slime_anim")

    this.slime21 = this.physics.add.sprite(this.map.widthInPixels - 1500, 1675, "slime_blue");
    this.slime21.setScale(this.slime_scale);
    this.slime21.play("red_slime_anim")

    this.slime22 = this.physics.add.sprite(this.map.widthInPixels - 1550, 1700, "slime_blue");
    this.slime22.setScale(this.slime_scale);
    this.slime22.play("red_slime_anim")


      //23 - 36 After town first right (23 - 29 ranged, 30 - 36 melee)
    this.slime23 = this.physics.add.sprite(this.map.widthInPixels - 1025, 925, "slime_blue");
    this.slime23.setScale(this.slime_scale);
    this.slime23.play("red_slime_anim")

    this.slime24 = this.physics.add.sprite(this.map.widthInPixels - 925, 1000, "slime_blue");
    this.slime24.setScale(this.slime_scale);
    this.slime24.play("red_slime_anim")

    this.slime25 = this.physics.add.sprite(this.map.widthInPixels - 825, 1075, "slime_blue");
    this.slime25.setScale(this.slime_scale);
    this.slime25.play("red_slime_anim")

    this.slime26 = this.physics.add.sprite(this.map.widthInPixels - 725, 1150, "slime_blue");
    this.slime26.setScale(this.slime_scale);
    this.slime26.play("red_slime_anim")

    this.slime27 = this.physics.add.sprite(this.map.widthInPixels - 825, 1225, "slime_blue");
    this.slime27.setScale(this.slime_scale);
    this.slime27.play("red_slime_anim")

    this.slime28 = this.physics.add.sprite(this.map.widthInPixels - 925, 1300, "slime_blue");
    this.slime28.setScale(this.slime_scale);
    this.slime28.play("red_slime_anim")

    this.slime29 = this.physics.add.sprite(this.map.widthInPixels - 1025, 1375, "slime_blue");
    this.slime29.setScale(this.slime_scale);
    this.slime29.play("red_slime_anim")

    this.slime30 = this.physics.add.sprite(this.map.widthInPixels - 1000, 1100, "slime_blue");
    this.slime30.setScale(this.slime_scale);
    this.slime30.play("blue_slime_anim")

    this.slime31 = this.physics.add.sprite(this.map.widthInPixels - 1075, 1100, "slime_blue");
    this.slime31.setScale(this.slime_scale);
    this.slime31.play("blue_slime_anim")

    this.slime32 = this.physics.add.sprite(this.map.widthInPixels - 1150, 1100, "slime_blue");
    this.slime32.setScale(this.slime_scale);
    this.slime32.play("blue_slime_anim");

    this.slime33 = this.physics.add.sprite(this.map.widthInPixels - 1150, 1200, "slime_blue");
    this.slime33.setScale(this.slime_scale);
    this.slime33.play("blue_slime_anim");

    this.slime34 = this.physics.add.sprite(this.map.widthInPixels - 1075, 1200, "slime_blue");
    this.slime34.setScale(this.slime_scale);
    this.slime34.play("blue_slime_anim");

    this.slime35 = this.physics.add.sprite(this.map.widthInPixels - 1000, 1200, "slime_blue");
    this.slime35.setScale(this.slime_scale);
    this.slime35.play("blue_slime_anim");


      //The big boi left down from the town
    this.slimeBigBoi = this.physics.add.sprite(this.map.widthInPixels - 1700, 2200, "slime_blue");
    this.slimeBigBoi.setScale(6);
    this.slimeBigBoi.play("blue_slime_anim");

      //Lava big boi up after town second left
    this.flameBigBoi = this.physics.add.sprite(this.map.widthInPixels - 2300, 175, "slime_red");
    this.flameBigBoi.setScale(7);
    this.flameBigBoi.play("red_slime_anim");

      //Lava big boi goons (36 - 43)
    this.slime36 = this.physics.add.sprite(this.map.widthInPixels - 2200, 300, "slime_blue");
    this.slime36.setScale(this.slime_scale);
    this.slime36.play("blue_slime_anim");

    this.slime37 = this.physics.add.sprite(this.map.widthInPixels - 2400, 300, "slime_blue");
    this.slime37.setScale(this.slime_scale);
    this.slime37.play("blue_slime_anim");

    this.slime38 = this.physics.add.sprite(this.map.widthInPixels - 2300, 300, "slime_blue");
    this.slime38.setScale(this.slime_scale);
    this.slime38.play("blue_slime_anim");

    this.slime39 = this.physics.add.sprite(this.map.widthInPixels - 2500, 300, "slime_blue");
    this.slime39.setScale(this.slime_scale);
    this.slime39.play("blue_slime_anim");

    this.slime40 = this.physics.add.sprite(this.map.widthInPixels - 2200, 200, "slime_red");
    this.slime40.setScale(this.slime_scale);
    this.slime40.play("red_slime_anim");

    this.slime41 = this.physics.add.sprite(this.map.widthInPixels - 2400, 200, "slime_red");
    this.slime41.setScale(this.slime_scale);
    this.slime41.play("red_slime_anim");

    this.slime42 = this.physics.add.sprite(this.map.widthInPixels - 2600, 200, "slime_red");
    this.slime42.setScale(this.slime_scale);
    this.slime42.play("red_slime_anim");

    this.slime43 = this.physics.add.sprite(this.map.widthInPixels - 2500, 200, "slime_red");
    this.slime43.setScale(this.slime_scale);
    this.slime43.play("red_slime_anim");

      //Top right after town
    this.slime44 = this.physics.add.sprite(this.map.widthInPixels - 1000, 200, "slime_blue");
    this.slime44.setScale(this.slime_scale);
    this.slime44.play("blue_slime_anim");

    this.slime45 = this.physics.add.sprite(this.map.widthInPixels - 1200, 300, "slime_blue");
    this.slime45.setScale(this.slime_scale);
    this.slime45.play("blue_slime_anim");

    this.slime46 = this.physics.add.sprite(this.map.widthInPixels - 1400, 250, "slime_blue");
    this.slime46.setScale(this.slime_scale);
    this.slime46.play("blue_slime_anim");

    this.slime47 = this.physics.add.sprite(this.map.widthInPixels - 900, 150, "slime_blue");
    this.slime47.setScale(this.slime_scale);
    this.slime47.play("blue_slime_anim");

    this.slime48 = this.physics.add.sprite(this.map.widthInPixels - 950, 100, "slime_blue");
    this.slime48.setScale(this.slime_scale);
    this.slime48.play("blue_slime_anim");

    this.slime49 = this.physics.add.sprite(this.map.widthInPixels - 1700, 150, "slime_blue");
    this.slime49.setScale(this.slime_scale);
    this.slime49.play("blue_slime_anim");

    this.slime50 = this.physics.add.sprite(this.map.widthInPixels - 1600, 100, "slime_blue");
    this.slime50.setScale(this.slime_scale);
    this.slime50.play("blue_slime_anim");

    this.slime51 = this.physics.add.sprite(this.map.widthInPixels - 1000, 200, "slime_blue");
    this.slime51.setScale(this.slime_scale);
    this.slime51.play("blue_slime_anim");


      //slime_enemies put into group
    this.slime_enemies = this.physics.add.group();
    this.slime_enemies.add(this.slime1);
    this.slime_enemies.add(this.slime2);
    this.slime_enemies.add(this.slime3);
    this.slime_enemies.add(this.slime4);
    this.slime_enemies.add(this.slime5);
    this.slime_enemies.add(this.slime6);
    this.slime_enemies.add(this.slime7);
    this.slime_enemies.add(this.slime8);
    this.slime_enemies.add(this.slime9);
    this.slime_enemies.add(this.slime10);
    this.slime_enemies.add(this.slime11);
    this.slime_enemies.add(this.slime12);
    this.slime_enemies.add(this.slime13);
    this.slime_enemies.add(this.slime14);
    this.slime_enemies.add(this.slime15);
    this.slime_enemies.add(this.slime30);
    this.slime_enemies.add(this.slime31);
    this.slime_enemies.add(this.slime32);
    this.slime_enemies.add(this.slime33);
    this.slime_enemies.add(this.slime34);
    this.slime_enemies.add(this.slime35);
    this.slime_enemies.add(this.slimeBigBoi);
    this.slime_enemies.add(this.slime36);
    this.slime_enemies.add(this.slime37);
    this.slime_enemies.add(this.slime38);
    this.slime_enemies.add(this.slime39);
    this.slime_enemies.add(this.slime44);
    this.slime_enemies.add(this.slime45);
    this.slime_enemies.add(this.slime46);
    this.slime_enemies.add(this.slime47);
    this.slime_enemies.add(this.slime48);
    this.slime_enemies.add(this.slime49);
    this.slime_enemies.add(this.slime50);
    this.slime_enemies.add(this.slime51);
    this.slime_enemies.add(this.flameBigBoi);


    this.magic_slime_enemies = this.physics.add.group();
    this.magic_slime_enemies.add(this.slime16);
    this.magic_slime_enemies.add(this.slime17);
    this.magic_slime_enemies.add(this.slime18);
    this.magic_slime_enemies.add(this.slime19);
    this.magic_slime_enemies.add(this.slime20);
    this.magic_slime_enemies.add(this.slime21);
    this.magic_slime_enemies.add(this.slime22);
    this.magic_slime_enemies.add(this.slime23);
    this.magic_slime_enemies.add(this.slime24);
    this.magic_slime_enemies.add(this.slime25);
    this.magic_slime_enemies.add(this.slime26);
    this.magic_slime_enemies.add(this.slime27);
    this.magic_slime_enemies.add(this.slime28);
    this.magic_slime_enemies.add(this.slime29);
    this.magic_slime_enemies.add(this.flameBigBoi);
    this.magic_slime_enemies.add(this.slime40);
    this.magic_slime_enemies.add(this.slime41);
    this.magic_slime_enemies.add(this.slime42);
    this.magic_slime_enemies.add(this.slime43);


    this.magic_slime_enemies.children.each(child => {
      child.mana = 50;
      child.health = 300;
    })

    this.slime_enemies.children.each(child => {
      child.health = 200;
    })

    this.slimeBigBoi.health = 1000;
    this.slimeBigBoiHealthRegen = .75;

    this.flameBigBoi.health = 1000;
    this.flameBigBoiHealthRegen = .75;


    this.physics.add.collider(this.slime_enemies, envLayer);
    this.physics.add.collider(this.slime_enemies, treeLayer);
    this.physics.add.collider(this.slime_enemies, this.slime_enemies);

    this.physics.add.collider(this.magic_slime_enemies, envLayer);
    this.physics.add.collider(this.magic_slime_enemies, treeLayer);
      //this.physics.add.collider(this.magic_slime_enemies, this.magic_slime_enemies);

    this.physics.add.collider(this.slime_enemies, this.magic_slime_enemies);


      //Projectiles put into group
    this.projectiles = this.add.group();
    this.slime_projectiles = this.add.group();

      //Projectiles
    this.physics.add.collider(this.projectiles, envLayer, this.enviro_hit, null, this);
    this.physics.add.collider(this.projectiles, treeLayer, this.enviro_hit, null, this);
    this.physics.add.collider(this.slime_projectiles, envLayer, this.enviro_hit, null, this);
    this.physics.add.collider(this.slime_projectiles, treeLayer, this.enviro_hit, null, this);
    this.physics.add.collider(this.projectiles, this.slime_enemies, this.enemy_hit, null, this);
    this.physics.add.collider(this.projectiles, this.magic_slime_enemies, this.enemy_hit, null, this);
    this.physics.add.collider(this.projectiles, this.vendor, this.enviro_hit, null, this);
    this.physics.add.collider(this.slime_projectiles, this.vendor, this.enviro_hit, null, this);

      // this.physics.add.collider(this.slime_enemies, envLayer, this.enviro_hug, null, this);
      // this.physics.add.collider(this.slime_enemies, treeLayer, this.enviro_hug, null, this);
    this.physics.add.overlap(this.player, this.slime_enemies, this.hit, null, this);
    this.physics.add.overlap(this.player, this.magic_slime_enemies, this.hit, null, this);
    this.physics.add.overlap(this.player, this.slime_projectiles, this.projectile_hit, null, this);
    this.hitTimer;

    this.sys.events.on('resume', this.resume, this);

  }

//PLAYER RELATED FUNCTIONS:
  projectile_hit(player, projectile){
    projectile.destroy();
    if(this.player.vulnerable){
      if (!this.cloak){
        this.player.health -= 100;
        this.events.emit('playerHit');
        this.player.vulnerable = false;
        if (this.player.health <= 0){
          if (!this.gameover){
            this.add.text(player.x, player.y, "GAMEOVER");
            this.gameover = true;
          }
        }
        //player.play("blue_slime_anim");
        player.play("player_hit");
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

  hit(player, enemy){
    if(this.player.vulnerable){
      if (this.cloak){
        enemy.health -= 10
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
          //player.play("blue_slime_anim");
          player.play("player_hit");
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

  allowPlayerProjectiles(){
    this.player.canShootProjectiles = true;
  }

  cloaking(){
    // var magic = new Magic(this);
    if (this.cloak){
      this.cloak = false
    }else{
      this.cloak = true
      // this.player.play("magic_anim");
    }
  }

  levelUp(){
    this.player.level += 1;
    this.scene.launch('LevelUpScreenScene');
    this.scene.pause();
  }

  pickupHealth(player, healthPickup){
    if(this.player.health < this.player.maxHealth){
      this.player.health += 50;
      this.events.emit('playerHit');
      healthPickup.destroy();
    }
  }

  stop(player, obstacle){
    player.setVelocityX(0);
    player.setVelocityY(0);
  }

  magic(){
    var magic = new Magic(this);
  }

  attack(){
    this.input.mouse.disableContextMenu();

    if(pointer.leftButtonDown()){
      //attack animation goes here
    }
  }

  movePlayer(){
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
    // this.player.play();
    if (this.w.isDown || this.s.isDown || this.a.isDown || this.d.isDown){
      if(this.w.isDown){
        this.player.setVelocityY(-gameSettings.playerSpeed);
        if (!this.cloak){
          this.direction = this.movement;
        }else{
          this.direction = 'cloak_anim';
        }
        this.test_direction = "player_down";
        this.animation();
      }else if(this.s.isDown){
        this.player.setVelocityY(gameSettings.playerSpeed);
        if (!this.cloak){
          this.direction = this.movement;
        }else{
          this.direction = 'cloak_anim';
        }
        this.test_direction = "player_up";
        this.animation();
      }

      if(this.a.isDown){
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
      }else if(this.d.isDown){
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
    } else {
        if (!this.cloak){
          if(this.test_direction == "player_left"){
            this.direction = 'idle_left_anim';
            this.animation();
          } else if (this.test_direction == "player_right"){
            this.direction = 'idle_right_anim';
            this.animation();
          }
        } else{
            this.direction = 'cloak_anim';
            this.animation();
      }
    }
    console.log(this.player.x, this.player.y);
  }

  //ENVIRONMENT RELATED FUNCTIONS:

  enviro_hit(projectile, layer){
    projectile.destroy();
  }

  enviro_hug(unit, layer){
    unit.setVelocityX(0);
    unit.setVelocityY(0);
  }

  //ENEMY RELATED FUNCTIONS:

  enemy_hit(projectile, enemy){
    projectile.destroy();
    enemy.health -= this.player.projectileDamage;
  }

  slime_magic(magic_slime){
    var slime_magic = new Slime_Magic(this, magic_slime);
  }

  destroyEnemy(enemy){
    if(Phaser.Math.Between(1, 100) <= 20){
      var healthPickup = this.physics.add.sprite(enemy.x, enemy.y, "healthPickup");
      healthPickup.setScale(0.02);
      this.healthPickups.add(healthPickup);
    }
    enemy.destroy();
    this.player.xp += 100;
    this.events.emit('gainXp');
    if(this.player.xp >= this.player.xpForNextLevel){
      this.levelUp();
    }
  }

  moveSlimes(slime){
    var slimeX = this.player.x - slime.x;
    var slimeY = this.player.y - slime.y;
    if(Math.abs(slimeX) < this.slimeRange){
      if (Math.abs(slimeY) < this.slimeRange){
        slime.setVelocityX(Math.sign(slimeX)*this.slimeSpeed);
        slime.setVelocityY(Math.sign(slimeY)*this.slimeSpeed);
      }
    }
    // if (Math.abs(slimeY) < this.slimeRange){
    //   slime.setVelocityX(Math.sign(slimeX)*this.slimeSpeed);
    //   slime.setVelocityY(Math.sign(slimeY)*(this.slimeSpeed));
    // }
  }

  //MECHANICAL RELATED FUNCTIONS:
  resume() {
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
    if(this.direction == "player_right" || this.direction == "idle_right_anim"){
      this.player.play("idle_right_anim");
    } else {
      this.player.play("idle_left_anim");
    }
    this.cloak = false;
    this.w.reset();
    this.a.reset();
    this.s.reset();
    this.d.reset();
  }

  animation(){
    if (this.previous != this.direction){
      this.player.play(this.direction);
      this.previous = this.direction
    }
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

    if(this.player.progress == 1 && this.player.x > this.map.widthInPixels- 155  && this.player.y > this.map.heightInPixels - 690){
      this.scene.launch('VillageCutScene');
      this.scene.pause();
    }

    if(Phaser.Input.Keyboard.JustDown(this.p)){
      this.scene.launch('PauseScreenScene');
      this.scene.pause();
    }

    if (Phaser.Input.Keyboard.JustDown(this.c)){
      this.cloaking();
    }

    if (this.cursors.left.isDown){
      if (this.player.mana >= 50 && this.player.canShootProjectiles){
        this.magic_direction = "player_left"
        this.magic();
        this.player.mana -= 50;
        this.events.emit('playerUseMagic');
        this.player.canShootProjectiles = false;
        this.player.projectileTimer = this.time.addEvent({
              delay: this.player.projectileDelay,
              callback: this.allowPlayerProjectiles,
              callbackScope: this,
              loop: false,
              repeat: 0
          });
      }
    }else if (this.cursors.right.isDown){
        if(this.player.mana >= 50 && this.player.canShootProjectiles){
          this.magic_direction = "player_right";
          this.magic();
          this.player.mana -= 50;
          this.events.emit('playerUseMagic');
          this.player.canShootProjectiles = false;
          this.player.projectileTimer = this.time.addEvent({
                delay: this.player.projectileDelay,
                callback: this.allowPlayerProjectiles,
                callbackScope: this,
                loop: false,
                repeat: 0
            });
      }
    } else if (this.cursors.up.isDown){
        if(this.player.mana >= 50 && this.player.canShootProjectiles){
          this.magic_direction = "player_down";
          this.magic();
          this.player.mana -= 50;
          this.events.emit('playerUseMagic');
          this.player.canShootProjectiles = false;
          this.player.projectileTimer = this.time.addEvent({
                delay: this.player.projectileDelay,
                callback: this.allowPlayerProjectiles,
                callbackScope: this,
                loop: false,
                repeat: 0
            });
        }
    } else if (this.cursors.down.isDown){
        if(this.player.mana >= 50 && this.player.canShootProjectiles){
          this.magic_direction = "player_up";
          this.magic();
          this.player.mana -= 50;
          this.events.emit('playerUseMagic');
          this.player.canShootProjectiles = false;
          this.player.projectileTimer = this.time.addEvent({
                delay: this.player.projectileDelay,
                callback: this.allowPlayerProjectiles,
                callbackScope: this,
                loop: false,
                repeat: 0
            });
        }
    }

    if(this.cloak){
      this.events.emit('playerUseMagic');
      this.player.mana -= 50;
      if (this.player.mana <= 0){
        this.cloak = false;
      }
    } else{
      this.events.emit('playerUseMagic');
      this.player.mana += 1;
    }

    this.slime_enemies.children.each(child => {
      if (child.health <= 0){
        this.destroyEnemy(child);
        //child.destroy();
      };
    });

    this.magic_slime_enemies.children.each(child => {
      if (child.health <= 0){
        this.destroyEnemy(child);
        //child.destroy();
      } else {
        if (child.mana >= 50 && (Math.abs(this.player.x - child.x) <= this.cameraRangeX && Math.abs(this.player.y - child.y) <= this.cameraRangeY)){
          this.slime_magic(child);
          child.mana = 0;
        } else{
          child.mana += .25;
        }
        child.setVelocityX(0);
        child.setVelocityY(0);
      }
    })
    this.slimeBigBoi.health += this.slimeBigBoiHealthRegen;

    this.flameBigBoi.mana += 1.5;

    this.slime_enemies.children.each(child => {
      this.moveSlimes(child);
    });


    // for(var i = 0; i < this.projectiles.getChildren().length; i++){
    //   var magic = this.projectiles.getChildren()[i];
    //   magic.update()
    // }
  }
}
