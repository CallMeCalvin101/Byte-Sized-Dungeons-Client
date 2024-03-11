import "./style.css";
import Phaser from "phaser";

let config = {
  parent: "app",
  autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  type: Phaser.CANVAS,
  width: 1280,
  height: 720,
  scene: [Start, Combat2, End],
};

//new Phaser.Game(config);
