class VillageCutScene extends Phaser.Scene {

    constructor(){
        super({ key: 'VillageCutScene'});
        this.mouseX;
        this.mouseY;
        //this.ourGame = this.scene.get('playGame');
    }

    create(){
      let ourGame = this.scene.get('playGame');
        this.map = ourGame.map;
        //  Grab a reference to the Game Scene
        // let ourGame = this.scene.get('playGame');
        // console.log(ourGame.player);
        // const moveText = this.add.text(200,200, "click in this area")
        // moveText.setInteractive(new Phaser.Geom.Rectangle(0, 0, moveText.width, moveText.height), Phaser.Geom.Rectangle.Contains);
        // moveText.on('pointerdown', this.unPause, this);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        // this.dialogBox = this.add.sprite(this.map.widthInPixels - 380, this.map.heightInPixels - 680, 'dialogBox').setScale(2);
        // this.dialogText = this.add.text(this.map.widthInPixels - 490, this.map.heightInPixels - 680, 'Welcome to village', { fontFamily: "Verdana", fontSize: '12px', fill: '#000' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        this.dialogBox = this.add.sprite(200, 250, 'dialogBox').setScale(2);
        this.dialogText = this.add.text(92, 220, 'Welcome to village, save us!', { fontFamily: "Verdana", fontSize: '12px', fill: '#000' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );

    }

    update(){
      if (Phaser.Input.Keyboard.JustDown(this.enterKey)){
        this.dialogText.destroy(true);
        this.dialogBox.destroy(true);
        this.unPause();
        }
    }

    unPause(){
      let ourGame = this.scene.get('playGame');
      ourGame.player.progress = 2;
      this.scene.resume('playGame');
      this.scene.stop();
    }


}
