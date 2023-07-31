import { Container, Texture } from "pixi.js";
import { sound } from "@pixi/sound";
import { IUpdateable } from "../utils/IUpdateable";
import { Button } from "../ui/Button";

export class SoundScene extends Container implements IUpdateable {
    constructor(){
        super();

        // sound.play("Sword Sound");

        // const sndSword = sound.find("Sword Sound");  // 'find' busca en la librería d @pixi/sound
        // // sndSword.volume = 0.2;
        // sndSword.play({volume:0.2}); //bajar volumen sólo a esta instancia

        const allCont = new Container();
        this.addChild(allCont);
        // allCont.scale.set(3);

        const btnSword = new Button(Texture.from("Button Sword"), this.swordSound);
        btnSword.scale.set(0.7);
        btnSword.position.set(200,200);
        // btnSword.on(Button.CLICKED_EVENT, this.swordSound, this);
        allCont.addChild(btnSword);

        const btnVolumeUp = new Button(Texture.from("Button Plus"), this.volumeUp);
        btnVolumeUp.position.set(320,150);
        // btnVolumeUp.on(Button.CLICKED_EVENT, this.volumeUp, this);
        allCont.addChild(btnVolumeUp);

        const btnVolumeDown = new Button(Texture.from("Button Minus"), this.volumeDown);
        btnVolumeDown.position.set(320,250);
        // btnVolumeDown.on(Button.CLICKED_EVENT, this.volumeDown, this);
        allCont.addChild(btnVolumeDown);

        // // (crea un ToggleButton.ts en la carpeta ui)
        // const toggleMute = new ToggleButton(Texture.from("Toggle On"), Texture.from("Toggle Off"));
        const togMute = new Button(Texture.from("Toggle On"), this.toggleMute);
        togMute.position.set(415,200);
        // toggleMute.on(ToggleButton.TOGGLE_EVENT, this.toggleMute, this);
        allCont.addChild(togMute);
    }

    
    public toggleMute(_mute:boolean){  // (_mute:boolean) / (unmute:boolean)
        sound.toggleMuteAll();  // (si tengo un botón d toggle)
        console.log("Volumen:", sound.volumeAll);

        // if (unmute){  //(botón común)
        //     // togMute.Texture.from("Toggle On");
        //     sound.unmuteAll();
        // } else {
        //     sound.muteAll();
        // }
    }
    
    public volumeUp(){
        sound.volumeAll += 0.2;  // volumeAll modifica el volumen d TODO el juego
        console.log("Volumen:", sound.volumeAll);
    }
    
    public volumeDown(){  // if (volume < 0) volume =0  // volume = Math.max(volume, 0)
        sound.volumeAll -= 0.2;
        console.log("Volumen:", sound.volumeAll);
    }
    
    public swordSound(){
        sound.play("Sword Sound", {loop:true});
    }
    
    public update(deltaTime: number, _deltaFrame: number): void {
        this.update(deltaTime, _deltaFrame);
    }

}
