interface Bar {
    valueBar: Phaser.GameObjects.Rectangle;
    background: Phaser.GameObjects.Rectangle;
    maxWidth: number;
    maxValue: number;
    currentValue: number;
  
    decreaseBar(amount: number): void;
    increaseBar(amount: number): void;
    resetBar(): void;
    getValue(): number;
    drawBar(): void;
  }
  
  export class HealthBar implements Bar {
    valueBar: Phaser.GameObjects.Rectangle;
    background: Phaser.GameObjects.Rectangle;
    maxWidth: number;
    maxValue: number;
    currentValue: number;
  
    constructor(
      scene: Phaser.Scene,
      xPos: number,
      yPos: number,
      width: number,
      height: number,
      maxValue: number
    ) {
      this.background = new Phaser.GameObjects.Rectangle(
        scene,
        xPos,
        yPos,
        width,
        height,
        0xbab4b4
      );
  
      this.valueBar = new Phaser.GameObjects.Rectangle(
        scene,
        xPos,
        yPos,
        width,
        height,
        0xf42c2c
      );
  
      scene.add.existing(this.background);
      scene.add.existing(this.valueBar);
  
      this.maxWidth = width;
      this.maxValue = maxValue;
      this.currentValue = maxValue;
    }
  
    decreaseBar(amount: number) {
      this.currentValue -= amount;
    }
  
    increaseBar(amount: number) {
      this.currentValue += amount;
      if (this.currentValue > this.maxValue) {
        this.currentValue = this.maxValue;
      }
    }
  
    resetBar() {
      this.currentValue = this.maxValue;
    }
  
    getValue(): number {
      return this.currentValue;
    }
  
    drawBar() {
      this.valueBar.width = (this.currentValue / this.maxValue) * this.maxWidth;
      if (this.valueBar.width < 0) {
        this.valueBar.width = 0;
      }
    }
  }
  
  export class ActionBar extends HealthBar {
    currentValue: number;
    decrementRate: number;
  
    constructor(
      scene: Phaser.Scene,
      xPos: number,
      yPos: number,
      width: number,
      height: number,
      maxValue: number
    ) {
      super(scene, xPos, yPos, width, height, maxValue);
      this.valueBar.setFillStyle(0x23cbf8);
      this.currentValue = maxValue;
      this.decrementRate = 5;
    }
  
    canAct(): boolean {
      return this.currentValue <= 0;
    }
  
    setDecrementRate(n: number) {
      this.decrementRate = n;
    }
  
    update() {
      if (this.currentValue > 0) {
        this.decreaseBar(this.decrementRate);
        this.drawBar();
      }
    }
  }
  