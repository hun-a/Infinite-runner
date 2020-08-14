import Phaser from 'phaser';
import TextureKeys from "~/consts/TextureKeys";

export default class LaserObstacle extends Phaser.GameObjects.Container {

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    // Create a top
    const top = scene.add.image(0, 0, TextureKeys.LaserEnd)
      .setOrigin(0.5, 0);

    // Create a middle and set it below the top
    const middle = scene.add.image(0, top.y + top.displayHeight, TextureKeys.LaserMiddle)
      .setOrigin(0.5, 0);

    // Set height of middle laser to 200px
    middle.setDisplaySize(middle.width, 200);

    // create a bottom that is flipped and below the middle
    const bottom = scene.add.image(0, middle.y + middle.displayHeight, TextureKeys.LaserEnd)
      .setOrigin(0.5, 1)
      .setFlipY(true);

    this.add(top);
    this.add(middle);
    this.add(bottom);
  }
}