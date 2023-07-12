import { AnimatedSprite, Container, Texture } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { PhysicsContainer } from "../game/PhysicsContainer";
import { HEIGHT, WIDTH } from "..";

export class TickerScene extends Container implements IUpdateable {
    
    private sonicAnim: AnimatedSprite;
    private physSonic: PhysicsContainer;

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
        this.sonicAnim.anchor.set(0.5,1);
        this.sonicAnim.play();
        this.sonicAnim.animationSpeed = 0.24;
        
        this.physSonic = new PhysicsContainer();
        this.physSonic.speed.x = 270;
        this.physSonic.speed.y = 0;
        this.physSonic.acceleration.y = 1200;

        // this.physSonic.x = WIDTH / 2;
        // this.physSonic.y = HEIGHT / 2;

        this.addChild(this.physSonic);

        // const auxZero = new Graphics(); //(visualizar el eje)
        // auxZero.beginFill(0xFF00FF);
        // auxZero.drawCircle(0,0,5);
        // auxZero.endFill();

        this.physSonic.addChild(this.sonicAnim);
        // this.physSonic.addChild(auxZero);
    }

    update(deltaTime: number, deltaFrame: number): void {
        this.sonicAnim.update(deltaFrame);
        const dt = deltaTime / 1000;
        // this.sonicAnim.x += this.speed * dt; //x más q se lagee/tenga otro monitor/etc, el objeto va a mantener la velocidad lo más constante posible, sin importar los fps
        this.physSonic.update(dt);

        if (this.physSonic.x > WIDTH){
            // this.physSonic.x = WIDTH;
            this.physSonic.speed.x = Math.abs(this.physSonic.speed.x) * -1; //abs me da el valor absoluto (siempre en positivo)
            this.physSonic.scale.x = -1;

            // this.sonicAnim.tint = 0xFF00FF;

        } else if (this.physSonic.x < 0){
            // this.physSonic.x = 0;
            this.physSonic.speed.x = Math.abs(this.physSonic.speed.x);
            this.physSonic.scale.x = 1;

            // this.sonicAnim.tint = 0xFF0000;
        }

        if (this.physSonic.y > HEIGHT){
            this.physSonic.y = HEIGHT;
            this.physSonic.speed.y = -655; //q rebote cuando toca el final d la pantalla!
        
            // this.sonicAnim.tint = 0x00FF00;
        }

        //Otra forma d hacer q cambie la dirección del objeto (chequeando la velocidad horizontal)
        // if (this.physSonic.speed.x > 0){
        // this.physSonic.scale.x = 1;
        // } else if (this.physSonic.speed.x < 0){
        //     this.physSonic.scale.x = -1;
        // }

        console.log(this.physSonic.speed.y, Math.round(this.physSonic.y));
    }
    
}