let SimplexNoise = require('simplex-noise');

class Point {

    constructor(blobRadius, rank, angle, options) {
        this.defaults = {
            fillStyle: 'red',
            strokeStyle: 'red',
        };
        this.amplitude = 50;
        this.position = [];
        this.angle = angle;
        this.baseRadius = blobRadius;
        this.radius = blobRadius;
        this.trigo = [];
        this.simplex = new SimplexNoise();
        this.options = Object.assign({}, this.defaults, options);
        this.calcPosition();
    }

    update(time) {
        this.radius = this.simplex.noise2D(this.trigo[0] + time, this.trigo[1] + time) * this.amplitude + this.baseRadius;
        this.calcPosition();
    }

    calcPosition() {
        this.trigo = [
            Math.cos(this.angle),
            Math.sin(this.angle)
        ];
        this.position[0] = this.radius * this.trigo[0] + window.canvas.width/2;
        this.position[1] = this.radius * this.trigo[1] + window.canvas.height/2;
    }

}

export default Point;
