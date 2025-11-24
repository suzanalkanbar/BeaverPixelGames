var mode = 1;
var playMinigame = false;
var hasPassed = false;
var canCatch = false;
class mainScene {
    preload() {
        this.load.image('player', 'catFish_2/assets/player.png')
        this.load.image('rod', 'catFish_2/assets/rod.png')
        this.load.image('exclamation', 'catFish_2/assets/exclamation.png')
        this.load.image('empty','catFish_2/assets/empty.png')
        this.load.image('red', 'catFish_2/assets/fish/red.png')
        this.load.image('orange', 'catFish_2/assets/fish/orange.png')
        this.load.image('yellow', 'catFish_2/assets/fish/yellow.png')
        this.load.image('green', 'catFish_2/assets/fish/green.png')
        this.load.image('blue', 'catFish_2/assets/fish/blue.png')
        this.load.image('purple', 'catFish_2/assets/fish/purple.png')
    }
    create() {
        const air = this.add.rectangle(350, 200, 700, 400, 0x7777ff)
        this.airHitbox = this.physics.add.existing(air, 0)
        const grass = this.add.rectangle(350, 375, 700, 50, 0x00ff00)
        this.groundHitbox = this.physics.add.existing(grass, 0)
        const water = this.add.rectangle(550, 375, 300, 50, 0x0000ff)
        this.waterHitbox = this.physics.add.existing(water, 0)
        const shop = this.add.rectangle(100, 250, 200, 200, 0xff0000)
        this.shopHitbox = this.physics.add.existing(shop, 0)
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

        this.twigRod = { name: 'Twig', modifier: 0.5, unlocked: true }
        this.woodRod = { name: 'Wooden Rod', modifier: 1, unlocked: false }
        this.fiberglassRod = { name: 'Fiberglass Rod', modifier: 1.5, unlocked: false }
        this.graphiteRod = { name: 'Graphite Rod', modifier: 2, unlocked: false }
        this.rodList = [this.twigRod, this.woodRod, this.fiberglassRod, this.graphiteRod]
        this.activeRod = { name: 'Twig', modifier: 1, unlocked: true }

        this.shoelaceLine = { name: 'Shoelace', speed: 2, unlocked: true }
        this.threadLine = { name: 'Thread', speed: 1.5, unlocked: false }
        this.nylonLine = { name: 'Nylon Line', speed: 1, unlocked: false }
        this.microfiberLine = { name: 'Braided Microfiber Line', speed: 0.5, unlocked: false }
        this.lineList = [this.shoelaceLine, this.threadLine, this.nylonLine, this.microfiberLine]
        this.activeLine = { name: 'Shoelace', speed: 1, unlocked: true }

        this.pineconeBobber = { name: 'Pinecone', time: 1000, unlocked: true }
        this.yarnBobber = { name: 'Yarn', time: -1000, unlocked: false }
        this.roundBobber = { name: 'Round Bobber', time: -3000, unlocked: false }
        this.cigarBobber = { name: 'Cigar Bobber', time: -5000, unlocked: false }
        this.bobberList = [this.pineconeBobber, this.yarnBobber, this.roundBobber, this.cigarBobber]
        this.activeBobber = { name: 'Pinecone', time: 1000, unlocked: true }

        this.inventory = []
        this.inventoryFull = false

        this.partOne = false;
        this.partTwo = false;
        this.win = false;
        this.doubleWin = false;

        const menuBackdrop = this.add.rectangle(350, 200, 700, 400, 0x000000)
        this.menuBackdrop = this.physics.add.existing(menuBackdrop, 0)
        this.menuBackdrop.setAlpha(0)

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

        this.money = 0
        let style = { font: '20px Arial', fill: '#fff' };
        this.scoreText = this.add.text(20, 20, 'cash: ' + this.money, style);
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
                this.world2Icon.setInteractive()
                this.world3Icon.setInteractive()
                this.world4Icon.setInteractive()
                mode = 5;
            } else if (this.spaceTap && this.player.x < 200) {
                this.spaceTap = false
                this.menuBackdrop.setAlpha(0.5)
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
            if (this.arrow.right.isDown && this.player.x < 375) {
                this.player.x += 2;
            } else if (this.arrow.left.isDown && this.player.x > 25) {
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
                    this.inventory.push(this.currentFish)
                    this.copy(this.invSlotList[this.inventory.length-1],this.currentFish)
                    console.log(this.inventory)
                    mode = 1
                    playMinigame = false;
                    this.currentFish.x = this.player.x
                    this.currentFish.y = this.player.y - 100
                    this.show(this.currentFish)
                    this.win = false;
                    this.hide(this.fishingRod)

                }
                if (this.doubleWin) {
                    this.hideList(this.fishBar)
                    this.inventory.push(this.currentFish)
                    this.copy(this.invSlotList[this.inventory.length-1],this.currentFish)
                    if (this.inventory.length < 6) {
                        this.inventory.push(this.copyFish)
                        this.copy(this.invSlotList[this.inventory.length-1],this.currentFish)
                    }
                    console.log(this.inventory)
                    mode = 1
                    playMinigame = false;
                    this.doubleWin = false;
                    this.currentFish.x = this.player.x
                    this.currentFish.y = this.player.y - 100
                    this.copy(this.copyFish, this.currentFish)
                    this.copyFish.x = this.currentFish.x
                    this.copyFish.y = this.currentFish.y-50
                    this.show(this.currentFish)
                    this.show(this.copyFish)
                    this.hide(this.fishingRod)
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
    }
    createPauseMenu() {
        const pauseMenuBackground = this.add.rectangle(350, 200, 300, 350, 0xffcc77)
        this.pauseMenuBackground = this.physics.add.existing(pauseMenuBackground, 0)
        const logo = this.add.rectangle(350, 100, 200, 100, 0x0000ff)
        this.logo = this.physics.add.existing(logo, 0)
        const resumeButton = this.add.rectangle(350, 200, 200, 50, 0x000000)
        this.resumeButton = this.physics.add.existing(resumeButton, 0)
        const collectionButton = this.add.rectangle(350, 250, 200, 50, 0xff0000)
        this.collectionButton = this.physics.add.existing(collectionButton, 0)
        const exitButton = this.add.rectangle(350, 300, 200, 50, 0xffff00)
        this.exitButton = this.physics.add.existing(exitButton, 0)
        this.pauseMenu = [this.pauseMenuBackground, this.logo, this.resumeButton, this.collectionButton, this.exitButton]
        this.hideList(this.pauseMenu)
    }
    createInventoryMenu() {
        const invMenuBackground = this.add.rectangle(350, 200, 450, 350, 0xee88ff)
        this.invMenuBackground = this.physics.add.existing(invMenuBackground, 0)
        const invSlots = this.add.rectangle(300, 145, 232, 158, 0xffaa00)
        this.invSlots = this.physics.add.existing(invSlots, 0)
        this.inv1 = this.physics.add.sprite(226,108,'empty')
        this.inv2 = this.physics.add.sprite(300,108,'empty')
        this.inv3 = this.physics.add.sprite(374,108,'empty')
        this.inv4 = this.physics.add.sprite(226,182,'empty')
        this.inv5 = this.physics.add.sprite(300,182,'empty')
        this.inv6 = this.physics.add.sprite(374,182,'empty')
        this.invSlotList = [this.inv1,this.inv2,this.inv3,this.inv4,this.inv5,this.inv6]
        const rodSlot = this.add.rectangle(500, 90, 50, 50, 0xff0000)
        this.rodSlot = this.physics.add.existing(rodSlot, 0)
        const lineSlot = this.add.rectangle(500, 150, 50, 50, 0x000000)
        this.lineSlot = this.physics.add.existing(lineSlot, 0)
        const bobberSlot = this.add.rectangle(500, 210, 50, 50, 0xffff00)
        this.bobberSlot = this.physics.add.existing(bobberSlot, 0)
        const world1Icon = this.add.rectangle(200, 310, 90, 90, 0x00ff00)
        this.world1Icon = this.physics.add.existing(world1Icon, 0)
        this.world1Icon.setInteractive()
        this.world1Icon.on('pointerdown', () => {
            this.airHitbox.fillColor = 0x7777ff
            this.groundHitbox.fillColor = 0x00ff00
            this.waterHitbox.fillColor = 0x0000ff
        })
        const world2Icon = this.add.rectangle(300, 310, 90, 90, 0x0000ff)
        this.world2Icon = this.physics.add.existing(world2Icon, 0)
        this.world2Icon.setInteractive()
        this.world2Icon.on('pointerdown', () => {
            this.airHitbox.fillColor = 0x7777ff
            this.groundHitbox.fillColor = 0xffff44
            this.waterHitbox.fillColor = 0x4444ff
        })
        const world3Icon = this.add.rectangle(400, 310, 90, 90, 0xff0000)
        this.world3Icon = this.physics.add.existing(world3Icon, 0)
        this.world3Icon.setInteractive()
        this.world3Icon.on('pointerdown', () => {
            this.airHitbox.fillColor = 0x222222
            this.groundHitbox.fillColor = 0x444444
            this.waterHitbox.fillColor = 0xff3300
        })
        const world4Icon = this.add.rectangle(500, 310, 90, 90, 0x000000)
        this.world4Icon = this.physics.add.existing(world4Icon, 0)
        this.world4Icon.setInteractive()
        this.world4Icon.on('pointerdown', () => {
            this.airHitbox.fillColor = 0x000033
            this.groundHitbox.fillColor = 0xcccccc
            this.waterHitbox.fillColor = 0x000033
        })

        this.world1Icon.disableInteractive()
        this.world2Icon.disableInteractive()
        this.world3Icon.disableInteractive()
        this.world4Icon.disableInteractive()

        this.invMenu = [this.invMenuBackground, this.invSlots, this.inv1,this.inv2,this.inv3,this.inv4,this.inv5,this.inv6, this.lineSlot, this.rodSlot, this.bobberSlot, this.world1Icon, this.world2Icon, this.world3Icon, this.world4Icon]
        this.hideList(this.invMenu)
    }
    createShopMenu() {
        const shopMenuBackground = this.add.rectangle(350, 200, 400, 350, 0xffaa66)
        this.shopMenuBackground = this.physics.add.existing(shopMenuBackground, 0)
        const shopItem1 = this.add.rectangle(250, 90, 180, 100, 0x00ff00)
        this.shopItem1 = this.physics.add.existing(shopItem1, 0)
        const shopItem2 = this.add.rectangle(450, 90, 180, 100, 0xffff00)
        this.shopItem2 = this.physics.add.existing(shopItem2, 0)
        const shopItem3 = this.add.rectangle(250, 200, 180, 100, 0xff0000)
        this.shopItem3 = this.physics.add.existing(shopItem3, 0)
        const shopItem4 = this.add.rectangle(450, 200, 180, 100, 0xff00ff)
        this.shopItem4 = this.physics.add.existing(shopItem4, 0)
        const shopItem5 = this.add.rectangle(250, 310, 180, 100, 0x0000ff)
        this.shopItem5 = this.physics.add.existing(shopItem5, 0)
        const shopItem6 = this.add.rectangle(450, 310, 180, 100, 0x00ffff)
        this.shopItem6 = this.physics.add.existing(shopItem6)
        this.shopItem6.setInteractive()
        this.shopItem6.on('pointerdown',()=>{
            for (let i =0;i<this.inventory.length;i++){
                this.money += this.inventory[i].value
            }
            this.inventory = []
            this.scoreText.setText('cash: ' + this.money)
        })

        this.shopItem6.disableInteractive()

        this.shopMenu = [this.shopMenuBackground, this.shopItem1, this.shopItem2, this.shopItem3, this.shopItem4, this.shopItem5, this.shopItem6]
        this.hideList(this.shopMenu)
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
}

new Phaser.Game({
    width: 700, // Width of the game in pixels
    height: 400, // Height of the game in pixels
    backgroundColor: '#3498db', // The background color (blue)
    scene: mainScene, // The name of the scene we created
    physics: { default: 'arcade' }, // The physics engine to use
    parent: 'Catfish 2', // Create the game inside the <div id="game"> 
});