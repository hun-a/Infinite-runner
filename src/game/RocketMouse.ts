import Phaser from 'phaser';

import TextureKeys from "~/consts/TextureKeys";
import AnimationKeys from "~/consts/AnimationKeys";

export default class RocketMouse extends Phaser.GameObjects.Container {

  private flames: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    const mouse = scene.add.sprite(0, 0, TextureKeys.RocketMouse)
      .setOrigin(0.5, 1)
      .play(AnimationKeys.RocketMouseRun);

    this.flames = scene.add.sprite(-63, -15, TextureKeys.RocketMouse)
      .play(AnimationKeys.RocketFlamesOn);

    this.enableJetpack(false);

    this.add(this.flames);
    this.add(mouse);

    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(mouse.width, mouse.height);
    body.setOffset(mouse.width * -0.5, -mouse.height);
  }

  enableJetpack(enabled: boolean) {
    this.flames.setVisible(enabled);
  }
}