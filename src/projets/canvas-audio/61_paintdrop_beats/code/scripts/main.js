let canvas = document.getElementById('canvas'),
    simplex       = new SimplexNoise(),
    paintdrops    = [],
    nbPaintdrops  = 3,
    audio,
    ctx,
    line,
    splash;

    const color = [
        '#ed5e9a',
        '#fff680',
        '#7248de'
    ]

/**
 * onResize
 * - Triggered when window is resized
 * @param  {obj} evt
 */
function onResize( evt ) {

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    canvas.width = canvasWidth
    canvas.height = canvasHeight
    canvas.style.width = canvasWidth + 'px'
    canvas.style.height = canvasHeight + 'px'

}

function updateFrame() {

    requestAnimationFrame( updateFrame );

    let cumul     = 0,
        variation = 0,
        frequencyData = audio.getFrequency();

    for (let k = 0; k < 800; k++) {
      cumul += frequencyData[k];                 //Sums all frequencies
    }

    variation = cumul / 255;                     //Gets global variation a a frequency sample

    if (variation > 350) {
        ctx.fillStyle = 'rgba(255, 27, 82, 0.1)'; //Change fillStyle when frequency variations are high
    } else {
        ctx.fillStyle = 'rgba(13, 29, 51, 0.1)';
    }

    let variationPaintDrop = 0;

    for (let i = 0; i < nbPaintdrops; i++) {

        let paintdrop     = paintdrops[i],
            percentIdx    = i / nbPaintdrops;
            frequencyIdx  = Math.floor(1024 * percentIdx);

        variationPaintDrop = frequencyData[frequencyIdx] / 255;   //Gives each paintdrop a frequency range

        paintdrop.update(variationPaintDrop, 1);
        paintdrop.render();
    }

    line.update(0.05, variation);
    line.render();

    ctx.fillRect(0, 0, canvas.width, canvas.height);   //Draw a rect with transparacy to create a shadow effect
}

function init() {

    onResize();

    audio = new Audio('sounds/sound.mp3');  //Creates a new audio object with an url

    let drop = document.getElementById('drop');
    drop.addEventListener('click', function() {
      for (let i = 0; i < nbPaintdrops; i++) {
          paintdrops[i].twin();             //Calls twin method that handles the intro animation
      }

      updateFrame();
      audio.loadSound();
      document.getElementById('introScreen').classList.add('hidden');
    })


    ctx = canvas.getContext('2d');

    let ratio           = 7,
        height          = canvasHeight / 1.5; //Height shape
        distanceX       = -ratio * 2,         //Distance X from x = 0
        distanceY       = 0,                  //Distance Y from y = 0
        angle           = 0,
        angleIncrease   = 0.020,              //For each point loop
        amplitude       = height / 3,
        heightDecrease  = height / 3 / 2,     //For each paintdrop loop
        duration        = 1000,               //Intro animation duration
        nbPoints        = 400;

    //Instances 3 shapes as paintdrops
    for (let i = 0; i < nbPaintdrops; i++) {

        let paintdrop = new Shape(nbPoints, distanceX, distanceY, height + 50, angle, angleIncrease, ratio, amplitude, duration, color[i]);
        paintdrops.push(paintdrop);
        height        -= heightDecrease;
        angle         += Math.random() * (0 - 0.05);
        duration      += 1000;
    }

    //Creates a new line
    line = new Line(nbPoints, distanceX, canvasHeight / 2, 0, 0.5, 0.05, 10, 50, duration, '#fff');
}

init();
