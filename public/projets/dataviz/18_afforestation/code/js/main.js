var cnv

var Y_AXIS = 1;
var X_AXIS = 2;
var b1, b2, c1, c2;
var t;

var playFirstTime = true

var colorFrance = ["", "", ""]
var colorChine = ["", "", ""]
var colorGhana = ["", "", ""]
var colorEspagne = ["", "", ""]
var white

var gradientLeft
var gradientRight
var circleColor

var opacityText = 0
var theStrokeWeight = 2

var valueId = 1
var alphaUpdate = 255
var pourcentDisplayedForestation
var pourcentDisplayedUrbanisation

var urbanisationPlacement

var angle = 0
var x = 0
var y = 0
var radius = 50
var time = 0
var lastCoord = []
var simplex = new SimplexNoise()

var urbanisationObj
var forestationObj
var countryObj
var pourcentObj

var getUrbanisationArray  // get from the datas
var getForestationArray   // get from the datas

var countryCode
var countryObj
var countryWord = []

var forestationArray = []   // contain every forestation obj
var urbanisationArray = []  // contain every urbanisation obj

function setDatasFrance() {
  getUrbanisationArray = fr_urbanisation_array
  getForestationArray = fr_forestation_array
  setup()
}
function setDatasChine() {
  getUrbanisationArray = ch_urbanisation_array
  getForestationArray = ch_forestation_array
  setup()
}
function setDatasGhana() {
  getUrbanisationArray = gha_urbanisation_array
  getForestationArray = gha_forestation_array
  setup()
}
function setDatasEspagne() {
  getUrbanisationArray = esp_urbanisation_array
  getForestationArray = esp_forestation_array
  setup()
}

var verdana;
var avenir;
var avenirLight;

preload = function() {
  verdana = loadFont('font/Verdana.ttf');
  avenir = loadFont('font/AvenirNextRegular.ttf');
  avenirLight = loadFont('font/AvenirNextUltraLight.ttf');
  setDatasFrance()
}

function setup() {
  frameRate(30)

  cnv = createCanvas(windowWidth, windowHeight);

  colorFrance[0] = color(2, 3, 210);      // gradientLeft
  colorFrance[1] = color(138, 138, 234);  // gradientRight
  colorFrance[2] = color(255, 87, 87);    // circleColor

  colorChine[0] = color(216, 28, 28);     // gradientLeft
  colorChine[1] = color(234, 133, 133);   // gradientRight
  colorChine[2] = color(131, 58, 58);     // circleColor

  colorGhana[0] = color(24, 169, 99);     // gradientLeft
  colorGhana[1] = color(122, 206, 165);   // gradientRight
  colorGhana[2] = color(255, 234, 0);   // circleColor

  colorEspagne[0] = color(241, 155, 19);  // gradientLeft
  colorEspagne[1] = color(246, 193, 108); // gradientRight
  colorEspagne[2] = color(230, 98, 34);  // circleColor

  white = color(255, 255, 255);

  countryCode = getForestationArray[1].countryCode;
  country = getForestationArray[0].countryName;

  countryWord = []
  country = country.toUpperCase();
  for(var i = 0; i < country.length; i++) {
    countryWord.push(country.charAt(i))
  }

  switch (countryCode) {
    case "fr":
      gradientLeft = colorFrance[0]
      gradientRight = colorFrance[1]
      circleColor = colorFrance[2]
      break;
    case "ch":
      gradientLeft = colorChine[0]
      gradientRight = colorChine[1]
      circleColor = colorChine[2]
      break;
    case "gha":
      gradientLeft = colorGhana[0]
      gradientRight = colorGhana[1]
      circleColor = colorGhana[2]
      break;
    case "esp":
      gradientLeft = colorEspagne[0]
      gradientRight = colorEspagne[1]
      circleColor = colorEspagne[2]
      break;
  }

  setGradient(0, 0, windowWidth, windowHeight, gradientLeft, gradientRight, X_AXIS);

  opacityText = 0
  countryObj = new Country()
  pourcentObj = new Pourcent()

  // INIT TIMELINE
  t = 0;

  var range = document.getElementById("range");
  range.setAttribute("min", getUrbanisationArray[2].listValues[0].year)
  range.setAttribute("max", getUrbanisationArray[2].listValues[getUrbanisationArray[2].listValues.length-1].year)
  range.setAttribute("step", 1)
  range.setAttribute("list", "listYears")
  var listYears = document.createElement("listYears")
  listYears.setAttribute("id", "listYears")
  var option = document.createElement("OPTION")
  option.setAttribute("value", "1990")
  listYears.appendChild(option)

  timelineObj = new Timeline(
    getUrbanisationArray[2].listValues[0].year,
    getUrbanisationArray[2].listValues[getUrbanisationArray[2].listValues.length-1].year
  )

  urbanisationArray = []

  // INIT URBANISATION
  for(var i = 0; i < getUrbanisationArray[2].listValues[getUrbanisationArray[2].listValues.length-1].value * 2; i++) {
    var topRight = Math.random()*(1.5)
    var topLeft = Math.random()*(1.5) + 1.5
    var bottomRight = Math.random()*(-1.5)
    var bottomLeft = Math.random()*(-1.5) - 1.5

    switch (countryCode) {
      case "fr":
        urbanisationPlacement = topRight
        break;
      case "ch":
        urbanisationPlacement = topLeft
        break;
      case "gha":
        urbanisationPlacement = bottomRight
        break;
      case "esp":
        urbanisationPlacement = topRight
        break;
    }

    randx = random(windowWidth/3, 250)
    randy = random(windowHeight/2, 250)
    var posx = (windowWidth/2) + cos(urbanisationPlacement) * randx; // * 300
    var posy = (windowHeight/2) - sin(urbanisationPlacement) * randy;
    var randopacity = Math.floor(random(50, 200));

    urbanisationObj = new Urbanisation(posx, posy, randopacity)
    urbanisationArray.push(urbanisationObj)
  }

  forestationArray = []
  radius = 50

  // INIT FORESTATION
  for(var i = 0; i < getUrbanisationArray[2].listValues.length; i++) {
    forestationObj = new Forestation(radius, circleColor)
    forestationArray.push(forestationObj)
    radius+=Math.round(getForestationArray[2].listValues[i].value)-5
  }
}

function draw() {
  clear()
  setGradient(0, 0, windowWidth, windowHeight, gradientLeft, gradientRight, X_AXIS);

  if(t < 160) {t++}
  else {t = 0}

  countryObj.drawCountry()
  timelineObj.update()

  valueId = range.value - range.min
  pourcentDisplayedForestation = Math.round(getForestationArray[2].listValues[valueId].value)
  pourcentDisplayedUrbanisation = Math.round(getUrbanisationArray[2].listValues[valueId].value)

  pourcentObj.update(pourcentDisplayedForestation, circleColor, pourcentDisplayedUrbanisation, white)

  for(var i = 0; i < getUrbanisationArray[2].listValues[valueId].value * 2; i++) {
    urbanisationArray[i].update()
    if(t = 120) {
      urbanisationArray[i].shake()
    }
  }


  alphaUpdate = 255
  translate(windowWidth/2, windowHeight/2)
  for(var i = 0; i < valueId + 5; i++) {
    if(i < 25) {
      forestationArray[i].update(alphaUpdate, theStrokeWeight)
      alphaUpdate -= 7
    }
  }
}

function mousePressed() {
  if(mouseX > (10.5/12)*windowWidth && mouseX < (10.5/12)*windowWidth + 60
  && mouseY > ((10.1/12)*windowHeight) - (windowHeight/40) && mouseY < ((10.1/12)*windowHeight) - (windowHeight/40)+30)
  {
    range.value = 1990
  }
  for(var i = 5; i < getUrbanisationArray[2].listValues.length; i+=5) {
    if(mouseX > (10.5/12)*windowWidth && mouseX < (10.5/12)*windowWidth + 60
    && mouseY < ((10.1/12)*windowHeight) - i*(windowHeight/40) && mouseY > ((10.1/12)*windowHeight) - i*(windowHeight/40)-30)
    {
      range.value = getUrbanisationArray[2].listValues[i].year
    }
  }
}

var scroll = document.getElementById('container');
scroll.addEventListener('wheel', findScrollDirectionOtherBrowsers);

function findScrollDirectionOtherBrowsers(event){
   var delta;

   if (event.wheelDelta){
       delta = event.wheelDelta;
   }else{
       delta = -1 * event.deltaY;
   }

   if (delta < 0){
     console.log("DOWN")
       range.value-=1
   } else if (delta > 0){
     console.log("UP")
     range.value += 1
   }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup()
  playFirstTime = false
}


// PLAYER MUSIC

function play(idPlayer, control) {
    var player = document.querySelector('#' + idPlayer);

    if (player.paused) {
        player.play();
        control.textContent = 'STOP';
    } else {
        player.pause();
        control.textContent = 'PLAY';
    }
}

function resume(idPlayer) {
    var player = document.querySelector('#' + idPlayer);

    player.currentTime = 0;
    player.pause();
}
