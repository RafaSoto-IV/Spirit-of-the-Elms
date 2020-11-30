class Credits extends Phaser.Scene {

    constructor(){
        super({ key: 'Credits'});

    }

    create(){
        //  Grab a reference to the Game Scene
        let ourGame = this.scene.get('playGame');

        // ourGame.mainTheme.pause();
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.dialogBox = this.add.sprite(200, 220, 'dialogBox').setScale(2);
        this.dialogText = this.add.text(110, 198, "Credits\n ", { fontFamily: "Verdana", fontSize: '12px', fill: '#000' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );

        this.progress = 0;

      }
      update(){
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)){
          this.progress += 1;
        }


        if(this.progress == 1){
          console.log("prog1");
          this.dialogText.setText("...");

        } else if(this.progress == 2){
          console.log("prog2");
          this.dialogText.setText("....");
        } else if(this.progress == 3){
          console.log("prog3");
          //this.unPause();
        }

      }


      unPause(){
        console.log("time to unpause");
        let ourGame = this.scene.get('playGame');
        ourGame.direction = "idle_left_anim";

        ourGame.player.health = ourGame.player.maxHealth;
        ourGame.events.emit('playerHit');
        ourGame.mainTheme.play({seek: 0});
        this.scene.resume('playGame');
        this.scene.stop();
      }

}
