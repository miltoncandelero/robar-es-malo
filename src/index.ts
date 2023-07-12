import { Application, Loader, Ticker } from 'pixi.js'
import { assets } from './assets';
import { Keyboard } from './utils/Keyboard';
import { TickerScene } from './escenas/TickerScene';

export const WIDTH = 640;
export const HEIGHT = 480;

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
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
	const myScene = new TickerScene();
	// myScene.x = WIDTH /2;
	// myScene.y = HEIGHT /2;
	app.stage.addChild(myScene);

	Ticker.shared.add(function(deltaFrame){
		myScene.update(Ticker.shared.deltaMS, deltaFrame);
	});
});

Loader.shared.load();