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
        const reimu = this.add.rectangle(350, 350, 10, 10, 0xff0000)
        this.reimuHitbox = this.physics.add.existing(reimu)
        this.flandreHitbox = this.physics.add.sprite(350, 100, 'flandreHitbox')
        this.flandreDestination = { x: 350, y: 100 }
        this.bulletl = this.add.group({ defaultKey: 'bullet' })
        this.bulletm = this.add.group({ defaultKey: 'bullet' })
        this.bulletr = this.add.group({ defaultKey: 'bullet' })
        this.eneBullet = this.add.group({ defaultKey: 'bullet' })
        this.Timer = 0
        this.score = 0
        this.scoreText = this.add.text(20, 20, 'score: ' + this.score, { font: '20px Arial', fill: '#fff' });
    }


    update() {
        /* 
        This method is called 60 times per second after create() 
        It will handle all the game's logic, like movements
        */
       if(this.gameOver = true){
        this.gameOverText = this.add.text(350,200,'GAME OVER',{font:'40px Arial',fill:'#f00'})
       }else{
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
        if (this.Timer % this.fireCooldown == 0) {
            this.bulletl.create(this.reimuHitbox.x - 6, this.reimuHitbox.y - 5, 'bullet')
            this.bulletm.create(this.reimuHitbox.x - 6, this.reimuHitbox.y, 'bullet')
            this.bulletm.create(this.reimuHitbox.x, this.reimuHitbox.y, 'bullet')
            this.bulletm.create(this.reimuHitbox.x + 6, this.reimuHitbox.y, 'bullet')
            this.bulletr.create(this.reimuHitbox.x + 6, this.reimuHitbox.y - 5, 'bullet')
        }
        if (this.Timer % 60 == 0) {
            this.enemyFire()
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
        for (let i=0;i<enemyBulletList.length;i++){
            enemyBulletList[i].x += enemyBulletList[i].velocity[0]
            enemyBulletList[i].y += enemyBulletList[i].velocity[1]
            enemyBulletList[i].velocity[0] += enemyBulletList[i].acceleration[0]
            enemyBulletList[i].velocity[1] += enemyBulletList[i].acceleration[1]
        }
        this.killOob(this.bulletl)
        this.killOob(this.bulletm)
        this.killOob(this.bulletr)
        this.killOob(this.eneBullet)
        this.hitEnemy(this.bulletl)
        this.hitEnemy(this.bulletm)
        this.hitEnemy(this.bulletr)




    }}

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
            if (listy[i].y < 0 || listy[i].x < 200 || listy[i].x > 500) {
                listy[i].destroy()
            }
        }
    }
    hitPlayer(groupy){
        let listy = groupy.getChildren()
        let up = this.reimuHitbox.y- 5
        let down = this.reimuHitbox.y+5
        let right = this.reimuHitbox.x+5
        let left = this.reimuHitbox.x-5
        for (let i = 0; i < listy.length; i++) {
            if (this.checkOverlap(listy[i], up, down, right, left)) {
                this.die()
            }
    }}
    die(){
        this.lives -=1
        this.reimuHitbox.setAlpha(0)
        if(this.lives == 0){
            this.gameOver = true
        }else {
            this.reimuHitbox.setAlpha(0.5)
            this.invuln = true
            
        }
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
                this.scoreText.setText('score: ' + this.score)
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
    enemyFire(){
        if (Math.floor(Math.random()*1) == 0){
            this.circleAttack()
        }
    }
    circleAttack() {
        let speeds = []
        for (let i = 0; i < 16; i++) {
            speeds.push(this.vector(2,i*22.5))
            this.eneBullet.create(this.flandreHitbox.x, this.flandreHitbox.y, 'redBullet')
        }
        let listy = this.eneBullet.getChildren()
        for (let i = 0; i<listy.length;i++){
            if(listy[i].velocity == undefined){
                listy[i].velocity = speeds[i%speeds.length]
                listy[i].acceleration = [0,0]
            }
        }
    }
    vector(speed,angle){
        let radians = angle*(Math.PI/180)
        return[speed*Math.cos(radians),speed*Math.sin(radians)]
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