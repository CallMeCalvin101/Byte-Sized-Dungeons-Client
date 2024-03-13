import { ActionBar, HealthBar } from "./VisualBars";
import { Action } from "./ActionButtons";

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;
const PLAYER_HEALTH = 100;
const PLAY_BAR_WIDTH = 30;

export class Character {
  healthbar: HealthBar;
  actionbar: ActionBar;
  buffs: string[];

  constructor(
    scene: Phaser.Scene,
    xPos: number,
    yPos: number,
    barWidth: number,
    healthbarHeight: number,
    health: number,
    cooldownHeight: number,
    cooldownMax: number
  ) {
    this.healthbar = new HealthBar(
      scene,
      xPos,
      yPos - healthbarHeight / 2,
      barWidth,
      healthbarHeight,
      health
    );

    this.actionbar = new ActionBar(
      scene,
      xPos,
      yPos - cooldownHeight / 2,
      barWidth,
      cooldownHeight,
      cooldownMax
    );

    this.buffs = [];
  }

  health(): number {
    return this.healthbar.getValue();
  }

  damage(amount: number) {
    this.healthbar.decreaseBar(amount);
  }

  heal(amount: number) {
    this.healthbar.increaseBar(amount);
  }

  hasBuff(buff: string): boolean {
    return this.buffs.includes(buff);
  }

  setBuff(buff: string) {
    if (!this.hasBuff(buff)) {
      this.buffs.push(buff);
    }
  }

  removeBuff(buff: string) {
    if (this.hasBuff(buff)) {
      const pos = this.buffs.indexOf(buff);
      this.buffs = this.buffs.splice(pos, 1);
    }
  }

  setPosition(xPos: number, yPos: number) {
    const h1 = this.healthbar.background.height;
    const h2 = this.actionbar.background.height;

    this.healthbar.background.setPosition(xPos, yPos - h1 / 2);
    this.healthbar.valueBar.setPosition(xPos, yPos - h1 / 2);
    this.actionbar.background.setPosition(xPos, yPos + h2 / 2);
    this.actionbar.valueBar.setPosition(xPos, yPos + h2 / 2);
  }

  draw() {
    this.healthbar.drawBar();
    this.actionbar.drawBar();
  }
}

export class Player extends Character {
  actions: Action[];

  constructor(scene: Phaser.Scene) {
    super(
      scene,
      GAME_WIDTH / 2,
      GAME_HEIGHT - PLAY_BAR_WIDTH - PLAYER_HEALTH,
      GAME_WIDTH,
      PLAY_BAR_WIDTH,
      PLAYER_HEALTH,
      PLAY_BAR_WIDTH,
      PLAYER_HEALTH
    );
    this.actions = [];
  }

  isAlive(): boolean {
    return this.health() > 0;
  }

  addAction(action: Action) {
    this.actions.push(action);
  }

  setActRate(rate: number) {
    this.actionbar.setDecrementRate(rate);
  }

  canAct(): boolean {
    return this.actionbar.canAct();
  }

  resetAction() {
    this.actionbar.resetBar();
  }
}

// NEED TO REFACTOR MOE
export class Enemy extends Character {
  target: number;
  curAction: string;
  targetText: Phaser.GameObjects.Text;
  enemyLabel: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, maxHealth: number) {
    super(scene, GAME_WIDTH / 2, 60, 750, 30, maxHealth, 30, maxHealth);
    const enemy = scene.add.image(GAME_WIDTH / 2, 224, "dragon");
    enemy.setScale(0.5);

    this.target = Math.floor(4 * Math.random());
    this.curAction = "none";

    this.targetText = scene.add.text(
      GAME_WIDTH / 2 - 348,
      70 - 8,
      `Intent: Claw Attack   Target: Player ${(this.target + 1).toString()}`,
      { font: "Ariel" }
    );

    this.targetText.setFontSize(28);
    this.targetText.setColor("Black");
    this.targetText.setFontStyle("bold");

    this.enemyLabel = scene.add.text(
      GAME_WIDTH / 2 - 348,
      40 - 8,
      `Enemy: Dragon`,
      { font: "Ariel" }
    );

    this.enemyLabel.setFontSize(28);
    this.enemyLabel.setColor("Black");
    this.enemyLabel.setFontStyle("bold");
  }

  updateEnemyInfo(intent: string, target: number) {
    this.curAction = intent;
    this.target = target;
  }

  draw() {
    super.draw();
    let intent = "Claw Attack";

    this.targetText.setText(
      `Intent: ${intent}   Target: Player ${(this.target + 1).toString()}`
    );
  }
}
