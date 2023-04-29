import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import HW3Level from "./HW3Level";

import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";

import HW3AnimatedSprite from "../Nodes/HW3AnimatedSprite";
import Hub from "./Hub";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import { PortalAnimation } from "../Portal/Portal";
import Level1 from "./HW3Level1"
import Level2 from "./HW3Level2";
import Level3 from "./Level3";
import Level4 from "./Level4";
import Level5 from "./Level5";

/**
 * The first level for HW4 - should be the one with the grass and the clouds.
 */
export default class Tutorial extends HW3Level {

    public static readonly PLAYER_SPAWN = new Vec2(64, 1225);
    public static readonly PLAYER_SPRITE_KEY = "PLAYER_SPRITE_KEY";
    public static readonly PLAYER_SPRITE_PATH = "game_assets/spritesheets/pyke_tallus.json";
    public static readonly TILEMAP_KEY = "TUTORIAL";
    public static readonly TILEMAP_PATH = "game_assets/tilemaps/Hub.json";
    public static readonly TILEMAP_SCALE = new Vec2(2, 2);
    public static readonly PLATFORM_LAYER_KEY = "Platform";
    public static readonly WALLS_LAYER_KEY = "Ground";

    public static readonly LEVEL_MUSIC_KEY = "LEVEL_MUSIC";
    public static readonly LEVEL_MUSIC_PATH = "game_assets/music/hub.wav";

    public static readonly JUMP_AUDIO_KEY = "PLAYER_JUMP";
    public static readonly JUMP_AUDIO_PATH = "game_assets/sounds/jump.wav";

    public static readonly TILE_DESTROYED_KEY = "TILE_DESTROYED";
    public static readonly TILE_DESTROYED_PATH = "hw4_assets/sounds/switch.wav";

    public static readonly DEATH_KEY = "DEATH";
    public static readonly DEATH_PATH = "game_assets/sounds/deathsound.mp3";

    public static readonly HIT_KEY = "HIT";
    public static readonly HIT_PATH = "game_assets/sounds/gettinghit.wav";

    // Game UI Sprites
    public static readonly HP_KEY = "HEALTH";
    public static readonly HP_PATH = "game_assets/sprites/HP_Bar.png";
    public static readonly INV_KEY = "INVENTORY";
    public static readonly INV_PATH = "game_assets/sprites/Inventory.png";
    public static readonly GOBLINSKULL_KEY = "GOBLINSKULL_SPRITE_KEY";
    public static readonly GOBLINSKULL_PATH = "game_assets/sprites/Goblin_Skull.png";
    public static readonly JELLYHEART_KEY = "JELLYHEART_SPRITE_KEY";
    public static readonly JELLYHEART_PATH = "game_assets/sprites/Jelly_Heart.png";
    public static readonly SWORDRUBY_KEY = "SWORDRUBY_SPRITE_KEY";
    public static readonly SWORDRUBY_PATH = "game_assets/sprites/Sword_Ruby.png";
    public static readonly QUEST_KEY = "QUEST_KEY";
    public static readonly QUEST_PATH = "game_assets/sprites/Questbox.png";

    //Portal
    public static readonly PORTAL_SPAWN = new Vec2(2300, 1177);
    public static readonly PORTAL_KEY = "PORTAL_KEY";
    public static readonly PORTAL_PATH = "game_assets/spritesheets/portal.json";
    protected portal: HW3AnimatedSprite;
    protected portalSpriteKey:string;
    protected portalSpawn: Vec2;

    // Enemy Sprites
    public static readonly ENEMY_DEFAULT_SPAWN = new Vec2(200, 1216);
    protected defaultSpawn: Vec2;

    public static readonly GOBLIN_SPRITE_KEY = "GOBLIN_SPRITE_KEY";
    public static readonly GOBLIN_SPRITE_PATH = "game_assets/spritesheets/goblin.json";
    protected goblinSpriteKey: string;

    public static readonly SWORD_SPRITE_KEY = "DEMON_SPRITE_KEY";
    public static readonly SWORD_SPRITE_PATH = "game_assets/spritesheets/flying_sword.json";
    protected swordSpriteKey: string;

    public static readonly LEVEL_END = new AABB(new Vec2(224, 232), new Vec2(24, 16));

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options);

        // Set the keys for the different layers of the tilemap
        this.tilemapKey = Tutorial.TILEMAP_KEY;
        this.tilemapScale = Tutorial.TILEMAP_SCALE;
        this.platformLayerKey = Tutorial.PLATFORM_LAYER_KEY;
        this.wallsLayerKey = Tutorial.WALLS_LAYER_KEY;
        
        // Set the key for the player's sprite
        this.playerSpriteKey = Tutorial.PLAYER_SPRITE_KEY;
        // Set the player's spawn
        this.playerSpawn = Tutorial.PLAYER_SPAWN;

        // Music and sound
        this.levelMusicKey = Tutorial.LEVEL_MUSIC_KEY
        this.jumpAudioKey = Tutorial.JUMP_AUDIO_KEY;
        this.tileDestroyedAudioKey = Tutorial.TILE_DESTROYED_KEY;
        this.deathSoundKey = Tutorial.DEATH_KEY;
        this.hitKey = Tutorial.HIT_KEY;

        // Sprites
        this.HP_KEY = Tutorial.HP_KEY;
        this.INV_KEY = Tutorial.INV_KEY;
        this.GOBLINSKULL_KEY = Tutorial.GOBLINSKULL_KEY;
        this.JELLYHEART_KEY = Tutorial.JELLYHEART_KEY;
        this.SWORDRUBY_KEY = Tutorial.SWORDRUBY_KEY;
        this.QUEST_KEY = Tutorial.QUEST_KEY;

        // Set Enemy sprites and spawns
        this.goblinSpriteKey = Tutorial.GOBLIN_SPRITE_KEY;
        this.swordSpriteKey = Tutorial.SWORD_SPRITE_KEY;
        this.defaultSpawn = Tutorial.ENEMY_DEFAULT_SPAWN;

        // Set Portal sprite and spawn
        this.portalSpriteKey = Tutorial.PORTAL_KEY;
        this.portalSpawn = Tutorial.PORTAL_SPAWN;

        // Level end size and position
        this.levelEndPosition = new Vec2(128, 232).mult(this.tilemapScale);
        this.levelEndHalfSize = new Vec2(32, 32).mult(this.tilemapScale);
    }

    /**
     * Load in our resources for level 1
     */
    public loadScene(): void {
        // Load in the tilemap
        this.load.tilemap(this.tilemapKey, Tutorial.TILEMAP_PATH);
        // Load in the player's sprite
        this.load.spritesheet(this.playerSpriteKey, Tutorial.PLAYER_SPRITE_PATH);
        // Audio and music
        this.load.audio(this.levelMusicKey, Tutorial.LEVEL_MUSIC_PATH);
        this.load.audio(this.jumpAudioKey, Tutorial.JUMP_AUDIO_PATH);
        this.load.audio(this.tileDestroyedAudioKey, Tutorial.TILE_DESTROYED_PATH);
        this.load.audio(this.deathSoundKey,Tutorial.DEATH_PATH);
        this.load.audio(this.hitKey,Tutorial.HIT_PATH);
        // Game UI sprites
        this.load.image(this.HP_KEY, Tutorial.HP_PATH);
        this.load.image(this.INV_KEY, Tutorial.INV_PATH);
        this.load.image(this.GOBLINSKULL_KEY, Tutorial.GOBLINSKULL_PATH);
        this.load.image(this.JELLYHEART_KEY, Tutorial.JELLYHEART_PATH);
        this.load.image(this.SWORDRUBY_KEY, Tutorial.SWORDRUBY_PATH);
        this.load.image(this.QUEST_KEY, Tutorial.QUEST_PATH);
        // Load in Enemy sprites
        this.load.spritesheet(this.goblinSpriteKey, Tutorial.GOBLIN_SPRITE_PATH);
        this.load.spritesheet(this.swordSpriteKey, Tutorial.SWORD_SPRITE_PATH);
        this.load.spritesheet(this.portalSpriteKey,Tutorial.PORTAL_PATH);
    }

    /**
     * Unload resources for level 1
     */
    public unloadScene(): void {
        // // TODO decide which resources to keep/cull 
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.levelMusicKey});
        // set tutorial flag to true
        sessionStorage.setItem("tutorialPlayed", "true");
    }

    public startScene(): void {
        super.startScene();
        // Set the next level to be Level2
        this.nextLevel = Hub;

        this.initializeEnemies();
        this.portalInitialize();
    }

    protected initializeEnemies() {
        // initialize placeholder
        // can use this.defaultSpawn or define your own spawn
        this.initializeEnemy(this.goblinSpriteKey, new Vec2(500, 1216), 10);
        this.initializeEnemy(this.goblinSpriteKey, new Vec2(600, 1216), 10);
        this.initializeEnemy(this.goblinSpriteKey, new Vec2(700, 1216), 10);

        this.initializeEnemy(this.swordSpriteKey, new Vec2(800, 1216), 10);
        this.initializeEnemy(this.swordSpriteKey, new Vec2(900, 1216), 10);
        this.initializeEnemy(this.swordSpriteKey, new Vec2(1000, 1216), 10);

    }

    protected handleCheat1(): void {
        this.sceneManager.changeToScene(Level1);
    }
    protected handleCheat2(): void {
        this.sceneManager.changeToScene(Level2);
    }
    protected handleCheat3(): void {
        this.sceneManager.changeToScene(Level3);
    }
    protected handleCheat4(): void {
        this.sceneManager.changeToScene(Level4);
    }
    protected handleCheat5(): void {
        this.sceneManager.changeToScene(Level5);
    }

    protected portalInitialize(){
        this.portal = this.initializePortal(this.portalSpriteKey,this.portalSpawn)
        this.portal.animation.play(PortalAnimation.IDLE);
    }

    /**
     * I had to override this method to adjust the viewport for the first level. I screwed up 
     * when I was making the tilemap for the first level is what it boils down to.
     * 
     * - Peter
     */
    protected initializeViewport(): void {
        super.initializeViewport();
        this.viewport.setBounds(32, 16, 2368, 1600);
    }

}