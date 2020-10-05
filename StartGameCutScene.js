class StartGameCutScene extends Phaser.Scene{
  constructor(){
    super("startingCutScene");
    this.dialogBox;
    this.dialogText;
    this.dialogTextInstructions;
    this.timer;
  }

  preload(){
  }

  create(){

    this.map = this.make.tilemap({ key: 'map' });
    const envtileset = this.map.addTilesetImage('envtileset', 'envtiles', 16, 16, 1, 2);
    const tileset = this.map.addTilesetImage('tileset', 'tiles', 16, 16, 1, 2);

    this.map.createStaticLayer('ground', tileset);
    this.treeLayer = this.map.createStaticLayer('trees', envtileset)
    this.envLayer = this.map.createStaticLayer('environment', envtileset);
    this.envLayer.setCollisionByProperty({ collides: true});
    this.treeLayer.setCollisionByProperty({ collides: true});

    this.player = this.physics.add.sprite(1220, 130, "player-left");
    this.sensei = this.physics.add.staticSprite(1180, 130, "sensei");
    this.player.setScale(1.3);
    this.sensei.setScale(1.3);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.centerOn(1220, 130);

    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    //this.dialogBox = this.add.image(1220, 230, 'dialogBox').setScale(2);
    this.dialogBox = this.add.sprite(1220, 230, 'dialogBox').setScale(2);
    this.dialogText = this.add.text(1110, 200, 'Monsters are attacking\nthe elm grove to the south.\nGo stop them!', { fontSize: '132px', fill: '#000' }).setScale(0.1);
    this.dialogTextInstructions = this.add.text(1140, 250, '(Press Enter to exit dialogue)', { fontSize: '50px', fill: '#000' }).setScale(0.2);

  }

  update(){
    if (Phaser.Input.Keyboard.JustDown(this.enterKey)){
      this.dialogTextInstructions.destroy(true)
      this.dialogText.destroy(true);
      this.dialogBox.destroy(true);
      this.scene.start("playGame");
      this.scene.launch("uiScene");
      this.scene.bringToTop("uiScene");
      }
  }

}
