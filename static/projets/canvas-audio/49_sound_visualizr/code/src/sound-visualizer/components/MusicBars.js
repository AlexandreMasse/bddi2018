let SimplexNoise = require('simplex-noise');

class MusicBars {

    constructor(analyser, frequencyData, options = {}) {
        this.defaults = {
            fillStyle: 'violet',
            strokeStyle: 'violet',
            width: 10,
            margin: 2,
            bars: 256
        };
        this.simplex = new SimplexNoise();
        this.analyser = analyser;
        this.frequencyData = frequencyData;
        this.options = Object.assign({}, this.defaults, options);
    }

    draw() {
        this.canvasWidth = innerWidth;
        this.canvasHeight = innerHeight;
        this.analyser.getByteFrequencyData(this.frequencyData);
        this.frequencyData = this.frequencyData.slice(0, Math.floor(1024 - 1) * 0.6);
        window.ctx.strokeStyle = this.options.strokeStyle;
        window.ctx.fillStyle = this.options.strokeStyle;
        window.ctx.lineWidth = this.options.width;
        window.ctx.beginPath();
        for (let i = 0; i < this.options.bars; i++) {
            let radian = Math.PI * 2 / this.options.bars;
            let percentIdx = i / this.options.bars;
            let frequencyIdx = Math.floor(this.frequencyData.length * percentIdx);
            let centerX = this.canvasWidth / 2;
            let centerY = this.canvasHeight / 2;
            let x = centerX + Math.cos(radian * i) * (50 + this.frequencyData[frequencyIdx] * 2);
            let y = centerY + Math.sin(radian * i) * (50 + this.frequencyData[frequencyIdx] * 2);
            window.ctx.moveTo(centerX, centerY);
            window.ctx.lineTo(x, y);

        }
        window.ctx.stroke();
        window.ctx.closePath();

    }

    update() {

    }

}

export default MusicBars;
