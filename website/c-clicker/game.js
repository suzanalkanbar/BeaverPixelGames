let clicks = 0;
// Values to play with
let bonus_poppy = {bought: 0, value: 1, delay: 1, price: 10}; // globale variabele voor poppy bonus. Value = aantal clicks per hit, delay = seconden tussen hits, price = kosten in clicks
let bonus_fish = {time_interval_min: 10, time_interval_max: 60, value: 0.1, min_value:10, speed: 0.06, lifetime: 6}; // time interval in seconden tussen vissen, value = aantal clicks per vis als deel van totaal aantal clicks, lifetime = seconden dat de vis blijft bestaan

function updateClickText(scene, clicks) {
  scene.clickText.setText('Clicks: ' + clicks + 'ฅ');
}

function click(value, scene, playAnimation = true, sound_probability = 1, text_location = [350,200]) {
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
  // Text effect bij klikken
  const clickText = scene.add.text(text_location[0], text_location[1], "+" + String(value),
    {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 1
    }
  );
  clickText.setAlpha(1);
  scene.tweens.add({
    targets: clickText,
    y: clickText.y - 50,
    alpha: 0,
    duration: 1200,
    ease: 'Cubic.easeOut',
    onComplete: () => clickText.destroy()
  });
}


// Bonusses

// 1. Poppy helper
class Poppy {
  constructor(scene, img, centerX = 200, centerY = 200) {
    this.scene = scene;
    // this.sprite = scene.add.sprite(x, y, texture);
    if (!this.buy()) return; // probeer te kopen, als niet genoeg clicks, stop hier
    bonus_poppy.bought += 1;
    bonus_poppy.price = Math.floor(bonus_poppy.price * 1.3); // verhoog de prijs met 30% (afgerond naar beneden)
    scene.poppyButton.setText('Buy Poppy for ' + String(bonus_poppy.price) + ' ฅ'); // update de prijs in de shop
    this.addToTimer(); // start de timer om punten toe te voegen
    this.startAnimation(centerX, centerY, img);
  }

  // functie die de bonus aan de timer toevoegt
  addToTimer() {
    this.scene.time.addEvent({
      delay: bonus_poppy.delay * 1000, // s --> ms, deze functie werkt met milliseconden
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
    click(bonus_poppy.value, this.scene, false, 0.2, [this.sprite.x, this.sprite.y]);
    // this.hitAnimation();
  }

  hitAnimation() {
    // Animatie wanneer de bonus een hit maakt, bijvoorbeeld een korte size change of pootje
  }

  buy() {
    if (clicks >= bonus_poppy.price) {
      clicks -= bonus_poppy.price;
      updateClickText(this.scene, clicks);
      return true;
    }
  }

  // functie om de sprite te vernietigen (indien nodig)
  destroy() {
    this.sprite.destroy();
  }

}

class Fish {
  constructor(scene, img) {
    this.scene = scene;
    // random start positie en richting
    this.x = Phaser.Math.Between(20, 350);
    this.y = Phaser.Math.Between(20, 370);
    this.x_speed = bonus_fish.speed * (Math.random() < 0.5 ? -1 : 1); // random direction
    this.y_speed = bonus_fish.speed * (Math.random() < 0.5 ? -1 : 1); // random direction
    // create sprite
    this.sprite = this.scene.add.image(this.x, this.y, img).setScale(0.07).setInteractive({ useHandCursor: true });
    this.sprite.on('pointerdown', () => {
      click(Math.max(bonus_fish.min_value, Math.floor(clicks*bonus_fish.value)), this.scene, false, 1, [this.x, this.y]);
      this.sprite.destroy();
    });

    this.scene.events.on('update', this.update, this); // start animatie

    //automatically destroy fish after lifetime and not clicked
    this.scene.time.delayedCall(bonus_fish.lifetime * 1000, () => {
      this.sprite.destroy();
    }, [], this);
  }
  update(time, delta) {
    this.x += this.x_speed * delta;
    this.y += this.y_speed * delta;
  // Horizontal bounce (0 to 370)
    if (this.x < 0) {
      this.x = 0;
      this.x_speed *= -1;
    } else if (this.x > 370) {
      this.x = 370;
      this.x_speed *= -1;
    }
  // Vertical bounce (0 to 400)
  if (this.y < 0) {
    this.y = 0;
    this.y_speed *= -1;
  } else if (this.y > 400) {
    this.y = 400;
    this.y_speed *= -1;
  }
    this.sprite.setPosition(this.x, this.y);
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
  this.load.image('fish', 'c-clicker/assets/vis.png');
};

mainScene.create = function () {
  // counter tekst
  bonus_poppy = {bought: 0, value: 1, delay: 1, price: 10}; // globale variabele voor poppy bonus. Value = aantal clicks per hit, delay = seconden tussen hits, price = kosten in clicks

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
    click(1, this, this.lulu, 1, [game.input.mousePointer.x, game.input.mousePointer.y]);
    // poppy = new Poppy(this, 0, 0, 'lulu');
  });

  // create lulu animations once
  this.luluTween = this.tweens.add({
    targets: this.lulu,
    scaleX: 0.05,
    scaleY: 0.05,
    duration: 40,
    yoyo: true,
    paused: true
  });

  // SHOP
  this.shopRect = this.add.rectangle(
    525,   // x
    200,   // y
    300,   // width
    380,    // height
    0x000000 // fill color (hex)
  ).setOrigin(0.5);
  this.shopRect.setAlpha(0.15);

  this.shopText = this.add.text(525, 30, 'SHOP', {
    fontSize: '24px',
    color: '#ffffff',
    stroke: '#383838ff',
    strokeThickness: 2
  }).setOrigin(0.5);

  // POPPY
  this.poppyButton = this.add.text(525, 100, 'Buy Poppy for ' + String(bonus_poppy.price) + ' ฅ', {
    fontSize: '24px',
    color: '#ffffff',
    backgroundColor: '#77c2eeff',
    padding: { x: 10, y: 5 }
  })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true });

  // onclick
  this.poppyButton.on('pointerdown', () => {
    poppy = new Poppy(this, 'poppy');
  });

  // randomly spawn fish every x to y seconds
  this.time.addEvent({
    delay: Phaser.Math.Between(bonus_fish.time_interval_min * 1000, bonus_fish.time_interval_max * 1000),
    callback: () => {
      fish = new Fish(this, 'fish');
    },
    callbackScope: this,
    loop: true
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