import { utils } from "pixi.js";

export class Keyboard {  //Clase "estática": nunca la instanciamos (new), sólo leemos sus propiedades
    public static readonly state: Map<string, boolean> = new Map();
    
    // Event Emitter!
    //(utilidad q Pixi usa pero q no es originaria, x eso 'utils.')
    public static readonly down: utils.EventEmitter = new utils.EventEmitter();

    public static readonly up: utils.EventEmitter = new utils.EventEmitter();

    private constructor(){}  //"prohibimos" llamarla desde afuera con 'new' al hacer q el constructor sea privado (preventivamente)

    private static initialized:boolean = false;
    public static initialize():void{

        if (Keyboard.initialized){
            return;
        }

        Keyboard.initialized = true;  //para las estáticas hay q usar el nombre d la clase para accesarlas (en lugar d 'this')
        document.addEventListener("keydown", Keyboard.onKeyDown);
        document.addEventListener("keyup", Keyboard.onKeyUp);
    }

    private static onKeyDown(e:KeyboardEvent){
        if (Keyboard.state.get(e.code) != true){  //para q dispare el evento sólo una vez
            Keyboard.down.emit(e.code);  //llamando al Emitter
        }
        Keyboard.state.set(e.code,true);
    }
    private static onKeyUp(e:KeyboardEvent){
        Keyboard.up.emit(e.code);
        Keyboard.state.set(e.code,false);
    }

}