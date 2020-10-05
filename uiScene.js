class uiScene extends Phaser.Scene {

    constructor(){
        super({ key: 'uiScene'});

    }

    // preload(){
    //   this.load.image('healthbar', 'healthbar.png');
    //   this.load.image('manabar', 'manabar.png');
    // }


    create(){
        //  Grab a reference to the Game Scene
        let ourGame = this.scene.get('playGame');
        //  health and mana bars
        console.log(ourGame.player);
        this.healthbar = this.add.image(66, 58, 'healthbar');
        this.manabar = this.add.image(66, 60, 'manabar');
        this.healthbarMaxWidth = this.healthbar.width;
        // this.healthbar = this.add.image(ourGame.player.x - 130, ourGame.player.y - 75, 'healthbar');
        // this.manabar = this.add.image(ourGame.player.x - 130, ourGame.player.y - 73, 'manabar');
        console.log(this.healthbar);
        // this.healthbar.setScrollFactor(0);
        // this.manabar.setScrollFactor(0);
        ourGame.events.on('playerHit', function () {
           //console.log("Player hit");
           console.log(this.healthbar.width)
           console.log(this.healthbar.height)
           this.healthbar.displayWidth = 100;
           //this.healthbar.setDisplaySize(100, this.healthbar.height)
       }, this);



    }
}
