function Line(nbParticle, baseY, color, angleStart) {
    this.nbParticle = nbParticle;
    this.baseY = baseY;
    this.color = color;
    this.particles = [];
    this.gapXParticle = 0,
    this.angleStart = angleStart;

    this.DELTA_TIME = 0;
    this.LAST_TIME = Date.now();
}

Line.prototype = {

    createPoints : function () {

        let angle = this.angleStart;
        console.log(angle);
        for (let i = 0; i < this.nbParticle + 1; i++ ) {
            angle+= 0.1;
            let particle = new Particle(this.gapXParticle, this.baseY, angle, 0, this.color);
            this.particles.push(particle);
            this.gapXParticle += (canvasWidth / nbParticle );
        }
    },

    linesBetweenPoints : function() {

        ctx.beginPath();
        ctx.save();

        ctx.strokeStyle = this.color;

        for (let i = 0; i < this.particles.length - 1 ; i++) {
            ctx.moveTo(this.particles[i].x, this.particles[i].y);
            ctx.lineTo(this.particles[i+1].x, this.particles[i+1].y)
        }

        ctx.lineWidth = 1;

        ctx.stroke();
        ctx.restore();
        ctx.closePath();
    },

    render : function (everageNumber) {


        //Render and update particles
        for (let i = 0; i < this.nbParticle + 1; i++ ) {
            let particle = this.particles[i];


            particle.update(everageNumber);

            particle.render();
        }

        this.linesBetweenPoints();

    },

};