class uiScene extends Phaser.Scene {

    constructor(){
        super({ key: 'uiScene'});

    }

    create(){
        //  Grab a reference to the Game Scene
        let ourGame = this.scene.get('playGame');

        //  health and mana bars
        console.log(ourGame.player);
        this.healthbar = this.add.image(66, 10, 'healthbar');
        this.manabar = this.add.image(66, 20, 'manabar');
        this.healthbarMaxWidth = this.healthbar.width;
        var check = true;
        ourGame.events.on('playerHit', function () {
           //var rect = new Phaser.Geom.Rectangle(0, 0, 20 , this.healthbar.height);
           var width = ourGame.player.health/1000 * this.healthbar.width
           this.healthbar.setCrop(0, 0, width , this.healthbar.height);

       }, this);



    }
}
