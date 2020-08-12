import * as Phaser from 'phaser';

import SceneKeys from "~/consts/SceneKeys";
import TextureKeys from "~/consts/TextureKeys";
import AnimationKeys from "~/consts/AnimationKeys";

export default class Game extends Phaser.Scene {

  private background!: Phaser.GameObjects.TileSprite;

  constructor() {
    super(SceneKeys.Game);
  }

  create() {
    // Store the width and height of the game screen
    const width = this.scale.width;
    const height = this.scale.height;

    this.background = this.add.tileSprite(0, 0, width, height, TextureKeys.Background)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0);

    this.add.image(
      Phaser.Math.Between(900, 1500),
      501,
      TextureKeys.MouseHole
    );

    const mouse = this.physics.add.sprite(
      width * 0.5,
      height - 30,
      TextureKeys.RocketMouse,
      'rocketmouse_fly01.png'
    )
      .setOrigin(0.5, 1)
      .play(AnimationKeys.RocketMouseRun);

    const body = mouse.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);
    body.setVelocityX(200);

    this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 30);

    this.cameras.main.startFollow(mouse);
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);
  }

  update(time: number, delta: number): void {
    this.background.setTilePosition(this.cameras.main.scrollX);
  }
}