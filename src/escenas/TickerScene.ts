import { AnimatedSprite, Container, Texture } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";

export class TickerScene extends Container implements IUpdateable {
    private sonicAnim: AnimatedSprite;
    constructor(){
        super();

        this.sonicAnim = new AnimatedSprite([
            Texture.from("SRun1"),
            Texture.from("SRun2"),
            Texture.from("SRun3"),
            Texture.from("SRun4"),
            Texture.from("SRun5"),
            Texture.from("SRun6"),
            Texture.from("SRun7"),
            Texture.from("SRun8")
        ], false  //la animación no se va a reproducir (autoUpdate)
        );
        this.sonicAnim.anchor.set(0.5);
        this.sonicAnim.play();
        this.sonicAnim.animationSpeed = 0.24;
        this.addChild(this.sonicAnim);
    }
    update(_deltaTime: number, deltaFrame: number): void {
        this.sonicAnim.update(deltaFrame);
    }
}