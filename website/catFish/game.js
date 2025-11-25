var mode = 1;
var score = 0;
var letGo = true;
var playMinigame = false;
var spaceTap = false;
var hasPassed = false;
var canCatch = false;
class mainScene {
    preload() {
        this.load.image('player', 'catfish/assets/player.png')
        this.load.image('rod', 'catFish/assets/rod.png')
        this.load.image('exclamation', 'catfish/assets/exclamation.png')
        this.load.image('red', 'catfish/assets/fish/red.png')
        this.load.image('orange', 'catfish/assets/fish/orange.png')
        this.load.image('yellow', 'catfish/assets/fish/yellow.png')
        this.load.image('green', 'catfish/assets/fish/green.png')
        this.load.image('blue', 'catfish/assets/fish/blue.png')
        this.load.image('purple', 'catfish/assets/fish/purple.png')
    }
    create() {
        this.score = 0
        let style = { font: '20px Arial', fill: '#fff' };
        this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);

        const grass = this.add.rectangle(350, 375, 700, 50, 0x00ff00)
        this.groundHitbox = this.physics.add.existing(grass, 0)
        const water = this.add.rectangle(550, 375, 300, 50, 0x0000ff)
        this.waterHitbox = this.physics.add.existing(water, 0)
        this.player = this.physics.add.sprite(250, 325, 'player')
        this.rod = this.physics.add.sprite(100, 325, 'rod')
        this.hide(this.rod)
        this.exclamationMark = this.physics.add.sprite(100, 40, 'exclamation')
        this.hide(this.exclamationMark)

        const r0 = this.add.rectangle(600, 200, 50, 200, 0x000000)
        this.r0 = this.physics.add.existing(r0, 0)
        const r2 = this.add.rectangle(600, 125, 48, 48, 0x0000aa)
        this.r2 = this.physics.add.existing(r2, 0)
        const r3 = this.add.rectangle(600, 125, 48, 6, 0xffaa00)
        this.r3 = this.physics.add.existing(r3, 0)
        const r1 = this.add.rectangle(600, 300, 52, 2, 0xffffff)
        this.r1 = this.physics.add.existing(r1, 0)

        this.fishBar = [r0, r1, r2, r3]
        this.hideList(this.fishBar)

        this.fish1 = this.physics.add.sprite(100, 100, 'yellow')
        this.fish2 = this.physics.add.sprite(100, 100, 'orange')
        this.fish3 = this.physics.add.sprite(100, 100, 'red')
        this.fish4 = this.physics.add.sprite(100, 100, 'green')
        this.fish5 = this.physics.add.sprite(100, 100, 'blue')
        this.fish6 = this.physics.add.sprite(100, 100, 'purple')

        this.currentFish = this.physics.add.sprite(100, 100, 'red')
        this.hide(this.currentFish)
        this.copyFish = this.physics.add.sprite(100, 100, 'red')
        this.hide(this.copyFish)

        this.fish1.catchSize = 40
        this.fish1.critSize = 6
        this.fish1.high = 75
        this.fish1.low = 25
        this.fish1.name = 'yellow'
        this.fish1.value = 10

        this.fish2.catchSize = 30
        this.fish2.critSize = 4
        this.fish2.high = 80
        this.fish2.low = 20
        this.fish2.name = 'orange'
        this.fish2.value = 25

        this.fish3.catchSize = 60
        this.fish3.critSize = 10
        this.fish3.high = 70
        this.fish3.low = 30
        this.fish3.name = 'red'
        this.fish3.value = 2

        this.fish4.catchSize = 20
        this.fish4.critSize = 4
        this.fish4.high = 70
        this.fish4.low = 30
        this.fish4.name = 'green'
        this.fish4.value = 40

        this.fish5.catchSize = 15
        this.fish5.critSize = 3
        this.fish5.high = 80
        this.fish5.low = 20
        this.fish5.name = 'blue'
        this.fish5.value = 80

        this.fish6.catchSize = 8
        this.fish6.critSize = 1
        this.fish6.high = 60
        this.fish6.low = 40
        this.fish6.name = 'purple'
        this.fish6.value = 120

        this.fishes = [this.fish1, this.fish2, this.fish3, this.fish4, this.fish5, this.fish6]
        this.hideList(this.fishes)

        this.partOne = false;
        this.partTwo = false;
        this.win = false;
        this.doubleWin = false;


        this.arrow = this.input.keyboard.createCursorKeys();
    }
    update() {
        if (this.arrow.space.isDown && letGo) {
            spaceTap = true;
            letGo = false;
        }
        if (!this.arrow.space.isDown) {
            letGo = true;
            spaceTap = false;
        }
        if (this.currentFish.alpha > 0) {
            this.currentFish.alpha -= 0.005
            this.copyFish.alpha -= 0.005
            this.currentFish.y -= 0.5
            this.copyFish.y -= 0.5
        }
        if (mode == 1) {
            if (this.exclamationMark.alpha > 0) {
                this.exclamationMark.alpha = this.exclamationMark.alpha - 0.05
            }
            if (this.arrow.right.isDown && this.player.x < 375) {
                this.player.x += 1;
            } else if (this.arrow.left.isDown && this.player.x > 25) {
                this.player.x -= 1;
            }
            if (spaceTap && this.player.x > 350) {
                console.log('fishing')
                this.rod.x = this.player.x + 50
                this.show(this.rod)
                this.exclamationMark.x = this.player.x + 60
                this.exclamationMark.y = this.player.y - 100
                mode = 2
                spaceTap = false;
            }
        }
        if (mode == 2) {
            if (!hasPassed) {
                this.timer = this.time.addEvent({ delay: (5000 + Math.round(Math.random() * 10000)), callback: this.onEvent, callbackScope: this })
                hasPassed = true
            }
            if (!canCatch) {
                if (this.exclamationMark.alpha > 0) {
                    this.exclamationMark.alpha = this.exclamationMark.alpha - 0.05
                }
            }
            if (hasPassed && spaceTap && (!canCatch)) {
                this.timer.remove()
                spaceTap = false;
                hasPassed = false;
                mode = 1
                this.hide(this.rod)
                console.log('cancelling fish')
            }

            if (spaceTap && canCatch) {
                this.timer.remove()
                this.timer = this.time.addEvent({ delay: 500, callback: this.startGame, callbackScope: this })
                canCatch = false;
                mode = 3;
                hasPassed = false;
                spaceTap = false;
                this.copy(this.currentFish, this.fishes[Math.floor(Math.random() * this.fishes.length)])
            }


        }
        if (mode == 3) {
            if (!playMinigame) {
                this.r0.x = this.player.x + 200
                this.r1.x = this.player.x + 200
                this.r1.y = 300
                this.r2.x = this.player.x + 200
                this.r2.y = (2 * this.currentFish.low) + 100
                this.r2.displayHeight = this.currentFish.catchSize
                this.r3.x = this.player.x + 200
                this.r3.y = (2 * this.currentFish.low) + 100
                this.r3.displayHeight = this.currentFish.critSize
                this.showList(this.fishBar)
                this.r1.fillColor = 0xffffff
                if (this.exclamationMark.alpha > 0) {
                    this.exclamationMark.alpha = this.exclamationMark.alpha - 0.05
                }
            }
            if (playMinigame) {
                if (this.exclamationMark.alpha > 0) {
                    this.exclamationMark.alpha = this.exclamationMark.alpha - 0.05
                }
                if (this.partOne) {
                    this.r1.y -= 1
                    if (spaceTap) {
                        spaceTap = false;
                        if (this.r1.y < this.r3.y + 0.5 * this.r3.displayHeight && this.r1.y > this.r3.y - 0.5 * this.r3.displayHeight) {
                            this.r1.fillColor = 0xffaa55
                            this.partOne = false;
                            this.partTwo = true;
                        } else if (this.r1.y < this.r2.y + 0.5 * this.r2.displayHeight && this.r1.y > this.r2.y - 0.5 * this.r2.displayHeight) {
                            this.r1.fillColor = 0x5555ff
                            this.partOne = false;
                            this.partTwo = true;
                        } else {
                            this.partOne = false;
                            playMinigame = false;
                            mode = 1;
                            this.hide(this.rod)
                            this.hideList(this.fishBar)
                        }
                    } else if(!(this.r1.y < 300 && this.r1.y > 100)){
                        this.partTwo = false;
                            playMinigame = false;
                            mode = 1;
                            this.hide(this.rod)
                            this.hideList(this.fishBar)
                    }
                }
                if (this.partTwo) {
                    this.r1.y += 1
                    this.r2.y = (2 * this.currentFish.high) + 100
                    this.r3.y = (2 * this.currentFish.high) + 100
                    if (spaceTap) {
                        spaceTap = false;
                        if (this.r1.y < this.r3.y + 0.5 * this.r3.displayHeight && this.r1.y > this.r3.y - 0.5 * this.r3.displayHeight) {
                            this.partTwo = false;
                            if (this.r1.fillColor == 0xffaa55) {
                                this.doubleWin = true;
                            } else {
                                this.win = true;
                            }
                        } else if (this.r1.y < this.r2.y + 0.5 * this.r2.displayHeight && this.r1.y > this.r2.y - 0.5 * this.r2.displayHeight) {
                            this.r1.fillColor = 0x5555ff
                            this.partTwo = false;
                            this.win = true;
                        } else {
                            this.partTwo = false;
                            playMinigame = false;
                            mode = 1;
                            this.hide(this.rod)
                            this.hideList(this.fishBar)
                        }
                    } else if(!(this.r1.y < 300 && this.r1.y > 100)){
                        this.partTwo = false;
                            playMinigame = false;
                            mode = 1;
                            this.hide(this.rod)
                            this.hideList(this.fishBar)
                    }
                }
                if (this.win) {
                    this.hideList(this.fishBar)
                    mode = 1
                    playMinigame = false;
                    this.currentFish.x = this.player.x
                    this.currentFish.y = this.player.y - 100
                    this.show(this.currentFish)
                    this.win = false;
                    this.hide(this.rod)
                    this.score += this.currentFish.value
                    this.scoreText.setText('score: ' + this.score);

                }
                if (this.doubleWin) {
                    this.hideList(this.fishBar)
                    mode = 1
                    playMinigame = false;
                    this.doubleWin = false;
                    this.currentFish.x = this.player.x
                    this.currentFish.y = this.player.y - 100
                    this.copy(this.copyFish, this.currentFish)
                    this.copyFish.y -= 68
                    this.show(this.currentFish)
                    this.show(this.copyFish)
                    this.hide(this.rod)
                    this.score += this.currentFish.value * 2
                    this.scoreText.setText('score: ' + this.score);
                }
            }
        }
    }
    onEvent() {
        this.show(this.exclamationMark)
        this.timer = this.time.addEvent({ delay: 500, callback: this.fishGone, callbackScope: this })
        canCatch = true;
    }
    fishGone() {
        mode = 1;
        if (canCatch) {
            canCatch = false;
            hasPassed = false;
            this.hide(this.rod)
        }
    }
    startGame() {
        playMinigame = true;
        this.partOne = true;
    }
    hide(element) {
        element.setAlpha(0)
    }
    hideList(list) {
        for (let i = 0; i < list.length; i++) {
            list[i].setAlpha(0)
        }
    }
    show(element) {
        element.setAlpha(1)
    }
    showList(list) {
        for (let i = 0; i < list.length; i++) {
            list[i].setAlpha(1)
        }
    }
    copy(copy, orig) {
        copy.value = orig.value
        copy.high = orig.high
        copy.low = orig.low
        copy.catchSize = orig.catchSize
        copy.critSize = orig.critSize
        copy.x = orig.x
        copy.y = orig.y
        copy.name = orig.name
        copy.setTexture(orig.name)
    }
}

window.activePhaserGame = new Phaser.Game({
    width: 700, // Width of the game in pixels
    height: 400, // Height of the game in pixels
    backgroundColor: '#3498db', // The background color (blue)
    scene: mainScene, // The name of the scene we created
    physics: { default: 'arcade' }, // The physics engine to use
    parent: 'game', // Create the game inside the <div id="game"> 
});

window.restartActiveGame = function () {
    if (window.game && window.game.scene.scenes[0]) {
        window.game.scene.scenes[0].scene.restart();
        gameover = false;
    }
  };