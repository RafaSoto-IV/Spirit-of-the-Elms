var config = {
  width: 400,
  height: 300,
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2],
  physics: {
    default: "arcade",
    arcade:{
      debug: false
    }
  },
  scale: {
    zoom: 2
  }
}

var gameSettings = {
  playerSpeed: 200
}
var game = new Phaser.Game(config)

function restart(){
  location.reload();
}
