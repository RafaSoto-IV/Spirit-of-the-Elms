class PauseScreenScene extends Phaser.Scene {

    constructor(){
        super({ key: 'PauseScreenScene'});

    }

    create(){
        //  Grab a reference to the Game Scene
        console.log("Paise Screen")
        this.ourGame = this.scene.get('playGame');
        this.add.text(100,100, "click in this area")

        this.input.mouse.disableContextMenu();

        this.input.on('pointerdown', this.pointerHandler, this);
    }

    pointerHandler(pointer){
      console.log("click");
      // console.log(pointer);
      // console.log(pointer.position);
      // console.log(pointer.position.x);
      // console.log(pointer.position.y);
      // console.log(pointer.x);
      // console.log(pointer.y);
      // console.log(pointer.worldX);
      // console.log(pointer.worldY);
      // this.mouseX = pointer.position.x;
      // this.mouseY = pointer.position.y;
      this.mouseX = pointer.x;
      this.mouseY = pointer.y;
      //draw = true;
    console.log("mouse x: " + this.mouseX);
    console.log("mouse y: " + this.mouseY);
    console.log(this.scene)
    console.log(this.ourGame)
      if (pointer.leftButtonDown()){
        if((this.mouseX > 200 && this.mouseX < 300) && (this.mouseY > 100 && this.mouseY < 150)){
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
