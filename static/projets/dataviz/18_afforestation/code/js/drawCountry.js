var Country = function (opts) {

}

Country.prototype = {
  drawCountry() {
    noStroke()
    fill(255, 255, 255, opacityText)
    textSize(150)
    textFont(verdana)
    textStyle(BOLD)
    for(var i = 0; i < countryWord.length; i++) {
      if(i % 2 == 0) {
        text(countryWord[i], windowWidth/4 + i*150, windowHeight/2);
      } else {
        text(countryWord[i], windowWidth/4 + i*150, windowHeight/1.5);
      }
    }
    if(playFirstTime) {
      if(opacityText < 255) {opacityText+=5}
    } else {opacityText=255}
  },
  update: function() {

  }
}
