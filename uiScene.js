class uiScene extends Phaser.Scene {

    constructor(){
        super({ key: 'uiScene'});

    }

    create(){
        //  Grab a reference to the Game Scene
        let ourGame = this.scene.get('playGame');

        //  health and mana bars
        //console.log(ourGame.player);
        this.healthbarEmpty = this.add.image(30, 10, 'healthbar2');
        this.manabarEmpty = this.add.image(30, 20, 'manabar2');
        this.xpbarEmpty = this.add.image(30, 30, 'xpbar2');
        this.healthbar = this.add.image(30, 10, 'healthbar1');
        this.manabar = this.add.image(30, 20, 'manabar1');
        this.xpbar = this.add.image(30, 30, 'xpbar1');
        this.healthbarIcon = this.add.image(12, 10, 'healthIcon');
        this.manabarIcon = this.add.image(12, 20, 'manaIcon');
        this.xpbarIcon = this.add.image(12, 29, 'xpIcon');
        this.xpbar.setCrop(0, 0, 0, this.xpbar.height);
        this.healthbarMaxWidth = this.healthbar.width;
        var check = true;
        ourGame.events.on('playerHit', function () {
           //var rect = new Phaser.Geom.Rectangle(0, 0, 20 , this.healthbar.height);
           var width = ourGame.player.health/ourGame.player.maxHealth * this.healthbar.width;
           this.healthbar.setCrop(0, 0, width , this.healthbar.height);

       }, this);
       ourGame.events.on('playerUseMagic', function () {
          var width = ourGame.player.mana/ourGame.player.maxMana * this.manabar.width;
          this.manabar.setCrop(0, 0, width , this.manabar.height);

      }, this);
      ourGame.events.on('gainXp', function () {
         var width = ourGame.player.xp/ourGame.player.xpForNextLevel * this.xpbar.width;
         this.xpbar.setCrop(0, 0, width , this.xpbar.height);

     }, this);



    }
}
