import * as Phaser from "phaser";
import io from "socket.io-client";

export class Play extends Phaser.Scene {
  constructor() {
    super("Play");
  }

  glitchURL: string = "https://glitchserverhere.me"; // Replace with your Glitch server URL
  socket: any;

  create() {
    this.socket = io(this.glitchURL);

    this.socket.on("connect", () => {
      console.log("Connected to server");
    });
  }
}