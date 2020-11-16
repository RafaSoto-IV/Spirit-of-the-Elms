class GameOverScene extends Phaser.Scene {

    constructor(){
        super({ key: 'GameOverScene'});

    }

    create(){
        //  Grab a reference to the Game Scene
        this.ourGame = this.scene.get('playGame');
        if(this.ourGame.player.progress > 1){
          while(this.ourGame.slime_projectiles.children.size !=0){
            this.ourGame.slime_projectiles.children.entries[0].destroy();
          }
          while(this.ourGame.projectiles.children.size !=0){
            this.ourGame.projectiles.children.entries[0].destroy();
          }
          // for(var i = 0; i < this.ourGame.slime_projectiles.children.size; i++){
          //   console.log("destroy slime projectile " + i);
          //   console.log(this.ourGame.slime_projectiles.children.entries[i])
          //   this.ourGame.slime_projectiles.children.entries[i].destroy();
          // }
          for(var i = 0; i < this.ourGame.healthPickups.children.size; i++){
            if(i >= this.ourGame.checkpoint.healthPickupList.length || (this.ourGame.healthPickups.children.entries[i].x != this.ourGame.checkpoint.healthPickupList[i].x && this.ourGame.healthPickups.children.entries[i].y != this.ourGame.checkpoint.healthPickupList[i].y)) {
              this.ourGame.healthPickups.children.entries[i].destroy();
              i--;
            }
          }
        }

        const gameOverText = this.add.text(170, 50, "Game Over", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        const restartText = this.add.text(170, 130, "Restart", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );

        restartText.setInteractive(new Phaser.Geom.Rectangle(0, 0, restartText.width, restartText.height), Phaser.Geom.Rectangle.Contains);
        restartText.on('pointerdown', this.restartGame, this);
    }

    restartGame() {
      if(this.ourGame.player.progress > 1){
        this.ourGame.loadCheckpoint();
        this.ourGame.mainTheme.play({seek: 0});
        this.scene.resume('playGame');
      } else {
        this.ourGame.mainTheme.stop();
        this.ourGame.mainTheme.destroy();
        this.scene.stop('playGame');
        this.scene.stop('uiScene');
        this.scene.start('playGame');
        this.scene.launch("uiScene");
        this.scene.bringToTop("uiScene");
      }
      this.scene.stop();
    }
}
