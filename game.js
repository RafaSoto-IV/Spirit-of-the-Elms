var config = {
  width: 400,
  height: 300,
  backgroundColor: 0x000000,
  scene: [Scene1, StartGameCutScene, Scene2, uiScene, PauseScreenScene, VillageCutScene],
  physics: {
    default: "arcade",
    arcade:{
      debug: false
    }
  },
  scale: {
    zoom: 2
  },
  render: {
        //antialias: false,
        pixelArt: true
        //roundPixels: true
    }
}

var gameSettings = {
  playerSpeed: 400
}
var game = new Phaser.Game(config)

function restart(){
  location.reload();
}
