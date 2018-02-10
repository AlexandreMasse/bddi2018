var Pourcent = function (value1, color1, value2, color2) {
  this.value1 = value1
  this.color1 = color1
  this.value2 = value2
  this.color2 = color2
}

Pourcent.prototype = {
  drawPourcent: function() {
    fill(this.color1)
    textSize(80)
    textFont(avenirLight)
    text(this.value1 + "%", windowWidth/12, windowHeight-50);
    fill(this.color2)
    text(this.value2 + "%", windowWidth/6, windowHeight-50);
  },
  update: function(newValueForestation, newColorForestation, newValueUrbanisation, newColorUrbanisation) {
    this.value1 = newValueForestation
    this.color1 = newColorForestation
    this.value2 = newValueUrbanisation
    this.color2 = newColorUrbanisation
    this.drawPourcent()

    if(mouseX > windowWidth/10 && mouseX < windowWidth/6
    && mouseY > windowHeight-130 && mouseY < windowHeight-50) {
      this.drawCaption(true)
      theStrokeWeight = 3.5
    } else {
      theStrokeWeight = 2
    }

    if(mouseX > windowWidth/6 && mouseX < windowWidth/3
    && mouseY > windowHeight-130 && mouseY < windowHeight-50) {
      this.drawCaption(false)
    }
  },
  drawCaption: function(pourcent) {
    stroke(255, 255, 255)
    noStroke()
    textSize(40)
    textFont(avenirLight)
    if(pourcent) {
      fill(this.color1)
      text("Surface forestière (%)", windowWidth/4, windowHeight-65)
      strokeWeight(1)
      stroke(this.color1)
      textSize(80)
      text(this.value1 + "%", windowWidth/12, windowHeight-50);
    } else {
      fill(this.color2)
      text("Population urbaine (%)", windowWidth/4, windowHeight-65)
      strokeWeight(1)
      stroke(this.color2)
      textSize(80)
      text(this.value2 + "%", windowWidth/6, windowHeight-50);
    }

  }
}
