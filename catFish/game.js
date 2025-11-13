var mode = 1;
var score = 0;
var letGo = true;
var playMinigame = false;
var spaceTap = false;
var hasPassed = false;
var canCatch = false;
class mainScene {
    preload() {

    }
    create() {
        const grass = this.add.rectangle(350, 375, 700, 50, 0x00ff00)
        this.groundHitbox = this.physics.add.existing(grass, 0)
        const water = this.add.rectangle(550, 375, 300, 50, 0x0000ff)
        this.waterHitbox = this.physics.add.existing(water, 0)
        const player = this.add.rectangle(250, 300, 50, 100, 0xff0000)
        this.player = this.physics.add.existing(player, 0)
        
        const dot = this.add.rectangle(100, 100, 10, 10, 0x3498db)
        this.dot = this.physics.add.existing(dot, 0)
        const line = this.add.rectangle(100, this.dot.y - 40, 10, 60, 0x3498db)
        this.line = this.physics.add.existing(line, 0)

        const r0 = this.add.rectangle(600, 200, 50, 200, 0x3498db)
        this.r0 = this.physics.add.existing(r0, 0)
        const r2 = this.add.rectangle(600, 125, 48, 48, 0x3498db)
        this.r2 = this.physics.add.existing(r2, 0)
        const r3 = this.add.rectangle(600, 125, 48, 6, 0x3498db)
        this.r3 = this.physics.add.existing(r3, 0)
        const r1 = this.add.rectangle(600, 300, 52, 2, 0x3498db)
        this.r1 = this.physics.add.existing(r1, 0)

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
        if (mode == 1) {
            if (this.arrow.right.isDown && this.player.x < 375) {
                this.player.x += 1;
            } else if (this.arrow.left.isDown && this.player.x > 25) {
                this.player.x -= 1;
            }
            if (spaceTap && this.player.x > 350) {
                console.log('fishing')
                this.moveExclamation()
                mode = 2
            }
        }
        if (mode == 2) {
            if (!hasPassed) {
                this.timer = this.time.addEvent({ delay: (5000 + Math.round(Math.random() * 10000)), callback: this.onEvent, callbackScope: this })
                hasPassed = true
            }
            if (spaceTap && canCatch) {
                this.timer.remove()
                this.timer = this.time.addEvent({ delay: 500, callback: this.startGame, callbackScope: this })
                canCatch = false;
                this.dot.fillColor = 0x3498db
                this.line.fillColor = 0x3498db
                mode = 3;
                hasPassed = false;
                spaceTap = false;
            }


        }
        if (mode == 3) {
            if (!playMinigame) {
                this.r0.x = this.player.x + 200
                this.r1.x = this.player.x + 200
                this.r2.x = this.player.x + 200
                this.r3.x = this.player.x + 200
                this.r0.fillColor = 0x000000
                this.r1.fillColor = 0xffffff
                this.r2.fillColor = 0x0000aa
                this.r3.fillColor = 0xffaa00
                this.r2.y = 125
                this.r3.y = 125
            }
            if (playMinigame) {
                if (this.partOne) {
                    this.r1.y -= 1
                    if (spaceTap) {
                        spaceTap = false;
                        if (this.r1.y < this.r3.y + 0.5 * this.r3.height && this.r1.y > this.r3.y - 0.5 * this.r3.height) {
                            this.r1.fillColor = 0xffaa55
                            this.partOne = false;
                            this.partTwo = true;
                        } else if (this.r1.y < this.r2.y + 0.5 * this.r2.height && this.r1.y > this.r2.y - 0.5 * this.r2.height) {
                            this.r1.fillColor = 0x5555ff
                            this.partOne = false;
                            this.partTwo = true;
                        } else {
                            this.partOne = false;
                            playMinigame = false;
                            mode = 1;
                        }
                    }
                }
                if (this.partTwo) {
                    this.r1.y += 1
                    this.r2.y = 275
                    this.r3.y = 275
                    if (spaceTap) {
                        spaceTap = false;
                        if (this.r1.y < this.r3.y + 0.5 * this.r3.height && this.r1.y > this.r3.y - 0.5 * this.r3.height) {
                            this.partTwo = false;
                            if (this.r1.fillColor == 0xffaa55){
                                this.doubleWin = true;
                            }else {
                            this.win = true;
                            }
                        } else if (this.r1.y < this.r2.y + 0.5 * this.r2.height && this.r1.y > this.r2.y - 0.5 * this.r2.height) {
                            this.r1.fillColor = 0x5555ff
                            this.partTwo = false;
                            this.win = true;
                        } else {
                            this.partTwo = false;
                            playMinigame = false;
                            mode = 1;
                        }
                    }
                }
                if (this.win) {
                    alert('you caught a fish')
                    this.r0.fillColor = 0x3498db
                    this.r1.fillColor = 0x3498db
                    this.r2.fillColor = 0x3498db
                    this.r3.fillColor = 0x3498db
                    mode = 1
                    playMinigame = false;
                    this.win = false;
                }
                if (this.doubleWin){
                    alert('YOU CAUGHT TWO FISH')
                    this.r0.fillColor = 0x3498db
                    this.r1.fillColor = 0x3498db
                    this.r2.fillColor = 0x3498db
                    this.r3.fillColor = 0x3498db
                    mode = 1
                    playMinigame = false;
                    this.doubleWinin = false;
                }
            }
        }
    }
    moveExclamation() {
        console.log('moving exclamation')
        this.dot.x = this.player.x + 60
        this.dot.y = this.player.y - 60
        this.line.x = this.dot.x
        this.line.y = this.dot.y - 40
        this.dot.fillColor = 0x3498db
        this.line.fillColor = 0x3498db
    }
    onEvent() {
        this.dot.fillColor = 0xff0000
        this.line.fillColor = 0xff0000
        this.timer = this.time.addEvent({ delay: 500, callback: this.fishGone, callbackScope: this })
        canCatch = true;
    }
    fishGone() {
        this.dot.fillColor = 0x3498db
        this.line.fillColor = 0x3498db
        mode = 1;
        if (canCatch) {
            canCatch = false;
            hasPassed = false;
            alert('you missed it')
        }
    }
    startGame() {
        playMinigame = true;
        this.partOne = true;
    }
}

new Phaser.Game({
    width: 700, // Width of the game in pixels
    height: 400, // Height of the game in pixels
    backgroundColor: '#3498db', // The background color (blue)
    scene: mainScene, // The name of the scene we created
    physics: { default: 'arcade' }, // The physics engine to use
    parent: 'game', // Create the game inside the <div id="game"> 
});