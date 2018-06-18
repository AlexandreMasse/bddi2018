function drawCountry() {
  noStroke()
  fill(255, 255, 255)
  textSize(150)
  textFont(verdana)
  textStyle(BOLD)
  for(var i = 0; i < countryWord.length; i++) {
    if(i % 2 == 0) {
      text(countryWord[i], windowWidth/5 + i*150, windowHeight/2);
    } else {
      text(countryWord[i], windowWidth/5 + i*150, windowHeight/1.5);
    }
  }
}
