class Scene1 extends Phaser.Scene{
  constructor(){
    super("bootGame");
  }

  preload(){
    this.load.image('envtiles', 'envtilesSheet.png')
    this.load.image('tiles', 'tilesSheet.png');
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
    this.load.spritesheet("magic", "assets/images/spritesheets/explosion.png",{
      frameWidth: 16,
      framHeight: 16
    });
  }

  create(){
    this.add.text(20, 20, "Loading Game");

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
      key: "magic_anim",
      frames: this.anims.generateFrameNumbers("magic"),
      frameRate: 5,
      repeat: -1
    });

    this.scene.start("playGame");
  }
}
