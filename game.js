var config = {
  width: 1600,
  height: 1600,
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
  playerSpeed: 200
}
var game = new Phaser.Game(config)

function restart(){
  location.reload();
}
