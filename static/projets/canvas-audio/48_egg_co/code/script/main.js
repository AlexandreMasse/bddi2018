function init() {


    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext; // pour que ce soit supporté par tout les navigateurs

    var canvasWith = window.innerWidth;
    var canvasHeight = window.innerHeight;
    var radius = 80
    var time = 50
    var cercles = []
    var cercles2 = []
    var simplex = new SimplexNoise()
    var amplitude = 50
    var squares = [];
    var squareW = 100; // à faire varier
    var nbSquares = 32;
    var average = 0;
    var bgcolor = 'rgba(0,0,0,0.1)';
    var petale = "white";
    var color = "#F27400";
    var type = 0;

    var flag = false;
    var displacement;

    var x;
    var y;

    /**
     *
     * Sound stuff
     *
     */
    var audioCtx = new AudioContext(); //context
    var audioBuffer;
    var audioSource; //mp3
    var analyser = audioCtx.createAnalyser(); //analyseur
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    var percentIdx;
    var frequencyIdx;

    /**
     *
     * Images struff
     */
    var bacon = document.getElementById("bacon");
    var broccoli = document.getElementById("broccoli");
    var chicken = document.getElementById("chicken");
    var banana = document.getElementById("banana");
    var squarePerRow;
    var squareContainer;
    var step;
    var margin;

    /**
     *
     * Intro stuff
     */
    var main = document.querySelector(".main");
    var category = document.querySelector(".category");
    var title = document.querySelector(".title");
    var sound = document.querySelector(".sound");

    /**
     * Ending stuff
     */

    var end = document.querySelector(".end");
    var body = document.getElementsByTagName("body")

    /**
     Time stuff
     */
    var DELTA_TIME = 0;
    var LAST_TIME = Date.now();

    /**
     Canvas stuff
     */
    var canvas
    var ctx
    canvas = document.querySelector('canvas')
    ctx = canvas.getContext('2d')

    function initCanvas() {
        onResize()
    }

    /**
     * Introduction
     */

    //display
    setTimeout(function () {
        title.setAttribute("class", "title hello");
    }, 500);

    setTimeout(function () {
        category.setAttribute("class", "category hello");
    }, 1500);

    setTimeout(function () {
        sound.setAttribute("class", "sound hello");
    }, 2500);

    //undisplay
    setTimeout(function () {
        title.setAttribute("class", "title");
    }, 7500);

    setTimeout(function () {
        category.setAttribute("class", "category");
    }, 6500);

    setTimeout(function () {
        sound.setAttribute("class", "sound");
    }, 5500);

    setTimeout(function () {
        main.setAttribute("style", "display:none")
        canvas.setAttribute("style", "display:block");
    }, 7500);

    setTimeout(function () {
        flag = true;
    }, 61500);
    setTimeout(function () {
        flag = false;
    }, 86500);


    /**
     *  load sound
     */
    function loadSound(url) {
        var request = new XMLHttpRequest();
        request.open('GET', './sounds/sound.mp3', true);
        request.responseType = 'arraybuffer'; //réponse : données sous forme de tableau

        // Decode asynchronously
        request.onload = function () {

            audioCtx.decodeAudioData(request.response, function (buffer) {

                // success callback
                audioBuffer = buffer; //prise de courant

                // Create sound from buffer
                audioSource = audioCtx.createBufferSource();
                audioSource.buffer = audioBuffer;

                audioSource.onended = function () {
                    console.log("End of music");
                }

                // connect the audio source to context's output
                audioSource.connect(analyser)
                analyser.connect(audioCtx.destination)

                // play sound
                audioSource.start();

                addListeners()
                frame()

            }, function () {

                // error callback
                //
            });
        }
        request.send();
    }

    var Square = function (opts) {
        this.x = opts.x;
        this.y = opts.y;
        this.sqWidth = opts.sqWidth;
        this.sqHeight = opts.sqHeight;

        this.rotation = opts.rotation;
        this.img = opts.img;


        this.color = "rgb(" +
            Math.floor(Math.random() * 256) + "," +
            Math.floor(Math.random() * 256) + "," +
            Math.floor(Math.random() * 250) + ")";
    };

    Square.prototype = {
        render: function (ctx) {
            var dx = this.x - canvasWith / 2
            var dy = this.y - canvasHeight / 2
            var angle = Math.atan2(dy, dx)
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(angle);

            ctx.drawImage(this.img, -this.sqWidth / 2, -this.sqHeight / 2, this.sqWidth, this.sqHeight);

            ctx.restore();
        }
    };

    var Cercle = function (opts) {
        this.x = opts.x;
        this.y = opts.y;
        this.cos = opts.cos;
        this.sin = opts.sin;
        this.size = opts.size;
        this.angle = opts.angle
        this.value2d = 0
        this.color = "rgb(" +
            Math.floor(Math.random() * 256) + "," +
            Math.floor(Math.random() * 256) + "," +
            Math.floor(Math.random() * 250) + ")";
    };

    Cercle.prototype = {
        render: function (ctx) { // creation de cercles
            ctx.save();
//            ctx.rotate(this.angle);
//            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            // ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
//            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
    };



    function draw(cerclesArr, nbPoints) {
        step = (Math.PI * 2) / nbPoints;
        for (var i = 0; i < ( Math.PI * 2); i += step) {

            var cercle = new Cercle({
                x: Math.cos(i) * (radius),
                y: Math.sin(i) * (radius),
                cos: Math.cos(i),
                sin: Math.sin(i),
                size: 1,
                angle: i
            });
            cerclesArr.push(cercle);
            cercle.render(ctx);
        }

    }

    draw(cercles, 300)
    draw(cercles2, 200)

    function drawLines(cerclesArr, type, color) { //lignes qui relient les points

        ctx.save();
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cerclesArr[0].x, cerclesArr[0].y);
        for (var i = 0; i < cerclesArr.length; i++) {

            ctx.lineTo(cerclesArr[i].x, cerclesArr[i].y);
        }
        ctx.closePath();
        ctx.fillStyle = color;
        if (type == 1) {
            ctx.stroke();
        }
        if (type == 0) {
            ctx.fill();
        }
        ctx.restore()
    }

    for (var k = 0; k < nbSquares; k++) {
        x = k % squarePerRow;
        y = Math.floor(k / squarePerRow);

        var square = new Square({
            img: broccoli,
            x: x * step + margin,
            y: y * step + margin,
            sqWidth: squareW,
            sqHeight: squareW,
            rotation: 50

        });
        squares.push(square);
        square.render(ctx);
    }

    function drawSquares(food) {
        if(flag==true){
            squareW = Math.floor(Math.random() * 300) + 100;
        }else{
            squareW = Math.floor(Math.random() * 150) + 100;
        }

        squarePerRow = Math.floor(canvas.width / (squareW + 100));
        squareContainer = (squareW + 100) * squarePerRow;
        step = squareContainer / squarePerRow;
        margin = (canvas.width - squareContainer) / 2 + (squareW + 100) / 2;

        for (var k = 0; k < nbSquares; k++) {
            x = k % squarePerRow;
            y = Math.floor(k / squarePerRow);
            squares[k].x = x * step + margin;
            squares[k].y = y * step + margin;
            squares[k].sqWidth = squareW;
            squares[k].sqHeight = squareW;
            squares[k].img = food;
            squares[k].render(ctx);
        }
    }

    /**
     * addListeners
     */
    function addListeners() {

        window.addEventListener('resize', onResize.bind(this));
        rafId = requestAnimationFrame(frame)
    }

    /**
     * update
     * - Triggered on every TweenMax tick
     */
    function frame() {

        rafId = requestAnimationFrame(frame)
        var cumul = 0;

        DELTA_TIME = Date.now() - LAST_TIME;
        LAST_TIME = Date.now();

        analyser.getByteFrequencyData(frequencyData);

        ctx.fillStyle = bgcolor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);


        time += 0.001

        for (var i = 0; i < cercles.length; i++) {
            var cercle = cercles[i]
            displacement = simplex.noise2D(cercle.cos + time, cercle.sin + time) * amplitude + average
//            var displacement =average
            cercle.x = canvas.width / 2 + Math.cos(cercle.angle) * (radius * 2 + displacement)
            cercle.y = canvas.height / 2 + Math.sin(cercle.angle) * (radius * 2 + displacement)
            //cercle.render(ctx);
        }

        for (var i = 0; i < cercles2.length; i++) {
            var cercle = cercles2[i]
            displacement = average
            cercle.x = canvas.width / 2 + Math.cos(cercle.angle) * ( radius / 4 + displacement)
            cercle.y = canvas.height / 2 + Math.sin(cercle.angle) * ( radius / 4 + displacement)
            cercle.render(ctx);
        }

       if(frequencyData[0]>200 && flag == true) {
           squareW = Math.floor(Math.random() * 120) + 100;
           drawSquares(chicken)
       }
        if (frequencyData[0] > 200 && flag == false) {
            squareW = Math.floor(Math.random() * 120) + 100;
            drawSquares(bacon)
        }

        //SNARE
        if (frequencyData[291] > 150) {
            bgcolor = "rgba(" +
                Math.floor(Math.random() * 256) + "," +
                Math.floor(Math.random() * 256) + "," +
                Math.floor(Math.random() * 250) + ",0.1)";
            drawSquares(banana)
        }

        if (average > 30) {
            drawLines(cercles, 0, petale); // white egg
            drawLines(cercles2, type, color); // yellow egg
        }


        for (var i = 0; i < cercles.length; i++) {
            // get the frequency according to current i
            percentIdx = i / cercles.length;
            frequencyIdx = Math.floor(1024 * percentIdx) // array of 1024
            cumul += frequencyData[frequencyIdx];

        }
        average = cumul / 255;
        audioSource.onended = function () {
            cancelAnimationFrame(rafId)
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            setTimeout(function(){
                canvas.classList.remove("hello");
            },1000);
            setTimeout(function(){
                canvas.setAttribute("style", "display:none")
                body.setAttribute("style", "background-color:white")
            },2000);
            setTimeout(function(){
                main.setAttribute("style", "display:block")
                end.classList.add("hello");
            },3000);

        }
    }

    /**
     * onResize
     * - Triggered when window is resized
     * @param  {obj} evt
     */
    function onResize(evt) {

        canvasWith = window.innerWidth;
        canvasHeight = window.innerHeight;
        canvas.width = canvasWith
        canvas.height = canvasHeight
        canvas.style.width = canvasWith + 'px'
        canvas.style.height = canvasHeight + 'px'
    }

    initCanvas()
    loadSound()
}