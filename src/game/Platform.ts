import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./IHitbox";

export class Platform extends Container implements IHitbox {
    
    private hitbox: Graphics;

    constructor(){
        super();

        const spr = Sprite.from("Plat2");
        spr.anchor.set(0.5,0.5);
        this.addChild(spr);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x0000FF, 0.3);
        this.hitbox.drawRect(-42.5,-10,85,20);
        this.hitbox.endFill();
        this.addChild(this.hitbox);
    }

    public getHitbox():Rectangle {
        return this.hitbox.getBounds()
    }
}