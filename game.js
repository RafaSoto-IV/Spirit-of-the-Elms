var config = {
  width: 626,
  height: 417,
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2],
  physics: {
    default: "arcade",
    arcade:{
      debug: false
    }
  }
}

var gameSettings = {
  playerSpeed: 350
}
var game = new Phaser.Game(config)

function restart(){
  location.reload();
}
