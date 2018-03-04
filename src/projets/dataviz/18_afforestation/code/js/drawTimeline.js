var Timeline = function (min, max) {
  this.min = min
  this.max = max
}

Timeline.prototype = {
  init: function() {
  },
  drawTimeline: function() {
    textSize(26)
    textFont(avenir)
    for(var i = 0; i < getUrbanisationArray[2].listValues.length; i+=5) {
      noStroke()
      fill(255, 255, 255, 150)
      text(getUrbanisationArray[2].listValues[i].year, (10.5/12)*windowWidth, ((10.1/12)*windowHeight) - i*(windowHeight/40));
    }
  },

    update: function() {
      document.getElementById("container").style.cursor = "auto";
      var displayValue = range.value
      this.drawTimeline()

      if(mouseX > (10.5/12)*windowWidth && mouseX < (10.5/12)*windowWidth + 60
      && mouseY > ((10.1/12)*windowHeight) - (windowHeight/40) && mouseY < ((10.1/12)*windowHeight) - (windowHeight/40)+30)
      {
        document.getElementById("container").style.cursor = "pointer";
      } else {
        // document.getElementById("container").style.cursor = "auto";
      }
      for(var i = 5; i < getUrbanisationArray[2].listValues.length; i+=5) {
        if(mouseX > (10.5/12)*windowWidth && mouseX < (10.5/12)*windowWidth + 60
        && mouseY < ((10.1/12)*windowHeight) - i*(windowHeight/40) && mouseY > ((10.1/12)*windowHeight) - i*(windowHeight/40)-30)
        {
          document.getElementById("container").style.cursor = "pointer";
        }
      }
    }
}
