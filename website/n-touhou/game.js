// Create the mainScene
class mainScene {
    // The three methods currently empty

    preload() {
        /*     
        This method is called once at the beginning
        It will load all the assets, like sprites and sounds
        */
    }

    create() {
        /* 
        This method is called once, just after preload()
        It will initialize our scene, like the positions of the sprites
        */
        const reimu = this.add.rectangle(100, 100, 5, 5, 0xff0000)
        this.reimu = this.physics.add.existing(reimu)

        

    }
    update() {
        /* 
        This method is called 60 times per second after create() 
        It will handle all the game's logic, like movements
        */
        var pointer = this.input.activePointer
        if (this.distance(pointer, this.reimu) > 10) {
            this.follow(this.reimu, pointer)
        } else {
            this.reimu.x = pointer.x
            this.reimu.y = pointer.y
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

}

// Create the game
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