import { Rectangle } from "pixi.js";

export interface IHitbox {
    getHitbox():Rectangle;
}

export function checkCollision(objA:IHitbox, objB:IHitbox): Rectangle | null {
    const rA = objA.getHitbox();  // "r" de rectángulo
    const rB = objB.getHitbox();

    // un TERNARIO es como hacer un 'if' pero sin valores, sólo ejecuciones
    // condición booleana ? qué significa si devuelve true : qué significa si devuelve false
    const rightmostLeft = rA.left < rB.left ? rB.left : rA.left;
    const leftmostRight = rA.right > rB.right ? rB.right : rA.right;

    const bottommostTop = rA.top < rB.top ? rB.top : rA.top;
    const topmostBottom = rA.bottom > rB.bottom ? rB.bottom : rA.bottom;

    const makesSenseHor = rightmostLeft < leftmostRight;
    const makesSenseVer = bottommostTop < topmostBottom;
    
    if (makesSenseHor && makesSenseVer){
        const retval = new Rectangle();  //averiguo el área (rectángulo) de intersección
        retval.x = rightmostLeft;
        retval.y = bottommostTop;
        retval.width = leftmostRight - rightmostLeft;
        retval.height = topmostBottom - bottommostTop;
        return retval;
    } else {
        return null;
    }
}