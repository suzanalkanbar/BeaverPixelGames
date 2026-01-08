// Create the mainScene
class mainScene {
    // The three methods currently empty

    preload() {
        /*     
        This method is called once at the beginning
        It will load all the assets, like sprites and sounds
        */
        this.load.image('bullet', 'n-touhou/assets/bullet.png')
        this.load.image('flandreHitbox', 'n-touhou/assets/flanHitbox.png')
        this.load.image('supercat','n-touhou/assets/supercat.png')
        let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
        for (let i = 0; i < colors.length; i++) {
            this.load.image(colors[i] + 'Bullet', 'n-touhou/assets/' + colors[i] + 'Bullet.png')
        }

    }

    create() {
        /* 
        This method is called once, just after preload()
        It will initialize our scene, like the positions of the sprites
        */
        const edgeLeft = this.add.rectangle(100, 200, 200, 400, 0x000000)
        const edgeRight = this.add.rectangle(600, 200, 200, 400, 0x000000)
        const healthBar = this.add.rectangle(575, 375, 50, 350, 0x00ff00).setOrigin(0, 1)
        this.healthBar = this.physics.add.existing(healthBar)
        this.reimuHitbox = this.physics.add.sprite(350,350, 'supercat')
        this.lifeText = this.add.text(50,350,'Lives:', {font: '12px Arial',fill: '#fff'}).setOrigin(0.5,0.5)
        this.life1 = this.physics.add.sprite(80,350, 'supercat')
        this.life2 = this.physics.add.sprite(100,350, 'supercat')
        this.life3 = this.physics.add.sprite(120,350, 'supercat')
        this.flandreHitbox = this.physics.add.sprite(350, 100, 'flandreHitbox')
        this.flandreDestination = { x: 350, y: 100 }
        this.bulletl = this.add.group({ defaultKey: 'bullet' })
        this.bulletm = this.add.group({ defaultKey: 'bullet' })
        this.bulletr = this.add.group({ defaultKey: 'bullet' })
        this.eneBullet = this.add.group({ defaultKey: 'bullet' })
        this.Timer = 0
        this.score = 0
        this.gameOver = false
        this.lives = 3
        this.invuln = false
        this.enemyHealth = 250
        this.phase = 0
        this.gameOverText = this.add.text(350, 200, 'GAME OVER', { font: '40px Arial', fill: '#f00' }).setOrigin(0.5, 0.5)
        this.gameOverText.setAlpha(0)
        this.victoryText = this.add.text(350, 200, 'You Win!', { font: '40px Arial', fill: '#ff0' }).setOrigin(0.5, 0.5)
        this.victoryText.setAlpha(0)
        this.bestTimeText = this.add.text(20, 20, 'Best Time: --', { font: '12px Arial', fill: '#fff' }).setOrigin(0,0)
        this.bestTime = 9000000000
        this.timeText = this.add.text(20,40,'Current Time: --', { font: '12px Arial', fill: '#fff' }).setOrigin(0,0)
    }


    update() {
        /* 
        This method is called 60 times per second after create() 
        It will handle all the game's logic, like movements
        */
        if (this.gameOver == true) {
            this.gameOverText.setAlpha(1)
            let enemyBulletList = this.eneBullet.getChildren()
            for (let i = 0; i < enemyBulletList.length; i++) {
                enemyBulletList[i].x += enemyBulletList[i].velocity[0]
                enemyBulletList[i].y += enemyBulletList[i].velocity[1]
            }
            Phaser.Actions.IncXY(this.bulletl.getChildren(), -1.5, -11)
            Phaser.Actions.IncY(this.bulletm.getChildren(), -12)
            Phaser.Actions.IncXY(this.bulletr.getChildren(), 1.5, -11)
            this.killOob(this.bulletl)
            this.killOob(this.bulletm)
            this.killOob(this.bulletr)
            this.killOob(this.eneBullet)

        } else if (this.victory == true) {
            if(Math.floor(this.Timer/60) < this.bestTime){
                this.bestTime = Math.floor(this.Timer/60)
                this.bestTimeText.setText('Best Time: '+this.bestTime)
            }
            this.victoryText.setAlpha(1)
            let enemyBulletList = this.eneBullet.getChildren()
            for (let i = 0; i < enemyBulletList.length; i++) {
                enemyBulletList[i].destroy()
            }
            Phaser.Actions.IncXY(this.bulletl.getChildren(), -1.5, -11)
            Phaser.Actions.IncY(this.bulletm.getChildren(), -12)
            Phaser.Actions.IncXY(this.bulletr.getChildren(), 1.5, -11)
            this.killOob(this.bulletl)
            this.killOob(this.bulletm)
            this.killOob(this.bulletr)
        }
        else {
            var pointer = this.input.activePointer
            if (pointer.x > 200 && pointer.x < 500) {
                if (this.distance(pointer, this.reimuHitbox) > 10) {
                    this.follow(this.reimuHitbox, pointer)
                } else {
                    this.reimuHitbox.x = pointer.x
                    this.reimuHitbox.y = pointer.y
                }
            }
            this.fireCooldown = 7
            this.Timer++
            this.timeText.setText('Current Time: '+ Math.floor(this.Timer/60))
            if (this.Timer % this.fireCooldown == 0) {
                this.bulletl.create(this.reimuHitbox.x - 6, this.reimuHitbox.y - 5, 'bullet')
                this.bulletm.create(this.reimuHitbox.x - 6, this.reimuHitbox.y, 'bullet')
                this.bulletm.create(this.reimuHitbox.x, this.reimuHitbox.y, 'bullet')
                this.bulletm.create(this.reimuHitbox.x + 6, this.reimuHitbox.y, 'bullet')
                this.bulletr.create(this.reimuHitbox.x + 6, this.reimuHitbox.y - 5, 'bullet')
            }
            if (this.phase == 5) {
                if (this.Timer % 45 == 0) {
                    this.enemyFire()
                }
            } else {
                if (this.Timer % 60 == 0) {
                    this.enemyFire()
                }
            }
            if (this.Timer % 180 == 0) {
                this.flandreDestination.x = Math.round(Math.random() * 250 + 225)
                this.flandreDestination.y = Math.round(Math.random() * 100 + 25)
            }
            if (this.distance(this.flandreDestination, this.flandreHitbox) < 10) {
                this.flandreHitbox.x = this.flandreDestination.x
                this.flandreHitbox.y = this.flandreDestination.y
            } else {
                this.follow(this.flandreHitbox, this.flandreDestination)
            }
            Phaser.Actions.IncXY(this.bulletl.getChildren(), -1.5, -11)
            Phaser.Actions.IncY(this.bulletm.getChildren(), -12)
            Phaser.Actions.IncXY(this.bulletr.getChildren(), 1.5, -11)
            let enemyBulletList = this.eneBullet.getChildren()
            for (let i = 0; i < enemyBulletList.length; i++) {
                enemyBulletList[i].x += enemyBulletList[i].velocity[0]
                enemyBulletList[i].y += enemyBulletList[i].velocity[1]
                if (enemyBulletList[i].type == 'straight') {
                } else {
                    if (enemyBulletList[i].type == 'homing') {
                        if (this.reimuHitbox.x > enemyBulletList[i].x) {
                            if (this.reimuHitbox.y > enemyBulletList[i].y) {
                                enemyBulletList[i].acceleration = [0.01, 0.01]
                            } else { enemyBulletList[i].acceleration = [0.01, -0.01] }
                        }
                        if (this.reimuHitbox.x < enemyBulletList[i].x) {
                            if (this.reimuHitbox.y > enemyBulletList[i].y) {
                                enemyBulletList[i].acceleration = [-0.01, 0.01]
                            } else { enemyBulletList[i].acceleration = [-0.01, -0.01] }
                        }
                    } else if (enemyBulletList[i].type == 'wavey') {
                        enemyBulletList[i].acceleration = [0.3 * Math.cos(this.Timer), 0.3 * Math.sin(this.Timer)]
                    }
                    enemyBulletList[i].velocity[0] += enemyBulletList[i].acceleration[0]
                    enemyBulletList[i].velocity[1] += enemyBulletList[i].acceleration[1]
                }
            }
            this.killOob(this.bulletl)
            this.killOob(this.bulletm)
            this.killOob(this.bulletr)
            this.killOob(this.eneBullet)
            this.hitEnemy(this.bulletl)
            this.hitEnemy(this.bulletm)
            this.hitEnemy(this.bulletr)
            if (!this.invuln) {
                this.hitPlayer(this.eneBullet)
            }
            if (this.enemyHealth > 0) {
                this.enemyHealth = 250 - this.score
                this.healthBar.displayHeight = (this.enemyHealth / 250) * 350
            } else if (this.phase < 5) {
                this.phase++
                this.score -= 250
                this.enemyHealth = 250
                this.healthBar.displayHeight = (this.enemyHealth / 250) * 350
            } else {
                this.victory = true
            }




        }
    }

    /* VVV Put any other functions and code down here VVV */
    distance(one, two) {
        return (((one.x - two.x) ** 2) + ((one.y - two.y) ** 2)) ** 0.5
    }
    follow(girl, mouse) {
        let folX = mouse.x - girl.x
        let folY = mouse.y - girl.y
        let folS = (folX ** 2 + folY ** 2) ** 0.5
        folX = (folX / folS) * 10
        folY = (folY / folS) * 10
        girl.x += folX
        girl.y += folY
    }
    killOob(groupy) {
        let listy = groupy.getChildren()
        for (let i = 0; i < listy.length; i++) {
            if (listy[i].y < 0 || listy[i].x < 200 || listy[i].x > 500 || listy[i].y > 400) {
                listy[i].destroy()
            }
        }
    }
    hitPlayer(groupy) {
        let listy = groupy.getChildren()
        let up = this.reimuHitbox.y - 5
        let down = this.reimuHitbox.y + 5
        let right = this.reimuHitbox.x + 5
        let left = this.reimuHitbox.x - 5
        for (let i = 0; i < listy.length; i++) {
            if (this.checkOverlap(listy[i], up, down, right, left)) {
                this.die()
            }
        }
    }
    die() {
        if(this.lives == 3){
            this.life3.setAlpha(0)
        } else if(this.lives==2){
            this.life2.setAlpha(0)
        } else {
            this.life1.setAlpha(0)
        }
        this.lives -= 1
        this.reimuHitbox.setAlpha(0)
        if (this.lives < 0) {
            this.gameOver = true
        } else {
            this.invuln = true
            this.gonetime = this.time.addEvent({ delay: 500, callback: this.respawn, callbackScope: this })

        }
    }
    respawn() {
        this.reimuHitbox.setAlpha(0.5)
        this.timer = this.time.addEvent({ delay: 1000, callback: this.reActivate, callbackScope: this })
    }
    reActivate() {
        this.invuln = false
        this.reimuHitbox.setAlpha(1)
    }
    hitEnemy(groupy) {
        let listy = groupy.getChildren()
        let up = this.flandreHitbox.y - 25
        let down = this.flandreHitbox.y + 25
        let right = this.flandreHitbox.x + 18
        let left = this.flandreHitbox.x - 18
        for (let i = 0; i < listy.length; i++) {
            if (this.checkOverlap(listy[i], up, down, right, left)) {
                this.score += 1
                listy[i].destroy()
            }
        }
    }
    checkOverlap(sprite, boxTop, boxBottom, boxRight, boxLeft) {
        if (sprite.x < boxRight && sprite.x > boxLeft) {
            if (sprite.y > boxTop && sprite.y < boxBottom) {
                return true
            }
        }
        return false
    }
    enemyFire() {
        if (this.phase == 0) {
            this.circleAttack()
        } else if (this.phase == 1) {
            if (Math.floor(Math.random() * 2) == 0) {
                this.leftAttack()
            } else { this.rightAttack() }
        } else if (this.phase == 2) {
            this.homingAttack()
        } else if (this.phase == 3) {
            this.waveAttack()
        } else {
            let attack = Math.floor(Math.random() * 4)
            if (attack == 0) {
                this.waveAttack()
            } else if (attack == 1) {
                this.circleAttack()
            } else if (attack == 2) {
                this.homingAttack()
            } else if (attack == 3) {
                this.leftAttack()
                if (this.phase == 5) {
                    this.rightAttack()
                }
            } else if (attack == 4) {
                this.rightAttack()
                if (this.phase == 5) {
                    this.leftAttack()
                }
            }
        }
    }
    circleAttack() {
        let speeds = []
        let amount = 16
        let angle = 22.5
        if (this.phase == 5) {
            amount = 32
            angle = 11.25
        }
        for (let i = 0; i < amount; i++) {
            speeds.push(this.vector(2, i * angle))
            this.eneBullet.create(this.flandreHitbox.x, this.flandreHitbox.y, 'redBullet')
        }
        let listy = this.eneBullet.getChildren()
        for (let i = 0; i < listy.length; i++) {
            if (listy[i].velocity == undefined) {
                listy[i].velocity = speeds[i % speeds.length]
                listy[i].type = 'straight'
                listy[i].acceleration = [0, 0]
            }
        }
    }
    leftAttack() {
        let speeds = []
        for (let i = 0; i < 10; i++) {
            speeds.push(this.vector(1, 0))
            this.eneBullet.create(200, 40 + 40 * i, 'orangeBullet')
        }
        let listy = this.eneBullet.getChildren()
        for (let i = 0; i < listy.length; i++) {
            if (listy[i].velocity == undefined) {
                listy[i].velocity = speeds[i % speeds.length]
                listy[i].type = 'straight'
                listy[i].acceleration = [0, 0]
            }
        }
    }
    rightAttack() {
        let speeds = []
        for (let i = 0; i < 10; i++) {
            speeds.push(this.vector(1, 180))
            this.eneBullet.create(500, 20 + 40 * i, 'greenBullet')
        }
        let listy = this.eneBullet.getChildren()
        for (let i = 0; i < listy.length; i++) {
            if (listy[i].velocity == undefined) {
                listy[i].velocity = speeds[i % speeds.length]
                listy[i].type = 'straight'
                listy[i].acceleration = [0, 0]
            }
        }
    }
    homingAttack() {
        let speeds = []
        let amount = 4
        let angle = 90
        if (this.phase == 5) {
            amount = 8
            angle = 45
        }
        for (let i = 0; i < amount; i++) {
            speeds.push(this.vector(1, 45 + i * angle))
            this.eneBullet.create(this.flandreHitbox.x, this.flandreHitbox.y, 'yellowBullet')
        }
        let listy = this.eneBullet.getChildren()
        for (let i = 0; i < listy.length; i++) {
            if (listy[i].velocity == undefined) {
                listy[i].velocity = speeds[i % speeds.length]
                listy[i].type = 'homing'
                listy[i].acceleration = [0, 0]
            }
        }
    }
    waveAttack() {
        let speeds = []
        let amount = 6
        let distance = 50
        if(this.phase == 5){
            amount = 13
            distance = 25
        }
        for (let i = 0; i < amount; i++) {
            speeds.push(this.vector(1.5, 90))
            this.eneBullet.create(200 + i * distance, 1, 'purpleBullet')
        }
        let listy = this.eneBullet.getChildren()
        for (let i = 0; i < listy.length; i++) {
            if (listy[i].velocity == undefined) {
                listy[i].velocity = speeds[i % speeds.length]
                listy[i].type = 'wavey'
                listy[i].acceleration = [0, 0]
            }
        }
    }
    vector(speed, angle) {
        let radians = angle * (Math.PI / 180)
        return [speed * Math.cos(radians), speed * Math.sin(radians)]
    }
}

// Create the game
window.activePhaserGame = new Phaser.Game({
    width: 700, // Width of the game in pixels
    height: 400, // Height of the game in pixels
    backgroundColor: '#00003f', // The background color (blue)
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