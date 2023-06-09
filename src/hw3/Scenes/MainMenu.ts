import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Hub from "./Hub";
import Level1 from "./HW3Level1";
import Level2 from "./HW3Level2";
import Level3 from "./Level3";
import Level4 from "./Level4";
import Level5 from "./Level5";
import Tutorial from "./Tutorial";
import Backstory from "./Backstory";

// Layers for the main menu scene
export const MenuLayers = {
    BACKGROUND: "BACKGROUND",
    MAIN: "MAIN", 
    SELECTION: "SELECTION",
    CONTROLS: "CONTROLS",
    ABOUT: "ABOUT",
    CREDIT: "CREDIT"
} as const;

// Events triggered in the main menu
const MainMenuEvent = {
    SELECTION: "SELECTION",
	CONTROLS: "CONTROLS",
	ABOUT: "ABOUT",
    CREDIT: "CREDIT",
	MENU: "MENU",
    PLAY: "PLAY",
} as const;

export default class MainMenu extends Scene {
    // Layers, for multiple main menu screens
    private background: Layer;
    private mainMenu: Layer;
    private selection: Layer;
    private controls: Layer;
    private about: Layer;
    private credit: Layer;

    // Sprites for background and buttons
    // Sprites for the background images
	private bg: AnimatedSprite;
    private backgroundSprite: Sprite;
    private backgroundSprite2: Sprite;
    private levelsSprite: Sprite;
    private hubLevelSprite: Sprite;
    private level1LevelSprite: Sprite;
    private level2LevelSprite: Sprite;
    private level3LevelSprite: Sprite;
    private level4LevelSprite: Sprite;
    private level5LevelSprite: Sprite;
    private controlsSprite: Sprite;
    private aboutSprite: Sprite;
    private creditSprite: Sprite;
    private hubSprite: Sprite;
    private level1Sprite: Sprite;
    private level2Sprite: Sprite;
    private level3Sprite: Sprite;
    private level4Sprite: Sprite;
    private bossSprite: Sprite;
    private  playSprite: Sprite;

    
    // Music
    public static readonly MUSIC_KEY = "MAIN_MENU_MUSIC";
    public static readonly MUSIC_PATH = "game_assets/music/mainmenu.wav";

    // Live background
    //public static LIVEBACKGROUND_KEY = "LIVE_BACKGROUND";
    //public static LIVEBACKGROUND_PATH = "game_assets/backgrounds/Background.json";
    //public static readonly LIVEBACKGROUND_SCALE = new Vec2(2, 2);

    // Background
    public static BACKGROUND1_KEY = "BACKGROUND";
    public static BACKGROUND1_PATH = "game_assets/backgrounds/Last Delivery Background Still.png";
    public static BACKGROUND2_KEY = "BACKGROUND2";
    public static BACKGROUND2_PATH = "game_assets/backgrounds/Last Delivery Background Still2.png";
    public static BACKGROUND3_KEY = "BACKGROUND3";
    public static BACKGROUND3_PATH = "game_assets/backgrounds/Last Delivery Background Still3.png";

    // The key and path to the sprites
    public static BUTTON_KEY = "LEVELS";
    public static BUTTON_PATH = "game_assets/sprites/Button_cropped.png"
    public static CONTROLS_KEY = "LEVELS";
    public static CONTROLS_PATH = "game_assets/sprites/Button_cropped.png"
    public static ABOUT_KEY = "LEVELS";
    public static ABOUT_PATH = "game_assets/sprites/Button_cropped.png"
    public static CREDIT_KEY = "LEVELS";
    public static CREDIT_PATH = "game_assets/sprites/Button_cropped.png"
    public static HUB_KEY = "LEVELS";
    public static HUB_PATH = "game_assets/sprites/Button_cropped.png"
    public static HUB_LEVEL_KEY = "HUB";
    public static HUB_LEVEL_PATH = "game_assets/sprites/Hub Level.png";
    public static LEVEL1_LEVEL_KEY = "LEVEL1";
    public static LEVEL1_LEVEL_PATH = "game_assets/sprites/Level1.png";
    public static LEVEL2_LEVEL_KEY = "LEVEL2";
    public static LEVEL2_LEVEL_PATH = "game_assets/sprites/Level2.png";
    public static LEVEL3_LEVEL_KEY = "LEVEL3";
    public static LEVEL3_LEVEL_PATH = "game_assets/sprites/Level3.png";
    public static LEVEL4_LEVEL_KEY = "LEVEL4";
    public static LEVEL4_LEVEL_PATH = "game_assets/sprites/Level4.png";
    public static LEVEL5_LEVEL_KEY = "LEVEL5";
    public static LEVEL5_LEVEL_PATH = "game_assets/sprites/Level5.png";


    public loadScene(): void {
        super.loadScene();
        // Load the menu song
        // this.load.audio(MainMenu.MUSIC_KEY, MainMenu.MUSIC_PATH);

        // Load sprites
        //this.load.spritesheet(MainMenu.LIVEBACKGROUND_KEY, MainMenu.LIVEBACKGROUND_PATH);
		//this.load.tilemap(MainMenu.BACKGROUND_KEY, MainMenu.BACKGROUND_PATH);
        this.load.image(MainMenu.BACKGROUND1_KEY, MainMenu.BACKGROUND1_PATH);
        this.load.image(MainMenu.BACKGROUND2_KEY, MainMenu.BACKGROUND2_PATH);
        this.load.image(MainMenu.BACKGROUND3_KEY, MainMenu.BACKGROUND3_PATH);
        this.load.image(MainMenu.BUTTON_KEY, MainMenu.BUTTON_PATH);
        this.load.image(MainMenu.HUB_LEVEL_KEY, MainMenu.HUB_LEVEL_PATH);
        this.load.image(MainMenu.LEVEL1_LEVEL_KEY, MainMenu.LEVEL1_LEVEL_PATH);
        this.load.image(MainMenu.LEVEL2_LEVEL_KEY, MainMenu.LEVEL2_LEVEL_PATH);
        this.load.image(MainMenu.LEVEL3_LEVEL_KEY, MainMenu.LEVEL3_LEVEL_PATH);
        this.load.image(MainMenu.LEVEL4_LEVEL_KEY, MainMenu.LEVEL4_LEVEL_PATH);
        this.load.image(MainMenu.LEVEL5_LEVEL_KEY, MainMenu.LEVEL5_LEVEL_PATH);
    }

    public startScene(): void {
        // when we return from dying we have to reset zoom and bounds
        this.viewport.setZoomLevel(1);
        this.viewport.setCenter(600, 400);

        const center = this.viewport.getCenter();

        // Main menu screen
        this.mainMenu = this.addUILayer(MenuLayers.MAIN);

        // Selection screen
        this.selection = this.addUILayer(MenuLayers.SELECTION);
        this.selection.setHidden(true);

        // Controls screen
        this.controls = this.addUILayer(MenuLayers.CONTROLS);
        this.controls.setHidden(true);
        
        // About screen
        this.about = this.addUILayer(MenuLayers.ABOUT);
        this.about.setHidden(true);

        // Credit screen
        this.credit = this.addUILayer(MenuLayers.CREDIT);
        this.credit.setHidden(true);

        // Background layer for all screens
        this.background = this.addUILayer(MenuLayers.BACKGROUND);
        //this.bg = this.add.animatedSprite(MainMenu.LIVEBACKGROUND_KEY, MenuLayers.MAIN);
        //this.bg.position.copy(new Vec2(center.x, center.y)); 
        this.backgroundSprite = this.add.sprite(MainMenu.BACKGROUND1_KEY, MenuLayers.MAIN);
        this.backgroundSprite.position.copy(new Vec2(center.x, center.y));
        this.backgroundSprite2 = this.add.sprite(MainMenu.BACKGROUND3_KEY, MenuLayers.SELECTION);
        this.backgroundSprite2.position.copy(new Vec2(center.x, center.y));
        this.backgroundSprite2 = this.add.sprite(MainMenu.BACKGROUND2_KEY, MenuLayers.CONTROLS);
        this.backgroundSprite2.position.copy(new Vec2(center.x, center.y));
        this.backgroundSprite2 = this.add.sprite(MainMenu.BACKGROUND2_KEY, MenuLayers.ABOUT);
        this.backgroundSprite2.position.copy(new Vec2(center.x, center.y));
        this.backgroundSprite2 = this.add.sprite(MainMenu.BACKGROUND2_KEY, MenuLayers.CREDIT);
        this.backgroundSprite2.position.copy(new Vec2(center.x, center.y));

        // Title for main menu
        const title = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.MAIN, {position: new Vec2(center.x, center.y - 250), text: "The Last Delivery"});
        title.textColor = Color.BLACK;
        title.font = "Hjet-Regular";  
        title.fontSize = 90;

        // Set flag for the tutorial
        // Only show levels if tutorial is done, otherwise show play button => tutorial
        if (sessionStorage.getItem("tutorialPlayed") === "true") {
            // Add levels button, and give it an event to emit on press
            const levels = <Button> this.add.uiElement(UIElementType.BUTTON, MenuLayers.MAIN, {position: new Vec2(center.x, center.y + 250), text: "Levels"});
            this.levelsSprite = this.add.sprite(MainMenu.BUTTON_KEY, MenuLayers.MAIN);
            this.levelsSprite.position.copy(levels.position);

            levels.size.set(this.levelsSprite.size.x, this.levelsSprite.size.y);
            //levels.size.set(200, 50);
            //levels.borderWidth = 2;
            //levels.borderColor = Color.WHITE;
            levels.borderColor = Color.TRANSPARENT;
            levels.backgroundColor = Color.TRANSPARENT;
            levels.onClickEventId = MainMenuEvent.SELECTION;
            levels.font = "Hjet-Regular";
        }
        else {
            // Add play button to send us to tutorial
            const play = <Button> this.add.uiElement(UIElementType.BUTTON, MenuLayers.MAIN, {position: new Vec2(center.x, center.y + 250), text: "Play"});
            this.playSprite = this.add.sprite(MainMenu.BUTTON_KEY, MenuLayers.MAIN);
            this.playSprite.position.copy(play.position);

            play.size.set(this.playSprite.size.x, this.playSprite.size.y);
            //levels.size.set(200, 50);
            //levels.borderWidth = 2;
            //levels.borderColor = Color.WHITE;
            play.borderColor = Color.TRANSPARENT;
            play.backgroundColor = Color.TRANSPARENT;
            play.font = "Hjet-Regular";
            play.onClick = () => {
                this.sceneManager.changeToScene(Tutorial);
            }
        }

        // Add controls button
        const controls = <Button> this.add.uiElement(UIElementType.BUTTON, MenuLayers.MAIN, {position: new Vec2(center.x, 750), text: "Controls"});
        this.controlsSprite = this.add.sprite(MainMenu.BUTTON_KEY, MenuLayers.MAIN);
        this.controlsSprite.position.copy(controls.position);
        
        controls.size.set(200, 50);
        controls.borderWidth = 2;
        controls.borderColor = Color.WHITE;
        controls.backgroundColor = Color.TRANSPARENT;
        controls.onClickEventId = MainMenuEvent.CONTROLS;
        controls.font = "Hjet-Regular"
        
        // Add about button
        const about = <Button> this.add.uiElement(UIElementType.BUTTON, MenuLayers.MAIN, {position: new Vec2(300, 750), text: "About"});
        this.aboutSprite = this.add.sprite(MainMenu.BUTTON_KEY, MenuLayers.MAIN);
        this.aboutSprite.position.copy(about.position);
        
        about.size.set(200, 50);
        about.borderWidth = 2;
        about.borderColor = Color.WHITE;
        about.backgroundColor = Color.TRANSPARENT;
        about.onClick =()=>{
            this.sceneManager.changeToScene(Backstory);
        }
        about.font = "Hjet-Regular";

        // Add credit button
        const credit = <Button> this.add.uiElement(UIElementType.BUTTON, MenuLayers.MAIN, {position: new Vec2(900, 750), text: "Credit"});
        this.creditSprite = this.add.sprite(MainMenu.BUTTON_KEY, MenuLayers.MAIN);
        this.creditSprite.position.copy(credit.position);
        
        credit.size.set(200, 50);
        credit.borderWidth = 2;
        credit.borderColor = Color.WHITE;
        credit.backgroundColor = Color.TRANSPARENT;
        credit.onClickEventId = MainMenuEvent.CREDIT;
        credit.font = "Hjet-Regular";

        // Selection screen
        const hub = <Button> this.add.uiElement(UIElementType.BUTTON, MenuLayers.SELECTION, {position: new Vec2(center.x, center.y + 50), text: "Hub"});
        this.hubSprite = this.add.sprite(MainMenu.BUTTON_KEY, MenuLayers.SELECTION);
        this.hubSprite.position.copy(hub.position)

        hub.size.set(200, 50);
        hub.borderColor = Color.TRANSPARENT;
        hub.backgroundColor = Color.TRANSPARENT;
        hub.font = "Hjet-Regular";
        hub.onClick = () => {
            this.sceneManager.changeToScene(Hub);
        }

        this.hubLevelSprite = this.add.sprite(MainMenu.HUB_LEVEL_KEY, MenuLayers.SELECTION);
        this.hubLevelSprite.position.copy(new Vec2(center.x - 12, center.y - 67));      

        const level1 = <Button> this.add.uiElement(UIElementType.BUTTON, MenuLayers.SELECTION, {position: new Vec2(center.x - 200, center.y - 185), text: "Level 1"});
        this.level1Sprite = this.add.sprite(MainMenu.BUTTON_KEY, MenuLayers.SELECTION);
        this.level1Sprite.position.copy(level1.position);

        this.level1LevelSprite = this.add.sprite(MainMenu.LEVEL1_LEVEL_KEY, MenuLayers.SELECTION);
        this.level1LevelSprite.position.copy(new Vec2(center.x - 200, center.y - 323)); 
        
        level1.size.set(200, 50);
        level1.borderColor = Color.TRANSPARENT;
        level1.backgroundColor = Color.TRANSPARENT;
        level1.font = "Hjet-Regular";
        level1.onClick = () => {
           this.sceneManager.changeToScene(Level1);
        }

        const level2 = <Button> this.add.uiElement(UIElementType.BUTTON, MenuLayers.SELECTION, {position: new Vec2(center.x + 200, center.y - 185), text: "Level 2"});
        this.level2Sprite = this.add.sprite(MainMenu.BUTTON_KEY, MenuLayers.SELECTION);
        this.level2Sprite.position.copy(level2.position);

        this.level2LevelSprite = this.add.sprite(MainMenu.LEVEL2_LEVEL_KEY, MenuLayers.SELECTION);
        this.level2LevelSprite.position.copy(new Vec2(center.x + 200, center.y - 320));
        
        level2.size.set(200, 50);
        level2.borderColor = Color.TRANSPARENT;
        level2.backgroundColor = Color.TRANSPARENT;
        level2.font = "Hjet-Regular";
        level2.onClick = () => {
            this.sceneManager.changeToScene(Level2);
        }
        
        const level3 = <Button> this.add.uiElement(UIElementType.BUTTON, MenuLayers.SELECTION, {position: new Vec2(center.x - 300, center.y + 250), text: "Level 3"});
        this.level3Sprite = this.add.sprite(MainMenu.BUTTON_KEY, MenuLayers.SELECTION);
        this.level3Sprite.position.copy(level3.position);

        this.level3LevelSprite = this.add.sprite(MainMenu.LEVEL3_LEVEL_KEY, MenuLayers.SELECTION);
        this.level3LevelSprite.position.copy(new Vec2(center.x - 300, center.y + 120));
        
        level3.size.set(200, 50);
        level3.borderColor = Color.TRANSPARENT;
        level3.backgroundColor = Color.TRANSPARENT;
        level3.font = "Hjet-Regular";
        level3.onClick = () => {
            this.sceneManager.changeToScene(Level3);
        }

        const level4 = <Button> this.add.uiElement(UIElementType.BUTTON, MenuLayers.SELECTION, {position: new Vec2(center.x, center.y + 300), text: "Level 4"});
        this.level4Sprite = this.add.sprite(MainMenu.BUTTON_KEY, MenuLayers.SELECTION);
        this.level4Sprite.position.copy(level4.position);

        this.level4LevelSprite = this.add.sprite(MainMenu.LEVEL4_LEVEL_KEY, MenuLayers.SELECTION);
        this.level4LevelSprite.position.copy(new Vec2(center.x, center.y + 185));
        
        level4.size.set(200, 50);
        level4.borderColor = Color.TRANSPARENT;
        level4.backgroundColor = Color.TRANSPARENT;
        level4.font = "Hjet-Regular";
        level4.onClick = () => {
            this.sceneManager.changeToScene(Level4);
        }

        const boss = <Button> this.add.uiElement(UIElementType.BUTTON, MenuLayers.SELECTION, {position: new Vec2(center.x + 300, center.y + 250), text: "Level 5"});
        this.bossSprite = this.add.sprite(MainMenu.BUTTON_KEY, MenuLayers.SELECTION);
        this.bossSprite.position.copy(boss.position);

        this.level5LevelSprite = this.add.sprite(MainMenu.LEVEL5_LEVEL_KEY, MenuLayers.SELECTION);
        this.level5LevelSprite.position.copy(new Vec2(center.x + 300, center.y + 125));
        
        boss.size.set(200, 50);
        boss.borderWidth = 2;
        boss.borderColor = Color.TRANSPARENT;
        boss.backgroundColor = Color.TRANSPARENT;
        boss.font = "Hjet-Regular";
        boss.onClick = () => {
           this.sceneManager.changeToScene(Level5)
        }

        const selectionBack = <Button> this.add.uiElement(UIElementType.BUTTON, MenuLayers.SELECTION, {position: new Vec2(center.x - 475, center.y + 350), text: "Back"});
        selectionBack.size.set(200, 50);
        selectionBack.borderWidth = 2;
        selectionBack.borderColor = Color.WHITE;
        selectionBack.backgroundColor = Color.TRANSPARENT;
        selectionBack.font = "Hjet-Regular";
        selectionBack.onClickEventId = MainMenuEvent.MENU;

        // Controls screen
        const controlsHeader = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.CONTROLS, {position: new Vec2(center.x, center.y - 250), text: "Controls"});
        controlsHeader.textColor = Color.WHITE;
        controlsHeader.font = "Hjet-Regular";

        const a = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.CONTROLS, {position: new Vec2(center.x, center.y - 175), text: "A - Move Left"});
        a.textColor = Color.WHITE;
        a.font = "Hjet-Regular";
        const d = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.CONTROLS, {position: new Vec2(center.x, center.y - 125), text: "D - Move Right"});
        d.textColor = Color.WHITE;
        d.font = "Hjet-Regular";
        const w = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.CONTROLS, {position: new Vec2(center.x, center.y - 75), text: "W - Jump"});
        w.textColor = Color.WHITE;
        w.font = "Hjet-Regular";
        const j = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.CONTROLS, {position: new Vec2(center.x, center.y - 25), text: "J - Attack"});
        j.textColor = Color.WHITE
        j.font = "Hjet-Regular";
        const k = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.CONTROLS, {position: new Vec2(center.x, center.y + 25), text: "K - Potion"});
        k.textColor = Color.WHITE;
        k.font = "Hjet-Regular"; 
        const l = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.CONTROLS, {position: new Vec2(center.x, center.y + 75), text: "L - Inventory"});
        l.textColor = Color.WHITE;
        l.font = "Hjet-Regular";  
        const e = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.CONTROLS, {position: new Vec2(center.x, center.y + 125), text: "E - Interact"});
        e.textColor = Color.WHITE;
        e.font = "Hjet-Regular"; 
        const esc = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.CONTROLS, {position: new Vec2(center.x, center.y + 175), text: "ESC - Pause the Game"});
        esc.textColor = Color.WHITE;
        esc.font = "Hjet-Regular";  

        const back = <Button> this.add.uiElement(UIElementType.BUTTON, MenuLayers.CONTROLS, {position: new Vec2(center.x, center.y + 300), text: "Back"});
        back.size.set(200, 50);
        back.borderWidth = 2;
        back.borderColor = Color.WHITE;
        back.backgroundColor = Color.TRANSPARENT;
        back.font = "Hjet-Regular";
        back.onClickEventId = MainMenuEvent.MENU;

        // About screen
        const aboutHeader = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.ABOUT, {position: new Vec2(center.x, center.y - 250), text: "About"});
        aboutHeader.font = "Hjet-Regular";
        aboutHeader.textColor = Color.WHITE;

        const aboutText1 = "Pyke Kallus used to be an ordinary mailman, delivering letters and";
        const aboutText2 = "packages across the country. But when delivering his 1000th package,";
        const aboutText3 = "he accidentally opens it, and is suddenly transported into the fantasy";
        const aboutText4 = "world of Atnis. And now, in order to make a living, he works for UBS";
        const aboutText5 = "(United Bounty Service) and delivers heads instead of mail every day."; 
        const aboutText6 = "As the top Bounty Hunter, Pyke, with his trusty Mailhammer, travels";
        const aboutText7 = "around the plagued lands of Atnis to rid them of invading monsters";
        const aboutText8 = "that threaten the common people.";

        const aboutLine1 = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.ABOUT, {position: new Vec2(center.x, center.y - 150), text: aboutText1});
        aboutLine1.font = "Hjet-Regular"
        const aboutLine2 = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.ABOUT, {position: new Vec2(center.x, center.y - 100), text: aboutText2});
        aboutLine2.font = "Hjet-Regular"
        const aboutLine3 = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.ABOUT, {position: new Vec2(center.x, center.y - 50), text: aboutText3});
        aboutLine3.font = "Hjet-Regular"
        const aboutLine4 = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.ABOUT, {position: new Vec2(center.x, center.y), text: aboutText4});
        aboutLine4.font = "Hjet-Regular"
        const aboutLine5 = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.ABOUT, {position: new Vec2(center.x, center.y + 50), text: aboutText5});
        aboutLine5.font = "Hjet-Regular"
        const aboutLine6 = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.ABOUT, {position: new Vec2(center.x, center.y + 100), text: aboutText6});
        aboutLine6.font = "Hjet-Regular"
        const aboutLine7 = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.ABOUT, {position: new Vec2(center.x, center.y + 150), text: aboutText7});
        aboutLine7.font = "Hjet-Regular"
        const aboutLine8 = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.ABOUT, {position: new Vec2(center.x, center.y + 200), text: aboutText8});
        aboutLine8.font = "Hjet-Regular"

        aboutLine1.textColor = Color.WHITE;
        aboutLine2.textColor = Color.WHITE;
        aboutLine3.textColor = Color.WHITE;
        aboutLine4.textColor = Color.WHITE;
        aboutLine5.textColor = Color.WHITE;
        aboutLine6.textColor = Color.WHITE;
        aboutLine7.textColor = Color.WHITE;
        aboutLine8.textColor = Color.WHITE;

        const aboutBack = <Button> this.add.uiElement(UIElementType.BUTTON, MenuLayers.ABOUT, {position: new Vec2(center.x, center.y + 300), text: "Back"});
        aboutBack.size.set(200, 50);
        aboutBack.borderWidth = 2;
        aboutBack.borderColor = Color.WHITE;
        aboutBack.backgroundColor = Color.TRANSPARENT;
        aboutBack.font = "Hjet-Regular";
        aboutBack.onClickEventId = MainMenuEvent.MENU;

        // Credit screen
        const creditHeader = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.CREDIT, {position: new Vec2(center.x, center.y - 250), text: "Credit"});
        creditHeader.font = "Hjet-Regular";
        creditHeader.textColor = Color.WHITE;

        const creditText1 = "Game, artwork, and music developed by";
        const creditText2 = "Avery Chan, Justin Chen, Nelson Yang";

        const creditLine1 = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.CREDIT, {position: new Vec2(center.x, center.y - 50), text: creditText1});
        creditLine1.font = "Hjet-Regular";
        const creditLine2 = <Label>this.add.uiElement(UIElementType.LABEL, MenuLayers.CREDIT, {position: new Vec2(center.x, center.y), text: creditText2});
        creditLine2.font = "Hjet-Regular";

        creditLine1.textColor = Color.WHITE;
        creditLine2.textColor = Color.WHITE;

        const creditBack = <Button> this.add.uiElement(UIElementType.BUTTON, MenuLayers.CREDIT, {position: new Vec2(center.x, center.y + 300), text: "Back"});
        creditBack.size.set(200, 50);
        creditBack.borderWidth = 2;
        creditBack.borderColor = Color.WHITE;
        creditBack.backgroundColor = Color.TRANSPARENT;
        creditBack.font = "Hjet-Regular";
        creditBack.onClickEventId = MainMenuEvent.MENU;

        // Subscribe to the button events
        this.receiver.subscribe(MainMenuEvent.SELECTION);
        this.receiver.subscribe(MainMenuEvent.CONTROLS);
        this.receiver.subscribe(MainMenuEvent.ABOUT);
        this.receiver.subscribe(MainMenuEvent.CREDIT);
        this.receiver.subscribe(MainMenuEvent.MENU);

        // Scene has started, so start playing music
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.MUSIC_KEY, loop: true, holdReference: true});
    }

    public unloadScene(): void {
        super.unloadScene();
        // The scene is being destroyed, so we can stop playing the song
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: MainMenu.MUSIC_KEY});
    }

    public updateScene(): void {
        while(this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
    }

    protected handleEvent(event: GameEvent): void {
        switch(event.type) {
            case MainMenuEvent.SELECTION: {
                this.selection.setHidden(false);
                this.mainMenu.setHidden(true);
                break;
            }
            case MainMenuEvent.CONTROLS: {
                this.controls.setHidden(false);
                this.mainMenu.setHidden(true);
                break;
            }
            case MainMenuEvent.ABOUT: {
                this.about.setHidden(false);
                this.mainMenu.setHidden(true);
                break;
            }
            case MainMenuEvent.CREDIT: {
                this.credit.setHidden(false);
                this.mainMenu.setHidden(true);
                break;
            }
            case MainMenuEvent.MENU: {
                this.mainMenu.setHidden(false);
                this.selection.setHidden(true);
                this.controls.setHidden(true);
                this.about.setHidden(true);
                this.credit.setHidden(true);
                break;
            }
            case MainMenuEvent.PLAY: {
                break;
            }
            default: {
                throw new Error(`Unhandled event caught in MainMenu: "${event.type}"`);
            }
        }
    }
}

