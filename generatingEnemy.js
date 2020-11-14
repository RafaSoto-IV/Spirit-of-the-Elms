class GeneratingEnemy extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y) { //enemy){
    //var x = enemy.x
    //var y = enemy.y
    var x = x;
    var y = y;

    super(scene, x, y);

    this.slimeg1 = scene.physics.add.sprite(this.x + 50, this.y, "slime_blue");
    this.slimeg1.setScale(this.slime_scale);
    this.slimeg1.play("blue_slime_anim");

    // this.slimeg2 = scene.physics.add.sprite(this.x - 50, this.y, "slime_blue");
    // this.slimeg2.setScale(this.slime_scale);
    // this.slimeg2.play("blue_slime_anim");
    //
    // this.slimeg3 = scene.physics.add.sprite(this.x + 25, this.y + 25, "slime_blue");
    // this.slimeg3.setScale(this.slime_scale);
    // this.slimeg3.play("blue_slime_anim");
    //
    // this.slimeg4 = scene.physics.add.sprite(this.x - 25, this.y + 25, "slime_blue");
    // this.slimeg4.setScale(this.slime_scale);
    // this.slimeg4.play("blue_slime_anim");
    //
    // this.slimeg5 = scene.physics.add.sprite(this.x - 25, this.y - 25, "slime_blue");
    // this.slimeg5.setScale(this.slime_scale);
    // this.slimeg5.play("blue_slime_anim");
    //
    // this.slimeg6 = scene.physics.add.sprite(this.x + 25, this.y - 25, "slime_blue");
    // this.slimeg6.setScale(this.slime_scale);
    // this.slimeg6.play("blue_slime_anim");

    scene.slime_enemies.add(this.slimeg1);
    // scene.slime_enemies.add(this.slimeg2);
    // scene.slime_enemies.add(this.slimeg3);
    // scene.slime_enemies.add(this.slimeg4);
    // scene.slime_enemies.add(this.slimeg5);
    // scene.slime_enemies.add(this.slimeg6);

    //scene.generatedEnemies.add(this.slimeg1);
    scene.normal_enemies.add(this.slimeg1);
    // scene.generatedEnemies.add(this.slimeg2);
    // scene.generatedEnemies.add(this.slimeg3);
    // scene.generatedEnemies.add(this.slimeg4);
    // scene.generatedEnemies.add(this.slimeg5);
    // scene.generatedEnemies.add(this.slimeg6);

    scene.add.existing(this);
    //scene.physics.world.enableBody(this);

  }

  update(){
    console.log("WHY IS THIS NOT WORKING");
    var counter = 0
    this.generatedEnemies.children.each(child => {
      counter += 1
      console.log("??");
    });
    console.log(counter);

    if (counter == 0){
      this.slimeg1 = this.physics.add.sprite(this.x + 50, this.y, "slime_blue");
      this.slimeg1.setScale(this.slime_scale);
      this.slimeg1.play("blue_slime_anim");

      this.slimeg2 = this.physics.add.sprite(this.x - 50, this.y, "slime_blue");
      this.slimeg2.setScale(this.slime_scale);
      this.slimeg2.play("blue_slime_anim");

      this.slimeg3 = this.physics.add.sprite(this.x + 25, this.y + 25, "slime_blue");
      this.slimeg3.setScale(this.slime_scale);
      this.slimeg3.play("blue_slime_anim");

      this.slimeg4 = this.physics.add.sprite(this.x - 25, this.y + 25, "slime_blue");
      this.slimeg4.setScale(this.slime_scale);
      this.slimeg4.play("blue_slime_anim");

      this.slimeg5 = this.physics.add.sprite(this.x - 25, this.y - 25, "slime_blue");
      this.slimeg5.setScale(this.slime_scale);
      this.slimeg5.play("blue_slime_anim");

      this.slimeg6 = this.physics.add.sprite(this.x + 25, this.y - 25, "slime_blue");
      this.slimeg6.setScale(this.slime_scale);
      this.slimeg6.play("blue_slime_anim");

      scene.slime_enemies.add(this.slimeg1);
      scene.slime_enemies.add(this.slimeg2);
      scene.slime_enemies.add(this.slimeg3);
      scene.slime_enemies.add(this.slimeg4);
      scene.slime_enemies.add(this.slimeg5);
      scene.slime_enemies.add(this.slimeg6);

      this.generatedEnemies.add(this.slimeg1);
      this.generatedEnemies.add(this.slimeg2);
      this.generatedEnemies.add(this.slimeg3);
      this.generatedEnemies.add(this.slimeg4);
      this.generatedEnemies.add(this.slimeg5);
      this.generatedEnemies.add(this.slimeg6);
    }
  }
}
