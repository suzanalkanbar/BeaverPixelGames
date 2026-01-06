let clicks = 0;

function updateClickText(scene, clicks) {
  scene.clickText.setText('Clicks: ' + clicks + 'ฅ');
}

function click(value, scene, playAnimation = true, sound_probability = 1) {
  clicks += value;
  updateClickText(scene, clicks);
  // Animatie wanneer je klikt
  if (playAnimation) {
    scene.luluTween.restart();
  }
  // Geluidseffect bij klikken
  if (Math.random() < sound_probability) {
    const rand_int = Phaser.Math.Between(1, 4);
    scene.sound.play('meow' + String(rand_int));
  }
}

// Bonusses

// 1. Poppy helper
class Poppy {
  constructor(scene, img, centerX = 200, centerY = 200) {
    this.scene = scene;
    // this.sprite = scene.add.sprite(x, y, texture);
    this.price = 10; // prijs om deze bonus te kopen
    if (!this.buy()) return; // probeer te kopen, als niet genoeg clicks, stop hier

    this.value = 1; // hoeveel punten 1 hit van deze bonus geeft
    this.delay = 1; // hoe veel seconden tussen hits
    this.addToTimer(); // start de timer om punten toe te voegen
    this.startAnimation(centerX, centerY, img);
  }

  // functie die de bonus aan de timer toevoegt
  addToTimer() {
    this.scene.time.addEvent({
      delay: this.delay * 1000, // s --> ms, deze functie werkt met milliseconden
      callback: this.hit,
      callbackScope: this,
      loop: true
    });
  }

  // animation
  startAnimation(centerX, centerY, img) {
    // orbit parameters
    this.center = { x: centerX, y: centerY };
    this.radius = 100;
    this.angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
    this.speed = 0.002; // radians per ms

    // create sprite at correct orbit position
    const x = this.center.x + Math.cos(this.angle) * this.radius;
    const y = this.center.y + Math.sin(this.angle) * this.radius;

    this.sprite = this.scene.add.image(x, y, img).setScale(0.15);
    // register for updates
    this.scene.events.on('update', this.update, this);
  }

  update(time, delta) {
    this.angle += this.speed * delta;
    const x = this.center.x + Math.cos(this.angle) * this.radius;
    const y = this.center.y + Math.sin(this.angle) * this.radius;
    this.sprite.setPosition(x, y);
  }

  hit() {
    click(this.value, this.scene, false, 0.2);
    // this.hitAnimation();
  }

  hitAnimation() {
    // Animatie wanneer de bonus een hit maakt
  }

  buy() {
    if (clicks >= this.price) {
      clicks -= this.price;
      updateClickText(this.scene, clicks);
      return true;
    }
  }

  // functie om de sprite te vernietigen
  destroy() {
    this.sprite.destroy();
  }

}

// De game

const mainScene = new Phaser.Scene('mainScene');

mainScene.preload = function () {
  this.load.image('lulu', 'c-clicker/assets/Lulu.png');
  this.load.audio('meow1', 'c-clicker/assets/lulu_meow-01.mp3');
  this.load.audio('meow2', 'c-clicker/assets/lulu_meow-02.mp3');
  this.load.audio('meow3', 'c-clicker/assets/lulu_meow-03.mp3');
  this.load.audio('meow4', 'c-clicker/assets/lulu_meow-04.mp3');
  this.load.image('poppy', 'c-clicker/assets/PoppyHead.png');
};

mainScene.create = function () {
  // counter tekst
  this.clickText = this.add.text(200, 30, 'Clicks: 0ฅ', {
    fontSize: '24px',
    color: '#ffffff',
    stroke: '#383838ff',
    strokeThickness: 1
  }).setOrigin(0.5);


  // clickable afbeelding
  this.lulu = this.add.image(200, 220, 'lulu')
    .setInteractive({ useHandCursor: true });

  // afbeelding past in de frame
  this.lulu.setDisplaySize(200, 200);

  // Click handler
  this.lulu.on('pointerdown', () => {
    click(1, this, this.lulu);
    // poppy = new Poppy(this, 0, 0, 'lulu');
  });

  // create animation once
  this.luluTween = this.tweens.add({
    targets: this.lulu,
    scaleX: 0.05,
    scaleY: 0.05,
    duration: 40,
    yoyo: true,
    paused: true
  });

  // SHOP
  const rect = this.add.rectangle(
    525,   // x
    200,   // y
    300,   // width
    380,    // height
    0x000000 // fill color (hex)
  ).setOrigin(0.5);
  rect.setAlpha(0.15);

  this.shopText = this.add.text(525, 30, 'SHOP', {
    fontSize: '24px',
    color: '#ffffff',
    stroke: '#383838ff',
    strokeThickness: 2
  }).setOrigin(0.5);

  // POPPY
  poppy = new Poppy(this, 'poppy'); // does nothing yet as we don't have any click, but allows the reading of the price
  const button = this.add.text(525, 100, 'Buy Poppy for ' + String(poppy.price) + ' ฅ', {
    fontSize: '24px',
    color: '#ffffff',
    backgroundColor: '#77c2eeff',
    padding: { x: 10, y: 5 }
  })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true });

  // onclick
  button.on('pointerdown', () => {
    poppy = new Poppy(this, 'poppy');
  });
}

window.game = new Phaser.Game({
  width: 700,
  height: 400,
  backgroundColor: 0xFFF176,
  scene: mainScene,
  physics: { default: 'arcade' },
  parent: 'game'
});

window.restartActiveGame = function () {
  if (window.game && window.game.scene.scenes[0]) {
    window.game.scene.scenes[0].scene.restart();
    clicks = 0;
  }
};