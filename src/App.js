import InputHandler from './InputHandler';
import Invader from './Invader';
import Test from './Test';

var PIXI = require('pixi.js');

const noop = () => {};

export const ROWS = 9;
export const COLUMNS = 9;
export const COLUMN_WIDTH = 32;
export const COLUMN_HEIGHT = 32;
export const BORDER_SIZE = 2;
export const HORIZONTAL_PADDING = COLUMN_WIDTH;
export const VERTICAL_PADDING = COLUMN_HEIGHT;

export class App {

    explosionTimer = 0;
    explosionExpanding = true;

    stage = new PIXI.Container();
    state = { update: this.update.bind(this) };
    renderer = null;
    gameObjects = {};

    canvasWidth = COLUMN_WIDTH * COLUMNS + HORIZONTAL_PADDING * 2;
    canvasHeight = COLUMN_HEIGHT * ROWS + VERTICAL_PADDING * 2;

    init() {
        console.log('Initialized');

        // let invader = new Invader();
        // invader.update();

        // let t = new Test();
        // t.play();

        this.loadAssets()
            .then(() => this.initRenderer())
            .then(() => this.addGameObjectsToStage())
            .then(() => this.gameLoop());
    }

    update() {
        const rocket = this.gameObjects.rocket;
        const explosion = this.gameObjects.explosion;
        const monster = this.gameObjects.monster;

        //Move the cat 1 pixel to the right each frame
        rocket.x -= 2;
        rocket.y -= 2;

        if (rocket.y < 125) {
            rocket.visible = false;

            if (this.explosionTimer == 0) {
                explosion.position.x = rocket.position.x - 35;
                explosion.position.y = rocket.position.y - 35;
                this.stage.addChild(explosion);
            }

            this.explosionTimer += 1;

            if (this.explosionExpanding) {
                if (explosion.scale.x < 1) {
                    explosion.scale.x += 0.1;
                    explosion.scale.y += 0.1;
                    explosion.position.x -= 5;
                    explosion.position.y -= 5;
                } else if (explosion.scale.x >= 1) {
                    monster.visible = false;
                    this.explosionExpanding = false;
                }
            } else if (!this.explosionExpanding) {
                if (explosion.scale.x > 0) {
                    explosion.scale.x -= 0.8;
                    explosion.scale.y -= 0.8;
                    explosion.position.x += 5;
                    explosion.position.y += 5;
                } else if (explosion.scale.x <= 0) {
                    explosion.visible = false;
                }
            }
        }
    }

    gameLoop() {
        // console.log("gameLoop");
        //Loop this function at 60 frames per second
        requestAnimationFrame(this.gameLoop.bind(this));

        //Update the current game state:
        this.state.update();

        //Render the stage to see the animation
        this.renderer.render(this.stage);
    }

    addGameObjectsToStage() {
        return new Promise((resolve, reject) => {
            console.log("addGameObjectsToStage");

            let resources = PIXI.loader.resources,
                TextureCache = PIXI.utils.TextureCache,
                Sprite = PIXI.Sprite;

            let explosion = new Sprite(
                resources['assets/explosion.png'].texture
            );
            explosion.scale.set(.1, .1);

            let monster = new Sprite(
                resources['assets/invader.png'].texture
            );
            monster.x = 96;
            monster.y = 96;
            monster.width = COLUMN_WIDTH;
            monster.height = COLUMN_HEIGHT;
            monster.rotation = 0.3 * -1;
            monster.anchor.set(0.5, 0.5);
            monster.scale.set(2, 2);

            let asteroid = new Sprite(
                resources['assets/asteroid.png'].texture
            );
            asteroid.scale.set(.5, .5);
            asteroid.position.set(200, 150);
            asteroid.rotation = .4 * -1;

            let asteroid2 = new Sprite(
                resources['assets/asteroid2.png'].texture
            );
            asteroid2.scale.set(.75, .75);
            asteroid2.position.set(80, 200);
            // asteroid2.rotation = .4 * -1;

            let tilesetTexture = TextureCache['assets/tileset.png'];
            let rectangle = new PIXI.Rectangle(96, 64, 32, 32);
            tilesetTexture.frame = rectangle;

            let rocket = new Sprite(tilesetTexture);
            rocket.x = this.canvasWidth;
            rocket.y = this.canvasHeight;

            rocket.rotation = 2.3 * -1;
            rocket.anchor.set(0.5, 0.5);

            var message = new PIXI.Text(
                "Hello Ben!", {
                    fontFamily: "Arial",
                    fontSize: "32",
                    fontStyle: "sans-serif",
                    fill: "white"
                }
            );
            message.position.set(25, this.canvasHeight - 50);
            this.stage.addChild(message);

            this.stage.addChild(asteroid);
            this.stage.addChild(asteroid2);
            this.stage.addChild(rocket);
            this.stage.addChild(monster);

            this.gameObjects.asteroid = asteroid;
            this.gameObjects.asteroid2 = asteroid2;
            this.gameObjects.rocket = rocket;
            this.gameObjects.monster = monster;
            this.gameObjects.explosion = explosion;

            resolve();
        });
    }

    initializeInputHandler() {
        return new Promise((resolve, reject) => {
            // var left = keyboard(37),
            // up = keyboard(38),
            // right = keyboard(39),
            // down = keyboard(40);

            let left = InputHandler.addKey(37);
        })
    }

    initRenderer() {
        console.log("initRenderer");
        return new Promise((resolve, reject) => {
            this.renderer = PIXI.autoDetectRenderer(
                this.canvasWidth,
                this.canvasHeight, {
                    antialias: false,
                    transparent: false,
                    resolution: 1
                }
            );

            //Add the canvas to the HTML document
            document.body.appendChild(this.renderer.view);
            resolve();
        });
    }

    loadAssets() {
        console.log("loadAssets");
        return new Promise((resolve, reject) => {
            PIXI.loader
                .add([{
                    url: 'assets/invader.png'
                }, {
                    url: 'assets/tileset.png'
                }, {
                    url: 'assets/asteroid.png'
                }, {
                    url: 'assets/asteroid2.png'
                }, {
                    url: 'assets/explosion.png'
                }])
                .on('progress', (loader, resource) => {
                    console.log("loading: " + resource.url);
                    // console.log("progress: " + loader.progress + "%");
                    // console.log("loading: " + resource.name);
                })
                .load(() => resolve());
        });

    }

}