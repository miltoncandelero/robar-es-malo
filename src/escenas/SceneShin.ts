import { Container, Sprite } from "pixi.js";

export class ShinHat extends Container {
    constructor(){
        super();

        const shin: Sprite = Sprite.from("Shin");
        const hat: Sprite = Sprite.from("Hat");
        
        shin.anchor.set(0.5);
        hat.anchor.set(0.5);
        hat.scale.set(0.2);
        hat.scale.x = -2;
        hat.position.set(70,-210);
        
        this.addChild(shin);  // agregar una instancia al stage
        this.addChild(hat);
    }
};