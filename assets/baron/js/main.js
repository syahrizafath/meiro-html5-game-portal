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
    this.animations.add('stop', [0]);
    this.animations.add('run', [1, 2], 8, true); //8fps looped
    this.animations.add('jump', [3]);
    this.animations.add('fall', [4]);
    this.animations.add('die', [5, 6, 5, 6, 5, 6, 5, 6], 12); //12 fps loop
    this.animations.play('stop');
}

//Inherit from Phaser.Sprite
Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.move = function(direction) {
    //guard
    if(this.isFrozen) {
        return;
    }
    
    const SPEED = 200;
    this.body.velocity.x = direction * SPEED;
    
    //Fliping hero body
    if(this.body.velocity.x < 0) {
        this.scale.x = -1;
    }
    else if(this.body.velocity.x > 0) {
        this.scale.x = 1;
    }
};

Hero.prototype.jump = function() {
    const JUMP_SPEED = 600;
    let canJump = this.body.touching.down && this.alive && !this.isFrozen;
    
    if(canJump || this.isBoosting) {
        this.body.velocity.y = -JUMP_SPEED;
        this.isBoosting = true;
    }
    
    return canJump;
};

Hero.prototype.stopJumpBoost = function() {
    this.isBoosting = false;
};

Hero.prototype.bounce = function() {
    const BOUNCE_SPEED = 200;
    this.body.velocity.y = -BOUNCE_SPEED;
};

//Hero update
Hero.prototype.update = function() {
    //update sprite animation, if it needs changing
    let animationName = this._getAnimationName();
    if(this.animations.name !== animationName) {
        this.animations.play(animationName);
    }
};

Hero.prototype.freeze = function() {
    this.body.enable = false;
    this.isFrozen = true;
};

Hero.prototype.die = function() {
    this.alive = false;
    this.body.enable = false;
    
    this.animations.play('die').onComplete.addOnce(function() {
        this.kill();
    }, this)
};

//Hero method that will return the name of the animations
Hero.prototype._getAnimationName = function() {
    //Default animation
    let name = 'stop';
    
    //dying
    if(!this.alive) {
        name = 'die';
    }
    
    //Frozen & not dying
    else if(this.isFrozen) {
        name = 'stop';
    }
    
    //Jumping
    else if(this.body.velocity.y < 0) {
        name = 'jump';
    }
    
    //Falling
    else if(this.body.velocity.y >= 0 && !this.body.touching.down) {
        name = 'fall';
    }
    
    //Running
    else if(this.body.velocity.x !== 0 && this.body.touching.down) {
        name = 'run';
    }
    
    return name;
};

//Custom class for Enemy
function Spider(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'spider');
    
    //anchor
    this.anchor.set(0.5);
    
    //animations
    this.animations.add('crawl', [0, 1, 2], 8, true);
    this.animations.add('die', [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12);
    this.animations.play('crawl');
    
    //physic properties
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.velocity.x = Spider.SPEED;
}

//Constants collection
Spider.SPEED = 100;
const LEVEL_COUNT = 2;

//Inherit from Phaser.Sprite
Spider.prototype = Object.create(Phaser.Sprite.prototype);
Spider.prototype.constructor = Spider;

Spider.prototype.update = function() {
    //check against walls and reverse direction if necessary
    if(this.body.touching.right || this.body.blocked.right) {
        this.body.velocity.x = -Spider.SPEED; // turn left
    }
    else if(this.body.touching.left || this.body.blocked.left) {
        this.body.velocity.x = Spider.SPEED; //turn right
    }
};

Spider.prototype.die = function() {
    this.body.enable = false;
    
    this.animations.play('die').onComplete.addOnce(function() {
        this.kill();
    }, this)
};

/*====================
    Loading state
 ====================*/
LoadingState = {};

LoadingState.init = function() {
    //Keep crispy-looking pixels
    this.game.renderer.renderSession.roundPixels = true;
};

LoadingState.preload = function() {
    //Load json files
    this.game.load.json('level:0', 'assets/baron/data/level00.json');
    this.game.load.json('level:1', 'assets/baron/data/level01.json');
    
    //Load fonts
    this.game.load.image('font:numbers', 'assets/baron/images/numbers.png');
    
    //Load properties
    this.game.load.image('icon:coin', 'assets/baron/images/coin_icon.png');
    this.game.load.image('background', 'assets/baron/images/background.png');
    this.game.load.image('invisible-wall', 'assets/baron/images/invisible_wall.png');
    this.game.load.image('ground', 'assets/baron/images/ground.png');
    this.game.load.image('grass:8x1', 'assets/baron/images/grass_8x1.png');
    this.game.load.image('grass:6x1', 'assets/baron/images/grass_6x1.png');
    this.game.load.image('grass:4x1', 'assets/baron/images/grass_4x1.png');
    this.game.load.image('grass:2x1', 'assets/baron/images/grass_2x1.png');
    this.game.load.image('grass:1x1', 'assets/baron/images/grass_1x1.png');
    this.game.load.image('key', 'assets/baron/images/key.png');
    
    //Load spritesheets
    this.game.load.spritesheet('decoration', 'assets/baron/images/decor.png', 42, 42);
    this.game.load.spritesheet('hero', 'assets/baron/images/hero.png', 36, 50);
    this.game.load.spritesheet('coin', 'assets/baron/images/coin_animated.png', 22, 22);
    this.game.load.spritesheet('spider', 'assets/baron/images/spider.png', 42, 32);
    this.game.load.spritesheet('door', 'assets/baron/images/door.png', 42, 66);
    this.game.load.spritesheet('icon:key', 'assets/baron/images/key_icon.png', 34, 30);
    
    //Load Audio
    this.game.load.audio('sfx:jump', 'assets/baron/audio/jump.wav');
    this.game.load.audio('sfx:coin', 'assets/baron/audio/coin.wav');
    this.game.load.audio('sfx:stomp', 'assets/baron/audio/stomp.wav');
    this.game.load.audio('sfx:key', 'assets/baron/audio/key.wav');
    this.game.load.audio('sfx:door', 'assets/baron/audio/door.wav');
    this.game.load.audio('bgm', ['assets/baron/audio/bgm.mp3', 'assets/baron/audio/bgm.ogg']);
};

LoadingState.create = function() {
    this.game.state.start('play', true, false, {level: 0});
};

/*====================
    Play state
 ====================*/
PlayState = {};

//Initialize phases
PlayState.init = function(data) {
    
    //Add keys control
    this.keys = this.game.input.keyboard.addKeys({
        left: Phaser.KeyCode.LEFT,
        right: Phaser.KeyCode.RIGHT,
        up: Phaser.KeyCode.UP
    });
    
    //Initialize coins
    this.coinPickupCount = 0;
    
    //Initialize key picked up
    this.hasKey = false;
    
    //Initialize level
    this.level = (data.level || 0) % LEVEL_COUNT;
};

// Create game entities and set up world here
PlayState.create = function() {
    
    //Fade in (from black)
    this.camera.flash('#000');
    
    //Create sound entities
    this.sfx = {
        key: this.game.add.audio('sfx:key'),
        door: this.game.add.audio('sfx:door'),
        jump: this.game.add.audio('sfx:jump'),
        coin: this.game.add.audio('sfx:coin'),
        stomp: this.game.add.audio('sfx:stomp')
    };
    this.bgm = this.game.add.audio('bgm');
    this.bgm.loopFull();
    
    //create level entities and decoration
    this.game.add.image(0, 0, 'background');
    this._loadLevel(this.game.cache.getJSON(`level:${this.level}`));
    
    //Create UI score boards
    this._createHud();
};

//Update phases
PlayState.update = function() {
    this._handleCollisions();
    this._handleInput();
    
    //Update scoreboards
    this.coinFont.text = `x${this.coinPickupCount}`;
    this.keyIcon.frame = this.hasKey ? 1 : 0;
};

PlayState.shutdown = function() {
    this.bgm.stop();
};

//UI elements
PlayState._createHud = function() {
    //Instantiate Phaser.Retrofont
    const NUMBER_STR = '0123456789X ';
    this.coinFont = this.game.add.retroFont('font:numbers', 20, 26, NUMBER_STR, 6);
    
    this.keyIcon = this.game.make.image(0, 19, 'icon:key');
    this.keyIcon.anchor.set(0, 0.5);
    
    let coinIcon = this.game.make.image(this.keyIcon.width + 7, 0, 'icon:coin');
    
    let coinScoreImg = this.game.make.image(coinIcon.x + coinIcon.width, coinIcon.height / 2, this.coinFont);
    coinScoreImg.anchor.set(0, 0.5);
    
    this.hud = this.game.add.group();
    this.hud.add(coinIcon);
    this.hud.position.set(10, 10);
    this.hud.add(coinScoreImg);
    this.hud.add(this.keyIcon);
};

PlayState._handleCollisions = function() {
    this.game.physics.arcade.collide(this.spiders, this.platforms);
    
    this.game.physics.arcade.collide(this.spiders, this.enemyWalls);
    
    this.game.physics.arcade.collide(this.hero, this.platforms);
    
    //hero vs coins (pick up)
    this.game.physics.arcade.overlap(this.hero, this.coins, this._onHeroVsCoin, null, this);
    
    //Detect when a spider touching a hero
    this.game.physics.arcade.overlap(this.hero, this.spiders, this._onHeroVsEnemy, null, this);
    
    //Collect the key
    this.game.physics.arcade.overlap(this.hero, this.key, this._onHeroVsKey, null, this);
    
    //Open the door with the key
    this.game.physics.arcade.overlap(this.hero, this.door, this._onHeroVsDoor,
        //Ignore if there is no key or the player is on air
        function(hero, door) {
            return this.hasKey && hero.body.touching.down;
        }, this);
};

PlayState._onHeroVsDoor = function(hero, door) {
    //Open the door by changing its graphic and playing a sfx
    door.frame = 1;
    this.sfx.door.play();
    
    //Play 'enter door' animation and change to the next level when it ends
    hero.freeze();
    this.game.add.tween(hero)
        .to({x: this.door.x, alpha: 0}, 500, null, true)
        .onComplete.addOnce(this._goToNextLevel, this);
    
//     this.sfx.door.play();
//     this.game.state.restart(true, false, {level: this.level + 1});
}; 

PlayState._goToNextLevel = function() {
    this.camera.fade('#000');
    this.camera.onFadeComplete.addOnce(function() {
        //Change to the next level
        this.game.state.restart(true, false, {
            level: this.level + 1
        });
    }, this);
};

PlayState._onHeroVsKey = function(hero, key) {
    this.sfx.key.play();
    key.kill();
    this.hasKey = true;
};

PlayState._onHeroVsCoin = function(hero, coin) {
    //play sound effect
    this.sfx.coin.play();
    
    coin.kill();
    
    //Adding coin count 
    this.coinPickupCount++;
};

PlayState._onHeroVsEnemy = function(hero, enemy) {
    if(hero.body.velocity.y > 0) {
        hero.bounce();
        enemy.die();
        this.sfx.stomp.play();
    }
    else {
        hero.die();
        this.sfx.stomp.play();
        hero.events.onKilled.addOnce(function() {
            this.game.state.restart(true, false, {level: this.level});
        }, this);
        
        enemy.body.touching = enemy.body.wasTouching;
    }
};

PlayState._handleInput = function() {
    if(this.keys.left.isDown) {
        this.hero.move(-1);  
    }
    
    else if(this.keys.right.isDown) {
        this.hero.move(1);
    }
    
    else {
        this.hero.move(0);
    }
    
    //Handle jump
    const JUMP_HOLD = 200; //on ms
    if(this.keys.up.downDuration(JUMP_HOLD)) {
        let didJump = this.hero.jump();
        if(didJump) {
            this.sfx.jump.play();
        }
        else {
            this.hero.stopJumpBoost();
        }
    }
};

PlayState._loadLevel = function(data) {
    //elements decoration
    this.bgDecoration = this.game.add.group();
    
    //Create all the groups/layers that we need
    this.platforms = this.game.add.group();
    this.coins = this.game.add.group();
    this.spiders = this.game.add.group();
    this.enemyWalls = this.game.add.group();
    this.enemyWalls.visible = false;
    
    //Spawn all platforms
    data.platforms.forEach(this._spawnPlatform, this);
    
    //Spawn hero and enemies
    this._spawnCharacters({hero: data.hero, spiders: data.spiders});
    
    //spawn level decoration
    data.decoration.forEach(function(deco) {
        this.bgDecoration.add(
            this.game.add.image(deco.x, deco.y, 'decoration', deco.frame));
    }, this);
    
    //spawn important objects
    data.coins.forEach(this._spawnCoin, this);
    
    //spawn the door
    this._spawnDoor(data.door.x, data.door.y);
    
    //spawn the key
    this._spawnKey(data.key.x, data.key.y);
    
    //Enable gravity
    const GRAVITY = 1200;
    this.game.physics.arcade.gravity.y = GRAVITY;
};

PlayState._spawnDoor = function(x, y) {
    this.door = this.bgDecoration.create(x, y, 'door');
    this.door.anchor.setTo(0.5, 1);
    this.game.physics.enable(this.door);
    this.door.body.allowGravity = false;
};

PlayState._spawnKey = function(x, y) {
    this.key = this.bgDecoration.create(x, y, 'key');
    this.key.anchor.set(0.5, 0.5);
    this.game.physics.enable(this.key);
    this.key.body.allowGravity = false;
    
    this.key.y -= 3;
    this.game.add.tween(this.key)
        .to({y: this.key.y + 6}, 800, Phaser.Easing.Sinusoidal.InOut)
        .yoyo(true)
        .loop()
        .start();
};

PlayState._spawnPlatform = function(platform) {
//   this.game.add.sprite(platform.x, platform.y, platform.image);
    let sprite = this.platforms.create(platform.x, platform.y, platform.image);
    
    this.game.physics.enable(sprite);
    
    //Disable gravity for platforms
    sprite.body.allowGravity = false;
    
    //Make platform cannot be moved when colliding
    sprite.body.immovable = true;
    
    //Creating two walls per spawned platform
    this._spawnEnemyWall(platform.x, platform.y, 'left');
    this._spawnEnemyWall(platform.x + sprite.width, platform.y, 'right');
};

PlayState._spawnEnemyWall = function(x, y, side) {
    let sprite = this.enemyWalls.create(x, y, 'invisible-wall');
    
    //anchor and y displacement
    sprite.anchor.set(side === 'left' ? 1 : 0, 1);
    
    //physic properties
    this.game.physics.enable(sprite);
    sprite.body.immovable = true;
    sprite.body.allowGravity = false;
}

PlayState._spawnCharacters = function (data) {
    //Spawn enemies (spiders)
    data.spiders.forEach(function (spider) {
        let sprite = new Spider(this.game, spider.x, spider.y);
        this.spiders.add(sprite);
    }, this);
    
    //spawn hero
    this.hero = new Hero(this.game, data.hero.x, data.hero.y);
    this.game.add.existing(this.hero);
};

PlayState._spawnCoin = function(coin) {
    let sprite = this.coins.create(coin.x, coin.y, 'coin');
    sprite.anchor.set(0.5, 0.5);
    
    //Add animations to coins
    sprite.animations.add('rotate', [0, 1, 2, 1], 6, true);
    sprite.animations.play('rotate');
    
//     Give the coins a physic body
    this.game.physics.enable(sprite);
    sprite.body.allowGravity = false;
};

/*====================
    Entry Point
 ====================*/

window.onload = function() {
    let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
    
    game.state.add('play', PlayState);
    game.state.add('loading', LoadingState);
    game.state.start('loading');
};
