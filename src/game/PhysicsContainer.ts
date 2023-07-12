import { Container, Point } from "pixi.js";

export class PhysicsContainer extends Container {
    // public speedX: number = 0;
    // public speedY: number = 0;

    public speed:Point = new Point();

    public acceleration:Point = new Point();

    public update(deltaSeconds:number){
        this.x += this.speed.x * deltaSeconds + 1/2 * this.acceleration.x * Math.pow(deltaSeconds,2); //con Math.pow lo elevé al cuadrado (exponente 2)
        this.y += this.speed.y * deltaSeconds + 1/2 * this.acceleration.y * Math.pow(deltaSeconds,2);
        
        this.speed.x += this.acceleration.x * deltaSeconds;
        this.speed.y += this.acceleration.y * deltaSeconds;
        //es lo mismo q: this.speed.y = this.speed.y + this.acceleration.y * deltaSeconds; (con '+=' sumo y guardo en la 1er variable)
    }
}