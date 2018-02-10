const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    simplex = new SimplexNoise(),
    nbLineSlider = document.getElementById("nb-line"),
    marginSlider = document.getElementById("margin-top-bottom"),
    nbParticleSlider = document.getElementById("nb-particle"),
    fadeSlider = document.getElementById("fade"),
    amplitudeMultSlider = document.getElementById("amplitude-mult"),
    speedSlider = document.getElementById("speed");


let canvasWidth,
    canvasHeight,
    lines = [],
    audio,
    allData = [],
    time = 0;

var nbLine = 5,
    marginTopBottom = 80,
    nbParticle = 40,
    amplitudeMult = 0.3,
    fade = 0.15,
    speed = 0.0005;


function initCanvasSize() {
    canvasWidth = window.innerWidth * 0.9;
    canvasHeight = window.innerHeight * 0.75;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';
}


function onResize() {

    //Resize canvas
    initCanvasSize();

    initSlider();

    //Create New Lines
    initLines();
}


function updateFrame(){

    requestAnimationFrame(updateFrame);

    //Fade effect
    ctx.fillStyle = 'rgba(0,0,0,' + fade + ')';
    ctx.fillRect(0,0, canvasWidth, canvasHeight);


    //Get Data
    allData = audio.getFrequencyData();

    //Remove Highest Frequency Data (10%)
    allData = allData.slice(0, Math.floor((allData.length - 1) * 0.90 ));

    //Caculate average for each line
    const everageData = [];

    for(let i = 0; i < nbLine; i++ ){

        let everageCurrent = 0;
        let cumul = 0;

        let debut = Math.floor( ((allData.length - 1) / nbLine) * i );
        let fin = Math.floor( ((allData.length - 1) / nbLine) * (i + 1) );

        for(let j = debut; j < fin; j++) {
            cumul += allData[j];
        }

        everageCurrent = cumul / (fin - debut);

        everageData.push(everageCurrent);
    }

    //Render lines
    for(let i= 0; i < nbLine; i++ ){
        let line = lines[i];

        //console.log(everageData[i]);

        line.render(everageData[i]);
    }

}


function initLines() {
    //Delete current Lines
    lines = [];


    var gapYLine = marginTopBottom;

    //Center line if she is alone
    if(nbLine === 1) {
        gapYLine = canvasHeight / 2;
    }

    let angleStart = 0;

    //Create lines
    for (let i = 0; i < nbLine; i++) {
        let line = new Line(nbParticle, gapYLine, 'white', angleStart); //nbParticle, baseY, color, angleStart
        line.createPoints();
        line.render();
        lines.push(line);
        gapYLine += ( (canvasHeight - (marginTopBottom * 2) ) / (nbLine - 1) );
        angleStart+= 1.5;
    }
}


function initSlider() {

    nbLineSlider.value = nbLine;

    marginSlider.value = marginTopBottom;
    marginSlider.max = canvasHeight;

    nbParticleSlider.value = nbParticle;

    fadeSlider.value = fade;

    amplitudeMultSlider.value = amplitudeMult;

    speedSlider.value = speed;

}


function initEvent() {

    window.addEventListener('resize', onResize);

    nbLineSlider.addEventListener('change', function () {
        nbLine = Number(nbLineSlider.value);
        initLines();
    });

    marginSlider.addEventListener('change', function () {
        marginTopBottom = Number(marginSlider.value);
        initLines();
    });

    nbParticleSlider.addEventListener('change', function () {
        nbParticle = Number(nbParticleSlider.value);
        initLines();
    });

    fadeSlider.addEventListener('change', function () {
        fade = Number(fadeSlider.value);
        initLines();
    });

    amplitudeMultSlider.addEventListener('change', function () {
        amplitudeMult = Number(amplitudeMultSlider.value);
        initLines();
    });

    speedSlider.addEventListener('change', function () {
        speed = Number(speedSlider.value);
        initLines();
    });


}


function init() {

    audio = new Audio();
    audio.loadSound('./audio/sound.mp3');



    initCanvasSize();

    initLines();

    initSlider();

    initEvent();

    updateFrame();

}


setTimeout(function () {
    const intro = document.getElementById("intro");
    intro.style.opacity = "0"
}, 4000);



setTimeout(function () {
    init();
}, 4500);