class LevelUpScreenScene extends Phaser.Scene {

    constructor(){
        super({ key: 'LevelUpScreenScene'});

    }

    create(){
        //  Grab a reference to the Game Scene
        this.ourGame = this.scene.get('playGame');
        var levelUpImg = this.add.image(200, 150, "levelUpUi").setScale(2);
        this.descText = this.add.text(140, 250, "", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        // const levelText = this.add.text(170, 20, "Level " + this.ourGame.player.level, { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        // const instructionText = this.add.text(70, 50, "Click on the following text to increase your", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        // const instructionText2 = this.add.text(90, 70, "health, mana, or projectile damage.", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        // const healthText = this.add.text(150, 100, "Increase Health", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        // const manaText = this.add.text(150, 130, "Increase Mana", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        // const projectileDamageText = this.add.text(115, 160, "Increase Projectile Damage", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        // const projectileDelayText = this.add.text(118, 190, "Decrease Projectile Delay", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        // const meleeDamageText = this.add.text(120, 220, "Increase Melee Damage", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        // const meleeDelayText = this.add.text(123, 250, "Decrease Melee Delay", { fontFamily: "Verdana", fontSize: '12px', fill: '#FFF' }).setScale( 1 / this.cameras.main.zoom, 1 / this.cameras.main.zoom );
        //
        // manaText.setInteractive(new Phaser.Geom.Rectangle(0, 0, manaText.width, manaText.height), Phaser.Geom.Rectangle.Contains);
        // manaText.on('pointerdown', this.levelUpMana, this);
        // healthText.setInteractive(new Phaser.Geom.Rectangle(0, 0, healthText.width, healthText.height), Phaser.Geom.Rectangle.Contains);
        // healthText.on('pointerdown', this.levelUpHealth, this);
        // projectileDamageText.setInteractive(new Phaser.Geom.Rectangle(0, 0, projectileDamageText.width, projectileDamageText.height), Phaser.Geom.Rectangle.Contains);
        // projectileDamageText.on('pointerdown', this.levelUpProjectileDamage, this);
        // projectileDelayText.setInteractive(new Phaser.Geom.Rectangle(0, 0, projectileDelayText.width, projectileDelayText.height), Phaser.Geom.Rectangle.Contains);
        // projectileDelayText.on('pointerdown', this.levelUpProjectileDelay, this);
        // meleeDamageText.setInteractive(new Phaser.Geom.Rectangle(0, 0, meleeDamageText.width, meleeDamageText.height), Phaser.Geom.Rectangle.Contains);
        // meleeDamageText.on('pointerdown', this.levelUpMeleeDamage, this);
        // meleeDelayText.setInteractive(new Phaser.Geom.Rectangle(0, 0, meleeDelayText.width, meleeDelayText.height), Phaser.Geom.Rectangle.Contains);
        // meleeDelayText.on('pointerdown', this.levelUpMeleeDelay, this);
        levelUpImg.setInteractive(new Phaser.Geom.Rectangle(0, 0, config.width, config.height), Phaser.Geom.Rectangle.Contains);
        levelUpImg.on('pointerdown', this.imgClicked, this);
        this.buttonWidth = 45;

        //rect for testing/finding clickboxes of pause menu options
        //var rect = new Phaser.Geom.Rectangle(113, 100, 45, 45);
        // var rect = new Phaser.Geom.Rectangle(175, 100, 45, 45);
        //var rect = new Phaser.Geom.Rectangle(237, 100, 45, 45);
        //var rect = new Phaser.Geom.Rectangle(113, 151, 45, 45);
        // var rect = new Phaser.Geom.Rectangle(175, 151, 45, 45);
        // var rect = new Phaser.Geom.Rectangle(237, 151, 45, 45);
        // var graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });
        // graphics.fillRectShape(rect);
        this.pointer = this.input.activePointer;

    }

    update(){
      if((this.pointer.x <= 113 + this.buttonWidth && this.pointer.x >= 113) && (this.pointer.y <= 100 + this.buttonWidth && this.pointer.y >= 100)){
        // console.log("level up health desc");
        this.descText.setText("Increase health");
        this.descText.x = 150;
      } else if((this.pointer.x <= 175 + this.buttonWidth && this.pointer.x >= 175) && (this.pointer.y <= 100 + this.buttonWidth && this.pointer.y >= 100)){
        // console.log("level up melee damage desc");
        this.descText.setText("Increase melee damage");
        this.descText.x = 130;
      } else if((this.pointer.x <= 237 + this.buttonWidth && this.pointer.x >= 237) && (this.pointer.y <= 100 + this.buttonWidth && this.pointer.y >= 100)){
        // console.log("level up projectile damage desc");
        this.descText.setText("Increase projectile damage");
        this.descText.x = 120;
      } else if((this.pointer.x <= 113 + this.buttonWidth && this.pointer.x >= 113) && (this.pointer.y <= 151 + this.buttonWidth && this.pointer.y >= 151)){
        // console.log("level up mana desc")
        this.descText.setText("Increase mana");
        this.descText.x = 150;
      } else if((this.pointer.x <= 175 + this.buttonWidth && this.pointer.x >= 175) && (this.pointer.y <= 151 + this.buttonWidth && this.pointer.y >= 151)){
        // console.log("level up melee delay desc")
        this.descText.setText("Decrease melee attack delay");
        this.descText.x = 120;
      } else if((this.pointer.x <= 237 + this.buttonWidth && this.pointer.x >= 237) && (this.pointer.y <= 151 + this.buttonWidth && this.pointer.y >= 151)){
        // console.log("level up projectile delay desc");
        this.descText.setText("Decrease projectile attack delay");
        this.descText.x = 110;
      }
    }

    imgClicked(event){
      if((event.downX <= 113 + this.buttonWidth && event.downX >= 113) && (event.downY <= 100 + this.buttonWidth && event.downY >= 100)){
        console.log("level up health");
        this.levelUpHealth();
      } else if((event.downX <= 175 + this.buttonWidth && event.downX >= 175) && (event.downY <= 100 + this.buttonWidth && event.downY >= 100)){
        console.log("level up melee damage");
        this.levelUpMeleeDamage();
      } else if((event.downX <= 237 + this.buttonWidth && event.downX >= 237) && (event.downY <= 100 + this.buttonWidth && event.downY >= 100)){
        console.log("level up projectile damage");
        this.levelUpProjectileDamage();
      } else if((event.downX <= 113 + this.buttonWidth && event.downX >= 113) && (event.downY <= 151 + this.buttonWidth && event.downY >= 151)){
        console.log("level up mana")
        this.levelUpMana();
      } else if((event.downX <= 175 + this.buttonWidth && event.downX >= 175) && (event.downY <= 151 + this.buttonWidth && event.downY >= 151)){
        console.log("level up melee delay")
        this.levelUpMeleeDelay();
      } else if((event.downX <= 237 + this.buttonWidth && event.downX >= 237) && (event.downY <= 151 + this.buttonWidth && event.downY >= 151)){
        console.log("level up projectile delay");
        this.levelUpProjectileDelay();
      }
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
