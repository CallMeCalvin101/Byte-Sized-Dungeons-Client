import "./style.css";
import Phaser from "phaser";
import * as WebFont from 'webfontloader';
import { Team } from './scenes/team';
import { Menu } from './scenes/menu';
import { Credits } from './scenes/credits';
import { Settings } from './scenes/settings';
import { Play } from './scenes/play';

let config = {
  parent: "app",
  autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  type: Phaser.CANVAS,
  width: 1280,
  height: 720,
  scene: [Team, Menu, Credits, Settings, Play],
};

WebFont.load({
  google: {
    families: ['Bangers', 'MedievalSharp', 'Silkscreen']
  },
  active: function() {
    new Phaser.Game(config);
  }
});

//new Phaser.Game(config);
