import { Application, Loader, SCALE_MODES, settings } from 'pixi.js'
import { assets } from './assets';
import { Keyboard } from './utils/Keyboard';
// import { TickerScene } from './escenas/TickerScene';
import { SoundScene } from './escenas/SoundScene';
// import { TickerScene2 } from './escenas/TickerScene(Clase8-2)';

export const WIDTH = 640;
export const HEIGHT = 480;

//escalar pixels sin aaliasing / blur
settings.ROUND_PIXELS = true;  //(redondear x las dudas)
settings.SCALE_MODE = SCALE_MODES.LINEAR;  // Pixi 6
// BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;  // Pixi 7

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0xffde7a,
	width: WIDTH,
	height: HEIGHT
});


Keyboard.initialize();


// adaptar tamaño lienzo a ventana
window.addEventListener("resize", ()=>{
	
	const scaleX = window.innerWidth / app.screen.width;
	const scaleY = window.innerHeight / app.screen.height;
	const scale = Math.min(scaleX,scaleY);

	const gameWidth = Math.round(app.screen.width * scale);
	const gameHeight = Math.round(app.screen.height * scale);
	
	const marginHorizontal = Math.floor((window.innerWidth - gameWidth) / 2);
	const marginVertical = Math.floor((window.innerHeight - gameHeight) / 2);

	app.view.style.width = gameWidth + "px";
	app.view.style.height = gameHeight + "px";

	app.view.style.marginLeft = marginHorizontal + "px"; //marginHorizontal.toString()  para convertir a string
	app.view.style.marginTop = marginVertical + "px";
});
window.dispatchEvent(new Event("resize"));


Loader.shared.add(assets);

Loader.shared.onComplete.add(()=>{
	const myScene = new SoundScene();
	// myScene.x = WIDTH / 2;
	// myScene.y = HEIGHT / 2;
	app.stage.addChild(myScene);

	// Ticker.shared.add(function(deltaFrame){
	// 	myScene.update(Ticker.shared.deltaMS, deltaFrame);
	// });
});

Loader.shared.load();