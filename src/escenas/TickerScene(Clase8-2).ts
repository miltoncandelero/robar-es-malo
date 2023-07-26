import { Container, Texture, TilingSprite } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { HEIGHT, WIDTH } from "..";
import { checkCollision } from "../game/IHitbox";
import { Player2 } from "../game/Player2";
import { Platform2 } from "../game/Platform2";

export class TickerScene2 extends Container implements IUpdateable {
    
    private player2: Player2;
    private plats: Platform2[];

    private world:Container;
    private background: TilingSprite;
    private suelo: TilingSprite;

    private gameSpeed:number = 300;

    constructor(){
        super();

        this.world = new Container();

        this.background = new TilingSprite(Texture.from("Fondo1"), WIDTH, HEIGHT);
        this.addChild(this.background);

        this.suelo = new TilingSprite(Texture.from("Suelo1"), WIDTH, HEIGHT);
        this.addChild(this.suelo);

        this.plats = []; //this.plats = new Array;
        
        let plat = new Platform2();
        plat.position.set(150,340);
        this.world.addChild(plat);
        this.plats.push(plat);
        
        plat = new Platform2();
        plat.position.set(330,280);
        this.world.addChild(plat);
        this.plats.push(plat);
        
        // plat = new Platform();
        // plat.position.set(490,250);
        // this.world.addChild(plat);
        // this.plats.push(plat);

        plat = new Platform2();
        plat.position.set(490,320);
        this.world.addChild(plat);
        this.plats.push(plat);

        this.player2 = new Player2();
        this.player2.x = 80;
        this.player2.y = 240;
        this.addChild(this.player2);

        this.addChild(this.world);
    }

    public update(deltaTime: number, _deltaFrame: number): void {
        this.player2.update(deltaTime);  // update animation
        
        for (let plat of this.plats){

            plat.speed.x = -this.gameSpeed;
            plat.update(deltaTime/1000);

            const overlap = checkCollision(this.player2, plat);
            if (overlap != null){
                this.player2.separate(overlap, plat.position);
            }
        }

        // Límite player bordes laterales
        // if (this.player2.x > WIDTH){
        //     this.player2.x = WIDTH;
        // } else if (this.player2.x < 0){
        //     this.player2.x = 0;
        // }

        // Límite player borde inferior
        if (this.player2.y > HEIGHT-128){
            this.player2.y = HEIGHT - 128;
            this.player2.speed.y = 0;
            this.player2.canJump = true;
        }

        // this.world.x = -this.player2.x * this.worldTransform.a + WIDTH / 4; // worldTransform: transformación GLOBAL d un objeto, en forma de matriz (la escala en X está en A, y la escala en Y está en D)
        this.background.tilePosition.x -= this.gameSpeed * deltaTime/1000; // tilePosition: dónde empieza la textura q está en el tilingSprite
        
        // this.world.y = -this.player2.y * this.worldTransform.d + HEIGHT / 2;
        // this.background.tilePosition.y = this.world.y * 0.5;
    
        this.suelo.tilePosition.x = this.background.tilePosition.x/2;
    }
}