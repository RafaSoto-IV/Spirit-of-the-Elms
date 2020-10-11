class VillageCutScene extends Phaser.Scene {

    constructor(){
        super({ key: 'VillageCutScene'});
        this.mouseX;
        this.mouseY;
    }

    create(){
        //  Grab a reference to the Game Scene
        let ourGame = this.scene.get('playGame');
        console.log(ourGame.player);
        this.add.text(100, 100, "Fuck no");
        this.add.text(200,200, "click in this area")

        this.input.mouse.disableContextMenu();

        this.input.on('pointerdown', this.pointerHandler);
    }

    pointerHandler(pointer){
      this.mouseX = pointer.x;
      this.mouseY = pointer.y;
      //draw = true;

      if (pointer.leftButtonDown()){
        if((this.mouseX > 200 && this.mouseX < 250) && (this.mouseY > 200 && this.mouseY < 250)){
          this.scene.resume('playGame');
          this.scene.stop();
        }
          //color = 0xffff00;
      }
      // if (pointer.leftButtonDown() && pointer.rightButtonDown()){
      //     //color = 0x00ffff;
      // } else if (pointer.leftButtonDown()){
      //     //color = 0xffff00;
      // } else if (pointer.rightButtonDown()){
      //     //color = 0x00ff00;
      // }
    }


}
