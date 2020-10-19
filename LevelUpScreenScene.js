class LevelUpScreenScene extends Phaser.Scene {

    constructor(){
        super({ key: 'LevelUpScreenScene'});

    }

    create(){
        //  Grab a reference to the Game Scene
        this.ourGame = this.scene.get('playGame');
        const levelText = this.add.text(170, 50, "Level " + this.ourGame.player.level, { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        const instructionText = this.add.text(20, 80, "Click on the following text to increase your health or mana.", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        const healthText = this.add.text(150, 110, "Increase Health", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        const manaText = this.add.text(150, 140, "Increase Mana", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        const projectileDamageText = this.add.text(115, 170, "Increase Projectile Damage", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );

        manaText.setInteractive(new Phaser.Geom.Rectangle(0, 0, manaText.width, manaText.height), Phaser.Geom.Rectangle.Contains);
        manaText.on('pointerdown', this.levelUpMana, this);
        healthText.setInteractive(new Phaser.Geom.Rectangle(0, 0, healthText.width, healthText.height), Phaser.Geom.Rectangle.Contains);
        healthText.on('pointerdown', this.levelUpHealth, this);
        projectileDamageText.setInteractive(new Phaser.Geom.Rectangle(0, 0, projectileDamageText.width, projectileDamageText.height), Phaser.Geom.Rectangle.Contains);
        projectileDamageText.on('pointerdown', this.levelUpProjectileDamage, this);


    }

    levelUpMana(){
      this.ourGame.player.maxMana += 200;
      this.ourGame.player.mana = this.ourGame.player.maxMana;
      this.ourGame.events.emit('playerUseMagic');
      this.unPause();
    }

    levelUpHealth(){
      this.ourGame.player.maxHealth += 200;
      this.ourGame.player.health = this.ourGame.player.maxHealth;
      this.ourGame.events.emit('playerHit');
      this.unPause();
    }

    levelUpProjectileDamage(){
      this.ourGame.player.projectileDamage += 100;
      this.unPause();
    }

    unPause(){
      this.ourGame.player.xp = 0;
      this.ourGame.player.xpForNextLevel *=1.5;
      this.ourGame.events.emit('gainXp');
      this.scene.resume('playGame');
      this.scene.stop();
    }
}
