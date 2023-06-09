import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import GameEvent from "../../Wolfie2D/Events/GameEvent";

import Idle from "./EnemyStates/Idle";
import Pathing from "./EnemyStates/Pathing";
import Returning from "./EnemyStates/Returning";
import Hurt from "./EnemyStates/Hurt";
import Dead from "./EnemyStates/Dead";
// import Combat from "./EnemyStates/Combat";

import HW3AnimatedSprite from "../Nodes/HW3AnimatedSprite";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";
import { CombatEvents } from "../Events/CombatEvents";

/**
 * Animation keys for any enemy spritesheet
 */
export const EnemyAnimations = {
    IDLE: "IDLE",
    WALK: "WALK",
    ATTACK_1: "ATTACK_1",
    TAKE_DAMAGE: "TAKE_DAMAGE",
    DYING: "DYING",
    DEATH: "DEATH",
} as const

/**
 * Tween animations
 */
export const EnemyTweens = {
    // FLIP: "FLIP",
    // DEATH: "DEATH"
} as const

/**
 * Keys for the states the EnemyController can be in.
 */
export const EnemyStates = {
    IDLE: "IDLE",
    PATHING: "PATHING",
    RETURNING: "RETURNING",
    HURT: "HURT",
    DEAD: "DEAD",
    // COMBAT: "COMBAT",
} as const

/**
 * The controller that controls the enemy.
 */
export default class EnemyController extends StateMachineAI {
    public readonly MAX_SPEED: number = 300;
    public readonly MIN_SPEED: number = 200;

    /** Health and max health for the enemy */
    protected _health: number;
    protected _maxHealth: number;

    protected _damage: number;

    /** The enemy's game node */
    protected owner: HW3AnimatedSprite;

    protected _velocity: Vec2;
	protected _speed: number;

    protected _aggroRadius: number;
    protected _spawn: Vec2;
    private _player: HW3AnimatedSprite;
    protected _playerDamage: number;

    // protected tilemap: OrthogonalTilemap;
    // protected cannon: Sprite;
    // protected weapon: EnemyWeapon;

    private isAttacking: boolean;
    
    public initializeAI(owner: HW3AnimatedSprite, options: Record<string, any>){
        this.owner = owner;

        // this.weapon = options.weaponSystem;

        // this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;
        this.speed = 200;
        this.velocity = Vec2.ZERO;

        this.health = 6;
        this.maxHealth = 10;

        this._damage = 1;

        this._playerDamage = 1;

        this.aggroRadius = options.radius;

        this.spawn = options.spawn;
        this._player = options.player;

        this.isAttacking = false;

        // Add the different states the enemy can be in to the EnemyController 
		this.addState(EnemyStates.IDLE, new Idle(this, this.owner));
        this.addState(EnemyStates.PATHING, new Pathing(this, this.owner));
        this.addState(EnemyStates.RETURNING, new Returning(this, this.owner));
        this.addState(EnemyStates.HURT, new Hurt(this, this.owner));
        this.addState(EnemyStates.DEAD, new Dead(this, this.owner));
        // this.addState(EnemyStates.COMBAT, new Combat(this, this.owner));
        
        // Start the enemy in the Idle state
        this.initialize(EnemyStates.IDLE);

        this.receiver.subscribe(CombatEvents.PLAYER_ATTACK_PHYSICAL);
    }

    // Override
    handleEvent(event: GameEvent): void {
        if(this.active){
            if (event.type === CombatEvents.PLAYER_ATTACK_PHYSICAL) {
                // make sure we are in the range of player's attack
                let inRange = this._player.boundary.containsPoint(this.owner.position);
                let notDead = this.health > 0;
                
                if (notDead && inRange) {
                    this._playerDamage = event.data.get("dmg");
                    this.changeState(EnemyStates.HURT);
                }
            }
            else this.currentState.handleInput(event);
        }
    }

    public update(deltaT: number): void {
		super.update(deltaT);
        // make sure we aren't dead and we can actually attack
        if (this.owner && !this.owner.animation.isPlaying(EnemyAnimations.TAKE_DAMAGE) && !this.owner.animation.isPlaying(EnemyAnimations.DYING)) {
            // if were not already attacking and player is in combat range
            if (!this.isAttacking && this.playerBoundary.containsPoint(this.owner.position)) {
                this.owner.animation.play(EnemyAnimations.ATTACK_1);
                this.isAttacking = true;
            }
            if (this.isAttacking && !this.owner.animation.isPlaying(EnemyAnimations.ATTACK_1)) {
                this.isAttacking = false;
                this.emitter.fireEvent(CombatEvents.ENEMY_ATTACK_PHYSICAL, { dmg: this.damage });
            }
        }
	}

    public get aggroRadius(): number { return this._aggroRadius; }
    public set aggroRadius(radius: number) {this._aggroRadius = radius; }

    public get spawn(): Vec2 { return this._spawn; }
    public set spawn(spawn: Vec2) {this._spawn = spawn; } 

    public get playerPosition(): Vec2 { return this._player.position; }
    public get playerBoundary(): AABB { return this._player.boundary; }
    public get playerDamage(): number { return this._playerDamage }

    public get velocity(): Vec2 { return this._velocity; }
    public set velocity(velocity: Vec2) { this._velocity = velocity; }

    public get speed(): number { return this._speed; }
    public set speed(speed: number) { this._speed = speed; }

    public get damage(): number { return this._damage; }
    public set damage(damage: number) { this._damage = damage }

    public get maxHealth(): number { return this._maxHealth; }
    public set maxHealth(maxHealth: number) { 
        this._maxHealth = maxHealth; 
        // When the health changes, fire an event up to the scene.
        // this.emitter.fireEvent(HW3Events.HEALTH_CHANGE, {curhp: this.health, maxhp: this.maxHealth});
    }

    public get health(): number { return this._health; }
    public set health(health: number) { 
        this._health = MathUtils.clamp(health, 0, this.maxHealth);
        // When the health changes, fire an event up to the scene.
        // this.emitter.fireEvent(HW3Events.HEALTH_CHANGE, {curhp: this.health, maxhp: this.maxHealth});
        // If the health hit 0, change the state of the player
        if (this.health === 0) { 
            this.changeState(EnemyStates.DEAD);
            //this.emitter.fireEvent();
         }
    }
}