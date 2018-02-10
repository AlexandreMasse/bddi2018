 var Shape = function(opts) {
  this.position = vec2.fromValues(opts.x, opts.y)
  this.points = opts;
  this.globalAlpha = opts.globalAlpha;
  this.color = opts.color;
  this.ctx = opts.ctx;
  this.baseAngle = opts.baseAngle;
  this.angleRandom = opts.angleRandom;
  this.offsetAngle = opts.offsetAngle;
  this.randomRadius = opts.randomRadius;
  this.canvas = opts.canvas;
  this.beatAngleDiviser = opts.beatAngleDiviser;
  this.rotationMultiplier = opts.rotationMultiplier;
  this.direction = opts.direction;
  this.maxRadius = opts.maxRadius;
  this.radiusOffset = 0;
}

Shape.prototype = {
  drawBigTriangle: function(beatAngle, rotation, radiusOffset) {
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.globalAlpha = this.globalAlpha;
    this.ctx.translate(this.canvas.width/2, this.canvas.height/2);
    this.ctx.rotate(rotation);
    this.ctx.moveTo( Math.cos(this.baseAngle+this.angleRandom)*(this.maxRadius+radiusOffset), Math.sin(this.baseAngle+this.angleRandom)*(this.maxRadius+radiusOffset))
    this.ctx.lineTo( this.points.p2x, this.points.p2y )
    this.ctx.lineTo( Math.cos(this.baseAngle+this.angleRandom+this.offsetAngle+beatAngle)*this.randomRadius, Math.sin(this.baseAngle+this.angleRandom+this.offsetAngle+beatAngle)*this.randomRadius )
    this.ctx.lineTo( this.points.p1x, this.points.p1y)
    this.ctx.fillStyle = '#'+this.color
    this.ctx.strokeStyle = 'white'
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.stroke()
    this.ctx.restore()

    this.radiusOffset = radiusOffset;
  }
}