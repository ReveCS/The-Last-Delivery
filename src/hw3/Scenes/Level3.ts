import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import HW3Level from "./HW3Level";
import MainMenu from "./MainMenu";

import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";

export default class Level3 extends HW3Level {

    public static readonly PLAYER_SPAWN = new Vec2(32, 32);
    public static readonly PLAYER_SPRITE_KEY = "PLAYER_SPRITE_KEY";
    public static readonly PLAYER_SPRITE_PATH = "game_assets/spritesheets/eye_of_cthulhu.json";

    public static readonly TILEMAP_KEY = "LEVEL3";
    public static readonly TILEMAP_PATH = "game_assets/tilemaps/Level3.json";
    public static readonly TILEMAP_SCALE = new Vec2(2, 2);
    public static readonly DESTRUCTIBLE_LAYER_KEY = "Destructable";
    public static readonly WALLS_LAYER_KEY = "Main";

    public static readonly LEVEL_MUSIC_KEY = "LEVEL_MUSIC";
    public static readonly LEVEL_MUSIC_PATH = "game_assets/music/levelmusic.mp3";

    public static readonly JUMP_AUDIO_KEY = "PLAYER_JUMP";
    public static readonly JUMP_AUDIO_PATH = "game_assets/sounds/jump.wav";

    public static readonly TILE_DESTROYED_KEY = "TILE_DESTROYED";
    public static readonly TILE_DESTROYED_PATH = "game_assets/sounds/switch.wav";
    
    public static readonly DEATH_KEY = "DEATH";
    public static readonly DEATH_PATH = "game_assets/sounds/deathsound.mp3";

    public static readonly HIT_KEY = "HIT";
    public static readonly HIT_PATH = "game_assets/sounds/gettinghit.wav";

    public static readonly LEVEL_END = new AABB(new Vec2(224, 232), new Vec2(24, 16));

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options);

        // Set the keys for the different layers of the tilemap
        this.tilemapKey = Level3.TILEMAP_KEY;
        this.tilemapScale = Level3.TILEMAP_SCALE;
        this.destructibleLayerKey = Level3.DESTRUCTIBLE_LAYER_KEY;
        this.wallsLayerKey = Level3.WALLS_LAYER_KEY;

        // Set the key for the player's sprite
        this.playerSpriteKey = Level3.PLAYER_SPRITE_KEY;
        // Set the player's spawn
        this.playerSpawn = Level3.PLAYER_SPAWN;

        // Music and sound
        this.levelMusicKey = Level3.LEVEL_MUSIC_KEY
        this.jumpAudioKey = Level3.JUMP_AUDIO_KEY;
        this.tileDestroyedAudioKey = Level3.TILE_DESTROYED_KEY;
        this.deathSoundKey = Level3.DEATH_KEY;
        this.hitKey = Level3.HIT_KEY;

        // Level end size and position
        this.levelEndPosition = new Vec2(32, 216).mult(this.tilemapScale);
        this.levelEndHalfSize = new Vec2(32, 32).mult(this.tilemapScale);

    }
    /**
     * Load in resources for level 3.
     */
    public loadScene(): void {
        // Load in the tilemap
        this.load.tilemap(this.tilemapKey, Level3.TILEMAP_PATH);
        this.load.audio(this.levelMusicKey, Level3.LEVEL_MUSIC_PATH);
    
    }

    public unloadScene(): void {
        // TODO decide which resources to keep/cull 
    }

    public startScene(): void {
        super.startScene();
        this.nextLevel = MainMenu;
    }

}