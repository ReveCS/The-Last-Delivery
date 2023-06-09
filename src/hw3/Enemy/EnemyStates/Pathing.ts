import { EnemyStates, EnemyAnimations } from "../EnemyController";
import EnemyState from "./EnemyState";

export default class Pathing extends EnemyState {

	public onEnter(options: Record<string, any>): void {
		this.parent.speed = this.parent.MIN_SPEED;
        if (!this.owner.animation.isPlaying(EnemyAnimations.ATTACK_1)) {
            this.owner.animation.play(EnemyAnimations.WALK);
        }
	}

	public update(deltaT: number): void {
		super.update(deltaT);

        // Stop aggro if the player runs away
        if (!this.playerInRange()) {
            this.finished(EnemyStates.RETURNING);
        }
        // We handle hit state in superclass
        // Otherwise, keep pathing
        else {
            let dir = this.dirToPlayer;
            if (dir.y < -0.9) this.parent.velocity.y = -150; // allow jump
            this.parent.velocity.x = dir.x * this.parent.speed;
            this.parent.velocity.y += this.gravity*deltaT;
            this.owner.move(this.parent.velocity.scaled(deltaT));
        }
		
	}

	public onExit(): Record<string, any> {
		if (!this.owner.animation.isPlaying(EnemyAnimations.ATTACK_1)) {
            this.owner.animation.stop();
        }
		return {};
	}
}