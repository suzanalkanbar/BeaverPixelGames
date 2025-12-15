let clicks = 0;

const mainScene = new Phaser.Scene('mainScene');

mainScene.preload = function () {
  this.load.image('lulu', 'c-clicker/assets/Lulu.png');
};

mainScene.create = function () {
  // counter teksyt
  this.clickText = this.add.text(350, 30, 'Clicks: 0', {
    fontSize: '24px',
    color: '#ffffff'
  }).setOrigin(0.5);


  this.lulu = this.add.image(350, 220, 'lulu')
    .setInteractive({ useHandCursor: true });

  // afbeelding past in de frame
  this.lulu.setDisplaySize(200, 200); 

  // Click handler
  this.lulu.on('pointerdown', () => {
    clicks++;
    this.clickText.setText('Clicks: ' + clicks);

    // Animatie wanneer je klikt
    this.tweens.add({
      targets: this.lulu,
      scaleX: 0.95,
      scaleY: 0.95,
      duration: 60,
      yoyo: true
    });
  });
};

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