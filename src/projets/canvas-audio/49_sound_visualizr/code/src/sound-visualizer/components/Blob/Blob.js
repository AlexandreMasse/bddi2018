import Point from "./Point";

let SimplexNoise = require('simplex-noise');

class Blob {

    constructor(analyser, frequencyData, precision, radius, options) {
        this.defaults = {
            fillStyle: 'red',
            strokeStyle: 'blue',
            width: 10
        };
        this.time = 0;
        this.precision = precision;
        this.analyser = analyser;
        this.frequencyData = frequencyData;
        this.radius = radius;
        this.options = Object.assign({}, this.defaults, options);
        this.step = Math.PI * 2 / this.precision;
        this.simplex = new SimplexNoise();
        this.points = [];
        for (let i = 0; i < this.precision; i++) {
            this.points.push(new Point(
                this.radius, i, this.step * i
            ));
        }
    }

    update() {
        let cumul = 0;
        this.analyser.getByteFrequencyData(this.frequencyData);
        this.frequencyData.forEach(frequency => {
            cumul += frequency;
        });
        let average = cumul / this.frequencyData.length;
        this.time += 0.00025;
        this.points.forEach(point => {
            point.update(this.time + (average / 128));
        });
        this.options.width = Math.abs(average / 4) + 10;
    }

    draw() {
        this.drawLines();
    }


    drawLines() {
        window.ctx.beginPath();
        window.ctx.lineWidth = this.options.width;
        window.ctx.moveTo(this.points[0].position[0], this.points[0].position[1]);
        let i = 1;
        for (i = 1; i < this.points.length - 2; i ++)
        {
            let xc = (this.points[i].position[0] + this.points[i + 1].position[0]) / 2;
            let yc = (this.points[i].position[1] + this.points[i + 1].position[1]) / 2;
            window.ctx.quadraticCurveTo(this.points[i].position[0], this.points[i].position[1], xc, yc);
        }
        let xc = (this.points[i].position[0] + this.points[i + 1].position[0]) / 2;
        let yc = (this.points[i].position[1] + this.points[i + 1].position[1]) / 2;
        window.ctx.quadraticCurveTo(this.points[i].position[0], this.points[i].position[1], xc, yc);
        window.ctx.fillStyle = this.options.fillStyle;
        window.ctx.fill();
        window.ctx.closePath();
        window.ctx.strokeStyle = this.options.strokeStyle;
        window.ctx.stroke();
    }

}

export default Blob;
