import { AnimatedSprite, Graphics, ObservablePoint, Rectangle, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { Keyboard } from "../utils/Keyboard";
import { IHitbox } from "./IHitbox";

export class Player2 extends PhysicsContainer implements IHitbox {
        
    private static readonly GRAVITY = 500;
    private static readonly MOVE_SPEED = 100;
    private sonicAnim: AnimatedSprite;
    private hitbox:Graphics;

    public canJump = true;

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
        this.sonicAnim.anchor.set(0.5,0.5);
        this.sonicAnim.play();
        this.sonicAnim.animationSpeed = 0.24;

        // const auxZero = new Graphics(); //(visualizar el eje)
        // auxZero.beginFill(0xFF00FF);
        // auxZero.drawCircle(0,0,4);
        // auxZero.endFill();

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0);
        this.hitbox.drawRect(0,0,45,75);
        this.hitbox.endFill();
        this.hitbox.x = -22.5;
        this.hitbox.y = -35;

        this.addChild(this.sonicAnim);
        // this.addChild(auxZero);
        this.sonicAnim.addChild(this.hitbox); // pego la hitbox a sonicAnim (no al constructor)

        this.acceleration.y = Player2.GRAVITY;

        Keyboard.down.on("ArrowUp", this.jump, this);
    }

    // destruir el evento d salto cuando se destruya el player
    public override destroy(options:any){  // 'destroy' es una función d Pixi
        super.destroy(options);
        Keyboard.down.off("ArrowUp", this.jump);
    }

    public override update(deltaMS:number){
        super.update(deltaMS/1000);  // 'super.update' llama al update d la clase base (el padre)
        this.sonicAnim.update(deltaMS / (1000/60));
    
        // Movimiento der / izq
        if (Keyboard.state.get("ArrowRight")){
            this.speed.x = Player2.MOVE_SPEED;
            this.sonicAnim.scale.x = 1;
        } else if (Keyboard.state.get("ArrowLeft")){
            this.speed.x = -Player2.MOVE_SPEED;
            this.sonicAnim.scale.x = -1;
        } else {
            this.speed.x = 0;
        }

        // // Moverse arriba/abajo
        // if (Keyboard.state.get("ArrowDown")){
        //     this.speed.y = Player.MOVE_SPEED;
        // } else if (Keyboard.state.get("ArrowUp")){
        //     this.speed.y = -Player.MOVE_SPEED;
        // } else {
        //     this.speed.y = 0;
        // }

        // // Salto (una opción)
        // if (Keyboard.state.get("ArrowUp")){
        //     this.jump();
        // }
    }

    private jump(){   // Salto!
        if (this.canJump){
            this.canJump = false;
            this.speed.y = -300;
        }
    }

    public getHitbox():Rectangle {
        return this.hitbox.getBounds()
    }

    public separate(overlap: Rectangle, plat: ObservablePoint<any>){
        if (overlap.width < overlap.height){
            if (this.x > plat.x){
                this.x += overlap.width;  //expulsar hacia la derecha (+=)
            } else if (this.x < plat.x){
                this.x -= overlap.width;  //expulsar hacia la izquierda (-=)
            }
        } else {
            if (this.y > plat.y){
                this.y += overlap.height;  //expulsar hacia abajo (+=)
                this.speed.y = 0;
            } else if (this.y < plat.y){
                this.y -= overlap.height;  //expulsar hacia arriba (-=)
                this.speed.y = 0;
                this.canJump = true;
            }
        }
    }
}