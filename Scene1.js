class Scene1 extends Phaser.Scene{
  constructor(){
    super("bootGame");
  }

  preload(){
    this.load.image('envtiles', 'envtilesSheet.png')
    this.load.image('tiles', 'tilesSheet.png');
    this.load.tilemapTiledJSON('map', 'tileMap.json');
    //Sprite input here
    // this.load.spritesheet("player", "assets/images/spritesheets/", {
    //   frameWidth: 2064/8,
    //   frameHeight: 258
    // });
    // this.load.spritesheet("", "", {
    //   frameWidth: 16,
    //   frameHeight: 16
    // });
  }

  create(){
    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame");

    //Animate walking here
    this.anims.create({
      key: "player_anim",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 3,
      repeat: -1
    });

  }
}
