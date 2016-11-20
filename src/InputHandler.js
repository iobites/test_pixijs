export default class InputHandler {

    static keys = {};

    static init() {
        //Attach event listeners
        window.addEventListener(
            "keydown", InputHandler.keyDownHandler, false
        );
        window.addEventListener(
            "keyup", InputHandler.keyUpHandler, false
        );
    }

    static keyDownHandler = function(event) {
        // if (event.keyCode === key.code) {
        //     if (key.isUp && key.press) key.press();
        //     key.isDown = true;
        //     key.isUp = false;
        // }
        console.log('keyDownHandler: ', event.keyCode);
        event.preventDefault();
    };

    static keyUpHandler = function(event) {
        // if (event.keyCode === key.code) {
        //     if (key.isDown && key.release) key.release();
        //     key.isDown = false;
        //     key.isUp = true;
        // }
        console.log('keyUpHandler: ', event.keyCode);
        event.preventDefault();
    };

    static addKey(keyCode) {
        let key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;

        // key.downHandler = function(event) {
        //     if (event.keyCode === key.code) {
        //         if (key.isUp && key.press) key.press();
        //         key.isDown = true;
        //         key.isUp = false;
        //     }
        //     event.preventDefault();
        // };

        // key.upHandler = function(event) {
        //     if (event.keyCode === key.code) {
        //         if (key.isDown && key.release) key.release();
        //         key.isDown = false;
        //         key.isUp = true;
        //     }
        //     event.preventDefault();
        // };

        //Attach event listeners
        // window.addEventListener(
        //     "keydown", key.downHandler.bind(key), false
        // );
        // window.addEventListener(
        //     "keyup", key.upHandler.bind(key), false
        // );

        InputHandler.keys[Symbol(keyCode)] = key;

        return key;
    }

    static removeKey(keyCode) {
        if (InputHandler.keys[Symbol(keyCode)]) {
            delete InputHandler.keys[Symbol(keyCode)];
        }
    }

    static getKey(keyCode) {
        let key;
        if (InputHandler.keys[Symbol(keyCode)]) {
            return InputHandler.keys[Symbol(keyCode)];
        }
        return key;
    }

}