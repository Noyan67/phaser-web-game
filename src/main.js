import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("player", "https://labs.phaser.io/assets/sprites/phaser-dude.png");
    this.load.image("coin", "https://labs.phaser.io/assets/sprites/coin.png");
  }

  create() {
    this.player = this.physics.add.sprite(400, 300, "player");
    this.player.setCollideWorldBounds(true);

    this.coin = this.physics.add.sprite(200, 200, "coin");

    this.cursors = this.input.keyboard.createCursorKeys();

    this.score = 0;
    this.scoreText = this.add.text(10, 10, "Score: 0", {
      fontSize: "20px",
      fill: "#fff",
    });

    this.physics.add.overlap(this.player, this.coin, () => {
      this.score += 10;
      this.scoreText.setText("Score: " + this.score);
      this.coin.setPosition(
        Phaser.Math.Between(50, 750),
        Phaser.Math.Between(50, 550)
      );
    });
  }

  update() {
    const speed = 200;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
    if (this.cursors.right.isDown) this.player.setVelocityX(speed);
    if (this.cursors.up.isDown) this.player.setVelocityY(-speed);
    if (this.cursors.down.isDown) this.player.setVelocityY(speed);
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: "#1d1d1d",
  physics: {
    default: "arcade",
  },
  scene: GameScene,
});
