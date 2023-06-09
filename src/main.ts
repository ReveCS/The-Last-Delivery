import Game from "./Wolfie2D/Loop/Game";
import MainMenu from "./hw3/Scenes/MainMenu";
import { HW3Controls } from "./hw3/HW3Controls";
import SplashScreen from "./hw3/Scenes/SplashScreen";

// The main function is your entrypoint into Wolfie2D. Specify your first scene and any options here.
(function main(){

    // Set up options for our game
    let options = {
        canvasSize: {x: 1200, y: 800},          // The size of the game
        clearColor: {r: 34, g: 32, b: 52},   // The color the game clears to
        inputs: [
            {name: HW3Controls.MOVE_LEFT, keys: ["a"]},
            {name: HW3Controls.MOVE_RIGHT, keys: ["d"]},
            {name: HW3Controls.JUMP, keys: ["w", "space"]},
            {name: HW3Controls.ATTACK, keys: ["j"]},
            {name: HW3Controls.POTION, keys: ["k"]},
            {name: HW3Controls.INVENTORY, keys: ["l"]},
            {name: HW3Controls.ESC, keys: ["escape"]},
            {name: HW3Controls.INTERACT, keys: ["e"]},
            {name: HW3Controls.ACCEPT_QUEST, keys: ["y"]},
            {name: HW3Controls.DECLINE_QUEST, keys: ["n"]},
            {name: HW3Controls.CHEAT1, keys: ["1"]},
            {name: HW3Controls.CHEAT2, keys: ["2"]},
            {name: HW3Controls.CHEAT3, keys: ["3"]},
            {name: HW3Controls.CHEAT4, keys: ["4"]},
            {name: HW3Controls.CHEAT5, keys: ["5"]},
            {name: HW3Controls.INVINCIBLE, keys: ["i"]},
        ],
        useWebGL: false,                        // Tell the game we want to use webgl
        showDebug: false                       // Whether to show debug messages. You can change this to true if you want
    }

    // Create a game with the options specified
    const game = new Game(options);

    // Start our game
    game.start(SplashScreen, {});
})();