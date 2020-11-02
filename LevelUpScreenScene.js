class LevelUpScreenScene extends Phaser.Scene {

    constructor(){
        super({ key: 'LevelUpScreenScene'});

    }

    create(){
        //  Grab a reference to the Game Scene
        this.ourGame = this.scene.get('playGame');
        const levelText = this.add.text(170, 20, "Level " + this.ourGame.player.level, { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        const instructionText = this.add.text(70, 50, "Click on the following text to increase your", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        const instructionText2 = this.add.text(90, 70, "health, mana, or projectile damage.", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        const healthText = this.add.text(150, 100, "Increase Health", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        const manaText = this.add.text(150, 130, "Increase Mana", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        const projectileDamageText = this.add.text(115, 160, "Increase Projectile Damage", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        const projectileDelayText = this.add.text(118, 190, "Decrease Projectile Delay", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        const meleeDamageText = this.add.text(120, 220, "Increase Melee Damage", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        const meleeDelayText = this.add.text(123, 250, "Decrease Melee Delay", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );

        manaText.setInteractive(new Phaser.Geom.Rectangle(0, 0, manaText.width, manaText.height), Phaser.Geom.Rectangle.Contains);
        manaText.on('pointerdown', this.levelUpMana, this);
        healthText.setInteractive(new Phaser.Geom.Rectangle(0, 0, healthText.width, healthText.height), Phaser.Geom.Rectangle.Contains);
        healthText.on('pointerdown', this.levelUpHealth, this);
        projectileDamageText.setInteractive(new Phaser.Geom.Rectangle(0, 0, projectileDamageText.width, projectileDamageText.height), Phaser.Geom.Rectangle.Contains);
        projectileDamageText.on('pointerdown', this.levelUpProjectileDamage, this);
        projectileDelayText.setInteractive(new Phaser.Geom.Rectangle(0, 0, projectileDelayText.width, projectileDelayText.height), Phaser.Geom.Rectangle.Contains);
        projectileDelayText.on('pointerdown', this.levelUpProjectileDelay, this);
        meleeDamageText.setInteractive(new Phaser.Geom.Rectangle(0, 0, meleeDamageText.width, meleeDamageText.height), Phaser.Geom.Rectangle.Contains);
        meleeDamageText.on('pointerdown', this.levelUpMeleeDamage, this);
        meleeDelayText.setInteractive(new Phaser.Geom.Rectangle(0, 0, meleeDelayText.width, meleeDelayText.height), Phaser.Geom.Rectangle.Contains);
        meleeDelayText.on('pointerdown', this.levelUpMeleeDelay, this);


    }

    levelUpMana(){
      this.ourGame.player.maxMana += 200;
      this.ourGame.player.mana = this.ourGame.player.maxMana;
      this.ourGame.player.manaRegen += 1;
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
      this.ourGame.player.projectileDamage += 50;
      this.unPause();
    }

    levelUpProjectileDelay(){
      if (this.ourGame.player.projectileDelay > 100){
        this.ourGame.player.projectileDelay -= 100;
      }
      this.unPause();
    }

    levelUpMeleeDamage(){
      this.ourGame.player.meleeDamage += 50;
      this.unPause();
    }

    levelUpMeleeDelay(){
      if (this.ourGame.player.attackDelay > 100){
        this.ourGame.player.atttackDelay -= 100;
      }
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
