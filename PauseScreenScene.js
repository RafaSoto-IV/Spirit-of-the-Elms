class PauseScreenScene extends Phaser.Scene {

    constructor(){
        super({ key: 'PauseScreenScene'});

    }

    create(){
        //  Grab a reference to the Game Scene
        this.ourGame = this.scene.get('playGame');
        this.scene.bringToTop("PauseScreenScene");
        const unPauseImg = this.add.image(200, 150, "pauseScreen").setScale(3);
        //const unPauseText = this.add.text(175, 150, "Unpause", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );

//        this.input.mouse.disableContextMenu();

      //  this.input.on('pointerdown', this.pointerHandler, this);
        unPauseImg.setInteractive(new Phaser.Geom.Rectangle(0, 0, config.width, config.height), Phaser.Geom.Rectangle.Contains);
        unPauseImg.on('pointerdown', this.imgClicked, this);


        //rect for testing/finding clickboxes of pause menu options
        // var rect = new Phaser.Geom.Rectangle(170, 255, 60, 30);
        // var graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });
        // graphics.fillRectShape(rect);

        this.p = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        if(this.ourGame.player.aoe == true){
          this.blueFamiliar = this.add.sprite(127, 150, 'blueFamiliar');
        }
        if(this.ourGame.player.reflect == true){
          this.yellowFamiliar = this.add.sprite(200, 150, 'redFamiliar');
        }
        if(this.ourGame.player.stun == true){
          this.redFamiliar = this.add.sprite(279, 150, 'yellowFamiliar');
        }
    }

    update(){
      if(Phaser.Input.Keyboard.JustDown(this.p)){
        this.unPause();
      }
    }

    imgClicked(event){
      if((event.downX <= 250 && event.downX >= 150) && (event.downY < 225 && event.downY >= 195) ){
        console.log("resume");
        this.unPause();
      } else if((event.downX <= 250 && event.downX >= 150) && (event.downY < 255 && event.downY >= 225) ){
        console.log("settings");
      } else if((event.downX <= 230 && event.downX >= 170) && (event.downY < 285 && event.downY >= 255) ){
        console.log("quit");
        this.ourGame.mainTheme.stop();
        this.ourGame.mainTheme.destroy();
        if(this.ourGame.finalbossThemePlaying){
          //console.log("stop final boss theme upon quit")
          this.ourGame.finalbossTheme.stop();
          this.ourGame.finalbossTheme.destroy();
        }
        this.scene.stop('playGame');
        this.scene.stop('uiScene');
        this.scene.start('bootGame');
        this.scene.stop();
      }
    }

    unPause(){
      this.scene.resume('playGame');
      this.scene.stop();
    }
    // pointerHandler(pointer){
    //   this.mouseX = pointer.x;
    //   this.mouseY = pointer.y;
    // console.log("mouse x: " + this.mouseX);
    // console.log("mouse y: " + this.mouseY);
    // // console.log(this.scene)
    // // console.log(this.ourGame)
    //   if (pointer.leftButtonDown()){
    //     if((this.mouseX > 200 && this.mouseX < 300) && (this.mouseY > 100 && this.mouseY < 150)){
    //       this.scene.resume('playGame');
    //       this.scene.stop();
    //     }
    //       //color = 0xffff00;
    //   }
    //   // if (pointer.leftButtonDown() && pointer.rightButtonDown()){
    //   //     //color = 0x00ffff;
    //   // } else if (pointer.leftButtonDown()){
    //   //     //color = 0xffff00;
    //   // } else if (pointer.rightButtonDown()){
    //   //     //color = 0x00ff00;
    //   // }
    // }
}
