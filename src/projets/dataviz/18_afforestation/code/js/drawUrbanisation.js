var Urbanisation = function (x, y, opacity) {
  this.x = x
  this.y = y
  this.opacity = opacity
}

Urbanisation.prototype = {
    drawUrbanisation: function() {
      fill(255, 255, 255, this.opacity)
      noStroke()
      var radius = 30
      ellipse(this.x, this.y, radius, radius)
    },

    update: function() {
      if(mouseX > this.x-15 && mouseX < this.x+15 &&
      mouseY > this.y-15 && mouseY < this.y+15) {
        if(this.opacity < 255) {
          this.opacity+=20
        }
      }
      this.drawUrbanisation()
    },
    shake: function() {
      var randx = random(-0.5, 0.5)
      var randy = random(-0.5, 0.5)
      TweenMax.to(this, 1, {x:this.x+=randx, y: this.y+=randy})
      this.drawUrbanisation()
    }
}
