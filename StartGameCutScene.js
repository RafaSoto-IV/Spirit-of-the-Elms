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
    this.envLayer2 = this.map.createStaticLayer('environment2', envtileset);
    this.envLayer2.setCollisionByProperty({ collides: true});
    this.envLayer.setCollisionByProperty({ collides: true});
    this.treeLayer.setCollisionByProperty({ collides: true});

    this.player = this.physics.add.sprite(this.map.widthInPixels - 380, 130, "player-left");
    this.sensei = this.physics.add.staticSprite(this.map.widthInPixels - 420, 130, "sensei");
    this.player.setScale(1.3);
    this.sensei.setScale(1.3);
    this.sensei.setSize(.1, .1);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.centerOn(this.map.widthInPixels - 380, 130);
    this.progress = 0;

    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    //this.dialogBox = this.add.image(1220, 230, 'dialogBox').setScale(2);
    this.dialogBox = this.add.sprite(this.map.widthInPixels - 380, 230, 'dialogBox').setScale(2);
    //sprite.setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );

    // this.dialogText = this.add.text(1110, 200, 'Monsters are attacking\nthe elm grove to the south.\nGo stop them!', { fontSize: '132px', fill: '#000' }).setScale(0.1);
    // this.dialogTextInstructions = this.add.text(1140, 250, '(Press Enter to exit dialogue)', { fontSize: '50px', fill: '#000' }).setScale(0.2);

    // this.dialogText = this.add.text(1110, 200, 'Monsters are attacking\nthe elm grove to the south.\nGo stop them!', { fontSize: '264px', fill: '#000' }).setScale(0.05);
    // this.dialogTextInstructions = this.add.text(1140, 250, '(Press Enter to exit dialogue)', { fontSize: '100px', fill: '#000' }).setScale(0.1);

    this.dialogText = this.add.text(this.map.widthInPixels - 490, 200, "Monsters are attacking the elm\ngrove and the village. They're going\nto destroy the elms there!", { fontFamily: "Verdana", fontSize: '12px', fill: '#000' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
    this.dialogTextInstructions = this.add.text(this.map.widthInPixels - 455, 248, '(Press Enter to progress dialogue)', { fontFamily: "Verdana", fontSize: '9px', fill: '#000' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );

    // this.dialogText = this.add.text(1110, 200, 'Monsters are attacking\nthe elm grove to the south.\nGo stop them!', { fontSize: '12px', fill: '#000' });
    // this.dialogTextInstructions = this.add.text(1140, 250, '(Press Enter to exit dialogue)', { fontSize: '8px', fill: '#000' });
    // console.log(this.dialogText.style);
    // var fontInfo = this.dialogText.style.fontSize.split('px');
    // this.dialogText.style.font = fontInfo[0]*this.sys.game.config.resolution + 'px' + fontInfo[1];
    // this.dialogText.setScale(1/this.sys.game.config.resolution)
    // var fontInfo = this.dialogTextInstructions.style.fontSize.split('px');
    // this.dialogTextInstructions.style.font = fontInfo[0]*this.sys.game.config.resolution + 'px' + fontInfo[1];
    // this.dialogTextInstructions.setScale(1/this.sys.game.config.resolution)
    this.mainTheme = this.sound.add("mainTheme", {
      volume: 0.1,
      loop: true,
    });
    this.mainTheme.play();
  }

  update(){
    if (Phaser.Input.Keyboard.JustDown(this.enterKey)){
      this.progress += 1;
    }
    if(this.progress == 1){
      this.dialogText.setText("They're doing this all over!\nIf the destruction of the elms isn't\nstopped, all the land will be\n   corrupted.");
      this.dialogTextInstructions.destroy(true);
    } else if(this.progress == 2){
      this.dialogText.setText("No nature will be able to live or\ngrow here. We'll be left to wither\naway in a barren land.");
    } else if(this.progress == 3){
      this.dialogText.setText("Save our home. Please.\nYou're the only one who can.");
    }else if(this.progress == 4){
      this.dialogText.setText("Follow the road south from your\nhome and take the first path to the\nwest to get to the elm grove. To\n   get to the village go south.");
    } else if(this.progress == 5){
      this.dialogText.setText("Press WASD to move. Press the\ncursor keys to shoot a projectile.\nPress spacebar to melee attack.\n   Press p to pause.");
    } else if(this.progress == 6){
      this.startGame();
    }
  }

  startGame(){
    this.dialogText.destroy(true);
    this.dialogBox.destroy(true);
    var time = this.mainTheme.seek;
    this.mainTheme.stop();
    this.mainTheme.destroy();
    this.scene.start("playGame", {mainThemeTime: time});
    this.scene.launch("uiScene");
    this.scene.bringToTop("uiScene");
  }

}
