class SubCircle {

    get frequencyIntensity() {
        return this.average;
    }

    get canvasOpacity() {
        return this.intensity / 75;
    }

    constructor(analyser, frequencyData, options = {}) {
        this.defaults = {
            fillStyle: 'wite',
            strokeStyle: 'white',
        };
        this.time = 0;
        this.average = 0;
        this.intensity = 0;
        this.analyser = analyser;
        this.frequencyData = frequencyData;
        this.options = Object.assign({}, this.defaults, options);
    }

    update() {
        this.time += 0.1;
        let cumul = 0;
        this.analyser.getByteFrequencyData(this.frequencyData);
        this.frequencyData.forEach(frequency => {
            cumul += frequency;
        });
        this.average = cumul / this.frequencyData.length;
        let radius = 0;
        if(this.average < 15) {
            radius = this.average * 20;
        } else if(this.average < 20) {
            radius = this.average * 15;
        } else if(this.average < 30) {
            radius = this.average * 12;
        } else {
            radius = this.average * 10;
        }
        this.intensity = this.average;
        window.ctx.fillStyle = "rgba(255,255,255, " + this.canvasOpacity + ")";
        window.ctx.fillRect(0, 0, window.canvas.width, window.canvas.height);
        window.ctx.beginPath();
        window.ctx.fillStyle = this.options.fillStyle;
        window.ctx.arc(window.canvas.width / 2, window.canvas.height / 2, radius + 2, 0, Math.PI * 2, false);
        window.ctx.fill();

    }




    draw() {

    }



}

export default SubCircle;
