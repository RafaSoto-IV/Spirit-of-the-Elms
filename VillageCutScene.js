class VillageCutScene extends Phaser.Scene {

    constructor(){
        super({ key: 'VillageCutScene'});
        this.mouseX;
        this.mouseY;
        //this.ourGame = this.scene.get('playGame');
    }

    create(){
      let ourGame = this.scene.get('playGame');

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
        //this.map = ourGame.map;
        //  Grab a reference to the Game Scene
        // let ourGame = this.scene.get('playGame');
        // console.log(ourGame.player);
        // const moveText = this.add.text(200,200, "click in this area")
        // moveText.setInteractive(new Phaser.Geom.Rectangle(0, 0, moveText.width, moveText.height), Phaser.Geom.Rectangle.Contains);
        // moveText.on('pointerdown', this.unPause, this);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.dialogBox = this.add.sprite(this.map.widthInPixels - 180, this.map.heightInPixels - 600, 'dialogBox').setScale(2);
        this.dialogText = this.add.text(this.map.widthInPixels - 285, this.map.heightInPixels - 630, "You're a sight for sore eyes.\nI wasn't sure I'd see\nanything besides these slimes.\n We could really use your help.", { fontFamily: "Verdana", fontSize: '12px', fill: '#000' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        // this.dialogBox = this.add.sprite(200, 250, 'dialogBox').setScale(2);
        // this.dialogText = this.add.text(92, 220, 'Welcome to village, save us!', { fontFamily: "Verdana", fontSize: '12px', fill: '#000' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );

        this.player = this.physics.add.sprite(this.map.widthInPixels - 120, this.map.heightInPixels - 680, "player-left");
        this.player.setScale(1.3);

        this.vendor = this.physics.add.staticSprite(this.map.widthInPixels - 1080, this.map.heightInPixels - 330, "vendor");
        this.vendor.setScale(1.3);

        this.hatGuy = this.physics.add.staticSprite(this.map.widthInPixels- 155, this.map.heightInPixels - 680, "hatGuy");
        this.hatGuy.setScale(1.3);

        this.physics.add.collider(this.player, this.vendor);

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true);
        this.progress = -1;
        this.readyToMove = false;
    }

    update(){
      if(this.progress == -1 || this.progress == 5){
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)){
          this.dialogText.destroy(true);
          this.dialogBox.destroy(true);
          this.progress+=1;
          this.readyToMove = true;
          //this.unPause();
        }
      }

      this.progressCutScene()

        //this.player.play(this.direction);
    }

    progressCutScene(){
      // console.log("progressCutScene")
      // console.log(this.progress)
      // console.log(this.readyToMove)
      if(this.readyToMove){
        // console.log("readyToMove true")
        if(this.progress == 0){
          // console.log("progress=0")
          this.player.play("player_left");
          this.player.setVelocityY(100);
          this.progress = 1;
          this.readyToMove = false;
          this.time.addEvent({
                delay: 3050,
                callback: () => {console.log("callback");this.readyToMove = true;},
                callbackScope: this,
                loop: false,
                repeat: 0
          });
        } else if(this.progress ==1){
          console.log("progress=1")
          this.player.play("player_left");
          this.player.setVelocityX(-100);
          this.player.setVelocityY(0);
          this.progress = 2;
          this.readyToMove = false;
          this.time.addEvent({
                delay: 7100,
                callback: () => {this.readyToMove = true},
                callbackScope: this,
                loop: false,
                repeat: 0
          });
        } else if(this.progress == 2){
          console.log("progress=3")
          this.player.play("player_left");
          this.player.setVelocityX(0);
          this.player.setVelocityY(100);
          this.progress = 3;
          this.readyToMove = false;
          this.time.addEvent({
                delay: 1500,
                callback: () => {this.readyToMove = true},
                callbackScope: this,
                loop: false,
                repeat: 0
          });
        } else if(this.progress == 3){
          console.log("progress=3")
          this.player.play("player_left");
          this.player.setVelocityX(-100);
          this.player.setVelocityY(0);
          this.progress = 4;
          this.readyToMove = false;
          this.time.addEvent({
                delay: 2200,
                callback: () => {this.readyToMove = true},
                callbackScope: this,
                loop: false,
                repeat: 0
          });
        } else if(this.progress == 4){
          console.log("progress=4")
          this.player.play("player_up");
          this.player.setVelocityX(0);
          this.player.setVelocityY(-100);
          this.progress = 5;
          this.readyToMove = false;
          this.time.addEvent({
                delay: 600,
                callback: this.vendorText,
                callbackScope: this,
                loop: false,
                repeat: 0
          });
        } else {
          // this.player.setVelocityX(0);
          // this.player.setVelocityY(0);
          this.unPause();
        }
      }
    }

    vendorText(){
      console.log("vendor text hit")
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      //this.readyToMove = true;
      this.dialogBox = this.add.sprite(this.map.widthInPixels - 1050, this.map.heightInPixels - 180, 'dialogBox').setScale(2);
      this.dialogText = this.add.text(this.map.widthInPixels - 1155, this.map.heightInPixels - 210, "We don't have much to eat with\nthe slimes poisoning the land.\nPlease help us or we'll starve.", { fontFamily: "Verdana", fontSize: '12px', fill: '#000' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
    }

    unPause(){
      let ourGame = this.scene.get('playGame');
      ourGame.player.progress = 2;
      //console.log(ourGame.player);
      ourGame.player.x = this.player.x;
      ourGame.player.y = this.player.y;
      this.scene.resume('playGame');
      this.scene.stop();
    }


}
