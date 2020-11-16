class Scene2 extends Phaser.Scene{
  constructor(){
    super("playGame");
  }

//SEARCH 'PLAYER', 'ENVIRONMENT', 'ENEMY', 'MECHANICAL' TO GET TO FUNCTIONS QUICKER

  //pass in data from StartGameCutScene
  init(data){
    console.log('init', data);
    this.mainThemeTime = data.mainThemeTime;
    this.mainTheme = this.sound.add("mainTheme", {
      volume: 0.1,
      loop: true,
    });
    this.mainTheme.play({seek: this.mainThemeTime});
  }
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
    this.first = true;
    this.finalFirst = true;
    this.slime_id = 0;

    this.slimeRange = 200;
    this.slimeSpeed = 75;
    this.bossSpeed = 25;
    this.generatingBossDead = false;
    this.finalBossDead = false;

    //BACKGROUND VARIABLES
      //Background image here. Will be changed to tileset
      //this.background = this.add.image(0,0, "background");
      //this.background.setOrigin(0,0);
      //this.add.text();
      //this.cameras.main.centerOn(800, 800);

    this.map = this.make.tilemap({ key: 'map' });
    const envtileset = this.map.addTilesetImage('envtileset', 'envtiles', 16, 16, 1, 2);
    const tileset = this.map.addTilesetImage('tileset', 'tiles', 16, 16, 1, 2);


    const groundLayer = this.map.createStaticLayer('ground', tileset);
    const treeLayer = this.map.createStaticLayer('trees', envtileset)
    const envLayer = this.map.createStaticLayer('environment', envtileset);
    const envLayer2 = this.map.createStaticLayer('environment2', envtileset);
    groundLayer.setCollisionByProperty({ collides: true});
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
    this.player.manaRegen = 1;
    this.player.health = 1000;
    this.player.maxHealth = this.player.health;
    this.player.healthregen = .2;
    this.player.level = 1;
    this.player.xp = 0;
    this.player.xpForNextLevel = 1000;
    this.player.projectileDamage = 100;
    this.player.meleeDamage = 200;
    this.player.vulnerable = true;
    this.player.canShootProjectiles = true;
    this.player.canAttack = true;
    this.player.canRemove = true;
    this.player.progress = 1;
    this.player.projectileTimer;
    this.player.attackTimer;
    this.player.attackRemoval;
    this.player.projectileDelay = 750;
    this.player.attackDelay = 750;
    this.player.counter = 0;
    this.player.attackRemovalDelay = 15;
    this.player.reflect = false;
    this.player.aoe = false;
    this.player.aoeRange = 100;
    this.player.thunderwave = true;
    this.player.stunTime = 1000;
    this.player.stun = false;
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
    this.q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);



    //SETTINGS OTHER CHARACTERS
    this.sensei = this.physics.add.staticSprite(this.map.widthInPixels - 420, 130, "sensei");
    this.sensei.setScale(1.3);
    this.physics.add.collider(this.player, this.sensei);

    this.hatGuy = this.physics.add.staticSprite(this.map.widthInPixels- 155, this.map.heightInPixels - 680, "hatGuy");
    this.hatGuy.setScale(1.3);
    this.physics.add.collider(this.player, this.hatGuy);

    this.vendor = this.physics.add.staticSprite(this.map.widthInPixels - 1080, this.map.heightInPixels - 330, "vendor");
    this.vendor.setScale(1.3);
    this.physics.add.collider(this.player, this.vendor);

      //collision on the world
      // this.physics.overlap(this.player, this.treeLayer, this.stop, null, this);
    this.physics.add.collider(this.player, envLayer);
    this.physics.add.collider(this.player, envLayer2);
    this.physics.add.collider(this.player, groundLayer);
    this.physics.add.collider(this.player, treeLayer);


    this.healthPickups = this.physics.add.group();
    this.physics.add.overlap(this.player, this.healthPickups, this.pickupHealth, null, this);

    this.powerUpPickups = this.physics.add.group();
    this.physics.add.overlap(this.player, this.powerUpPickups, this.pickupPowerUp, null, this);

      //Random enemy sprites input here
      //1 - 6 Around trees first left path
    this.slime1 = this.physics.add.sprite(this.map.widthInPixels - 700, 550, "slime_blue");
    this.slime1.setScale(this.slime_scale);
    this.slime1.play("blue_slime_anim")

    // this.addSlime(this, this.map.widthInPixels - 700, 550);

    this.slime2 = this.physics.add.sprite(this.map.widthInPixels - 650, 500, "slime_blue");
    this.slime2.setScale(this.slime_scale);
    this.slime2.play("blue_slime_anim")

    // this.addSlime(650, 500);

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
    this.slime16.idname = "slime16";

    this.slime17 = this.physics.add.sprite(this.map.widthInPixels - 1300, 1675, "slime_blue");
    this.slime17.setScale(this.slime_scale);
    this.slime17.play("red_slime_anim")
    this.slime17.idname = "slime17";

    this.slime18 = this.physics.add.sprite(this.map.widthInPixels - 1350, 1650, "slime_blue");
    this.slime18.setScale(this.slime_scale);
    this.slime18.play("red_slime_anim")
    this.slime18.idname = "slime18";

    this.slime19 = this.physics.add.sprite(this.map.widthInPixels - 1400, 1625, "slime_blue");
    this.slime19.setScale(this.slime_scale);
    this.slime19.play("red_slime_anim")
    this.slime19.idname = "slime19";

    this.slime20 = this.physics.add.sprite(this.map.widthInPixels - 1450, 1650, "slime_blue");
    this.slime20.setScale(this.slime_scale);
    this.slime20.play("red_slime_anim")
    this.slime20.idname = "slime20";

    this.slime21 = this.physics.add.sprite(this.map.widthInPixels - 1500, 1675, "slime_blue");
    this.slime21.setScale(this.slime_scale);
    this.slime21.play("red_slime_anim")
    this.slime21.idname = "slime21";

    this.slime22 = this.physics.add.sprite(this.map.widthInPixels - 1550, 1700, "slime_blue");
    this.slime22.setScale(this.slime_scale);
    this.slime22.play("red_slime_anim")
    this.slime22.idname = "slime22";


      //23 - 36 After town first right (23 - 29 ranged, 30 - 36 melee)
    this.slime23 = this.physics.add.sprite(this.map.widthInPixels - 1025, 925, "slime_red");
    this.slime23.setScale(this.slime_scale);
    this.slime23.play("red_slime_anim")

    this.slime24 = this.physics.add.sprite(this.map.widthInPixels - 925, 1000, "slime_red");
    this.slime24.setScale(this.slime_scale);
    this.slime24.play("red_slime_anim")

    this.slime25 = this.physics.add.sprite(this.map.widthInPixels - 825, 1075, "slime_red");
    this.slime25.setScale(this.slime_scale);
    this.slime25.play("red_slime_anim")

    // this.slime26 = this.physics.add.sprite(this.map.widthInPixels - 725, 1150, "slime_red");
    // this.slime26.setScale(this.slime_scale);
    // this.slime26.play("red_slime_anim")

    this.slime27 = this.physics.add.sprite(this.map.widthInPixels - 825, 1225, "slime_red");
    this.slime27.setScale(this.slime_scale);
    this.slime27.play("red_slime_anim")

    this.slime28 = this.physics.add.sprite(this.map.widthInPixels - 925, 1300, "slime_red");
    this.slime28.setScale(this.slime_scale);
    this.slime28.play("red_slime_anim")

    this.slime29 = this.physics.add.sprite(this.map.widthInPixels - 1025, 1375, "slime_red");
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

    //The big boi left down from the town
    this.slimeBigBoi = this.physics.add.sprite(this.map.widthInPixels - 1700, 2200, "slime_blue");
    this.slimeBigBoi.setScale(6);
    this.slimeBigBoi.setSize(10, 10);
    this.slimeBigBoi.play("blue_slime_anim");

    //The generating boss upper left
    this.generatingBoss = this.physics.add.sprite(this.map.widthInPixels - 725, 1150, "slime_blue");
    this.generatingBoss.setScale(6);
    this.generatingBoss.setSize(10, 10);
    this.generatingBoss.play("blue_slime_anim");

    //Lava big boi up after town second left
    this.flameBigBoi = this.physics.add.sprite(this.map.widthInPixels - 2300, 175, "slime_red");
    this.flameBigBoi.setScale(7);
    this.flameBigBoi.setSize(10, 10);
    this.flameBigBoi.play("red_slime_anim");

    this.finalBoss = this.physics.add.sprite(this.map.widthInPixels - 3250, 1450, "finalboss");
    this.finalBoss.setScale(7);
    this.finalBoss.setSize(20, 20);
    this.finalBoss.play("final_boss");

    //Respawning Enemies
    this.slimeg1 = this.physics.add.sprite(this.generatingBoss.x + 50, this.generatingBoss.y, "slime_blue");
    this.slimeg1.setScale(this.slime_scale);
    this.slimeg1.play("blue_slime_anim");

    this.slimeg2 = this.physics.add.sprite(this.generatingBoss.x - 50, this.generatingBoss.y, "slime_blue");
    this.slimeg2.setScale(this.slime_scale);
    this.slimeg2.play("blue_slime_anim");

    this.slimeg3 = this.physics.add.sprite(this.generatingBoss.x + 25, this.generatingBoss.y + 25, "slime_blue");
    this.slimeg3.setScale(this.slime_scale);
    this.slimeg3.play("blue_slime_anim");

    this.slimeg4 = this.physics.add.sprite(this.generatingBoss.x - 25, this.generatingBoss.y + 25, "slime_blue");
    this.slimeg4.setScale(this.slime_scale);
    this.slimeg4.play("blue_slime_anim");

    this.slimeg5 = this.physics.add.sprite(this.generatingBoss.x - 25, this.generatingBoss.y - 25, "slime_blue");
    this.slimeg5.setScale(this.slime_scale);
    this.slimeg5.play("blue_slime_anim");

    this.slimeg6 = this.physics.add.sprite(this.generatingBoss.x + 25, this.generatingBoss.y - 25, "slime_blue");
    this.slimeg6.setScale(this.slime_scale);
    this.slimeg6.play("blue_slime_anim");


    this.bossm1 = this.physics.add.sprite(this.finalBoss.x + 50, this.finalBoss.y, "bossminions");
    this.bossm1.setScale(this.slime_scale);
    this.bossm1.play("boss_minions");

    this.bossm2 = this.physics.add.sprite(this.finalBoss.x - 50, this.finalBoss.y, "bossminions");
    this.bossm2.setScale(this.slime_scale);
    this.bossm2.play("boss_minions");

    this.bossm3 = this.physics.add.sprite(this.finalBoss.x + 25, this.finalBoss.y + 25, "bossminions");
    this.bossm3.setScale(this.slime_scale);
    this.bossm3.play("boss_minions");

    this.bossm4 = this.physics.add.sprite(this.finalBoss.x - 25, this.finalBoss.y + 25, "bossminions");
    this.bossm4.setScale(this.slime_scale);
    this.bossm4.play("boss_minions");

    this.bossm5 = this.physics.add.sprite(this.finalBoss.x - 25, this.finalBoss.y - 25, "bossminions");
    this.bossm5.setScale(this.slime_scale);
    this.bossm5.play("boss_minions");

    this.bossm6 = this.physics.add.sprite(this.finalBoss.x + 25, this.finalBoss.y - 25, "bossminions");
    this.bossm6.setScale(this.slime_scale);
    this.bossm6.play("boss_minions");

    this.bossm7 = this.physics.add.sprite(this.finalBoss.x + 25, this.finalBoss.y - 25, "bossminions");
    this.bossm7.setScale(this.slime_scale);
    this.bossm7.play("boss_minions");

    this.bossm8 = this.physics.add.sprite(this.finalBoss.x + 25, this.finalBoss.y - 25, "bossminions");
    this.bossm8.setScale(this.slime_scale);
    this.bossm8.play("boss_minions");

    this.normal_enemies = this.physics.add.group();
    this.normal_enemies.add(this.slime1);
    this.normal_enemies.add(this.slime2);
    this.normal_enemies.add(this.slime3);
    this.normal_enemies.add(this.slime4);
    this.normal_enemies.add(this.slime5);
    this.normal_enemies.add(this.slime6);
    this.normal_enemies.add(this.slime7);
    this.normal_enemies.add(this.slime8);
    this.normal_enemies.add(this.slime9);
    this.normal_enemies.add(this.slime10);
    this.normal_enemies.add(this.slime11);
    this.normal_enemies.add(this.slime12);
    this.normal_enemies.add(this.slime13);
    this.normal_enemies.add(this.slime14);
    this.normal_enemies.add(this.slime15);
    this.normal_enemies.add(this.slime16);
    this.normal_enemies.add(this.slime17);
    this.normal_enemies.add(this.slime18);
    this.normal_enemies.add(this.slime19);
    this.normal_enemies.add(this.slime20);
    this.normal_enemies.add(this.slime21);
    this.normal_enemies.add(this.slime22);
    this.normal_enemies.add(this.slime23);
    this.normal_enemies.add(this.slime24);
    this.normal_enemies.add(this.slime25);
    // this.normal_enemies.add(this.slime26);
    this.normal_enemies.add(this.slime27);
    this.normal_enemies.add(this.slime28);
    this.normal_enemies.add(this.slime29);
    this.normal_enemies.add(this.slime30);
    this.normal_enemies.add(this.slime31);
    this.normal_enemies.add(this.slime32);
    this.normal_enemies.add(this.slime33);
    this.normal_enemies.add(this.slime34);
    this.normal_enemies.add(this.slime35);
    this.normal_enemies.add(this.slime36);
    this.normal_enemies.add(this.slime37);
    this.normal_enemies.add(this.slime38);
    this.normal_enemies.add(this.slime39);
    this.normal_enemies.add(this.slime40);
    this.normal_enemies.add(this.slime41);
    this.normal_enemies.add(this.slime42);
    this.normal_enemies.add(this.slime43);
    this.normal_enemies.add(this.slime44);
    this.normal_enemies.add(this.slime45);
    this.normal_enemies.add(this.slime46);
    this.normal_enemies.add(this.slime47);
    this.normal_enemies.add(this.slime48);
    this.normal_enemies.add(this.slime49);
    this.normal_enemies.add(this.slime50);
    this.normal_enemies.add(this.slime51);
    this.normal_enemies.add(this.slimeg1);
    this.normal_enemies.add(this.slimeg2);
    this.normal_enemies.add(this.slimeg3);
    this.normal_enemies.add(this.slimeg4);
    this.normal_enemies.add(this.slimeg5);
    this.normal_enemies.add(this.slimeg6);
    this.normal_enemies.add(this.bossm1);
    this.normal_enemies.add(this.bossm2);
    this.normal_enemies.add(this.bossm3);
    this.normal_enemies.add(this.bossm4);
    this.normal_enemies.add(this.bossm5);
    this.normal_enemies.add(this.bossm6);
    this.normal_enemies.add(this.bossm7);
    this.normal_enemies.add(this.bossm8);

    this.normal_enemies.add(this.slimeBigBoi);
    this.normal_enemies.add(this.flameBigBoi);
    this.normal_enemies.add(this.generatingBoss);
    this.normal_enemies.add(this.finalBoss);
    //this.normal_enemies.add(this.generatingBoss);



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
    this.slime_enemies.add(this.slimeBigBoi);
    this.slime_enemies.add(this.flameBigBoi);
    this.slime_enemies.add(this.finalBoss);

    this.slime_enemies.add(this.slimeg1);
    this.slime_enemies.add(this.slimeg2);
    this.slime_enemies.add(this.slimeg3);
    this.slime_enemies.add(this.slimeg4);
    this.slime_enemies.add(this.slimeg5);
    this.slime_enemies.add(this.slimeg6);

    this.slime_enemies.add(this.bossm1);
    this.slime_enemies.add(this.bossm2);
    this.slime_enemies.add(this.bossm3);
    this.slime_enemies.add(this.bossm4);
    this.slime_enemies.add(this.bossm5);
    this.slime_enemies.add(this.bossm6);
    this.slime_enemies.add(this.bossm7);
    this.slime_enemies.add(this.bossm8);


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
    // this.magic_slime_enemies.add(this.slime26);
    this.magic_slime_enemies.add(this.slime27);
    this.magic_slime_enemies.add(this.slime28);
    this.magic_slime_enemies.add(this.slime29);
    this.magic_slime_enemies.add(this.flameBigBoi);
    this.magic_slime_enemies.add(this.finalBoss);
    this.magic_slime_enemies.add(this.slime40);
    this.magic_slime_enemies.add(this.slime41);
    this.magic_slime_enemies.add(this.slime42);
    this.magic_slime_enemies.add(this.slime43);

    this.magic_slime_enemies.add(this.bossm1);
    this.magic_slime_enemies.add(this.bossm2);
    this.magic_slime_enemies.add(this.bossm3);
    this.magic_slime_enemies.add(this.bossm4);
    this.magic_slime_enemies.add(this.bossm5);
    this.magic_slime_enemies.add(this.bossm6);
    this.magic_slime_enemies.add(this.bossm7);
    this.magic_slime_enemies.add(this.bossm8);

    //this.generating_enemies = this.physics.add.group();
    //this.generating_enemies.add(this.slimeBigBoi);

    this.generatedEnemies = this.physics.add.group();
    this.generatedEnemies.add(this.slimeg1);
    this.generatedEnemies.add(this.slimeg2);
    this.generatedEnemies.add(this.slimeg3);
    this.generatedEnemies.add(this.slimeg4);
    this.generatedEnemies.add(this.slimeg5);
    this.generatedEnemies.add(this.slimeg6);

    this.finalBossMinions = this.physics.add.group();
    this.finalBossMinions.add(this.bossm1);
    this.finalBossMinions.add(this.bossm2);
    this.finalBossMinions.add(this.bossm3);
    this.finalBossMinions.add(this.bossm4);
    this.finalBossMinions.add(this.bossm5);
    this.finalBossMinions.add(this.bossm6);
    this.finalBossMinions.add(this.bossm7);
    this.finalBossMinions.add(this.bossm8);

    // this.generating_enemies.children.each(child => {
    //   this.generating_enemy(child);
    // });

    this.melee_attacks = this.physics.add.group();

    this.normal_enemies.children.each(child => {
      child.health = 200;
    });

    this.magic_slime_enemies.children.each(child => {
      child.mana = 50;
    });

    this.slime_enemies.children.each(child => {
      child.slimeSpeed = this.slimeSpeed;
    });


    this.slimeBigBoi.slimeSpeed = this.bossSpeed;
    this.flameBigBoi.slimeSpeed = this.bossSpeed;

    this.slimeBigBoi.health = 1000;
    this.generatingBoss.health = 1000;
    this.flameBigBoi.health = 1000;
    this.finalBoss.health = 1000;

    this.BossHealthRegen = .75;

    this.physics.add.collider(this.normal_enemies, envLayer);
    this.physics.add.collider(this.normal_enemies, envLayer2);
    this.physics.add.collider(this.normal_enemies, groundLayer);
    this.physics.add.collider(this.normal_enemies, treeLayer);
    this.physics.add.collider(this.normal_enemies, this.normal_enemies);

    this.physics.add.collider(this.generatedEnemies, envLayer);
    this.physics.add.collider(this.generatedEnemies, envLayer2);
    this.physics.add.collider(this.generatedEnemies, groundLayer);
    this.physics.add.collider(this.generatedEnemies, treeLayer);
    this.physics.add.collider(this.generatedEnemies, this.generatedEnemies);
    this.physics.add.collider(this.generatedEnemies, this.generatingBoss);

    this.physics.add.collider(this.finalBossMinions, envLayer);
    this.physics.add.collider(this.finalBossMinions, envLayer2);
    this.physics.add.collider(this.finalBossMinions, groundLayer);
    this.physics.add.collider(this.finalBossMinions, treeLayer);
    this.physics.add.collider(this.finalBossMinions, this.finalBossMinions);
    this.physics.add.collider(this.finalBossMinions, this.finalBoss);



    //Projectiles put into group
    this.projectiles = this.add.group();
    this.slime_projectiles = this.add.group();

    //Projectiles
    this.physics.add.collider(this.projectiles, envLayer, this.enviro_hit, null, this);
    this.physics.add.collider(this.projectiles, treeLayer, this.enviro_hit, null, this);
    this.physics.add.collider(this.slime_projectiles, envLayer, this.enviro_hit, null, this);
    this.physics.add.collider(this.slime_projectiles, treeLayer, this.enviro_hit, null, this);
    this.physics.add.collider(this.projectiles, this.normal_enemies, this.enemy_hit, null, this);
    this.physics.add.collider(this.projectiles, this.magic_slime_enemies, this.enemy_hit, null, this);
    this.physics.add.collider(this.projectiles, this.generatedEnemies, this.enemy_hit, null, this);
    this.physics.add.collider(this.projectiles, this.finalBossMinions, this.enemy_hit, null, this);
    this.physics.add.collider(this.projectiles, this.generatingBoss, this.enemy_hit, null, this);
    this.physics.add.collider(this.projectiles, this.vendor, this.enviro_hit, null, this);
    this.physics.add.collider(this.slime_projectiles, this.vendor, this.enviro_hit, null, this);
    this.physics.add.collider(this.slime_enemies, envLayer, this.enviro_hug, null, this);
    this.physics.add.collider(this.slime_enemies, treeLayer, this.enviro_hug, null, this);
    this.physics.add.overlap(this.player, this.normal_enemies, this.hit, null, this);
    this.physics.add.overlap(this.player, this.generatedEnemies, this.hit, null, this);
    this.physics.add.overlap(this.player, this.finalBossMinions, this.hit, null, this);
    this.physics.add.overlap(this.player, this.generatingBoss, this.hit, null, this);

    // this.physics.add.overlap(this.player, this.magic_slime_enemies, this.hit, null, this);
    // this.physics.add.overlap(this.player, this.generating_enemies, this.hit, null, this);
    this.physics.add.overlap(this.player, this.slime_projectiles, this.projectile_hit, null, this);
    this.hitTimer;

    this.physics.add.overlap(this.melee_attacks, this.normal_enemies, this.enemy_hit_melee, null, this);
    this.physics.add.overlap(this.melee_attacks, this.magic_slime_enemies, this.enemy_hit_melee, null, this);
    this.physics.add.overlap(this.melee_attacks, this.generatedEnemies, this.enemy_hit_melee, null, this);
    this.physics.add.overlap(this.melee_attacks, this.finalBossMinions, this.enemy_hit_melee, null, this);
    this.physics.add.overlap(this.melee_attacks, this.generatingBoss, this.enemy_hit_melee, null, this);
    this.physics.add.overlap(this.slime_projectiles, this.melee_attacks, this.reflect_projectiles, null, this);

    //set resume event function to handle when scene is unpaused
    this.sys.events.on('resume', this.resume, this);

    //set pause event function to handle when scene is paused
    this.sys.events.on('pause', this.pause, this);

    // object to hold all info needed for checkpoint saving/loading
    this.checkpoint;

    //Sound Objects
    //this.sounds.healSound = this.add.sound("healSound");
    // this.mainTheme = this.sound.add("mainTheme", {
    //   volume: 0.1,
    //   loop: true,
    // });
    // this.mainTheme.play({seek: this.mainThemeTime});
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
            this.scene.launch('GameOverScene');
            this.scene.pause();
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            //this.add.text(player.x, player.y, "GAMEOVER");
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
        enemy.health -= 10;
        enemy.hitSprite = this.add.sprite(enemy.x, enemy.y, "hit1");
        this.time.addEvent({
              delay: 10,
              callback: this.removeEnemyHitSprite,
              callbackScope: this,
              args: [enemy.hitSprite],
              loop: false,
              repeat: 0
        });
        if (enemy.health <= 0 && enemy.active == true){
          this.destroyEnemy(enemy);
          //child.destroy();
        };
      } else{
          this.player.health -= 100;
          this.events.emit('playerHit');
          this.sound.play("slimeSound", {volume: 0.1});
          this.player.vulnerable = false;
          if (this.player.health <= 0){
            if (!this.gameover){
              this.scene.launch('GameOverScene');
              this.scene.pause();
              this.player.setVelocityX(0);
              this.player.setVelocityY(0);
              //this.add.text(player.x, player.y, "GAMEOVER");
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

  allowPlayerAttack(){
    this.player.canAttack = true;
  }

  allowPlayerRemove(){
    this.player.canRemove = true;
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
      this.sound.play("healSound", {volume: 0.1});
      //this.sounds.healSound.play();
      healthPickup.disableBody(true, true);
      //healthPickup.destroy();
    }
  }

  pickupPowerUp(player, powerUpPickup){
    console.log("pick up power");
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    //powerUpPickup.disableBody(true, true);
    if(powerUpPickup.id == 0){
      console.log("unlock aoe")
      this.player.aoe = true;
      this.saveCheckpoint();
    } else if(powerUpPickup.id == 1){
      console.log("unlock reflect")
      this.player.reflect = true;
      this.saveCheckpoint();
    } else if(powerUpPickup.id == 2){
      console.log("unlock stun")
      this.player.stun = true;
      this.saveCheckpoint();
    }
    powerUpPickup.destroy();
  }

  stop(player, obstacle){
    player.setVelocityX(0);
    player.setVelocityY(0);
  }

  magic(){
    var magic = new Magic(this);
  }

  attack(){
    var attack = new Attack(this);
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
    //console.log(this.player.x, this.player.y);
  }

  melee(attack){
    attack.destroy();
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

  removeEnemyHitSprite(hitSprite){
    hitSprite.destroy();
  }

  enemy_hit(projectile, enemy){
    projectile.destroy();
    enemy.health -= this.player.projectileDamage;
    enemy.hitSprite = this.add.sprite(enemy.x, enemy.y, "hit1");
    this.time.addEvent({
          delay: 150,
          callback: this.removeEnemyHitSprite,
          callbackScope: this,
          args: [enemy.hitSprite],
          loop: false,
          repeat: 0
    });
    if (enemy.health <= 0 && enemy.active == true){
      this.destroyEnemy(enemy);
      //child.destroy();
    };
  }

  enemy_hit_melee(melee, enemy){
    melee.destroy();
    enemy.health -= this.player.meleeDamage;
    enemy.hitSprite = this.add.sprite(enemy.x, enemy.y, "hit1");
    this.time.addEvent({
          delay: 150,
          callback: this.removeEnemyHitSprite,
          callbackScope: this,
          args: [enemy.hitSprite],
          loop: false,
          repeat: 0
    });
    if (enemy.health <= 0 && enemy.active == true){
      this.destroyEnemy(enemy);
    };
  }

//Needs animation
  aoe(player, enemy){
    //enemy.play('attack')
    enemy.health -= this.player.meleeDamage;
    if (enemy.active == true) {
      enemy.hitSprite = this.add.sprite(enemy.x, enemy.y, "hit1");
      this.time.addEvent({
            delay: 10,
            callback: this.removeEnemyHitSprite,
            callbackScope: this,
            args: [enemy.hitSprite],
            loop: false,
            repeat: 0
      });
    }
    if (this.player.health < 1){
      this.player.health = 1;
    }
    this.events.emit('playerHit');
    if (enemy.health <= 0 && enemy.active == true){
      this.destroyEnemy(enemy);
    };
  }

//Needs timer
  stun(player, enemy){
    enemy.health -= this.player.projectileDamage;
    if (enemy.active == true) {
      enemy.hitSprite = this.add.sprite(enemy.x, enemy.y, "hit1");
      this.time.addEvent({
            delay: 10,
            callback: this.removeEnemyHitSprite,
            callbackScope: this,
            args: [enemy.hitSprite],
            loop: false,
            repeat: 0
      });
    }
    enemy.setVelocityX(0);
    enemy.setVelocityY(0);
    enemy.canMove = false;
    this.time.addEvent({
          delay: this.player.stunTime,
          callback: this.removeStunEffect,
          callbackScope: this,
          args: [enemy],
          loop: false,
          repeat: 0
      });
    if (enemy.health <= 0 && enemy.active == true){
      this.destroyEnemy(enemy);
    };
  }

  reflect_projectiles(projectile, melee){
    if (this.player.reflect == true){
      console.log("REFLECT");
      projectile.destroy();
    }
  }

  slime_magic(magic_slime){
    this.sound.play("fireballSound", {volume: 0.1})
    var slime_magic = new Slime_Magic(this, magic_slime);
  }

  destroyEnemy(enemy){
    if(enemy == this.flameBigBoi || enemy == this.slimeBigBoi || enemy == this.generatingBoss || enemy == this.finalBoss){
      console.log("drop pick up power");
      var powerUpPickup = this.physics.add.sprite(enemy.x, enemy.y, "powerUpPickup");
      powerUpPickup.setScale(0.02);
      if(enemy == this.slimeBigBoi){
        powerUpPickup.id = 0;
      } else if(enemy == this.generatingBoss){
        powerUpPickup.id = 1;
      } else if(enemy == this.flameBigBoi){
        powerUpPickup.id = 2;
      }
      this.powerUpPickups.add(powerUpPickup);
      enemy.disableBody(true, true);
      this.player.xp += 500;
      this.events.emit('gainXp');
      if(this.player.xp >= this.player.xpForNextLevel){
        this.levelUp();
      }
      if(enemy == this.generatingBoss){
        this.generatingBossDead = true;
      }
      if(enemy == this.finalBoss){
        this.finalBossDead = true;
      }
    } else {
      if(Phaser.Math.Between(1, 100) <= 20){
        var healthPickup = this.physics.add.sprite(enemy.x, enemy.y, "healthPickup");
        healthPickup.setScale(0.02);
        this.healthPickups.add(healthPickup);
      }
      //enemy.destroy();
      enemy.disableBody(true, true);
      this.player.xp += 100;
      this.events.emit('gainXp');
      if(this.player.xp >= this.player.xpForNextLevel){
        this.levelUp();
      }
    }
  }

  removeStunEffect(enemy){
    //console.log(enemy);
    enemy.canMove = true;
    // if(enemy.active == true){
    //   enemy
    // }
  }

  moveSlimes(slime){
    if(slime.canMove == null || slime.canMove == true){
      var slimeX = this.player.x - slime.x;
      var slimeY = this.player.y - slime.y;
      if(Math.abs(slimeX) < this.slimeRange){
        if (Math.abs(slimeY) < this.slimeRange){
          slime.setVelocityX(Math.sign(slimeX)*slime.slimeSpeed);
          slime.setVelocityY(Math.sign(slimeY)*slime.slimeSpeed);
        }
      }
    }
    // if (Math.abs(slimeY) < this.slimeRange){
    //   slime.setVelocityX(Math.sign(slimeX)*this.slimeSpeed);
    //   slime.setVelocityY(Math.sign(slimeY)*(this.slimeSpeed));
    // }
  }

  moveGeneratedSlimes(slime){
    if(slime.canMove == null || slime.canMove == true){
      var slimeX = this.player.x - slime.x;
      var slimeY = this.player.y - slime.y;
      if(Math.abs(slimeX) < this.slimeRange){
        if (Math.abs(slimeY) < this.slimeRange){
          slime.body.velocity.x = Math.sign(slimeX)*slime.slimeSpeed;
          slime.body.velocity.y = Math.sign(slimeY)*slime.slimeSpeed;
        }
      }
    }
  }

  // generating_enemy(enemy){
  //   var generating_enemy = new GeneratingEnemy(this, enemy);
  // }

  //MECHANICAL RELATED FUNCTIONS:
  saveCheckpoint() {
    this.checkpoint = {
      //"player": Phaser.Utils.Objects.Clone(this.player),
      "playerX": this.player.x,
      "playerY": this.player.y,
      "playerLevel": this.player.level,
      "playerHealth": this.player.health,
      "playerMana": this.player.mana,
      "playerXp": this.player.xp,
      "playerMaxMana": this.player.maxMana,
      "playerMaxHealth": this.player.maxHealth,
      "playerXpForNextLevel": this.player.xpForNextLevel,
      "playerProjectileDamage": this.player.projectileDamage,
      "playerVulnerable": this.player.vulnerable,
      "playerCanShootProjectiles": this.player.canShootProjectiles,
      "playerProgress": this.player.progress,
      //"playerProjectileTimer": this.player.projectileTimer,
      "playerProjectileDelay": this.player.projectileDelay,
      "playerManaRegen" : this.player.manaRegen,
      "playerMeleeDamage": this.player.meleeDamage,
      "playercanAttack": this.player.canAttack,
      "playerCanRemove": this.player.canRemove,
      "playerAttackRemoval": this.player.attackRemoval,
      "playerAttackDelay": this.player.attackDelay,
      "playerCounter": this.player.counter,
      "playerAttackRemovalDelay": this.player.attackRemovalDelay,
      "playerReflect": this.player.reflect,
      "playerAoe": this.player.aoe,
      "playerAoeRange": this.player.aoeRange,
      "playerThunderwave": this.player.thunderwave,
      "playerStuntime": this.player.stunTime,
      "playerStun": this.player.stun
      // this.player.reflect = true;
      // this.player.aoe = true;
      // this.player.aoeRange = 100;
      // this.player.thunderwave = true;
      // this.player.stunTime = 1000;
      // "slimeEnemies": Phaser.Utils.Objects.Clone(this.slime_enemies),
      // "magicSlimeEnemies": Phaser.Utils.Objects.Clone(this.magic_slime_enemies)
    }
    var slimeEnemiesList = [];
    for(var i = 0; i < this.slime_enemies.children.size; i++){
      var slimeEnemyObj = {};
      slimeEnemyObj.health = this.slime_enemies.children.entries[i].health;
      slimeEnemyObj.active = this.slime_enemies.children.entries[i].active;
      slimeEnemyObj.x = this.slime_enemies.children.entries[i].x;
      slimeEnemyObj.y = this.slime_enemies.children.entries[i].y;
      slimeEnemiesList.push(slimeEnemyObj);
    }
    this.checkpoint.slimeEnemies = slimeEnemiesList;
    var slimeEnemiesList = [];
    for(var i = 0; i < this.magic_slime_enemies.children.size; i++){
      var slimeEnemyObj = {};
      slimeEnemyObj.health = this.magic_slime_enemies.children.entries[i].health;
      slimeEnemyObj.active = this.magic_slime_enemies.children.entries[i].active;
      slimeEnemyObj.mana = this.magic_slime_enemies.children.entries[i].mana;
      slimeEnemyObj.x = this.magic_slime_enemies.children.entries[i].x;
      slimeEnemyObj.y = this.magic_slime_enemies.children.entries[i].y;
      slimeEnemiesList.push(slimeEnemyObj);
    }
    this.checkpoint.magicSlimeEnemies = slimeEnemiesList;
    var healthPickupList = [];
    for(var i = 0; i < this.healthPickups.children.size; i++){
      if(!this.healthPickups.children.entries[i].active){
        this.healthPickups.children.entries[i].destroy();
        i--;
      } else {
        var healthPickupObj = {};
        healthPickupObj.x = this.healthPickups.children.entries[i].x;
        healthPickupObj.y = this.healthPickups.children.entries[i].y;
        healthPickupObj.active = this.healthPickups.children.entries[i].active;
        healthPickupList.push(healthPickupObj);
      }
    }
    this.checkpoint.healthPickupList = healthPickupList;
  }

  loadCheckpoint() {

    this.player.x = this.checkpoint.playerX;
    this.player.y = this.checkpoint.playerY;
    this.player.health = this.checkpoint.playerHealth;
    this.player.mana = this.checkpoint.playerMana;
    this.player.level = this.checkpoint.playerLevel;
    this.player.xp = this.checkpoint.playerXp;
    this.player.maxMana = this.checkpoint.playerMaxMana;
    this.player.maxHealth = this.checkpoint.playerMaxHealth;
    this.player.xpForNextLevel = this.checkpoint.playerXpForNextLevel;
    this.player.projectileDamage = this.checkpoint.playerProjectileDamage;
    this.player.vulnerable = this.checkpoint.playerVulnerable;
    this.player.canShootProjectiles = true;
    this.player.progress = this.checkpoint.playerProgress;
    this.player.projectileDelay = this.checkpoint.playerProjectileDelay;
    this.player.manaRegen = this.checkpoint.playerManaRegen;
    this.player.meleeDamage = this.checkpoint.playerMeleeDamage;
    this.player.canAttack = true;
    this.player.canRemove = this.checkpoint.playerCanRemove;
    this.player.attackRemoval = this.checkpoint.playerAttackRemoval;
    this.player.attackDelay = this.checkpoint.playerAttackDelay;
    this.player.counter = this.checkpoint.playerCounter;
    this.player.attackRemovalDelay = this.checkpoint.playerAttackRemovalDelay;
    this.player.reflect = this.checkpoint.playerReflect;
    this.player.aoe = this.checkpoint.playerAoe;
    this.player.aoeRange = this.checkpoint.playerAoeRange;
    this.player.thunderwave = this.checkpoint.playerThunderwave;
    this.player.stunTime = this.checkpoint.playerStuntime;
    this.player.stun = this.checkpoint.playerStun;
    this.events.emit('playerUseMagic');
    this.events.emit('playerHit');
    this.events.emit('gainXp');

    for(var i = 0; i < this.slime_enemies.children.size; i++){
      this.slime_enemies.children.entries[i].health = this.checkpoint.slimeEnemies[i].health;
      if(this.slime_enemies.children.entries[i].active == false && this.checkpoint.slimeEnemies[i].active == true){
        this.slime_enemies.children.entries[i].enableBody(true, this.checkpoint.slimeEnemies[i].x, this.checkpoint.slimeEnemies[i].y, true, true);
        this.slime_enemies.children.entries[i].refreshBody();
      } else if(this.slime_enemies.children.entries[i].active == true){
        this.slime_enemies.children.entries[i].x = this.checkpoint.slimeEnemies[i].x;
        this.slime_enemies.children.entries[i].y = this.checkpoint.slimeEnemies[i].y;
        this.slime_enemies.children.entries[i].setVelocityX(0);
        this.slime_enemies.children.entries[i].setVelocityY(0);
        this.slime_enemies.children.entries[i].refreshBody();
      }
    }
    for(var i = 0; i < this.magic_slime_enemies.children.size; i++){
      this.magic_slime_enemies.children.entries[i].health = this.checkpoint.magicSlimeEnemies[i].health;
      this.magic_slime_enemies.children.entries[i].mana = this.checkpoint.magicSlimeEnemies[i].mana;
      if(this.magic_slime_enemies.children.entries[i].active == false && this.checkpoint.magicSlimeEnemies[i].active == true){
        this.magic_slime_enemies.children.entries[i].enableBody(true, this.checkpoint.magicSlimeEnemies[i].x, this.checkpoint.magicSlimeEnemies[i].y, true, true);
        this.magic_slime_enemies.children.entries[i].refreshBody();
      } else if(this.magic_slime_enemies.children.entries[i].active == true){
        this.magic_slime_enemies.children.entries[i].x = this.checkpoint.magicSlimeEnemies[i].x;
        this.magic_slime_enemies.children.entries[i].y = this.checkpoint.magicSlimeEnemies[i].y;
        this.magic_slime_enemies.children.entries[i].setVelocityX(0);
        this.magic_slime_enemies.children.entries[i].setVelocityY(0);
        this.magic_slime_enemies.children.entries[i].refreshBody();
      }
    }

    for(var i = 0; i < this.generatedEnemies.children.size; i++){
      this.generatedEnemies.children.entries[i].destroy();
      i--;
    }

    for(var i = 0; i < this.checkpoint.healthPickupList.length; i++){
      if(this.healthPickups.children.entries[i].active == false && this.checkpoint.healthPickupList[i].active == true){
        this.healthPickups.children.entries[i].enableBody(true, this.checkpoint.healthPickupList[i].x, this.checkpoint.healthPickupList[i].y, true, true);
        this.healthPickups.children.entries[i].refreshBody();
      }
    }
    // this.projectiles.children.iterate((child) => {
    //   //child.destroy();
    //   //console.log(child);
    // });
    // for(var i = 0; i < this.slime_projectiles.children.size; i++){
    //   console.log(this.slime_projectiles.children.entries[i])
    //   this.slime_projectiles.children.entries[i].destroy();
    // }
    this.gameover = false;
  }

  pause(){
    //this.mainTheme.pause();
  }

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
    this.cursors.up.reset();
    this.cursors.down.reset();
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.spacebar.reset();
    //this.mainTheme.resume();
  }

  animation(){
    if (this.previous != this.test_direction){
      this.player.play(this.direction);
      this.previous = this.test_direction;
    }
  }

  addSlime(id, x, y){
    var slime = new Slime(this, id, x, y);
  }

  addMinions(id, x, y){
    var minion = new Minion(this, id, x , y);
  }

  minionsDead(){
    // this.slimeg7 = this.physics.add.sprite(this.slimeBigBoi.x + 50, this.slimeBigBoi.y, "slime_blue");
    // this.slimeg7.setScale(this.slime_scale);
    // this.slimeg7.play("blue_slime_anim");

    var xList = [this.generatingBoss.x + 50, this.generatingBoss.x - 50 ,this.generatingBoss.x + 25, this.generatingBoss.x - 25, this.generatingBoss.x - 25, this.generatingBoss.x + 25]
    var yList = [this.generatingBoss.y, this.generatingBoss.y, this.generatingBoss.y + 25, this.generatingBoss.y + 25, this.generatingBoss.y - 25, this.generatingBoss.y - 25]
    var counting = 0
    while (counting < 6){
      this.addSlime(this.slime_id, xList[counting], yList[counting]);
      this.slime_id += 1
      counting += 1
    }

    //this.slime_enemies.add(this.slimeg7);

    //this.generatedEnemies.add(this.slimeg7);

    this.generatedEnemies.children.each(child => {
      child.health = 200;
      // child.enableBody(true, true);
    });
  }

  finalMinionsDead(){
    // this.slimeg7 = this.physics.add.sprite(this.slimeBigBoi.x + 50, this.slimeBigBoi.y, "slime_blue");
    // this.slimeg7.setScale(this.slime_scale);
    // this.slimeg7.play("blue_slime_anim");

    var xList = [this.finalBoss.x + 50, this.finalBoss.x - 50 ,this.finalBoss.x + 25, this.finalBoss.x - 25, this.finalBoss.x - 25, this.finalBoss.x + 25]
    var yList = [this.finalBoss.y, this.finalBoss.y, this.finalBoss.y + 25, this.finalBoss.y + 25, this.finalBoss.y - 25, this.finalBoss.y - 25]
    var counting = 0
    while (counting < 6){
      this.addMinions(this.slime_id, xList[counting], yList[counting]);
      this.slime_id += 1
      counting += 1
    }

    //this.slime_enemies.add(this.slimeg7);

    //this.generatedEnemies.add(this.slimeg7);

    this.finalBossMinions.children.each(child => {
      child.health = 200;
      this.slime_magic(child);
      // child.enableBody(true, true);
    });
  }

  update(){
    //Camera should be locked onto player
    // game.camera.focusOnXY(player.x, player.y);
    // this.cameras.main.centerOn(this.player.width + 750, this.player.height - 100);
    // this.cameras.follow(this.player)
    // this.cameras.main.setBounds(0, 0, 1600, 1600);
    // this.cameras.main.startFollow(this.player);

    //Let's player move

    this.movePlayer();

    // if (this.player.reflect == true){
    //   this.physics.add.overlap(this.melee_attacks, this.slime_projectiles, this.reflect_projectiles, null, this);
    // }

    if(this.player.progress == 1 && this.player.x > this.map.widthInPixels- 155  && this.player.y > this.map.heightInPixels - 690){
      this.scene.launch('VillageCutScene');
      this.scene.pause();
    }

    //pause
    if(Phaser.Input.Keyboard.JustDown(this.p)){
      this.scene.launch('PauseScreenScene');
      this.scene.pause();
    }

    //cloak
    if (Phaser.Input.Keyboard.JustDown(this.c)){
      this.cloaking();
    }

    //aoe melee damage
    if(Phaser.Input.Keyboard.JustDown(this.q) && this.player.aoe == true){
      // var counterr = 0
      console.log('AOE attempt');
      this.player.health -= 100;
      this.normal_enemies.children.each(child => {
        var distanceX = this.player.x - child.x;
        var distanceY = this.player.y - child.y;
        if(Math.abs(distanceX) < this.player.aoeRange){
          if (Math.abs(distanceY) < this.player.aoeRange){
            this.aoe(this.player, child);
          }
        }
      });
    }

    //aoe magic damage and stun
    if(Phaser.Input.Keyboard.JustDown(this.e) && this.player.stun == true){
      console.log('STUN');
      if(this.player.mana >= 500 && this.player.canShootProjectiles){
        this.player.mana -= 500;
        this.events.emit('playerUseMagic');
        this.normal_enemies.children.each(child => {
          var distanceX = this.player.x - child.x;
          var distanceY = this.player.y - child.y;
          if(Math.abs(distanceX) < this.player.aoeRange){
            if (Math.abs(distanceY) < this.player.aoeRange){
              this.stun(this.player, child);
            }
          }
        });
      }
    }

    if (this.cursors.left.isDown){
      if (this.player.mana >= 50 && this.player.canShootProjectiles){
        this.magic_direction = "player_left"
        this.magic();
        this.player.mana -= 50;
        this.events.emit('playerUseMagic');
        this.sound.play("playerProjectileSound", {volume: 0.1});
        this.player.canShootProjectiles = false;
        this.player.projectileTimer = this.time.addEvent({
              delay: this.player.projectileDelay,
              callback: this.allowPlayerProjectiles,
              callbackScope: this,
              loop: false,
              repeat: 0
          });
      }
    } else if (this.cursors.right.isDown){
        if(this.player.mana >= 50 && this.player.canShootProjectiles){
          this.magic_direction = "player_right";
          this.magic();
          this.player.mana -= 50;
          this.events.emit('playerUseMagic');
          this.sound.play("playerProjectileSound", {volume: 0.1});
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
          this.sound.play("playerProjectileSound", {volume: 0.1});
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
          this.sound.play("playerProjectileSound", {volume: 0.1});
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

    if (this.spacebar.isDown){
      if(this.player.canAttack){
        this.attack();
        this.player.canAttack = false;
        this.player.attackTimer = this.time.addEvent({
              delay: this.player.attackDelay,
              callback: this.allowPlayerAttack,
              callbackScope: this,
              loop: false,
              repeat: 0,
        });
      }
    }

    this.melee_attacks.children.each(child => {
      child.update(this);
    });

    if(this.cloak){
      this.events.emit('playerUseMagic');
      this.player.mana -= 50;
      if (this.player.mana <= 0){
        this.cloak = false;
      }
    } else{
      this.events.emit('playerUseMagic');
      this.player.mana += this.player.manaRegen;
      if (this.player.mana > this.player.maxMana){
        this.player.mana = this.player.maxMana;
      }
    }

    this.magic_slime_enemies.children.each(child => {
      if(child.active == true){
        if (child.health <= 0){
          //this.destroyEnemy(child);
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
      }
    })

    this.slimeBigBoi.health += this.BossHealthRegen;
    this.flameBigBoi.health += this.BossHealthRegen;
    this.generatingBoss.health += this.BossHealthRegen;
    this.finalBoss.health += this.BossHealthRegen;

    this.flameBigBoi.mana += 1.5;
    this.finalBoss.mana += 2;

    this.slime_enemies.children.each(child => {
      if(child.active == true){
        this.moveSlimes(child);
      }
    });

    var generatedEnemy_Counter = 0;
    this.generatedEnemies.children.each(child => {
      // this.moveGeneratedSlimes(child)
      if (this.first == false){
        child.update(this);
      }
      if (child.health > 0){
        generatedEnemy_Counter += 1;
      } else {
        //child.destroy();
        child.destroy();
      }
    });

    if (generatedEnemy_Counter == 0 && this.generatingBossDead == false){
      this.minionsDead();
      this.first = false;
    }

    var finalEnemy_Counter = 0;
    this.finalBossMinions.children.each(child => {
      // this.moveGeneratedSlimes(child)
      if (this.finalFirst == false){
        child.update(this);
      }
      if (child.health > 0){
        finalEnemy_Counter += 1;
      } else {
        //child.destroy();
        child.destroy();
      }
    });
    if (finalEnemy_Counter == 0 && this.finalBossDead == false){
      this.finalMinionsDead();
      this.finalFirst = false;
    }
    console.log(this.player.x, this.player.y);
    this.generatingBoss.setVelocityX(0);
    this.generatingBoss.setVelocityY(0);
    if (this.player.health < this.player.maxHealth){
      this.player.health += this.player.healthregen
      this.events.emit('playerHit');
    }
  }
}
