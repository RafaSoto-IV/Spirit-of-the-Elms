class Credits extends Phaser.Scene {

    constructor(){
        super({ key: 'Credits'});

    }

    create(){
        //  Grab a reference to the Game Scene
        console.log("credits.js")
        let ourGame = this.scene.get('playGame');

        // ourGame.mainTheme.pause();
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.dialogBox = this.add.sprite(200, 240, 'dialogBox').setScale(2);
        this.dialogText = this.add.text(110, 218, "You beat the Spider Queen!\nShe will no longer threaten\nthe forest with her minions.", { fontFamily: "Verdana", fontSize: '12px', fill: '#000' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        if(ourGame.player.aoe == true){
          this.blueFamiliar = this.add.sprite(127, 190, 'blueFamiliar');
        }
        if(ourGame.player.reflect == true){
          this.redFamiliar = this.add.sprite(200, 190, 'redFamiliar');
        }
        if(ourGame.player.stun == true){
          this.yellowFamiliar = this.add.sprite(279, 190, 'yellowFamiliar');
        }
        // var rect = new Phaser.Geom.Rectangle(237, 151, 45, 45);
        // var graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });
        // graphics.fillRectShape(rect);
        this.progress = 0;

      }
      update(){
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)){
          this.progress += 1;
        }


        if(this.progress == 1){
          console.log("prog1");
          this.dialogText.setText("Nature won't be corrupted\nanymore and can finally heal.");

        } else if(this.progress == 2){
          console.log("prog2");
          this.dialogText.setText("You've saved everyone.\nWe're forever thankful.");
        } else if(this.progress == 3){
          console.log("prog3");
          var rect = new Phaser.Geom.Rectangle(0, 0, 400, 300);
          var graphics = this.add.graphics({ fillStyle: { color: 0x000000 } });
          graphics.fillRectShape(rect);
          this.titleText = this.add.text(105, 30, "Spirit of the Elms", { fontFamily: "Verdana", fontSize: '24px', fill: '#ffffff' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
          this.subtitleText = this.add.text(140, 60, "By TER Studios", { fontFamily: "Verdana", fontSize: '16px', fill: '#ffffff' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
          this.creditText = this.add.text(150, 90, 'Art:\nEstudio Vaca Toxa\nTfonez\nCethiel\nElena\n\nMusic:\nWingless Seraph "YouFulca"\n\nProgramming:\nTyler\nElena\nRoof', { fontFamily: "Verdana", fontSize: '12px', fill: '#ffffff' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
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
