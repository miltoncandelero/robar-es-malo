import { Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

export class Platform2 extends PhysicsContainer implements IHitbox {
    
    private hitbox: Graphics;

    constructor(){ //constructor(speed:number){ //(sin aceleración)
        super();

        const spr = Sprite.from("Plat2");
        spr.anchor.set(0.5,0.5);
        this.addChild(spr);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x0000FF, 0.3);
        this.hitbox.drawRect(-42.5,-10,85,20);
        this.hitbox.endFill();
        this.addChild(this.hitbox);

        // this.speed.x = -speed;
    }

    public getHitbox():Rectangle {
        return this.hitbox.getBounds()
    }
}