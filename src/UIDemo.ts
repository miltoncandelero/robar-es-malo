import { Container, Sprite, Texture, Text } from "pixi.js";
import { Button } from "./ui/Button";
import { Keyboard } from "./utils/Keyboard";

export class UIDemo extends Container {
    private buttonMouse:Button;
    private lastKeyPressed:Text;
    constructor() {
        super();
        const dialog = new Container();
        dialog.x = 320;
        dialog.y = 240;

        const background = Sprite.from("Mark");
        background.anchor.set(0.5);
        background.scale.set(2);
        dialog.addChild(background);

        // sólo para mouse
        this.buttonMouse = new Button(
            Texture.from("Button1"),
            Texture.from("Button1Over"),
            Texture.from("Button1Down"),
            this.onButtonClick.bind(this)
        );
        this.buttonMouse.scale.set(0.2);
        // buttonMouse.x = background.width / 2 - buttonMouse.width * 0.6;
        // buttonMouse.y = buttonMouse.height + 20;
        this.buttonMouse.y = -60;
        dialog.addChild(this.buttonMouse);

        // sólo para touch
        const buttonTouch = Sprite.from("Button2");
        buttonTouch.anchor.set(0.5);
        buttonTouch.scale.set(0.2);
        buttonTouch.on("touchstart", this.onTouchStart, this);
        buttonTouch.on("touchend", this.onTouchEnd, this);
        buttonTouch.interactive = true;
        dialog.addChild(buttonTouch);

        //'pointer' es para todos los tipos d entrada (incluso lápices digitales, etc)
        const buttonPointer = Sprite.from("Button3");
        buttonPointer.anchor.set(0.5);
        buttonPointer.scale.set(0.2);
        buttonPointer.y = 60;
        buttonPointer.on("pointerdown", this.onPointerDown, this);
        buttonPointer.on("pointerup", this.onPointerUp, this);
        buttonPointer.interactive = true;
        dialog.addChild(buttonPointer);

        this.lastKeyPressed = new Text("Waiting...", {fontSize: 38});
        this.lastKeyPressed.anchor.set(0.5);
        this.lastKeyPressed.y = 172;
        dialog.addChild(this.lastKeyPressed);

        // document.addEventListener("keydown", this.onKeyDown.bind(this));
        // document.addEventListener("keyup", this.onKeyUp.bind(this));

        this.addChild(dialog);

        Keyboard.down.on("KeyB", this.onKeyB, this);
        Keyboard.up.on("KeyB", this.onKeyBUp, this);

    }

    //Mouse / touch
    private onButtonClick():void{
        console.log("New button clicked!", this);  // Keyboard.state.get("KeyA")
    }
    private onTouchStart():void {
        console.log("touch down!");
    }
    private onTouchEnd():void {
        console.log("touch up!");
    }
    private onPointerDown():void {
        console.log("pointer down!");
    }
    private onPointerUp():void {
        console.log("pointer up!");
    }

    //Teclado
    // private onKeyDown(e:KeyboardEvent):void { //'e' es d "event"
    //     console.log("key pressed!",e.code); //código d la tecla q apretó el usuario
    //     this.lastKeyPressed.text = e.code;
    //     // if (e.code == "KeyA"){   //Esto sería una forma d programar las acciones (poco óptima y engorrosa)
    //     //     console.log("apretamos la A!");
    //     // }
    // }
    // private onKeyUp(e:KeyboardEvent):void {
    //     console.log("key released!", e.code);
    // }

    private onKeyB():void {
        console.log("apreté la B", this);
    }
    private onKeyBUp():void {
        console.log("solté la B", this);
    }

}