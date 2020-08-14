import Phaser from 'phaser';

import TextureKeys from "~/consts/TextureKeys";
import AnimationKeys from "~/consts/AnimationKeys";
import LaserObstacle from "~/game/LaserObstacle";

export default class RocketMouse extends Phaser.GameObjects.Container {

  private mouse: Phaser.GameObjects.Sprite;

  private flames: Phaser.GameObjects.Sprite;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.mouse = scene.add.sprite(0, 0, TextureKeys.RocketMouse)
      .setOrigin(0.5, 1)
      .play(AnimationKeys.RocketMouseRun);

    this.flames = scene.add.sprite(-63, -15, TextureKeys.RocketMouse)
      .play(AnimationKeys.RocketFlamesOn);

    this.enableJetpack(false);

    this.add(this.flames);
    this.add(this.mouse);

    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.mouse.width, this.mouse.height);
    body.setOffset(this.mouse.width * -0.5, -this.mouse.height);

    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  enableJetpack(enabled: boolean) {
    this.flames.setVisible(enabled);
  }

  preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body;

    // Check is Space bar is down
    if (this.cursors.space?.isDown) {
      // Set y acceleration to -600 if so
      body.setAccelerationY(-600);
      this.enableJetpack(true);

      // Play the fly animation
      this.mouse.play(AnimationKeys.RocketMouseFly, true);
    } else {
      // Turn off acceleration otherwise
      body.setAccelerationY(0);
      this.enableJetpack(false);
    }

    // Check if touching the ground
    if (body.blocked.down) {
      // Play run when touching the ground
      this.mouse.play(AnimationKeys.RocketMouseRun, true);
    } else if (body.velocity.y > 0) {
      // Play fall when no longer ascending
      this.mouse.play(AnimationKeys.RocketMouseFall, true);
    }
  }
}