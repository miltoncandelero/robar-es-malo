import { Container } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { HEIGHT, WIDTH } from "..";
import { Player } from "../game/Player";
import { Platform } from "../game/Platform";
import { checkCollision } from "../game/IHitbox";

export class TickerScene extends Container implements IUpdateable {
    
    private player1: Player;  // Player(); ?
    // private plat1: Platform; // *
    private plats: Platform[];
    // private colisiones1: IHitbox[];  //si quiero otros colliders q no sean plataformas

    constructor(){
        super();

        // const bg = Sprite.from("Fondo1");
        // this.addChild(bg);

        //1) una forma sería crear cada plataforma como una privada
        // this.plat1 = new Platform;
        // plat1.position.set(320,440);
        // this.addChild(this.plat1);
        
        //3) lo óptimo es hacer un array d objetos 'Platform'
        this.plats = []; //this.plats = new Array;
        
        //2) otra, como variables locales, dentro del constructor
        const plat1 = new Platform;
        plat1.position.set(150,430);
        this.addChild(plat1);
        this.plats.push(plat1);
        
        const plat2 = new Platform;
        plat2.position.set(330,370);
        this.addChild(plat2);
        this.plats.push(plat2);
        
        const plat3 = new Platform;
        plat3.position.set(490,340);
        this.addChild(plat3);
        this.plats.push(plat3);

        this.player1 = new Player;
        this.addChild(this.player1);
    }

    public update(deltaTime: number, _deltaFrame: number): void {
        this.player1.update(deltaTime);  // update animation
        
        for (let plat of this.plats){
            const overlap = checkCollision(this.player1, plat);
            if (overlap != null){
                this.player1.separate(overlap, plat.position);
            }
        }

        // Límite player bordes laterales
        if (this.player1.x > WIDTH){
            this.player1.x = WIDTH;
        } else if (this.player1.x < 0){
            this.player1.x = 0;
        }

        // Límite player borde inferior
        if (this.player1.y > HEIGHT-40){
            this.player1.y = HEIGHT - 40;
            this.player1.speed.y = 0;
            this.player1.canJump = true;
        }

        console.log(this.player1.speed.y, Math.round(this.player1.y));
    }
    
}