//Custom class for Hero
function Hero(game, x, y) {
    //Call Phaser.Sprite constructor
    Phaser.Sprite.call(this, game, x, y, 'hero');
    
    //Set up the anchor
    this.anchor.set(0.5, 0.5);
    
    //Enabling physics
    this.game.physics.enable(this);
    
    //Setting a flag in the body
    this.body.collideWorldBounds = true;
    
    //Adding animations
    let animationFps = 10;
    
    this.animations.add('walkUp', [0,1,0,2], animationFps, true);
    this.animations.add('standUp', [0], 1, true);
    this.animations.add('walkDown', [3,4,3,5], animationFps, true);
    this.animations.add('standDown', [3], 1, true);
    this.animations.add('walkLeft', [6,7,6,8], animationFps, true);
    this.animations.add('standLeft', [6], 1, true);
    this.animations.add('walkRight', [9,10,9,11], animationFps, true);
    this.animations.add('standRight', [9], 1, true);
    this.animations.play('standDown');
}

//Inherit from Phaser.Sprite
Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.move = function(direction) {
    const SPEED = 150;
    
    if(direction == 'walkLeft') {
        this.body.velocity.x = -SPEED;
        this.body.velocity.y = 0;
    }
    
    else if(direction == 'walkRight') {
        this.body.velocity.x = SPEED;
        this.body.velocity.y = 0;
    }
    
    else if(direction == 'walkUp') {
        this.body.velocity.x = 0;
        this.body.velocity.y = -SPEED;
    }
    
    else if(direction == 'walkDown') {
        this.body.velocity.x = 0;
        this.body.velocity.y = SPEED;
    }
    else {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }
}

function Crate(game, x, y) {
    //Call Phaser.Sprite constructor
    Phaser.Sprite.call(this, game, x, y, 'Crate');
    
    //Set up the anchor
    this.anchor.set(0.5, 0.5);
    
    //Enabling physics
    this.game.physics.enable(this);
    
    //Setting a flag in the body
    this.body.collideWorldBounds = true;
}

//Inherit from Phaser.Sprite
Crate.prototype = Object.create(Phaser.Sprite.prototype);
Crate.prototype.constructor = Crate;

Crate.prototype.move = function(direction, heroSpeed) {
    const SPEED = 100;
    
    if(direction == 'Left' || direction == 'Right') {
        this.body.velocity.x = heroSpeed / SPEED;
        this.body.velocity.y = 0;
    }
    
    else if(direction == 'Up' || direction == 'Down') {
        this.body.velocity.x = 0;
        this.body.velocity.y = heroSpeed / SPEED;
    }
    
    else {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }
}

function greyCrate(game, x, y) {
    //Call Phaser.Sprite constructor
    Phaser.Sprite.call(this, game, x, y, 'greyCrate');
    
    //Set up the anchor
    this.anchor.set(0.5, 0.5);
    
    //Enabling physics
    this.game.physics.enable(this);
    
    //Setting a flag in the body
    this.body.collideWorldBounds = true;
}

//Inherit from Phaser.Sprite
greyCrate.prototype = Object.create(Crate.prototype);
greyCrate.prototype.constructor = greyCrate;

greyCrate.prototype.move = Crate.prototype.move;

function woodCrate(game, x, y) {
    //Call Phaser.Sprite constructor
    Phaser.Sprite.call(this, game, x, y, 'woodCrate');
    
    //Set up the anchor
    this.anchor.set(0.5, 0.5);
    
    //Enabling physics
    this.game.physics.enable(this);
    
    //Setting a flag in the body
    this.body.collideWorldBounds = true;
}

woodCrate.prototype = Object.create(Crate.prototype);
woodCrate.prototype.constructor = woodCrate;

woodCrate.prototype.move = Crate.prototype.move;

function redCrate(game, x, y) {
    //Call Phaser.Sprite constructor
    Phaser.Sprite.call(this, game, x, y, 'redCrate');
    
    //Set up the anchor
    this.anchor.set(0.5, 0.5);
    
    //Enabling physics
    this.game.physics.enable(this);
    
    //Setting a flag in the body
    this.body.collideWorldBounds = true;
}

redCrate.prototype = Object.create(Crate.prototype);
redCrate.prototype.constructor = redCrate;

redCrate.prototype.move = Crate.prototype.move;

function steelCrate(game, x, y) {
    //Call Phaser.Sprite constructor
    Phaser.Sprite.call(this, game, x, y, 'steelCrate');
    
    //Set up the anchor
    this.anchor.set(0.5, 0.5);
    
    //Enabling physics
    this.game.physics.enable(this);
    
    //Setting a flag in the body
    this.body.collideWorldBounds = true;
}

steelCrate.prototype = Object.create(Crate.prototype);
steelCrate.prototype.constructor = steelCrate;

steelCrate.prototype.move = Crate.prototype.move;

function buttonBlue(game, x, y) {
    //Call Phaser.Sprite constructor
    Phaser.Sprite.call(this, game, x, y, 'buttonBlue');
    
    //Set up the anchor
    this.anchor.set(0.5, 0.5);
    
    //Enabling physics
    this.game.physics.enable(this);
    
    //Setting a flag in the body
    this.body.collideWorldBounds = true;
}

//Inherit from Phaser.Sprite
buttonBlue.prototype = Object.create(Crate.prototype);
buttonBlue.prototype.constructor = buttonBlue;

function buttonRed(game, x, y) {
    //Call Phaser.Sprite constructor
    Phaser.Sprite.call(this, game, x, y, 'buttonRed');
    
    //Set up the anchor
    this.anchor.set(0.5, 0.5);
    
    //Enabling physics
    this.game.physics.enable(this);
    
    //Setting a flag in the body
    this.body.collideWorldBounds = true;
}

buttonRed.prototype = Object.create(Crate.prototype);
buttonRed.prototype.constructor = buttonRed;

function Hole(game, x, y) {
    //Call Phaser.Sprite constructor
    Phaser.Sprite.call(this, game, x, y, 'Hole');
    
    //Set up the anchor
    this.anchor.set(0.5, 0.5);
    
    //Enabling physics
    this.game.physics.enable(this);
    
    //Setting a flag in the body
    this.body.collideWorldBounds = true;
}

//Inherit from Phaser.Sprite
Hole.prototype = Object.create(Phaser.Sprite.prototype);
Hole.prototype.constructor = Hole;

//Add custom methods

function holeRed(game, x, y) {
    //Call Phaser.Sprite constructor
    Phaser.Sprite.call(this, game, x, y, 'holeRed');
    
    //Set up the anchor
    this.anchor.set(0.5, 0.5);
    
    //Enabling physics
    this.game.physics.enable(this);
    
    //Setting a flag in the body
    this.body.collideWorldBounds = true;
}

//Inherit from Phaser.Sprite
holeRed.prototype = Object.create(Crate.prototype);
holeRed.prototype.constructor = holeRed;

function holeBlue(game, x, y) {
    //Call Phaser.Sprite constructor
    Phaser.Sprite.call(this, game, x, y, 'holeBlue');
    
    //Set up the anchor
    this.anchor.set(0.5, 0.5);
    
    //Enabling physics
    this.game.physics.enable(this);
    
    //Setting a flag in the body
    this.body.collideWorldBounds = true;
}

holeBlue.prototype = Object.create(Crate.prototype);
holeBlue.prototype.constructor = holeBlue;
