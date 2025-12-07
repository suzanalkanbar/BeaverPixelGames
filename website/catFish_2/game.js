var mode = 0;
var playMinigame = false;
var hasPassed = false;
var canCatch = false;
class mainScene {
    preload() {
        this.load.image('player', 'catFish_2/assets/player.png')
        this.load.image('rod', 'catFish_2/assets/rod.png')
        this.load.image('exclamation', 'catFish_2/assets/exclamation.png')
        this.load.image('empty', 'catFish_2/assets/empty.png')
        this.load.image('red', 'catFish_2/assets/fish/red.png')
        this.load.image('orange', 'catFish_2/assets/fish/orange.png')
        this.load.image('yellow', 'catFish_2/assets/fish/yellow.png')
        this.load.image('green', 'catFish_2/assets/fish/green.png')
        this.load.image('blue', 'catFish_2/assets/fish/blue.png')
        this.load.image('purple', 'catFish_2/assets/fish/purple.png')
        this.load.image('shop','catFish_2/assets/shop.png')
    }
    create() {
        const air = this.add.rectangle(350, 200, 700, 400, 0x7777ff)
        this.airHitbox = this.physics.add.existing(air, 0)
        const grass = this.add.rectangle(350, 375, 700, 50, 0x00ff00)
        this.groundHitbox = this.physics.add.existing(grass, 0)
        const water = this.add.rectangle(550, 375, 300, 50, 0x0000ff)
        this.waterHitbox = this.physics.add.existing(water, 0)
        this.shopHitbox = this.physics.add.sprite(128,222,'shop')
        this.player = this.physics.add.sprite(250, 325, 'player')
        this.fishingRod = this.physics.add.sprite(100, 325, 'rod')
        this.hide(this.fishingRod)
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

        this.fish1 = this.physics.add.sprite(100, 100, 'red')
        this.fishMaker(this.fish1, 40, 7, 75, 25, 10, 'Lake', 'red', 0)
        this.fish2 = this.physics.add.sprite(100, 100, 'red')
        this.fishMaker(this.fish2, 30, 4, 80, 20, 25, 'Lake', 'red', 0)
        this.fish3 = this.physics.add.sprite(100, 100, 'red')
        this.fishMaker(this.fish3, 60, 10, 70, 30, 2, 'Lake', 'red', 0)
        this.fish4 = this.physics.add.sprite(100, 100, 'red')
        this.fishMaker(this.fish4, 20, 4, 70, 30, 40, 'Lake', 'red', 0)
        this.fish5 = this.physics.add.sprite(100, 100, 'red')
        this.fishMaker(this.fish5, 15, 3, 80, 20, 80, 'Lake', 'red', 0)
        this.fish6 = this.physics.add.sprite(100, 100, 'red')
        this.fishMaker(this.fish6, 8, 1, 60, 40, 120, 'Lake', 'red', 1)
        this.fish7 = this.physics.add.sprite(100, 100, 'red')
        this.fishMaker(this.fish7, 40, 6, 75, 25, 10, 'Lake', 'red', 2)
        this.fish8 = this.physics.add.sprite(100, 100, 'red')
        this.fishMaker(this.fish8, 40, 7, 75, 25, 10, 'Lake', 'red', 3)

        this.fish9 = this.physics.add.sprite(100, 100, 'orange')
        this.fishMaker(this.fish9, 30, 4, 80, 20, 25, 'Beach', 'orange', 0)
        this.fish10 = this.physics.add.sprite(100, 100, 'orange')
        this.fishMaker(this.fish10, 30, 4, 80, 20, 25, 'Beach', 'orange', 0)
        this.fish11 = this.physics.add.sprite(100, 100, 'orange')
        this.fishMaker(this.fish11, 30, 4, 80, 20, 25, 'Beach', 'orange', 0)
        this.fish12 = this.physics.add.sprite(100, 100, 'orange')
        this.fishMaker(this.fish12, 30, 4, 80, 20, 25, 'Beach', 'orange', 0)
        this.fish13 = this.physics.add.sprite(100, 100, 'orange')
        this.fishMaker(this.fish13, 30, 4, 80, 20, 25, 'Beach', 'orange', 0)
        this.fish14 = this.physics.add.sprite(100, 100, 'orange')
        this.fishMaker(this.fish14, 30, 4, 80, 20, 25, 'Beach', 'orange', 1)
        this.fish15 = this.physics.add.sprite(100, 100, 'orange')
        this.fishMaker(this.fish15, 30, 4, 80, 20, 25, 'Beach', 'orange', 2)
        this.fish16 = this.physics.add.sprite(100, 100, 'orange')
        this.fishMaker(this.fish16, 30, 4, 80, 20, 25, 'Beach', 'orange', 3)

        this.fish17 = this.physics.add.sprite(100, 100, 'green')
        this.fishMaker(this.fish17, 20, 4, 70, 30, 40, 'Lava', 'green', 0)
        this.fish18 = this.physics.add.sprite(100, 100, 'green')
        this.fishMaker(this.fish18, 20, 4, 70, 30, 40, 'Lava', 'green', 0)
        this.fish19 = this.physics.add.sprite(100, 100, 'green')
        this.fishMaker(this.fish19, 20, 4, 70, 30, 40, 'Lava', 'green', 0)
        this.fish20 = this.physics.add.sprite(100, 100, 'green')
        this.fishMaker(this.fish20, 20, 4, 70, 30, 40, 'Lava', 'green', 0)
        this.fish21 = this.physics.add.sprite(100, 100, 'green')
        this.fishMaker(this.fish21, 20, 4, 70, 30, 40, 'Lava', 'green', 0)
        this.fish22 = this.physics.add.sprite(100, 100, 'green')
        this.fishMaker(this.fish22, 20, 4, 70, 30, 40, 'Lava', 'green', 1)
        this.fish23 = this.physics.add.sprite(100, 100, 'green')
        this.fishMaker(this.fish23, 20, 4, 70, 30, 40, 'Lava', 'green', 2)
        this.fish24 = this.physics.add.sprite(100, 100, 'green')
        this.fishMaker(this.fish24, 20, 4, 70, 30, 40, 'Lava', 'green', 3)

        this.fish25 = this.physics.add.sprite(100, 100, 'blue')
        this.fishMaker(this.fish25, 15, 3, 80, 20, 80, 'Space', 'blue', 0)
        this.fish26 = this.physics.add.sprite(100, 100, 'blue')
        this.fishMaker(this.fish26, 15, 3, 80, 20, 80, 'Space', 'blue', 0)
        this.fish27 = this.physics.add.sprite(100, 100, 'blue')
        this.fishMaker(this.fish27, 15, 3, 80, 20, 80, 'Space', 'blue', 0)
        this.fish28 = this.physics.add.sprite(100, 100, 'blue')
        this.fishMaker(this.fish28, 15, 3, 80, 20, 80, 'Space', 'blue', 0)
        this.fish29 = this.physics.add.sprite(100, 100, 'blue')
        this.fishMaker(this.fish29, 15, 3, 80, 20, 80, 'Space', 'blue', 0)
        this.fish30 = this.physics.add.sprite(100, 100, 'blue')
        this.fishMaker(this.fish30, 15, 3, 80, 20, 80, 'Space', 'blue', 1)
        this.fish31 = this.physics.add.sprite(100, 100, 'blue')
        this.fishMaker(this.fish31, 15, 3, 80, 20, 80, 'Space', 'blue', 2)
        this.fish32 = this.physics.add.sprite(100, 100, 'blue')
        this.fishMaker(this.fish32, 15, 3, 80, 20, 80, 'Space', 'blue', 3)

        this.fish33 = this.physics.add.sprite(100, 100, 'purple')
        this.fishMaker(this.fish33, 3, 0, 80, 20, 80, 'Space', 'purple', 3)

        this.currentFish = this.physics.add.sprite(100, 100, 'red')
        this.hide(this.currentFish)
        this.copyFish = this.physics.add.sprite(100, 100, 'red')
        this.hide(this.copyFish)

        this.fishes = [this.fish1, this.fish2, this.fish3, this.fish4, this.fish5, this.fish6, this.fish7, this.fish8, this.fish9, this.fish10, this.fish11, this.fish12, this.fish13, this.fish14, this.fish15, this.fish16, this.fish17, this.fish18, this.fish19, this.fish20, this.fish21, this.fish22, this.fish23, this.fish24, this.fish25, this.fish26, this.fish27, this.fish28, this.fish29, this.fish30, this.fish31, this.fish32]
        this.availableFishes = []
        this.hideList(this.fishes)
        this.hide(this.fish33)

        this.twigRod = { name: 'Twig', level: 0, modifier: 0.5, cost: 0, unlocked: true }
        this.woodRod = { name: 'Wooden Rod', level: 1, modifier: 1, cost: 100, unlocked: false }
        this.fiberglassRod = { name: 'Fiberglass Rod', level: 2, modifier: 1.5, cost: 1000, unlocked: false }
        this.graphiteRod = { name: 'Graphite Rod', level: 3, modifier: 2, cost: 10000, unlocked: false }
        this.rodList = [this.twigRod, this.woodRod, this.fiberglassRod, this.graphiteRod]
        this.activeRod = { name: 'Twig', level: 0, modifier: 0.5, cost: 0, unlocked: true }
        this.shopRod = { name: 'Wooden Rod', cost: 100 }

        this.shoelaceLine = { name: 'Shoelace', level: 0, speed: 1.5, cost: 0, unlocked: true }
        this.threadLine = { name: 'Thread', level: 1, speed: 1.25, cost: 50, unlocked: false }
        this.nylonLine = { name: 'Nylon Line', level: 2, speed: 1, cost: 500, unlocked: false }
        this.microfiberLine = { name: 'Braided Microfiber Line', level: 3, speed: 0.75, cost: 10000, unlocked: false }
        this.lineList = [this.shoelaceLine, this.threadLine, this.nylonLine, this.microfiberLine]
        this.activeLine = { name: 'Shoelace', level: 0, speed: 1, cost: 0, unlocked: true }
        this.shopLine = { name: 'Thread', cost: 50 }

        this.pineconeBobber = { name: 'Pinecone', level: 0, time: 1000, cost: 0, unlocked: true }
        this.yarnBobber = { name: 'Yarn', level: 1, time: -1000, cost: 50, unlocked: false }
        this.roundBobber = { name: 'Round Bobber', level: 2, time: -3000, cost: 1000, unlocked: false }
        this.cigarBobber = { name: 'Cigar Bobber', level: 3, time: -5000, cost: 10000, unlocked: false }
        this.bobberList = [this.pineconeBobber, this.yarnBobber, this.roundBobber, this.cigarBobber]
        this.activeBobber = { name: 'Pinecone', level: 0, time: 1000, cost: 0, unlocked: true }
        this.shopBobber = { name: 'Yarn', cost: 50 }

        this.breadBait = { name: 'Bread', tier: 1, cost: 200, unlocked: false }
        this.wormBait = { name: 'Worm', tier: 2, cost: 1000, unlocked: false }
        this.fishBait = { name: 'Fish', tier: 3, cost: 5000, unlocked: false }
        this.activeBait = 0
        this.baitList = [this.breadBait, this.wormBait, this.fishBait]
        this.shopBait = { name: 'Bread', cost: 200 }

        this.world1 = { name: 'Lake', cost: 0, unlocked: true }
        this.world2 = { name: 'Beach', cost: 200, unlocked: false }
        this.world3 = { name: 'Lava', cost: 1000, unlocked: false }
        this.world4 = { name: 'Space', cost: 5000, unlocked: false }
        this.worldList = [this.world1, this.world2, this.world3, this.world4]
        this.activeWorld = 'Lake'
        this.shopWorld = { name: 'Beach', cost: 200 }

        this.inventory = []
        this.inventoryFull = false

        this.partOne = false;
        this.partTwo = false;
        this.win = false;
        this.doubleWin = false;

        const menuBackdrop = this.add.rectangle(350, 200, 700, 400, 0x000000)
        this.menuBackdrop = this.physics.add.existing(menuBackdrop, 0)
        this.menuBackdrop.setAlpha(0)

        this.createStartMenu()
        this.createPauseMenu()
        this.createInventoryMenu()
        this.createShopMenu()

        this.arrow = this.input.keyboard.createCursorKeys();
        this.spaceTap = false
        this.spaceLetgo = true
        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        this.eTap = false
        this.eLetgo = true
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        this.escTap = false
        this.escLetgo = true
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

        this.money = 100000
        let style = { font: '20px Arial', fill: '#fff' };
        this.scoreText = this.add.text(10, 10, 'cash: ' + this.money, style);
        this.hide(this.scoreText)
        this.progressText = this.add.text(690, 10, 'you still need 8 types of fish here', style)
        this.progressText.setOrigin(1, 0)
        this.finalFish = false
        this.hide(this.progressText)
    }
    update() {
        if (this.arrow.space.isDown && this.spaceLetgo) {
            this.spaceTap = true;
            this.spaceLetgo = false;
        }
        if (!this.arrow.space.isDown) {
            this.spaceLetgo = true;
            this.spaceTap = false;
        }
        if (this.escKey.isDown && this.escLetgo) {
            this.escTap = true
            this.escLetgo = false
        }
        if (!this.escKey.isDown) {
            this.escTap = false
            this.escLetgo = true
        }
        if (this.eKey.isDown && this.eLetgo) {
            this.eTap = true
            this.eLetgo = false
        }
        if (!this.eKey.isDown) {
            this.eTap = false
            this.eLetgo = true
        }
        if (this.currentFish.alpha > 0) {
            this.currentFish.alpha -= 0.005
            this.copyFish.alpha -= 0.005
            this.currentFish.y -= 0.5
            this.copyFish.y -= 0.5
        }
        if (this.inventory.length > 11) {
            this.inventoryFull = true
        } else {
            this.inventoryFull = false
        }
        if (mode == 0) {
            if (this.spaceTap) {
                this.spaceTap = false
                mode = 1
                this.hideList(this.startList)
                this.hide(this.startBackground)
                this.show(this.scoreText)
                this.show(this.progressText)
            }
        }
        if (mode == 1) {
            if (this.escTap) {
                this.escTap = false
                this.menuBackdrop.setAlpha(0.5)
                this.showList(this.pauseMenu)
                mode = 4;
            } else if (this.eTap) {
                this.eTap = false
                this.menuBackdrop.setAlpha(0.5)
                this.showList(this.invMenu)
                this.world1Icon.setInteractive()
                if (this.world2.unlocked) {
                    this.world2Icon.setInteractive()
                } else { this.hide(this.world2Icon); this.hide(this.world2Text) }
                if (this.world3.unlocked) {
                    this.world3Icon.setInteractive()
                } else { this.hide(this.world3Icon); this.hide(this.world3Text) }
                if (this.world4.unlocked) {
                    this.world4Icon.setInteractive()
                } else { this.hide(this.world4Icon); this.hide(this.world4Text) }
                mode = 5;
            } else if (this.spaceTap && this.player.x < 200) {
                this.spaceTap = false
                this.menuBackdrop.setAlpha(0.5)
                this.updateShopText()
                this.showList(this.shopMenu)
                this.shopItem6.setInteractive()
                mode = 6;
            } else if (this.spaceTap && this.player.x > 350 && !(this.inventoryFull)) {
                console.log('fishing')
                this.fishingRod.x = this.player.x + 50
                this.show(this.fishingRod)
                this.exclamationMark.x = this.player.x + 60
                this.exclamationMark.y = this.player.y - 100
                mode = 2
                this.spaceTap = false;
            }
            if (this.exclamationMark.alpha > 0) {
                this.exclamationMark.alpha = this.exclamationMark.alpha - 0.05
            }
            if ((this.dKey.isDown || this.arrow.right.isDown) && this.player.x < 375) {
                this.player.x += 2;
            } else if ((this.aKey.isDown || this.arrow.left.isDown) && this.player.x > 25) {
                this.player.x -= 2;
            }
        }
        if (mode == 2) {
            if (!hasPassed) {
                this.timer = this.time.addEvent({ delay: (5000 + Math.round(Math.random() * 10000)) + this.activeBobber.time, callback: this.onEvent, callbackScope: this })
                hasPassed = true
            }
            if (!canCatch) {
                if (this.exclamationMark.alpha > 0) {
                    this.exclamationMark.alpha = this.exclamationMark.alpha - 0.05
                }
            }
            if (hasPassed && this.spaceTap && (!canCatch)) {
                this.timer.remove()
                this.spaceTap = false;
                hasPassed = false;
                mode = 1
                this.hide(this.fishingRod)
                console.log('cancelling fish')
            }

            if (this.spaceTap && canCatch) {
                this.timer.remove()
                this.timer = this.time.addEvent({ delay: 500, callback: this.startGame, callbackScope: this })
                canCatch = false;
                mode = 3;
                hasPassed = false;
                this.spaceTap = false;
                this.availableFishes = []
                if (this.finalFish && this.activeWorld == 'Space') {
                    this.availableFishes.push(this.fish33)
                } else {
                    for (let i = 0; i < this.fishes.length; i++) {
                        console.log(this.fishes[i].world)
                        if (this.fishes[i].world == this.activeWorld && this.fishes[i].tier <= this.activeBait) {
                            this.availableFishes.push(this.fishes[i])
                        }
                    }
                }
                this.copy(this.currentFish, this.availableFishes[Math.floor(Math.random() * this.availableFishes.length)])
            }


        }
        if (mode == 3) {
            if (!playMinigame) {
                this.r0.x = this.player.x + 200
                this.r1.x = this.player.x + 200
                this.r1.y = 300
                this.r2.x = this.player.x + 200
                this.r2.y = (2 * this.currentFish.low) + 100
                this.r2.displayHeight = (this.currentFish.catchSize * this.activeRod.modifier)
                this.r3.x = this.player.x + 200
                this.r3.y = (2 * this.currentFish.low) + 100
                this.r3.displayHeight = (this.currentFish.critSize * this.activeRod.modifier)
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
                    this.r1.y -= this.activeLine.speed
                    if (this.spaceTap) {
                        this.spaceTap = false;
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
                            this.hide(this.fishingRod)
                            this.hideList(this.fishBar)
                        }
                    } else if (!(this.r1.y < 300 && this.r1.y > 100)) {
                        this.partTwo = false;
                        playMinigame = false;
                        mode = 1;
                        this.hide(this.fishingRod)
                        this.hideList(this.fishBar)
                    }
                }
                if (this.partTwo) {
                    this.r1.y += this.activeLine.speed
                    this.r2.y = (2 * this.currentFish.high) + 100
                    this.r3.y = (2 * this.currentFish.high) + 100
                    if (this.spaceTap) {
                        this.spaceTap = false;
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
                            this.hide(this.fishingRod)
                            this.hideList(this.fishBar)
                        }
                    } else if (!(this.r1.y < 300 && this.r1.y > 100)) {
                        this.partTwo = false;
                        playMinigame = false;
                        mode = 1;
                        this.hide(this.fishingRod)
                        this.hideList(this.fishBar)
                    }
                }
                if (this.win) {
                    this.hideList(this.fishBar)
                    for (let i = 0; i < this.fishes.length; i++) {
                        if (this.fishes[i].name == this.currentFish.name) {
                            this.fishes[i].caught = true
                        }
                    }
                    this.inventory.push(this.currentFish)
                    this.copy(this.invSlotList[this.inventory.length - 1], this.currentFish)
                    console.log(this.inventory)
                    mode = 1
                    if(this.currentFish.name == this.fish33.name){
                        mode = 7
                    }
                    playMinigame = false;
                    this.currentFish.x = this.player.x
                    this.currentFish.y = this.player.y - 100
                    this.show(this.currentFish)
                    this.win = false;
                    this.hide(this.fishingRod)
                    this.updateProgressText()

                }
                if (this.doubleWin) {
                    this.hideList(this.fishBar)
                    for (let i = 0; i < this.fishes.length; i++) {
                        if (this.fishes[i].name == this.currentFish.name) {
                            this.fishes[i].caught = true
                        }
                    }
                    this.inventory.push(this.currentFish)
                    this.copy(this.invSlotList[this.inventory.length - 1], this.currentFish)
                    if (this.inventory.length < 6) {
                        this.inventory.push(this.copyFish)
                        this.copy(this.invSlotList[this.inventory.length - 1], this.currentFish)
                    }
                    console.log(this.inventory)
                    mode = 1
                    playMinigame = false;
                    this.doubleWin = false;
                    this.currentFish.x = this.player.x
                    this.currentFish.y = this.player.y - 100
                    this.copy(this.copyFish, this.currentFish)
                    this.copyFish.x = this.currentFish.x
                    this.copyFish.y = this.currentFish.y - 50
                    this.show(this.currentFish)
                    this.show(this.copyFish)
                    this.hide(this.fishingRod)
                    this.updateProgressText()
                }
            }
        }
        if (mode == 4) {
            // pause menu
            console.log('paused')
            if (this.escTap) {
                this.escTap = false
                this.hide(this.menuBackdrop)
                this.hideList(this.pauseMenu)
                mode = 1
            }
        }
        if (mode == 5) {
            // inventory menu
            console.log('inventory')
            if (this.eTap || this.escTap) {
                this.eTap = false
                this.escTap = false
                this.hide(this.menuBackdrop)
                this.hideList(this.invMenu)
                this.world1Icon.disableInteractive()
                this.world2Icon.disableInteractive()
                this.world3Icon.disableInteractive()
                this.world4Icon.disableInteractive()
                mode = 1
            }
        }
        if (mode == 6) {
            // shop menu
            console.log('shop')
            if (this.spaceTap || this.escTap) {
                this.spaceTap = false
                this.escTap = false
                this.hide(this.menuBackdrop)
                this.hideList(this.shopMenu)
                mode = 1
            }
        }
        if (mode == 7){

        }
    }

    fishMaker(fish, catchS, critS, highN, lowN, worth, level, called, bait) {
        fish.catchSize = catchS
        fish.critSize = critS
        fish.high = highN
        fish.low = lowN
        fish.value = worth
        fish.world = level
        fish.name = called
        fish.tier = bait
        fish.caught = false
    }
    createStartMenu() {
        const startBackground = this.add.rectangle(350, 200, 700, 400, 0x000000)
        this.startBackground = this.physics.add.existing(startBackground, 0)
        this.startBackground.setAlpha(0.2)
        const startLogo = this.add.rectangle(450, 100, 400, 150, 0x0000ff)
        this.startLogo = this.physics.add.existing(startLogo, 0)
        const startButtonBackground = this.add.rectangle(550, 250, 200, 100, 0x00aa00)
        this.startButtonBackground = this.physics.add.existing(startButtonBackground, 0)
        this.startButtonBackground.setInteractive()
        this.startText = this.add.text(550, 250, 'Start Game', { font: '39px Arial' }).setOrigin(0.5, 0.5)
        this.startList = [this.startLogo, this.startButtonBackground, this.startText]
        this.startButtonBackground.on('pointerdown', () => {
            this.hideList(this.startList)
            this.hide(this.startBackground)
            this.show(this.scoreText)
            this.show(this.progressText)
            mode = 1
        })
    }
    createPauseMenu() {
        const pauseMenuBackground = this.add.rectangle(350, 200, 300, 350, 0xffaa55)
        this.pauseMenuBackground = this.physics.add.existing(pauseMenuBackground, 0)
        const logo = this.add.rectangle(350, 100, 200, 100, 0x0000ff)
        this.logo = this.physics.add.existing(logo, 0)
        this.pauseText = this.add.text(350, 100, 'Paused', { font: '40px Arial' }).setOrigin(0.5, 0.5)
        const resumeButton = this.add.rectangle(350, 200, 200, 40, 0x009900)
        this.resumeButton = this.physics.add.existing(resumeButton, 0)
        this.resumeButton.setInteractive()
        this.resumeButton.on('pointerdown', () => {
            this.hideList(this.pauseMenu)
            this.hide(this.menuBackdrop)
            mode = 1
        })
        this.resumeText = this.add.text(350, 200, 'Resume', { font: '20px Arial' }).setOrigin(0.5, 0.5)
        const exitButton = this.add.rectangle(350, 300, 200, 40, 0x000099)
        this.exitButton = this.physics.add.existing(exitButton, 0)
        this.exitButton.setInteractive()
        this.exitButton.on('pointerdown', () => {
            this.hideList(this.pauseMenu)
            this.hide(this.menuBackdrop)
            mode = 0
            this.showList(this.startList)
            this.startBackground.setAlpha(0.2)
        })
        this.exitText = this.add.text(350, 300, 'Exit Game', { font: '20px Arial' }).setOrigin(0.5, 0.5)
        this.pauseMenu = [this.pauseMenuBackground, this.logo, this.resumeButton, this.exitButton, this.pauseText, this.resumeText, this.exitText]
        this.hideList(this.pauseMenu)
    }
    createInventoryMenu() {
        const invMenuBackground = this.add.rectangle(350, 200, 450, 350, 0xdd44ff)
        this.invMenuBackground = this.physics.add.existing(invMenuBackground, 0)
        const invSlots = this.add.rectangle(300, 145, 232, 158, 0xffaa00)
        this.invSlots = this.physics.add.existing(invSlots, 0)
        this.invText = this.add.text(300, 224, 'Inventory', { font: '25px Arial' }).setOrigin(0.5, 0)
        this.inv1 = this.physics.add.sprite(226, 108, 'empty')
        this.inv2 = this.physics.add.sprite(300, 108, 'empty')
        this.inv3 = this.physics.add.sprite(374, 108, 'empty')
        this.inv4 = this.physics.add.sprite(226, 182, 'empty')
        this.inv5 = this.physics.add.sprite(300, 182, 'empty')
        this.inv6 = this.physics.add.sprite(374, 182, 'empty')
        this.invSlotList = [this.inv1, this.inv2, this.inv3, this.inv4, this.inv5, this.inv6]
        for (let i = 0; i < 6; i++) {
            this.invSlotList[i].value = 0
        }
        const rodSlot = this.add.rectangle(500, 80, 50, 50, 0xff0000)
        this.rodSlot = this.physics.add.existing(rodSlot, 0)
        this.rodSlot.setInteractive()
        this.rodSlot.on('pointerdown', () => {
            if (this.activeRod.level == 3) {
                this.copyRod(this.activeRod, this.rodList[0])
                this.rodName.setText(this.activeRod.name)
            } else if (this.rodList[this.activeRod.level + 1].unlocked) {
                this.copyRod(this.activeRod, this.rodList[this.activeRod.level + 1])
                this.rodName.setText(this.activeRod.name)
            } else {
                this.copyRod(this.activeRod, this.rodList[0])
                this.rodName.setText(this.activeRod.name)
            }
        })
        this.rodName = this.add.text(500, 105, 'Twig', { font: '16px Arial' }).setOrigin(0.5, 0)
        const lineSlot = this.add.rectangle(500, 150, 50, 50, 0x000000)
        this.lineSlot = this.physics.add.existing(lineSlot, 0)
        this.lineSlot.setInteractive()
        this.lineSlot.on('pointerdown', () => {
            if (this.activeLine.level == 3) {
                this.copyLine(this.activeLine, this.lineList[0])
                this.lineName.setText(this.activeLine.name)
            } else if (this.lineList[this.activeLine.level + 1].unlocked) {
                this.copyLine(this.activeLine, this.lineList[this.activeLine.level + 1])
                this.lineName.setText(this.activeLine.name)
            } else {
                this.copyLine(this.activeLine, this.lineList[0])
                this.lineName.setText(this.activeLine.name)
            }
        })
        this.lineName = this.add.text(500, 175, 'Shoelace', { font: '16px Arial' }).setOrigin(0.5, 0)
        const bobberSlot = this.add.rectangle(500, 220, 50, 50, 0xffff00)
        this.bobberSlot = this.physics.add.existing(bobberSlot, 0)
        this.bobberSlot.setInteractive()
        this.bobberSlot.on('pointerdown', () => {
            if (this.activeBobber.level == 3) {
                this.copyBobber(this.activeBobber, this.bobberList[0])
                this.bobberName.setText(this.activeBobber.name)
            } else if (this.bobberList[this.activeBobber.level + 1].unlocked) {
                this.copyBobber(this.activeBobber, this.bobberList[this.activeBobber.level + 1])
                this.bobberName.setText(this.activeBobber.name)
            } else {
                this.copyBobber(this.activeBobber, this.bobberList[0])
                this.bobberName.setText(this.activeBobber.name)
            }
            console.log(this.activeBobber.name)
        })
        this.bobberName = this.add.text(500, 245, 'Pinecone', { font: '16px Arial' }).setOrigin(0.5, 0)
        const world1Icon = this.add.rectangle(200, 310, 90, 90, 0x00ff00)
        this.world1Icon = this.physics.add.existing(world1Icon, 0)
        this.world1Icon.setInteractive()
        this.world1Icon.on('pointerdown', () => {
            this.airHitbox.fillColor = 0x7777ff
            this.groundHitbox.fillColor = 0x00ff00
            this.waterHitbox.fillColor = 0x0000ff
            this.activeWorld = this.world1.name
            this.updateProgressText()
        })
        this.world1Text = this.add.text(180, 355, 'Lake', { font: '16px Arial' })
        const world2Icon = this.add.rectangle(300, 310, 90, 90, 0x0000ff)
        this.world2Icon = this.physics.add.existing(world2Icon, 0)
        this.world2Icon.setInteractive()
        this.world2Icon.on('pointerdown', () => {
            this.airHitbox.fillColor = 0x7777ff
            this.groundHitbox.fillColor = 0xffff44
            this.waterHitbox.fillColor = 0x4444ff
            this.activeWorld = this.world2.name
            this.updateProgressText()
        })
        this.world2Text = this.add.text(280, 355, 'Beach', { font: '16px Arial' })
        const world3Icon = this.add.rectangle(400, 310, 90, 90, 0xff0000)
        this.world3Icon = this.physics.add.existing(world3Icon, 0)
        this.world3Icon.setInteractive()
        this.world3Icon.on('pointerdown', () => {
            this.airHitbox.fillColor = 0x222222
            this.groundHitbox.fillColor = 0x444444
            this.waterHitbox.fillColor = 0xff3300
            this.activeWorld = this.world3.name
            this.updateProgressText()
        })
        this.world3Text = this.add.text(380, 355, 'Lava', { font: '16px Arial' })
        const world4Icon = this.add.rectangle(500, 310, 90, 90, 0x000000)
        this.world4Icon = this.physics.add.existing(world4Icon, 0)
        this.world4Icon.setInteractive()
        this.world4Icon.on('pointerdown', () => {
            this.airHitbox.fillColor = 0x000033
            this.groundHitbox.fillColor = 0xcccccc
            this.waterHitbox.fillColor = 0x000033
            this.activeWorld = this.world4.name
            this.updateProgressText()
        })
        this.world4Text = this.add.text(480, 355, 'Space', { font: '16px Arial' })

        this.world1Icon.disableInteractive()
        this.world2Icon.disableInteractive()
        this.world3Icon.disableInteractive()
        this.world4Icon.disableInteractive()

        this.invMenu = [this.invMenuBackground, this.invSlots, this.inv1, this.inv2, this.inv3, this.inv4, this.inv5, this.inv6, this.lineSlot, this.rodSlot, this.bobberSlot, this.world1Icon, this.world2Icon, this.world3Icon, this.world4Icon, this.world1Text, this.world2Text, this.world3Text, this.world4Text, this.invText, this.rodName, this.lineName, this.bobberName]
        this.hideList(this.invMenu)
    }
    createShopMenu() {
        const shopMenuBackground = this.add.rectangle(350, 200, 400, 350, 0xff9933)
        this.shopMenuBackground = this.physics.add.existing(shopMenuBackground, 0)
        const shopItem1 = this.add.rectangle(208, 96, 80, 80, 0x00ff00)
        this.shopItem1 = this.physics.add.existing(shopItem1, 0)
        this.shopItem1.setInteractive()
        this.shopItem1.on('pointerdown', () => {
            if (this.money >= this.shopRod.cost) {
                for (let i = 0; i < this.rodList.length; i++) {
                    if (this.shopRod.name == this.rodList[i].name) {
                        this.rodList[i].unlocked = true
                        this.money -= this.shopRod.cost
                        this.scoreText.setText('cash: ' + this.money)
                        if (!(this.rodList[i].name == 'Graphite Rod')) {
                            this.shopRod.name = this.rodList[i + 1].name
                            this.shopRod.cost = this.rodList[i + 1].cost
                        } else {
                            this.shopRod.name = 'All rods bought'
                            this.shopRod.cost = 0
                        }
                        this.updateShopText()
                        break
                    }
                }
            }
        })
        this.shopRodName = this.add.text(168, 56, 'Rod Name Here', { font: '16px Arial' }).setOrigin(0, 1)
        this.shopRodPrice = this.add.text(248, 56, '€100', { font: '16px Arial' }).setOrigin(0, 0)
        this.shopRodDesc = this.add.text(248, 72, 'Increases\ncatching\nbox', { font: '16px Arial' }).setOrigin(0, 0)
        const shopItem2 = this.add.rectangle(408, 96, 80, 80, 0xffff00)
        this.shopItem2 = this.physics.add.existing(shopItem2, 0)
        this.shopItem2.setInteractive()
        this.shopItem2.on('pointerdown', () => {
            if (this.money >= this.shopLine.cost) {
                for (let i = 0; i < this.lineList.length; i++) {
                    if (this.shopLine.name == this.lineList[i].name) {
                        this.lineList[i].unlocked = true
                        this.money -= this.shopLine.cost
                        this.scoreText.setText('cash: ' + this.money)
                        if (!(this.lineList[i].name == 'Braided Microfiber Line')) {
                            this.shopLine.name = this.lineList[i + 1].name
                            this.shopLine.cost = this.lineList[i + 1].cost
                        } else {
                            this.shopLine.name = 'All lines bought'
                            this.shopLine.cost = 0
                        }
                        this.updateShopText()
                        break
                    }
                }
            }
        })
        this.shopLineName = this.add.text(368, 56, 'Line Name Here', { font: '16px Arial' }).setOrigin(0, 1)
        this.shopLinePrice = this.add.text(448, 56, '€100', { font: '16px Arial' }).setOrigin(0, 0)
        this.shopLineDesc = this.add.text(448, 72, 'Decreases\nline\nspeed', { font: '16px Arial' }).setOrigin(0, 0)
        const shopItem3 = this.add.rectangle(208, 206, 80, 80, 0xff0000)
        this.shopItem3 = this.physics.add.existing(shopItem3, 0)
        this.shopItem3.setInteractive()
        this.shopItem3.on('pointerdown', () => {
            if (this.money >= this.shopBobber.cost) {
                for (let i = 0; i < this.bobberList.length; i++) {
                    if (this.shopBobber.name == this.bobberList[i].name) {
                        this.bobberList[i].unlocked = true
                        this.money -= this.shopBobber.cost
                        this.scoreText.setText('cash: ' + this.money)
                        if (!(this.bobberList[i].name == 'Cigar Bobber')) {
                            this.shopBobber.name = this.bobberList[i + 1].name
                            this.shopBobber.cost = this.bobberList[i + 1].cost
                        } else {
                            this.shopBobber.name = 'All lines bought'
                            this.shopBobber.cost = 0
                        }
                        this.updateShopText()
                        break
                    }
                }
            }
        })
        this.shopBobberName = this.add.text(168, 166, 'Bobber Name Here', { font: '16px Arial' }).setOrigin(0, 1)
        this.shopBobberPrice = this.add.text(248, 166, '€100', { font: '16px Arial' }).setOrigin(0, 0)
        this.shopBobberDesc = this.add.text(248, 182, 'Decreases\nwaiting\ntime', { font: '16px Arial' }).setOrigin(0, 0)
        const shopItem4 = this.add.rectangle(408, 206, 80, 80, 0xff00ff)
        this.shopItem4 = this.physics.add.existing(shopItem4, 0)
        this.shopItem4.setInteractive()
        this.shopItem4.on('pointerdown', () => {
            if (this.money >= this.shopBait.cost) {
                for (let i = 0; i < this.baitList.length; i++) {
                    if (this.shopBait.name == this.baitList[i].name) {
                        this.baitList[i].unlocked = true
                        this.money -= this.shopBait.cost
                        this.activeBait = this.baitList[i].tier
                        this.scoreText.setText('cash: ' + this.money)
                        if (!(this.baitList[i].name == 'Fish')) {
                            this.shopBait.name = this.baitList[i + 1].name
                            this.shopBait.cost = this.baitList[i + 1].cost
                        } else {
                            this.shopBait.name = 'All bait bought'
                            this.shopBait.cost = 0
                        }
                        this.updateShopText()
                        break
                    }
                }
            }
        })
        this.shopBaitName = this.add.text(368, 166, 'Bait Name Here', { font: '16px Arial' }).setOrigin(0, 1)
        this.shopBaitPrice = this.add.text(448, 166, '€100', { font: '16px Arial' }).setOrigin(0, 0)
        this.shopBaitDesc = this.add.text(448, 182, 'Increases\nfish\nvariety', { font: '16px Arial' }).setOrigin(0, 0)
        const shopItem5 = this.add.rectangle(208, 316, 80, 80, 0x0000ff)
        this.shopItem5 = this.physics.add.existing(shopItem5, 0)
        this.shopItem5.setInteractive()
        this.shopItem5.on('pointerdown', () => {
            if (this.money >= this.shopWorld.cost) {
                for (let i = 0; i < this.worldList.length; i++) {
                    if (this.shopWorld.name == this.worldList[i].name) {
                        this.worldList[i].unlocked = true
                        this.money -= this.shopWorld.cost
                        this.scoreText.setText('cash: ' + this.money)
                        if (!(this.worldList[i].name == 'Space')) {
                            this.shopWorld.name = this.worldList[i + 1].name
                            this.shopWorld.cost = this.worldList[i + 1].cost
                        } else {
                            this.shopWorld.name = 'All worlds bought'
                            this.shopWorld.cost = 0
                        }
                        this.updateShopText()
                        break
                    }
                }
            }
        })
        this.shopWorldName = this.add.text(168, 276, 'World Name Here', { font: '16px Arial' }).setOrigin(0, 1)
        this.shopWorldPrice = this.add.text(248, 276, '€100', { font: '16px Arial' }).setOrigin(0, 0)
        this.shopWorldDesc = this.add.text(248, 292, 'Unlocks\nnew world', { font: '16px Arial' }).setOrigin(0, 0)
        const shopItem6 = this.add.rectangle(408, 316, 80, 80, 0x00ffff)
        this.shopItem6 = this.physics.add.existing(shopItem6)
        this.shopSellName = this.add.text(368, 276, 'Sell your Fish', { font: '16px Arial' }).setOrigin(0, 1)
        this.shopSellPrice = this.add.text(448, 276, 'Earn €0', { font: '16px Arial' }).setOrigin(0, 0)
        this.shopSellDesc = this.add.text(448, 292, 'Sells your\ninventory', { font: '16px Arial' }).setOrigin(0, 0)
        this.shopItem6.setInteractive()
        this.shopItem6.on('pointerdown', () => {
            for (let i = 0; i < this.inventory.length; i++) {
                this.money += this.invSlotList[i].value
            }
            for (let i = 0; i < this.invSlotList.length; i++) {
                this.invSlotList[i].setTexture('empty')
                this.invSlotList[i].value = 0
            }
            this.inventory = []
            this.scoreText.setText('cash: ' + this.money)
            this.updateShopText()
        })

        this.shopItem6.disableInteractive()

        this.shopMenu = [this.shopMenuBackground, this.shopItem1, this.shopItem2, this.shopItem3, this.shopItem4, this.shopItem5, this.shopItem6, this.shopRodDesc, this.shopRodName, this.shopRodPrice, this.shopLineDesc, this.shopLineName, this.shopLinePrice, this.shopBaitDesc, this.shopBaitName, this.shopBaitPrice, this.shopBobberDesc, this.shopBobberName, this.shopBobberPrice, this.shopWorldDesc, this.shopWorldName, this.shopWorldPrice, this.shopSellDesc, this.shopSellName, this.shopSellPrice]
        this.hideList(this.shopMenu)
    }
    updateShopText() {
        this.shopRodName.setText(this.shopRod.name)
        this.shopRodPrice.setText('€' + this.shopRod.cost)
        this.shopLineName.setText(this.shopLine.name)
        this.shopLinePrice.setText('€' + this.shopLine.cost)
        this.shopBaitName.setText(this.shopBait.name)
        this.shopBaitPrice.setText('€' + this.shopBait.cost)
        this.shopBobberName.setText(this.shopBobber.name)
        this.shopBobberPrice.setText('€' + this.shopBobber.cost)
        this.shopWorldName.setText(this.shopWorld.name)
        this.shopWorldPrice.setText('€' + this.shopWorld.cost)
        let inventoryValue = 0
        for (let i = 0; i < 6; i++) {
            inventoryValue += this.invSlotList[i].value
        }
        this.shopSellPrice.setText('Earn €' + inventoryValue)
    }
    updateProgressText() {
        let numb = 0
        if (!this.finalFish) {
            for (let i = 0; i < this.fishes.length; i++) {
                if (this.fishes[i].world == this.activeWorld && this.fishes[i].caught == false) {
                    numb++
                }
            }
            if (numb == 0) {
                let allCaught = true
                for (let i = 0; i < this.fishes.length; i++) {
                    if (this.fishes[i].caught == false)
                        allCaught = false
                }
                if (allCaught) {
                    this.progressText.setText('Meet me in space')
                    if (this.fishes.length < 33) {
                        this.fishes.push(this.fish33)
                        this.finalFish = true
                    }
                } else {
                    this.progressText.setText('You still need to visit other realms')
                }
            } else {
                this.progressText.setText('You still need ' + numb + ' types of fish here')
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
            this.hide(this.fishingRod)
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
        copy.name = orig.name
        copy.setTexture(orig.name)
    }
    copyRod(copy, orig) {
        copy.name = orig.name
        copy.level = orig.level
        copy.cost = orig.cost
        copy.modifier = orig.modifier
        copy.unlocked = orig.unlocked
    }
    copyLine(copy, orig) {
        copy.name = orig.name
        copy.level = orig.level
        copy.cost = orig.cost
        copy.speed = orig.speed
        copy.unlocked = orig.unlocked
    }
    copyBobber(copy, orig) {
        copy.name = orig.name
        copy.level = orig.level
        copy.cost = orig.cost
        copy.time = orig.time
        copy.unlocked = orig.unlocked
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