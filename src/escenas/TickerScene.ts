import { Container, Texture, TilingSprite } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { HEIGHT, WIDTH } from "..";
import { Player } from "../game/Player";
import { Platform } from "../game/Platform";
import { checkCollision } from "../game/IHitbox";

export class TickerScene extends Container implements IUpdateable {
    private p1: Player;
    private plats: Platform[];
    // private colisiones1: IHitbox[];  //si quiero otros colliders q no sean plataformas
    private world:Container;
    private bg: TilingSprite;
    private suelo: TilingSprite;

    constructor(){
        super();

        this.world = new Container();

        this.bg = new TilingSprite(Texture.from("Fondo1"), WIDTH, HEIGHT); // << ancho/alto TEXTURA TilingSprite
        this.addChild(this.bg);
        // this.background.width = 640; // << ancho/alto TilingSprite
        // this.background.height = 480;

        this.suelo = new TilingSprite(Texture.from("Suelo1"), WIDTH, HEIGHT);
        this.addChild(this.suelo);

        this.plats = []; //this.plats = new Array;
        
        let plat = new Platform(); plat.position.set(150,340);
        this.world.addChild(plat); this.plats.push(plat);
        
        plat = new Platform(); plat.position.set(330,280);
        this.world.addChild(plat); this.plats.push(plat);
        
        plat = new Platform(); plat.position.set(490,320);
        this.world.addChild(plat); this.plats.push(plat);

        // Player
        this.p1 = new Player();
        // this.player1.x = 40;
        // this.player1.y = 80;
        this.addChild(this.p1);

        this.addChild(this.world);
    }

    // Update
    public update(deltaTime: number, _deltaFrame: number): void {
        this.p1.update(deltaTime);  // update animación
        for (let plat of this.plats){
            const overlap = checkCollision(this.p1, plat);
            if (overlap != null){
                this.p1.separate(overlap, plat.position);
            }
        }

        // límite bordes laterales
        if (this.p1.x > WIDTH){
            this.p1.x = WIDTH;
        } else if (this.p1.x < 0){
            this.p1.x = 0;
        }

        // límite borde inferior
        if (this.p1.y > HEIGHT-128){
            this.p1.y = HEIGHT - 128;
            this.p1.speed.y = 0;
            this.p1.canJump = true;
        }

        // console.log(this.p1.speed.y, Math.round(this.p1.y));

        this.world.x = -this.p1.x * this.worldTransform.a + WIDTH / 4; // worldTransform: transformación GLOBAL d un objeto, en forma de matriz (la escala en X está en A, y la escala en Y está en D)
        this.bg.tilePosition.x = this.world.x * 0.3; // tilePosition: dónde empieza la textura q está en el tilingSprite
        
        // this.world.y = -this.player1.y * this.worldTransform.d + HEIGHT / 2;
        // this.background.tilePosition.y = this.world.y * 0.5;
    
        this.suelo.tilePosition.x = this.world.x;
    }
    

}