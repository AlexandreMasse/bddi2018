var Forestation = function (radius, color, alpha, weight) {
  this.radius = radius
  this.color = color
  this.alpha = alpha
  this.weight = weight
}

Forestation.prototype = {
  drawForestation: function() {
      time += 0.001
      noFill()
      beginShape();
      for (var i = 0 ; i<(Math.PI*2); i+=0.1){
        var value2d = simplex.noise2D(Math.cos(i) + time, Math.sin(i) + time ) * 8;
        x = Math.cos(i) * (this.radius + value2d)
        y = Math.sin(i) * (this.radius + value2d)
        drawLine(this.color, this.alpha, this.weight)
        lastCoord[1] = y
      }
      endShape(CLOSE);
      function drawLine(color, alpha, weight){
        strokeWeight(weight)
        stroke(color.levels[0],color.levels[1],color.levels[2], alpha)
        vertex(x, y)
      }
  },
  update: function(alpha, weight) {
    this.weight = weight
    this.alpha = alpha
    this.drawForestation()
  }
}
