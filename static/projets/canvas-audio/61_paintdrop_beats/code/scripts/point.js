function Point (coords, angle, height, amplitude) {

    this.coords       = coords;       //Y & x coordinates where to start
    this.angle        = angle;
    this.height       = height;       //Y where to go
    this.amplitude    = amplitude;
    this.time         = 0;
    this.noise        =  simplex.noise2D(Math.cos(this.angle), Math.sin(this.angle)) * this.amplitude;
    this.x            = this.coords.x,
    this.y            = this.coords.y + this.height + this.noise;

    this.firstY       = this.y;

}

Point.prototype = {
    render : function() {
        ctx.beginPath();
        ctx.save();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.restore();
        ctx.closePath();
    },

    update : function(variation, time) {
        this.variation  = variation;
        this.time       = time;
        this.noise      = simplex.noise2D(Math.cos(this.angle * this.time), Math.sin(this.angle * this.time)) * (this.variation * 1.4);
        this.y          = this.firstY +  (this.noise * this.amplitude);
    }
}
