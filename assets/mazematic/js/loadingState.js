const LEVEL_COUNT = 3;
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
    this.game.load.json('level:0', 'assets/mazematic/data/level00.json');
    this.game.load.json('level:1', 'assets/mazematic/data/level01.json');
    this.game.load.json('level:2', 'assets/mazematic/data/level02.json');
    
    
    //Load walls
    this.game.load.image('background', 'assets/mazematic/images/background/background.png');
    this.game.load.image('wall_brown:8x1', 'assets/mazematic/images/walls/wall_brown:8x1.png');
    this.game.load.image('wall_brown:1x8', 'assets/mazematic/images/walls/wall_brown:1x8.png');
    this.game.load.image('wall_brown:1x4', 'assets/mazematic/images/walls/wall_brown:1x4.png');
    this.game.load.image('wall_brown:2x19', 'assets/mazematic/images/walls/wall_brown:2x19.png');
    this.game.load.image('wall_brown:2x1', 'assets/mazematic/images/walls/wall_brown:2x1.png');
    this.game.load.image('wall_brown:4x1', 'assets/mazematic/images/walls/wall_brown:4x1.png');
    this.game.load.image('wall_brown:26x1', 'assets/mazematic/images/walls/wall_brown:26x1.png');
    this.game.load.image('wall_brown', 'assets/mazematic/images/walls/wall_brown.png');
    this.game.load.image('wall_brown:1x0.5', 'assets/mazematic/images/walls/wall_brown:1x0.5.png');
    this.game.load.image('wall_brown:0.5x1', 'assets/mazematic/images/walls/wall_brown:0.5x1.png');
    
    //Load environment
    this.game.load.image('finish', 'assets/mazematic/images/environment/finish.png');
    this.game.load.image('quest:2+1', 'assets/mazematic/images/environment/quest:2+1.png');
    this.game.load.image('quest:4+2', 'assets/mazematic/images/environment/quest:4+2.png');
    this.game.load.image('quest:10-1', 'assets/mazematic/images/environment/quest:10-1.png');
    this.game.load.image('quest:5+2', 'assets/mazematic/images/environment/quest:5+2.png');
    this.game.load.image('quest:2x3', 'assets/mazematic/images/environment/quest:2x3.png');
    this.game.load.image('quest:9|3', 'assets/mazematic/images/environment/quest:9|3.png');
    this.game.load.image('quest:7+3', 'assets/mazematic/images/environment/quest:7+3.png');
    this.game.load.image('quest:8-4', 'assets/mazematic/images/environment/quest:8-4.png');
    this.game.load.image('quest:6x1', 'assets/mazematic/images/environment/quest:6x1.png');
    this.game.load.image('quest:4|2', 'assets/mazematic/images/environment/quest:4|2.png');
    this.game.load.image('buttonBlue:icon:3', 'assets/mazematic/images/environment/button_blue:3.png');
    this.game.load.image('buttonBlue:icon:4', 'assets/mazematic/images/environment/button_blue:4.png');
    this.game.load.image('buttonRed:icon:6', 'assets/mazematic/images/environment/button_red:6.png');
    this.game.load.image('buttonRed:icon:7', 'assets/mazematic/images/environment/button_red:7.png');
    
    //Load spritesheets
    this.game.load.spritesheet('hero', 'assets/mazematic/images/player/characterSprite.png', 32, 32);
    this.game.load.spritesheet('greyCrate', 'assets/mazematic/images/crates/crate_grey.png', 32, 32);
    this.game.load.spritesheet('woodCrate', 'assets/mazematic/images/crates/crate_wood.png', 32, 32);
    this.game.load.spritesheet('redCrate', 'assets/mazematic/images/crates/crate_red.png', 32, 32);
    this.game.load.spritesheet('steelCrate', 'assets/mazematic/images/crates/crate_steel.png', 32, 32);
    this.game.load.spritesheet('buttonBlue', 'assets/mazematic/images/environment/button_blue.png', 32, 64);
    this.game.load.spritesheet('buttonRed', 'assets/mazematic/images/environment/button_red.png', 32, 64);
    this.game.load.spritesheet('holeBlue', 'assets/mazematic/images/environment/door_blue.png', 32, 32);
    this.game.load.spritesheet('holeRed', 'assets/mazematic/images/environment/door_red.png', 32, 32);
    
    //Load audio
    this.game.load.audio('bgm', ['assets/mazematic/audio/bgm.mp3', 'assets/mazematic/audio/bgm.ogg']);
};

LoadingState.create = function() {
    this.game.state.start('play', true, false, {level: 0});
};
