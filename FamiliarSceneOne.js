class FamiliarSceneOne extends Phaser.Scene {

    constructor(){
        super({ key: 'FamiliarSceneOne'});

    }

    create(){
        //  Grab a reference to the Game Scene
        let ourGame = this.scene.get('playGame');

        // ourGame.mainTheme.pause();
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.dialogBox = this.add.sprite(200, 220, 'dialogBox').setScale(2);
        this.dialogText = this.add.text(110, 198, "You saved the blue familiar!\n As thanks, it wants to join\n you on your journey.\n ", { fontFamily: "Verdana", fontSize: '12px', fill: '#000' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        this.blueFamiliar = this.add.sprite(200, 100, 'blueFamiliar');

        this.progress = 0;

      }
      update(){
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)){
          this.progress += 1;
        }


        if(this.progress == 1){
          console.log("prog1");
          this.dialogText.setText("The blue familiar lends you \n the power of the \n WITCH'S FURY.");

        } else if(this.progress == 2){
          console.log("prog2");
          this.dialogText.setText("You can now perform spin\n attacks using Q at the\n cost of health!");
        } else if(this.progress == 3){
          console.log("prog3");
          this.unPause();
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
