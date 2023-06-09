import State from "../../../Wolfie2D/DataTypes/State/State";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import HW3AnimatedSprite from "../../Nodes/HW3AnimatedSprite";
import BossController, { BossStates } from "../BossController";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";

/**
 * An abstract state for the EnemyController 
 */
export default abstract class BossState extends State {

    protected parent: BossController;
	protected owner: HW3AnimatedSprite;
    protected bossLaser:HW3AnimatedSprite;
    protected spikes: HW3AnimatedSprite;
    protected spikes2: HW3AnimatedSprite;
    protected aggroRadius: number;
    protected dirToPlayer: Vec2;
    protected dirToSky: Vec2;
    protected dirToAbovePlayer:Vec2;
    
    protected sky: Vec2 = new Vec2(1200,1150);
    protected dirToPlayerRight: Vec2;
    protected dirToPlayerLeft: Vec2;
    
    protected playerRight:Vec2; 
    protected playerLeft:Vec2;

	public constructor(parent: BossController, owner: HW3AnimatedSprite, laser:HW3AnimatedSprite, spikes:HW3AnimatedSprite, spikes2: HW3AnimatedSprite){
		super(parent);
		this.owner = owner;
        this.aggroRadius = this.parent.aggroRadius;
        this.bossLaser = laser;
        this.spikes = spikes;
        this.spikes2 = spikes2;
        
	}

    public abstract onEnter(options: Record<string, any>): void;

    /**
     * Handle game events from the parent.
     * @param event the game event
     */
	public handleInput(event: GameEvent): void {
        switch(event.type) {
            // Default - throw an error
            default: {
                throw new Error(`Unhandled event in BossState of type ${event.type}`);
            }
        }
	}

	public update(deltaT: number): void {
        this.playerRight = new Vec2(this.parent.playerPosition.clone().x+300,this.parent.playerPosition.clone().y)
        this.playerLeft = new Vec2(this.parent.playerPosition.clone().x-300,this.parent.playerPosition.clone().y)
        // // This updates the direction the Player is in (left or right)
        this.dirToPlayer = this.owner.position.dirTo(this.parent.playerPosition);
        this.dirToSky = this.owner.position.dirTo(this.sky);
        this.dirToAbovePlayer = this.owner.position.dirTo(new Vec2(this.parent.playerPosition.x+200, 1150))
        this.dirToPlayerRight = this.owner.position.dirTo(this.playerRight);
        this.dirToPlayerLeft = this.owner.position.dirTo(this.playerLeft);
        // // make sure were facing the player2
        // if(this.dirToPlayer.x !== 0){
        //     this.owner.invertX = MathUtils.sign(this.dirToPlayer.x) < 0;
        // }
    }

    public abstract onExit(): Record<string, any>;

    // returns whether a player is inside our aggro range or not
    protected playerInRange(): Boolean {
        let sqPlayerDist = this.parent.spawn.distanceSqTo(this.parent.playerPosition);
        let factor = 20; // cause sqDist is crazy large
        let sqAggroRadius = this.aggroRadius * factor * this.aggroRadius * factor;
        return sqPlayerDist <= sqAggroRadius;
    }

    // returns if the player is in range to be attacked
    protected playerInCombatRange(): Boolean {
        return this.owner.boundary.containsPoint(this.parent.playerPosition);
    }

    protected playerInLaserRange(): Boolean{
        return Math.abs(this.bossLaser.position.x - this.parent.playerPosition.x) <= 25;
    }
    protected playerInSpikeRange(): Boolean{
        return this.spikes.boundary.containsPoint(this.parent.playerPosition) || this.spikes2.boundary.containsPoint(this.parent.playerPosition);
    }
    // returns if we are at our spawn
    // protected atSpawn(): Boolean {
    //     let threshold = 2.6; // 2.5 but do 2.6 for rounding errors
    //     return this.owner.position.distanceSqTo(this.parent.spawn) < threshold * threshold;
    // }
}