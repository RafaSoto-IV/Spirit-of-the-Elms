class Scene1 extends Phaser.Scene{
  constructor(){
    super("bootGame");
  }

  preload(){
    this.load.spritesheet("titleScreen", "assets/images/spritesheets/title_screen-Sheet.png", {
      frameWidth: 200,
      frameHeight: 100
    });
    this.load.image('healthbar', 'healthbar.png');
    this.load.image('manabar', 'manabar.png');
    this.load.image('healthPickup', 'healthPickup.png');
    this.load.image('sensei', 'rpg-pack/chars/sensei/sensei.png');
    this.load.image('hatGuy', 'rpg-pack/chars/hat-guy/hat-guy.png');
    this.load.image('vendor', 'rpg-pack/chars/vendor/generic-rpg-vendor.png');
    this.load.image('dialogBox', 'rpg-pack/UI/generic-rpg-ui-text-box.png');
    this.load.image('envtiles', 'envtilesSheetExtruded.png');
    this.load.image('tiles', 'tilesSheetExtruded.png');
    this.load.tilemapTiledJSON('map', 'tileMap.json');
    //Sprite input here
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
    this.load.spritesheet("slime_magic", "assets/images/spritesheets/slime_magic.png",{
      frameWidth: 760/5,
      frameHeight: 152
  })
    this.load.spritesheet("slime_blue", "assets/images/spritesheets/slime-Sheet.png",{
      frameWidth: 96/6,
      frameHeight: 16
    });
  }

  create(){

    //Animate walking here
    this.anims.create({
      key: "player_right",
      frames: this.anims.generateFrameNumbers("player-right"),
      frameRate: 6,
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
    this.input.keyboard.on('keydown', function () {
      this.scene.start("startingCutScene");
    }, this);

    const titleScreen = this.add.sprite(200, 150, "titleScreen").setScale(2);
  }
}
