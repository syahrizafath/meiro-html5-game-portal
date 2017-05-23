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
        up: Phaser.KeyCode.UP,
        down: Phaser.KeyCode.DOWN
    });
    
    //Initialize level
    this.level = (data.level || 0) % LEVEL_COUNT;
};

// Create game entities and set up world here
PlayState.create = function() {
    
    //Fade in (from black)
    this.camera.flash('#000');
    this.bgm = this.game.add.audio('bgm');
    this.bgm.loopFull();
    
    //create level entities and decoration
    this.game.add.image(0, 0, 'background');
    this._loadLevel(this.game.cache.getJSON(`level:${this.level}`));
    
    this._createHud();
};

//Update phases
PlayState.update = function() {
    this._handleCollisions();
    this._handleInput();
};

//UI elements
PlayState._createHud = function() {
    if(this.level == 2) {
        this.buttonBlueIcon = this.game.make.image(0, 19, 'buttonBlue:icon:4');
        this.buttonBlueIcon.anchor.set(0, 0.5);
    }
    else {
        this.buttonBlueIcon = this.game.make.image(0, 19, 'buttonBlue:icon:3');
        this.buttonBlueIcon.anchor.set(0, 0.5);
    }
    
    if(this.level == 0 || this.level == 2) {
        this.buttonRedIcon = this.game.make.image(32, 19, 'buttonRed:icon:6');
        this.buttonRedIcon.anchor.set(0, 0.5);
    }
    
    else if(this.level == 1) {
        this.buttonRedIcon = this.game.make.image(32, 19, 'buttonRed:icon:7');
        this.buttonRedIcon.anchor.set(0, 0.5);
    }
    
    this.hud = this.game.add.group();
    this.hud.position.set(896, 10);
    this.hud.add(this.buttonBlueIcon);
    this.hud.add(this.buttonRedIcon);
};

PlayState._handleCollisions = function() {
    this.game.physics.arcade.collide(this.hero, this.walls);
    this.game.physics.arcade.collide(this.greyCrate, this.walls);
    this.game.physics.arcade.collide(this.woodCrate, this.walls);
    this.game.physics.arcade.collide(this.steelCrate, this.walls);
    this.game.physics.arcade.collide(this.redCrate, this.walls);
    this.game.physics.arcade.collide(this.hero, this.holeBlue);
    this.game.physics.arcade.collide(this.hero, this.holeRed);
    this.game.physics.arcade.collide(this.hero, this.redCrate, this._onHeroVsredCrate, null, this);
    this.game.physics.arcade.collide(this.hero, this.steelCrate, this._onHeroVssteelCrate, null, this);
    this.game.physics.arcade.collide(this.hero, this.greyCrate, this._onHeroVsgreyCrate, null, this);
    this.game.physics.arcade.overlap(this.hero, this.finish, this._goToNextLevel, null, this);
    this.game.physics.arcade.collide(this.hero, this.woodCrate, this._onHeroVswoodCrate, null, this);
    this.game.physics.arcade.overlap(this.buttonBlue, this.greyCrate, this._onbuttonBlueVsgreyCrate, null, this);
    this.game.physics.arcade.overlap(this.buttonRed, this.woodCrate, this._onbuttonRedVswoodCrate, null, this);
};

PlayState._handleInput = function() {
    this.currentAnimation;
    if(this.keys.left.isDown) {
        this.currentAnimation = 'walkLeft';
        this.hero.animations.play(this.currentAnimation);
        this.hero.move(this.currentAnimation);
    }
    
    else if(this.keys.right.isDown) {
        this.currentAnimation = 'walkRight';
        this.hero.animations.play(this.currentAnimation);
        this.hero.move(this.currentAnimation);
    }
    
    else if(this.keys.up.isDown){
        this.currentAnimation = 'walkUp';
        this.hero.animations.play(this.currentAnimation);
        this.hero.move(this.currentAnimation);
    }
    
    else if(this.keys.down.isDown){
        this.currentAnimation = 'walkDown';
        this.hero.animations.play(this.currentAnimation);
        this.hero.move(this.currentAnimation);
    }
    
    else {
        this.hero.move(this._idleHero(this.currentAnimation));
        this.hero.animations.play(this._idleHero(this.currentAnimation));
    }
};

PlayState._idleHero = function(currentAnimation) {
    this.animate = 'standDown';
    if(currentAnimation == 'walkDown') {
        this.animate = 'standDown';
    }
    
    else if(currentAnimation == 'walkUp') {
        this.animate = 'standUp';
    }
    
    else if(currentAnimation == 'walkLeft') {
        this.animate = 'standLeft';
    }
    
    else if(currentAnimation == 'walkRight') {
        this.animate = 'standRight';
    }
    
    return this.animate;
};

PlayState._onHeroVsgreyCrate = function() {
    var an = this.hero.animations.currentAnim.name;
    const SPEED = 100;
    
    if(an == 'walkLeft') {
        this.direction = 'Left';
        this.greyCrate.move(this.direction, this.hero.body.velocity.x);
    }
    
    else if(an == 'walkRight') {
        this.direction = 'Right';
        this.greyCrate.move(this.direction, this.hero.body.velocity.x);
    }
    
    else if(an == 'walkUp') {
        this.direction = 'Up';
        this.greyCrate.move(this.direction, this.hero.body.velocity.y);
    }
    
    else if(an == 'walkDown') {
        this.direction = 'Down';
        this.greyCrate.move(this.direction, this.hero.body.velocity.y);
    }
    
    else {
        this.direction = 'none';
        this.greyCrate.move(this.direction, this.hero.body.velocity.x);
    }
};

PlayState._onHeroVswoodCrate = function() {
    var an = this.hero.animations.currentAnim.name;
    const SPEED = 100;
    
    if(an == 'walkLeft') {
        this.direction = 'Left';
        this.woodCrate.move(this.direction, this.hero.body.velocity.x);
    }
    
    else if(an == 'walkRight') {
        this.direction = 'Right';
        this.woodCrate.move(this.direction, this.hero.body.velocity.x);
    }
    
    else if(an == 'walkUp') {
        this.direction = 'Up';
        this.woodCrate.move(this.direction, this.hero.body.velocity.y);
    }
    
    else if(an == 'walkDown') {
        this.direction = 'Down';
        this.woodCrate.move(this.direction, this.hero.body.velocity.y);
    }
    
    else {
        this.direction = 'none';
        this.woodCrate.move(this.direction, this.hero.body.velocity.x);
    }
};

PlayState._onHeroVsredCrate = function() {
    var an = this.hero.animations.currentAnim.name;
    const SPEED = 100;
    
    if(an == 'walkLeft') {
        this.direction = 'Left';
        this.redCrate.move(this.direction, this.hero.body.velocity.x);
    }
    
    else if(an == 'walkRight') {
        this.direction = 'Right';
        this.redCrate.move(this.direction, this.hero.body.velocity.x);
    }
    
    else if(an == 'walkUp') {
        this.direction = 'Up';
        this.redCrate.move(this.direction, this.hero.body.velocity.y);
    }
    
    else if(an == 'walkDown') {
        this.direction = 'Down';
        this.redCrate.move(this.direction, this.hero.body.velocity.y);
    }
    
    else {
        this.direction = 'none';
        this.redCrate.move(this.direction, this.hero.body.velocity.x);
    }
};

PlayState._onHeroVssteelCrate = function() {
    var an = this.hero.animations.currentAnim.name;
    const SPEED = 100;
    
    if(an == 'walkLeft') {
        this.direction = 'Left';
        this.steelCrate.move(this.direction, this.hero.body.velocity.x);
    }
    
    else if(an == 'walkRight') {
        this.direction = 'Right';
        this.steelCrate.move(this.direction, this.hero.body.velocity.x);
    }
    
    else if(an == 'walkUp') {
        this.direction = 'Up';
        this.steelCrate.move(this.direction, this.hero.body.velocity.y);
    }
    
    else if(an == 'walkDown') {
        this.direction = 'Down';
        this.steelCrate.move(this.direction, this.hero.body.velocity.y);
    }
    
    else {
        this.direction = 'none';
        this.steelCrate.move(this.direction, this.hero.body.velocity.x);
    }
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

PlayState._onbuttonBlueVsgreyCrate = function() {
    this.greyCrate.body.velocity.x = 0;
    this.greyCrate.body.velocity.y = 0;
    this.holeBlue.kill();
};

PlayState._onbuttonRedVswoodCrate = function() {
    this.woodCrate.body.velocity.x = 0;
    this.woodCrate.body.velocity.y = 0;
    this.holeRed.kill();
};

PlayState._loadLevel = function(data) {

    this.walls = this.game.add.group();
    this.holes = this.game.add.group();
    this.finish = this.game.add.group();
    this.quests = this.game.add.group();
//     this.buttons = this.game.add.group();
    
    //Spawn walls
    data.walls.forEach(this._spawnWall, this);
    
    //Spawn holes
//     data.holes.forEach(this._spawnHole, this);
    
    //Spawn finish flag
    data.finish.forEach(this._spawnFinish, this);
    
    //spawn quests
    data.quests.forEach(this._spawnQuest, this);
    
    //Spawn sprites
    this._spawnCharacters({hero: data.hero});
    this._spawngreyCrate({greyCrate: data.greyCrate});
    this._spawnwoodCrate({woodCrate: data.woodCrate});
    this._spawnredCrate({redCrate: data.redCrate});
    this._spawnsteelCrate({steelCrate: data.steelCrate});
    this._spawnbuttonBlue({buttonBlue: data.buttonBlue});
    this._spawnbuttonRed({buttonRed: data.buttonRed});
    this._spawnholeBlue({holeBlue: data.holeBlue});
    this._spawnholeRed({holeRed: data.holeRed});
};

PlayState._spawnCharacters = function (data) {
    //spawn hero
    this.hero = new Hero(this.game, data.hero.x, data.hero.y);
    this.game.add.existing(this.hero);
};

PlayState._spawnWall = function(wall) {

    let sprite = this.walls.create(wall.x, wall.y, wall.image);
    
    this.game.physics.enable(sprite);
    
    //Disable gravity for platforms
    sprite.body.allowGravity = false;
    
    //Make platform cannot be moved when colliding
    sprite.body.immovable = true;  
};

PlayState._spawnHole = function(hole) {

    let sprite = this.holes.create(hole.x, hole.y, hole.image);
    
    this.game.physics.enable(sprite);
    
    //Disable gravity for platforms
    sprite.body.allowGravity = false;
    
    //Make platform cannot be moved when colliding
    sprite.body.immovable = true;  
};

PlayState._spawnFinish = function(finish) {

    let sprite = this.finish.create(finish.x, finish.y, finish.image);
    
    this.game.physics.enable(sprite);
    
    //Disable gravity for platforms
    sprite.body.allowGravity = false;
    
    //Make platform cannot be moved when colliding
    sprite.body.immovable = true;  
};

PlayState._spawngreyCrate = function(data) {
    this.greyCrate = new greyCrate(this.game, data.greyCrate.x, data.greyCrate.y);
    this.game.add.existing(this.greyCrate);
};

PlayState._spawnwoodCrate = function(data) {
    this.woodCrate = new woodCrate(this.game, data.woodCrate.x, data.woodCrate.y);
    this.game.add.existing(this.woodCrate);
};

PlayState._spawnredCrate = function(data) {
    this.redCrate = new redCrate(this.game, data.redCrate.x, data.redCrate.y);
    this.game.add.existing(this.redCrate);
    if(this.level == 0) {
        this.redCrate.visible = false
    }
};

PlayState._spawnsteelCrate = function(data) {
    this.steelCrate = new steelCrate(this.game, data.steelCrate.x, data.steelCrate.y);
    this.game.add.existing(this.steelCrate);
    if(this.level == 0) {
        this.steelCrate.visible = false
    }
};

PlayState._spawnholeRed = function(data) {
    this.holeRed = new holeRed(this.game, data.holeRed.x, data.holeRed.y);
    this.game.add.existing(this.holeRed);
    this.holeRed.body.immovable = true;
};

PlayState._spawnholeBlue = function(data) {
    this.holeBlue = new holeBlue(this.game, data.holeBlue.x, data.holeBlue.y);
    this.game.add.existing(this.holeBlue);
    this.holeBlue.body.immovable = true;
};

PlayState._spawnQuest = function(quest) {

    let sprite = this.quests.create(quest.x, quest.y, quest.image);
    
    this.game.physics.enable(sprite);
    
    //Disable gravity for platforms
    sprite.body.allowGravity = false;
    
    //Make platform cannot be moved when colliding
    sprite.body.immovable = true;  
};

PlayState._spawnbuttonBlue = function(data) {

    this.buttonBlue = new buttonBlue(this.game, data.buttonBlue.x, data.buttonBlue.y);
    this.game.add.existing(this.buttonBlue);
};

PlayState._spawnbuttonRed = function(data) {

    this.buttonRed = new buttonRed(this.game, data.buttonRed.x, data.buttonRed.y);
    this.game.add.existing(this.buttonRed);
};
