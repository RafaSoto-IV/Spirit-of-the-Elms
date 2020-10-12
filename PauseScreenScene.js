class PauseScreenScene extends Phaser.Scene {

    constructor(){
        super({ key: 'PauseScreenScene'});

    }

    create(){
        //  Grab a reference to the Game Scene
        this.ourGame = this.scene.get('playGame');
        const unPauseText = this.add.text(175, 150, "Unpause", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );

//        this.input.mouse.disableContextMenu();

      //  this.input.on('pointerdown', this.pointerHandler, this);
        unPauseText.setInteractive(new Phaser.Geom.Rectangle(0, 0, unPauseText.width, unPauseText.height), Phaser.Geom.Rectangle.Contains);
        unPauseText.on('pointerdown', this.unPause, this);

        this.p = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update(){
      if(Phaser.Input.Keyboard.JustDown(this.p)){
        this.scene.resume('playGame');
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
