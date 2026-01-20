import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  constructor() {
    super("game");
    this.score = 0;
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;

    this.add.rectangle(w / 2, h / 2, w, h, 0x0b1020);

    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "20px",
      color: "#ffffff",
    });

    this.player = this.add.rectangle(w / 2, h / 2, 30, 30, 0x4f8cff);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    this.coin = this.add.circle(100, 100, 10, 0xffd34d);
    this.physics.add.existing(this.coin);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.overlap(this.player, this.coin, () => {
      this.score += 10;
      this.scoreText.setText("Score: " + this.score);
      this.coin.setPosition(
        Phaser.Math.Between(30, w - 30),
        Phaser.Math.Between(30, h - 30)
      );
    });
  }

  update() {
    const speed = 200;
    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown) this.player.body.setVelocityX(-speed);
    if (this.cursors.right.isDown) this.player.body.setVelocityX(speed);
    if (this.cursors.up.isDown) this.player.body.setVelocityY(-speed);
    if (this.cursors.down.isDown) this.player.body.setVelocityY(speed);
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  parent: "app",
  width: 800,
  height: 500,
  backgroundColor: "#0b1020",
  physics: { default: "arcade" },
  scene: GameScene,
});

