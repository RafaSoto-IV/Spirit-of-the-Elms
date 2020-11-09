class Scene1 extends Phaser.Scene{
  constructor(){
    super("bootGame");
  }

  preload(){
    //Sounds
    this.load.audio("healSound", "assets/sounds/heal.wav");
    this.load.audio("fireballSound", "assets/sounds/fireball.wav");
    this.load.audio("slimeSound", "assets/sounds/slime.wav");
    this.load.audio("playerProjectileSound", "assets/sounds/playerProjectile.wav");

    this.load.spritesheet("titleScreen", "assets/images/spritesheets/title_screen-Sheet.png", {
      frameWidth: 200,
      frameHeight: 100
    });
    this.load.image("pauseScreen", "assets/images/spritesheets/pause1.png");
    // this.load.image('healthbar', 'healthbar.png');
    // this.load.image('manabar', 'manabar.png');
    // this.load.image('xpbar', 'xpbar.png');
    this.load.image('healthbar1', 'assets/images/spritesheets/health_bar1.png');
    this.load.image('manabar1', 'assets/images/spritesheets/mana_bar1.png');
    this.load.image('xpbar1', 'assets/images/spritesheets/xp_bar1.png');
    this.load.image('healthbar2', 'assets/images/spritesheets/health_bar2.png');
    this.load.image('manabar2', 'assets/images/spritesheets/mana_bar2.png');
    this.load.image('xpbar2', 'assets/images/spritesheets/xp_bar2.png');
    this.load.image('healthIcon', 'assets/images/spritesheets/health_icon.png');
    this.load.image('manaIcon', 'assets/images/spritesheets/mana_icon.png');
    this.load.image('xpIcon', 'assets/images/spritesheets/xp_icon.png');
    this.load.image('healthPickup', 'healthPickup.png');
    this.load.image('powerUpPickup', 'temppowerup.png')
    this.load.image('sensei', 'rpg-pack/chars/sensei/sensei.png');
    this.load.image('hatGuy', 'rpg-pack/chars/hat-guy/hat-guy.png');
    this.load.image('vendor', 'rpg-pack/chars/vendor/generic-rpg-vendor.png');
    this.load.image('dialogBox', 'rpg-pack/UI/generic-rpg-ui-text-box.png');
    this.load.image('envtiles', 'envtilesSheetExtruded.png');
    this.load.image('tiles', 'tilesSheetExtruded.png');
    this.load.image('attack', 'assets/images/spritesheets/hit1.png')
    this.load.tilemapTiledJSON('map', 'tileMap.json');
    //Sprite input here
    this.load.spritesheet("player-hit", "assets/images/spritesheets/witch_ow1.png", {
      frameWidth: 24,
      frameHeight: 24
    });
    this.load.spritesheet("player-right", "assets/images/spritesheets/witch-idle-run-Sheet.png", {
      frameWidth: 24,
      frameHeight: 24
    });
    this.load.spritesheet("player-left", "assets/images/spritesheets/witch-idle-run-Sheet_left.png", {
      frameWidth: 24,
      frameHeight: 24
    });
    this.load.spritesheet("cloak", "assets/images/spritesheets/explosion.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("magic", "assets/images/spritesheets/eldritch_magic.png",{
      frameWidth: 889/7,
      frameHeight: 110
    });
    this.load.spritesheet("slime_magic", "assets/images/spritesheets/fireball2-Sheet.png",{
      frameWidth: 64/4,
      frameHeight: 16
    })

    this.load.spritesheet("slime_red", "assets/images/spritesheets/fire_slug-Sheet.png",{
      frameWidth: 80/5,
      frameHeight: 16
    })

    this.load.spritesheet("slime_blue", "assets/images/spritesheets/slime-Sheet.png",{
      frameWidth: 96/6,
      frameHeight: 16
    });

    this.load.spritesheet("idle_left", "assets/images/spritesheets/witch-idle-idle-Sheet-Sheet.png",{
      frameWidth: 72/3,
      frameHeight: 24
    });

    this.load.spritesheet("idle_right", "assets/images/spritesheets/witch-idle-Sheet_right.png",{
      frameWidth: 72/3,
      frameHeight: 24
    })

    this.load.spritesheet("melee-left", "assets/images/spritesheets/witch-melee-left-Sheet.png",{
      frameWidth: 96/4,
      frameHeight: 24
    })

    this.load.spritesheet("melee-right", "assets/images/spritesheets/witch-melee-right-Sheet.png",{
      frameWidth: 96/4,
      frameHeight: 24
    })

    this.load.spritesheet("melee-up", "assets/images/spritesheets/witch-melee-up-Sheet.png",{
      frameWidth: 96/4,
      frameHeight: 24
    })

    this.load.spritesheet("melee-down", "assets/images/spritesheets/witch-melee-down-Sheet.png",{
      frameWidth: 96/4,
      frameHeight: 24
    })
  }

  create(){

    //Animate walking here
    this.anims.create({
      key: "player_hit",
      frames: this.anims.generateFrameNumbers("player-hit"),
      frameRate: 1,
      repeat: -1
    });
    this.anims.create({
      key: "player_right",
      frames: this.anims.generateFrameNumbers("player-right"),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: "idle_left_anim",
      frames: this.anims.generateFrameNumbers("idle_left"),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: "idle_right_anim",
      frames: this.anims.generateFrameNumbers("idle_right"),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: "player_left",
      frames: this.anims.generateFrameNumbers("player-left"),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: "cloak_anim",
      frames: this.anims.generateFrameNumbers("cloak"),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "magic_anim",
      frames: this.anims.generateFrameNumbers("magic"),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "slime_magic",
      frames: this.anims.generateFrameNumbers("slime_magic"),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: "red_slime_anim",
      frames: this.anims.generateFrameNumbers("slime_red"),
      frameRate: 5,
      repeat: -1
    })

    this.anims.create({
      key: "blue_slime_anim",
      frames: this.anims.generateFrameNumbers("slime_blue"),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: "title_screen_anim",
      frames: this.anims.generateFrameNumbers("titleScreen"),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: "melee-left",
      frames: this.anims.generateFrameNumbers("melee-left"),
      frameRate: 8,
      repeat: 0
    })

    this.anims.create({
      key: "melee-right",
      frames: this.anims.generateFrameNumbers("melee-right"),
      frameRate: 8,
      repeat: 0
    })

    this.anims.create({
      key: "melee-up",
      frames: this.anims.generateFrameNumbers("melee-up"),
      frameRate: 8,
      repeat: 0
    })

    this.anims.create({
      key: "melee-down",
      frames: this.anims.generateFrameNumbers("melee-down"),
      frameRate: 8,
      repeat: 0
    })
    this.input.keyboard.on('keydown', function () {
      this.scene.start("startingCutScene");
    }, this);

    const titleScreen = this.add.sprite(200, 150, "titleScreen").setScale(2);
  }
}
