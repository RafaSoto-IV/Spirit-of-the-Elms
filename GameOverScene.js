class GameOverScene extends Phaser.Scene {

    constructor(){
        super({ key: 'GameOverScene'});

    }

    create(){
        //  Grab a reference to the Game Scene
        this.ourGame = this.scene.get('playGame');

        const gameOverText = this.add.text(170, 50, "Game Over", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        const restartText = this.add.text(170, 130, "Restart", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );

        restartText.setInteractive(new Phaser.Geom.Rectangle(0, 0, restartText.width, restartText.height), Phaser.Geom.Rectangle.Contains);
        restartText.on('pointerdown', this.restartGame, this);
    }

    restartGame() {
      if(this.ourGame.player.progress > 1){
        this.ourGame.loadCheckpoint();
        this.scene.resume('playGame');
      } else {
        this.scene.stop('playGame');
        this.scene.start('playGame');
      }
      this.scene.stop();
    }
}
