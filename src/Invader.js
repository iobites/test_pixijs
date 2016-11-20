import GameObject from './GameObject';

export default class Invader extends GameObject {

    update() {
        console.log('velocity', this.velocity);
    }

}