function Particle(baseX, baseY, angle, radius, color){

    this.baseX = baseX;
    this.baseY = baseY;
    this.angle = angle;
    this.radius = radius;
    this.amplitudeBase = 0;
    this.color = color;


    this.noise = simplex.noise2D(Math.cos(this.angle), Math.sin(this.angle)) * this.amplitudeBase;

    this.x = this.baseX;

    this.y = this.baseY + this.noise ;
}


Particle.prototype = {

    render : function() {
        ctx.beginPath();
        ctx.save();

        ctx.fillStyle = this.color;

        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        ctx.fill();

        ctx.restore();
        ctx.closePath();

    },


    update : function (everageNumber) {

       time += speed / nbLine;

        this.noise = simplex.noise2D(Math.cos(this.angle) + ( time + everageNumber / 150 ), Math.sin(this.angle) + (time + everageNumber / 150 )) * (this.amplitudeBase + (everageNumber * amplitudeMult));

        this.x = this.baseX;
        this.y = this.baseY + this.noise ;

    }

};